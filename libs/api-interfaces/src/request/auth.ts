export interface LoginReq {
  email: string;
  password: string;
}

export interface RegisterReq {
  name: string;
  email: string;
  password: string;
  cpassword: string;
}
