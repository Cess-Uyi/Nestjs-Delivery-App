import {
  Body,
  Controller,
  Get,
  Headers,
  Logger,
  Post,
  // UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CompleteResetDto,
  ForgotPasswordDto,
  LoginDto,
} from 'src/dtos/Auth.dto';
// import { LocalAuthGuard } from 'src/middlewares/auth.guard';
import { AuthService } from 'src/services/Auth.service';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  @ApiOkResponse({ description: 'Forgot Password' })
  @ApiBody({ type: ForgotPasswordDto })
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<any> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('complete-reset')
  @ApiCreatedResponse({ description: 'Complete Password Reset' })
  @ApiBody({ type: CompleteResetDto })
  async completeReset(
    @Body() completeResetDto: CompleteResetDto,
  ): Promise<any> {
    return this.authService.completeReset(completeResetDto);
  }

  @Get('zebrraId')
  async GetZebrraId(@Headers() headers): Promise<any> {
    return this.authService.GetZebrraId(headers);
  }

  @Get('userId')
  async GetUserId(@Headers() headers): Promise<any> {
    return this.authService.GetUserId(headers);
  }
}
