import { Match } from '@cookingblog/shared/validator-decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class ResetRequestDTO {
  @IsString()
  @IsEmail(undefined, { message: 'Should be a valid email' })
  @IsNotEmpty({ message: 'Email is required' })
  mail: string;
}

export class ResetDTO {
  @IsString()
  @IsNotEmpty({ message: 'User id is required' })
  user: string;

  @IsString()
  @IsNotEmpty({ message: 'Reset password token is required' })
  token: string;

  @IsString()
  @MinLength(4, { message: 'Password too short' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @IsString()
  @Match('password', { message: 'Confirm password not match with Password' })
  @MinLength(4, { message: 'Confirm password too short' })
  @IsNotEmpty({ message: 'COnfirm Password should not be empty' })
  cpassword: string;
}
