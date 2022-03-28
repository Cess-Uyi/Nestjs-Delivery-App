import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpConfigService } from './config/httpConfigService';
import { TrakkRegistrationController } from './controllers/TrakkRegistration.controller';
import { TrakkRegistrationRepository } from './repositories/TrakkRegistration.repository';
import { TrakkRegistrationService } from './services/TrakkRegistration.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrakkRegistrationRepository]),
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],
  controllers: [TrakkRegistrationController],
  providers: [TrakkRegistrationService],
})
export class TrakkRegistrationModule {}
