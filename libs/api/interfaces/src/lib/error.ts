import { BaseResponse } from '@cookingblog/express/api/core';

export type ErrorRes = BaseResponse<{
  [key: string]: {
    [key: string]: string;
  };
}>;
