// import { HttpModule } from '@nestjs/axios';
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { HttpConfigService } from '../config/httpConfigService';
// import { NextOfKin } from 'src/entities/NextOfKin.entity';
// import { Rider } from 'src/entities/RiderRegistration.entity';
// import { Vehicle } from 'src/entities/Vehicle.entity';
// import { VehicleDocuments } from 'src/entities/VehicleDocument.entity';
// import { RiderRegistrationController } from 'src/controllers/RiderRegistration.controller';
// import { RiderRegistrationService } from 'src/services/RiderRegistration.service';
// import { AuthModule } from './Auth.module';
// import { TrakkRegistrationModule } from './TrakkRegistration.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Rider, Vehicle, VehicleDocuments, NextOfKin]),
//     HttpModule.registerAsync({
//       useClass: HttpConfigService,
//     }),
//     AuthModule,
//   ],
//   controllers: [RiderRegistrationController],
//   providers: [RiderRegistrationService],
// })
// export class RiderRegistrationModule {}
