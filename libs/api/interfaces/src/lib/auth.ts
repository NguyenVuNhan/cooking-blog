import { LoginDTO, RegisterDTO } from '@cookingblog/api/auth/dto';
import { BaseResponse } from '@cookingblog/express/api/core';

// ======================================================================
// Request
// ======================================================================
export type LoginReq = LoginDTO;
export type RegisterReq = RegisterDTO;

// ======================================================================
// Response
// ======================================================================
export type LoginRes = BaseResponse<{
  user: { id: string; email: string };
  token: string;
  exp: number;
}>;

export type RegisterRes = BaseResponse<{
  email: string;
}>;
