import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public name: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class EmailVerifyDto {
  @IsEmail()
  public email: string;
}

export class EmailVerifyCheckDto {
  @IsString()
  public id: string;

  @IsString()
  public token: string;
}
