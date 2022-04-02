import {
  Body,
  Controller,
  Get,
  Post,
  // UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from 'src/dtos/AuthDto';
// import { LocalAuthGuard } from 'src/middlewares/auth.guard';
import { AuthService } from 'src/services/Auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }

  // @Get('forgot-password')
  // async forgotPassword(@Body() email: string): Promise<any> {
  //   return this.authService.forgotPassword(email);
  // }
}
