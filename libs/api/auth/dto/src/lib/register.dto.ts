import { Match } from '@cookingblog/shared/validator-decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @IsString()
  @MinLength(4, { message: 'User Name too short' })
  @MaxLength(30, { message: 'User Name too long' })
  @IsNotEmpty({ message: 'User name should not be empty' })
  name: string;

  @IsString()
  @IsEmail(undefined, { message: 'Email must be an valid email' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

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
