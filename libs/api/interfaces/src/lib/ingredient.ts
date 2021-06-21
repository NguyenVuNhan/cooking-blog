import { BaseResponse } from '@cookingblog/express/api/core';

// ======================================================================
// Request
// ======================================================================

// ======================================================================
// Response
// ======================================================================
export type GetIngredientsRes = BaseResponse<{
  ingredients: string[];
}>;