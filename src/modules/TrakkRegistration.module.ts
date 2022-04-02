import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpConfigService } from '../config/httpConfigService';
import { TrakkRegistrationController } from '../controllers/TrakkRegistration.controller';
import { TrakkRegistration } from '../entities/TrakkRegistration.entity';
import { TrakkRegistrationService } from '../services/TrakkRegistration.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrakkRegistration]),
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],
  controllers: [TrakkRegistrationController],
  providers: [TrakkRegistrationService],
})
export class TrakkRegistrationModule {}
