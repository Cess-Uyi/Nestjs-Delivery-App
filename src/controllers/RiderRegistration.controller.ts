// import {
//   Body,
//   Controller,
//   Post,
//   UseGuards,
//                    ,
// } from '@nestjs/common';
// import { NextOfKinDto } from 'src/dtos/NextOfKin.dto';
// import { RiderRegistrationDto } from 'src/dtos/RiderRegistration.dto';
// import { VehicleDto } from 'src/dtos/Vehicle.dto';
// import { VehicleDocumentsDto } from 'src/dtos/VehicleDocument.dto';
// import { LocalAuthGuard } from 'src/middlewares/auth.guard';
// import { RiderRegistrationService } from 'src/services/RiderRegistration.service';

// @Controller('rider')
// export class RiderRegistrationController {
//   constructor(
//     private readonly riderRegistrationService: RiderRegistrationService,
//   ) {}

//   @Post()
//   @UseGuards(LocalAuthGuard)
//   async register(
//     @Body()
//     riderRegistration: RiderRegistrationDto,
//     vehicleDto: VehicleDto,
//     vehicleDocumentsDto: VehicleDocumentsDto,
//     nextOfKinDto: NextOfKinDto,
//     @Headers() headers,
//   ): Promise<any> {
//     const result = await this.riderRegistrationService.register;
//     // (
//     // riderRegistration,
//     // vehicleDto,
//     // vehicleDocumentsDto,
//     // nextOfKinDto,
//     // headers,
//     // );
//     return result;
//   }
// }
