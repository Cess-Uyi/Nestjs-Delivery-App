import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  zebrraId: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  balance: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  walletTypeId: number;
}

export class WalletPinDto {
  @IsNotEmpty()
  @IsString()
  zebrraId: string;

  @IsNotEmpty()
  @IsNumber()
  @Length(4)
  pin: number;
}
