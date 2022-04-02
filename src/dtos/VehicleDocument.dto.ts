import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class VehicleDocumentsDto {
  @IsOptional()
  @IsNumber()
  vehicleId: number;

  @IsNotEmpty()
  @IsString()
  documentName: string;

  @IsNotEmpty()
  @IsString()
  documentUrl: string;
}
