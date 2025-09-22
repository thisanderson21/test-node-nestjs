import {
  IsBoolean,
  IsEmail, IsJWT, IsNotEmpty, IsString, Length, ValidateIf
} from 'class-validator';

export class AuthDto {
  id: string;
  password: string;
  email:string;
}

export class AuthCredentialsDto {
  @IsNotEmpty()
    password: string;

  @IsNotEmpty()
  @IsEmail()
    email:string;
}

export class AuthCredentialsGoogleDto {
  @IsNotEmpty()
  @IsJWT()
  token: string;
}

export class AuthDataSignDto {
  @IsNotEmpty()
  @IsString()
    full_name: string;

  @IsNotEmpty()
  @IsString()
    last_name:string;

  @IsNotEmpty()
  @IsEmail()
    email: string;

  @Length(6, 100)
  @IsNotEmpty()
  @IsString()
    password: string;
}

export class AuthForgotPasswordDto {
  @IsNotEmpty()
  @IsString()
    email: string;
}