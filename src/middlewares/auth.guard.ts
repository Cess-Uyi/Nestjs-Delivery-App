import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { ValidateTokenResponse } from 'src/dtos/Interfaces.dto';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private httpService: HttpService) {}
  canActivate(
    context: ExecutionContext,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const request = context.switchToHttp().getRequest();
    return this.checkForToken(request);
  }

  checkForToken = async (request) => {
    const bearer = request.headers.authorization;
    if (!bearer) {
      throw new UnauthorizedException('Kindly login to proceed');
    } else {
      const url = `${process.env.SSO_URL}` + `/User/user/token/validate`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: bearer,
      };
      try {
        const axiosResponse = this.httpService.get<ValidateTokenResponse>(url, {
          headers,
        });
        const result = await lastValueFrom(axiosResponse);
        request.user = result.data.data;
      } catch (error) {
        return false;
      }
      return true;
    }
  };
}
