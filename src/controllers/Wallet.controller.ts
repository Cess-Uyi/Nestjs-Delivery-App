import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DebitWalletDto,
  NGNBankTransferDto,
  WalletPinDto,
  WalletTransferDto,
} from 'src/dtos/Wallet.dto';
import { LocalAuthGuard } from 'src/middlewares/auth.guard';
import { WalletService } from 'src/services/Wallet.service';

@Controller('wallet')
@ApiTags('Wallet')
export class WalletController {
  private logger = new Logger('WalletController');
  constructor(private readonly walletService: WalletService) {}

  @ApiOperation({
    summary: 'User creates a pin for his/her wallet',
    description:
      'To do this, a wallet has to have already been created. To access this, the user has to be logged in as his/her details are decoded from the bearer token.',
  })
  @ApiBody({ type: WalletPinDto })
  @UseGuards(LocalAuthGuard)
  @Post('pin')
  async create(@Request() req, @Body() body): Promise<any> {
    const user = req.user;
    return this.walletService.createPin(user, body);
  }

  @ApiOperation({
    summary: 'To fetch the wallet balance',
    description:
      "To get balance from the user's wallet. To access this, the user has to be logged in as his/her details are decoded from the bearer token.",
  })
  @UseGuards(LocalAuthGuard)
  @Get('balance')
  async getWalletBalance(@Request() req): Promise<any> {
    const user = req.user;
    return this.walletService.getWalletBalance(user);
  }

  @ApiOperation({
    summary: 'To get the wallet pin',
    description:
      "To get the pin of the user's wallet. To access this, the user has to be logged in as his/her details are decoded from the bearer token.",
  })
  @UseGuards(LocalAuthGuard)
  @Get('pin')
  async getWalletPin(@Request() req): Promise<any> {
    const user = req.user;
    return this.walletService.getWalletPin(user);
  }

  @ApiOperation({
    summary: 'To make transfers to a Nigerian bank',
    description:
      'To make a transfer to an account with a Nigerian bank . To access this, the user has to be logged in as his/her details are decoded from the bearer token.',
  })
  @ApiBody({ type: NGNBankTransferDto })
  @UseGuards(LocalAuthGuard)
  @Post('transfer/nigerianbank')
  async NGNBankTransfer(@Request() req, @Body() body): Promise<any> {
    const user = req.user;
    return this.walletService.NGNBankTransfer(user, body);
  }

  @ApiOperation({
    summary: 'To make transfers between wallets',
    description:
      'To make a transfer from one wallet to another. To access this, the user has to be logged in as his/her details are decoded from the bearer token.',
  })
  @ApiBody({ type: WalletTransferDto })
  @UseGuards(LocalAuthGuard)
  @Post('transfer')
  async WalletTransfer(@Request() req, @Body() body): Promise<any> {
    const user = req.user;
    return this.walletService.WalletTransfer(user, body);
  }

  @ApiOperation({
    summary: 'To debit a wallet',
    description:
      'This endpoint is called to debit a wwallet . To access this, the user has to be logged in as his/her details are decoded from the bearer token.',
  })
  @ApiBody({ type: DebitWalletDto })
  @UseGuards(LocalAuthGuard)
  @Post('debit')
  async DebitWallet(@Request() req, @Body() body): Promise<any> {
    const user = req.user;
    return this.walletService.DebitWallet(user, body);
  }

  @ApiOperation({
    summary: 'To fetch all transactions',
    description:
      'To get a record of all transactions . To access this, the user has to be logged in as his/her details are decoded from the bearer token.',
  })
  @UseGuards(LocalAuthGuard)
  @Get('transaction/list')
  async GetAllTransactions(@Request() req): Promise<any> {
    const user = req.user;
    return this.walletService.GetAllTransactions(user);
  }

  @ApiOperation({
    summary: "To get a user's statement of account",
    description:
      "This fetches a user's statement of account betwween a set period of time . To access this, the user has to be logged in as his/her details are decoded from the bearer token.",
  })
  @UseGuards(LocalAuthGuard)
  @Get('statementOfAccount')
  async GetStatementOfAccount(@Request() req, @Body() body): Promise<any> {
    const user = req.user;
    return this.walletService.GetStatementOfAccount(user, body);
  }

  @ApiOperation({
    summary: "To fetch a user's cards",
    description:
      'To fetch all carsds registered to a user . To access this, the user has to be logged in as his/her details are decoded from the bearer token.',
  })
  @UseGuards(LocalAuthGuard)
  @Get('card')
  async GetCards(@Request() req): Promise<any> {
    const user = req.user;
    return this.walletService.GetCards(user);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('create')
  // async createWallet(@Request() req): Promise<any> {
  //   const user = req.user;
  //   return this.walletService.createWallet(user);
  // }

  // @UseGuards(LocalAuthGuard)
  // @Get('test')
  // testAG(@Request() req): any {
  //   const user = req.user;
  //   return this.walletService.TestAG(user);
  // }
}
