import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { TrakkRegistrationDto } from 'src/dtos/TrakkRegistration.dto';
import { TrakkRegistrationService } from 'src/services/TrakkRegistration.service';

@Controller('v1/register')
export class TrakkRegistrationController {
  private logger = new Logger('TrakkRegistrationController');
  constructor(
    private readonly trakkRegistrationService: TrakkRegistrationService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiBody({ type: TrakkRegistrationDto })
  async register(@Body() newRegistration: TrakkRegistrationDto): Promise<any> {
    this.logger.verbose(
      `A user is currently trying to register. Data: ${JSON.stringify(
        newRegistration,
      )}`,
    );

    return this.trakkRegistrationService.register(newRegistration);
  }
}
