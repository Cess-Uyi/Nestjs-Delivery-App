import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RiderRegistrationDto {
  @IsOptional()
  @IsNumber()
  zebrraId: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;

  @IsNotEmpty()
  dateOfBirth: string; //dd-MM-yyyy

  @IsNotEmpty()
  @IsString()
  stateOfOrigin: string;

  @IsNotEmpty()
  @IsString()
  stateOfResidence: string;

  @IsNotEmpty()
  @IsString()
  residentialAddress: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
