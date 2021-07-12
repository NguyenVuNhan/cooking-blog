import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty({ message: 'Email or User name is required' })
  emailOrName: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
