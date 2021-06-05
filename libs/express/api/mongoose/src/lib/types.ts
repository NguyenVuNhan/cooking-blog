export interface IMongoConfig {
  connectionString?: string;
  user?: string;
  password?: string;
}

export interface BaseEntity {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
