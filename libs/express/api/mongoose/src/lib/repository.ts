import {
  model,
  Document,
  Schema,
  Model,
  FilterQuery,
  UpdateQuery,
} from 'mongoose';
import {
  FindAllOption,
  FindAllResponse,
  IBaseRepository,
  UpdateOptions,
} from '@cookingblog/express/api/core';

export abstract class BaseRepository<TModel extends Document>
  implements IBaseRepository<TModel> {
  model: Model<TModel>;

  constructor(name: string, schema: Schema, collection: string) {
    this.model = model<TModel & Document>(name, schema, collection);
  }

  @Repository(false)
  async create(entity: Partial<TModel>): Promise<TModel> {
    delete entity.id;

    const doc = await this.model.create(entity);
    return (doc as unknown) as TModel;
  }

  @Repository()
  async updateById(id: string, doc: Partial<TModel>): Promise<boolean> {
    delete doc.id;

    const raw = await this.model.updateOne(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { _id: id as any },
      (doc as unknown) as UpdateQuery<TModel>
    );
    if (raw.ok === 0) {
      throw new Error('Update failed');
    }
    return raw.nModified === 0 ? false : true;
  }

  @Repository()
  async findOne(query: Partial<TModel>): Promise<TModel> {
    const entity = await this.model.findOne(
      (query as unknown) as FilterQuery<TModel>
    );
    return entity as TModel;
  }

  @Repository()
  async findMany(query: Partial<TModel>): Promise<TModel[]> {
    const entity = await this.model.find(
      (query as unknown) as FilterQuery<TModel>
    );
    return entity as TModel[];
  }

  @Repository()
  async findOneAndUpdate(
    query: Partial<TModel>,
    doc: Partial<TModel>,
    options?: UpdateOptions
  ): Promise<TModel> {
    delete doc.id;

    const entity = await this.model
      .findOneAndUpdate(
        (query as unknown) as FilterQuery<TModel>,
        (doc as unknown) as UpdateQuery<TModel>,
        {
          new: true,
          useFindAndModify: true,
          ...options,
        }
      )
      .lean();
    return entity as TModel;
  }

  @Repository()
  async findAll(
    query: Partial<TModel>,
    option: Partial<FindAllOption>
  ): Promise<FindAllResponse<TModel>> {
    if (!option) option = {};
    const { fields } = option;
    let { sort = 'id', limit = 50, page = 1 } = option;

    if (sort && sort.includes('id') && !sort.includes('_id')) {
      sort = sort.replace('id', '_id');
    }

    if (limit > 50 || limit < 1) limit = 50;
    if (page < 1) page = 1;

    const count = await this.model.countDocuments(
      (query as unknown) as FilterQuery<TModel>
    );

    const items = await this.model
      .find((query as unknown) as FilterQuery<TModel>)
      .select(selectFieldsShow(fields))
      .limit(limit)
      .skip(limit * (page - 1))
      .sort(sort);

    transformEntities(items);

    return {
      total: count,
      limit,
      page,
      totalPages: Math.ceil(count / limit),
      data: items as TModel[],
    };
  }

  @Repository()
  async deleteById(id: string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw = await this.model.deleteOne({ _id: id as any });

    if (raw.ok === 0) {
      throw new Error('Delete failed');
    }
    return raw.n === 0 ? false : true;
  }

  @Repository()
  async count(query: Partial<TModel>): Promise<number> {
    const count = await this.model.countDocuments(
      (query as unknown) as FilterQuery<TModel>
    );
    return count;
  }
}

export function Repository(
  transformInputCondition = true,
  transformOutputEntities = true
) {
  return (
    _target: unknown,
    _propertyKey: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor: TypedPropertyDescriptor<(...params: any[]) => Promise<any>>
  ): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const oldFunc = descriptor.value!;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = async function (...args: any[]) {
      const newQuery = transformQueryCondition(args[0]);
      if (transformInputCondition && newQuery !== null) {
        args[0] = newQuery;
      }
      const entities = await oldFunc.apply(this, args);

      transformOutputEntities && transformEntities(entities);

      return entities;
    };
  };
}

function transformQueryCondition(
  query: Record<string, unknown>
): Record<string, unknown> | null {
  if (!isObject(query)) return null;

  const result = { ...query };
  if (result.id) {
    result._id = result.id;
    delete result.id;
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformEntities(entity: any): void {
  if (!isObject(entity)) return;

  if (Array.isArray(entity)) {
    entity.map((item) => {
      if (item?._id) {
        item.id = item._id.toString();
        delete item._id;
      }
    });

    return;
  }

  if (entity._id) {
    entity.id = entity._id.toString();
    delete entity._id;
  }
}

function isObject(entity: unknown) {
  return typeof entity === 'object' && entity != null;
}

function selectFieldsShow(fields?: string) {
  if (fields) {
    return fields.split(',').join(' ');
  }

  return '';
}
