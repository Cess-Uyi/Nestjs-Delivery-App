import { Body, Controller, Headers, Logger, Post } from '@nestjs/common';
// import { CreateWalletDto } from 'src/dtos/Wallet.dto';
import { WalletService } from 'src/services/Wallet.service';

@Controller('wallet')
export class WalletController {
  private logger = new Logger('WalletController');
  constructor(private readonly walletService: WalletService) {}

  @Post('create')
  async createWallet(
    // @Body() createWalletDto: CreateWalletDto,
    @Headers() headers,
  ): Promise<any> {
    return this.walletService.createWallet(headers);
  }

  @Post('pin')
  async create(@Body() pin: number, @Headers() headers): Promise<any> {
    return this.walletService.createPin(pin, headers);
  }
}
