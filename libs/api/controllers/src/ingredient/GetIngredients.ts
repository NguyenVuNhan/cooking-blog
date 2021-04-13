import { Request, Response } from 'express';
import { Ingredient } from '@api/models';
import { GetIngredientsRes } from '@cookingblog/api-interfaces';

class GetIngredients {
  static perform = [
    async (
      req: Request<{ name: string }, GetIngredientsRes>,
      res: Response<GetIngredientsRes>
    ) => {
      const name = req.params.name;

      const ingredients = (
        await Ingredient.find({
          // $text: { $search: name },
          name: { $regex: name },
        })
          .select('name -_id')
          .limit(20)
          .exec()
      ).map(({ name }) => name);

      return res.status(200).json({
        data: { ingredients },
        message: 'Get ingredients',
        success: true,
      });
    },
  ];
}

export default GetIngredients;
