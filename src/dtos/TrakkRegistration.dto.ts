import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TrakkRegistrationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'zebrraId' })
  zebrraId: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,20}/,
    {
      message:
        'passsword must contain at least one uppercase, one lowercase, one symbol, one number and must be between 8-20 characters ',
    },
  )
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'firstName' })
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'middleName' })
  middleName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'lastName' })
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'phoneNumber' })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'address' })
  address: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ type: Date, description: 'dateOfBirth' })
  dateOfBirth: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'email', default: false })
  isAdmin: boolean;
}
