import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextOfKinDto } from 'src/dtos/NextOfKin.dto';
import { RiderRegistrationDto } from 'src/dtos/RiderRegistration.dto';
import { VehicleDto } from 'src/dtos/Vehicle.dto';
import { VehicleDocumentsDto } from 'src/dtos/VehicleDocument.dto';
import { NextOfKin } from 'src/entities/NextOfKin.entity';
import { Rider } from 'src/entities/RiderRegistration.entity';
import { Vehicle } from 'src/entities/Vehicle.entity';
import { VehicleDocuments } from 'src/entities/VehicleDocument.entity';
import { Repository } from 'typeorm';
import { AuthService } from './Auth.service';

@Injectable()
export class RiderRegistrationService {
  constructor(
    @InjectRepository(Rider)
    private readonly riderRepository: Repository<Rider>,
    vehicleRepository: Repository<Vehicle>,
    vehicleDocumentsRepository: Repository<VehicleDocuments>,
    nextOfKinRepository: Repository<NextOfKin>,
    private authService: AuthService,
  ) {}

  async register(
    headers,
    riderRegistrationDto: RiderRegistrationDto,
    vehicleDto: VehicleDto,
    vehicleDocumentsDto: VehicleDocumentsDto,
    nextOfKinDto: NextOfKinDto,
  ): Promise<Rider> {
    /* fetch zebrraId via the token */
    // const result = await this.authService.GetZebrraId(headers);
    // if (result.status !== 200 || !result.data) {
    //   throw new BadRequestException('failed to validate token');
    // }

    // const {
    //   data: { zebrraId },
    // } = result.data;

    // /* Rider */
    // const {
    //   avatar,
    //   dateOfBirth,
    //   stateOfOrigin,
    //   stateOfResidence,
    //   residentialAddress,
    //   phone,
    // } = riderRegistrationDto;

    // const newRider: RiderRegistrationDto = {
    //   zebrraId,
    //   avatar,
    //   dateOfBirth,
    //   stateOfOrigin,
    //   stateOfResidence,
    //   residentialAddress,
    //   phone,
    // };

    // /* Vehicle Registration */
    // const riderId = zebrraId;
    // const { name, color, vehicleNumber, capacity, image } = vehicleDto;

    // // const riderId = ;
    // const newVehicle: VehicleDto = {
    //   riderId,
    //   name,
    //   color,
    //   vehicleNumber,
    //   capacity,
    //   image,
    // };

    // /* VehicleDocument */
    // const { documentName, documentUrl } = vehicleDocumentsDto;

    // // const vehicleId = ;
    // const newVehicleDocuments: VehicleDocumentsDto = {
    //   vehicleId,
    //   documentName,
    //   documentUrl,
    // };

    // /* Next of Kin */
    // const { NOKfullName, NOKaddress, NOKphone } = nextOfKinDto;

    // const newNextOfKin: NextOfKinDto = {
    //   riderId,
    //   NOKfullName,
    //   NOKaddress,
    //   NOKphone,
    // };

    try {
      // const createdRider = await this.riderRepository.save(newRider);
      // return createdRider;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
