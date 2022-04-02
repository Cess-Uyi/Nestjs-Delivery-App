import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class NextOfKinDto {
  @IsOptional()
  @IsNumber()
  riderId: string;

  @IsNotEmpty()
  @IsString()
  NOKfullName: string;

  @IsNotEmpty()
  @IsString()
  NOKaddress: string;

  @IsNotEmpty()
  @IsString()
  NOKphone: string;
}
