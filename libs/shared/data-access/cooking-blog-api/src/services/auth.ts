import {
  LoginReq,
  LoginRes,
  RegisterReq,
  RegisterRes,
} from '@cookingblog/api-interfaces';
import axios from 'axios';

export async function login(user: LoginReq): Promise<LoginRes> {
  const res = await axios.post<LoginRes>('/api/auth/login', user);
  return res.data;
}

export async function register(user: RegisterReq): Promise<RegisterRes> {
  const res = await axios.post<RegisterRes>('/api/auth/register', user);
  return res.data;
}
