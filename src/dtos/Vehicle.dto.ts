import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class VehicleDto {
  @IsOptional()
  @IsNumber()
  riderId: string;

  @IsNotEmpty()
  @IsString()
  vehicleName: string;

  @IsNotEmpty()
  @IsString()
  vehicleColor: string;

  @IsNotEmpty()
  @IsNumber()
  vehicleNumber: string;

  @IsNotEmpty()
  @IsString()
  vehicleCapacity: string;

  @IsNotEmpty()
  @IsString()
  vehicleImage: string[];
}
