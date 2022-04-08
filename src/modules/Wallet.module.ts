import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpConfigService } from 'src/config/httpConfigService';
import { WalletController } from 'src/controllers/Wallet.controller';
import { WalletService } from 'src/services/Wallet.service';
import { AuthModule } from './Auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    AuthModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
