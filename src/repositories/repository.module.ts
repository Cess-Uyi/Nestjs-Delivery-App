import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NextOfKin } from 'src/entities/NextOfKin.entity';
import { Rider } from 'src/entities/RiderRegistration.entity';
import { Vehicle } from 'src/entities/Vehicle.entity';
import { VehicleDocuments } from 'src/entities/VehicleDocument.entity';
// import { TestModel } from 'src/models/test.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([NextOfKin, Rider, Vehicle, VehicleDocuments]),
  ],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
