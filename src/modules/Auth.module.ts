import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/Auth.controller';
import { AuthService } from 'src/services/Auth.service';
import { HttpConfigService } from '../config/httpConfigService';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
