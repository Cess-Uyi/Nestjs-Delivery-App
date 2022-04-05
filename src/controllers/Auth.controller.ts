import {
  Body,
  Controller,
  Logger,
  Post,
  // UseGuards,
  UsePipes,
  ValidationPipe,
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
} from 'src/dtos/AuthDto';
// import { LocalAuthGuard } from 'src/middlewares/auth.guard';
import { AuthService } from 'src/services/Auth.service';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
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
}
