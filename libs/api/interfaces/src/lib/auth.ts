import {
  LoginDTO,
  RegisterDTO,
  ResetDTO,
  ResetRequestDTO,
} from '@cookingblog/api/auth/dto';
import { BaseResponse } from '@cookingblog/express/api/core';

// ======================================================================
// Request
// ======================================================================
export type LoginReq = LoginDTO;
export type RegisterReq = RegisterDTO;
export type PasswordResetRequestReq = ResetRequestDTO;
export type PasswordResetReq = ResetDTO;

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

export type PasswordResetRequestRes = BaseResponse<null>;
export type PasswordResetRes = BaseResponse<null>;
