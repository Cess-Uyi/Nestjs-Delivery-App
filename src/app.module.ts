import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, databaseConfig } from './config/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { TrakkRegistrationModule } from './modules/TrakkRegistration.module';
import { AuthModule } from './modules/Auth.module';
import { WalletModule } from './modules/Wallet.module';
// import { RiderRegistrationModule } from './modules/RiderRegistration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig.default, databaseConfig.default],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => Object.assign(await getConnectionOptions(), {}),
    }),
    TrakkRegistrationModule,
    // RiderRegistrationModule,
    AuthModule,
    WalletModule,
  ],
})
export class AppModule {}
