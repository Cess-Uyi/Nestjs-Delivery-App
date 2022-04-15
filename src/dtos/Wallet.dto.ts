import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'zebrraId' })
  zebrraId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'userId' })
  userId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'balance' })
  balance: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'currency' })
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'walletTypeId' })
  walletTypeId: number;
}

export class WalletPinDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'zebrraId' })
  zebrraId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'pin', example: 1234 })
  pin: number;
}

export class WalletTransferDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'amount' })
  amount: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'narration' })
  narration: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'zebrraId' })
  zebrraId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'recipientZebrraId' })
  recipientZebrraId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'description' })
  description: string;
}

export class DebitWalletDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'zebrraId' })
  zebrraId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'amount' })
  amount: string;
}

export class NGNBankTransferDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'accountBank' })
  accountBank: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'accountNumber' })
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'amount' })
  amount: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'narration' })
  narration: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'zebrraId' })
  zebrraId: string;
}
