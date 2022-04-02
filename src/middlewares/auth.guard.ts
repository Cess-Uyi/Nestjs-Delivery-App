// import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
// import { AxiosResponse } from 'axios';
import {
  // lastValueFrom,
  // map,
  Observable,
} from 'rxjs';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  // httpService: HttpService;
  canActivate(
    context: ExecutionContext,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const request = context.switchToHttp().getRequest();
    return this.checkForToken(request);
  }

  checkForToken(request) {
    const bearer = request.headers.authorization;
    if (!bearer) {
      throw new UnauthorizedException('Kindly login to proceed');
    } else {
      return true;
    }
  }

  //   getUserFromToken(request): Promise<Observable<AxiosResponse<any>>> {
  //     const token = request.headers.authorization.split(' ')[1];
  //     try {
  //       const user = lastValueFrom(
  //         this.httpService
  //           .post(`${process.env.SSO_URL}` + `/User/usertoken/validate`, token, {
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //           })
  //           .pipe(
  //             map((resp) => {
  //               return resp.data.data;
  //             }),
  //           ),
  //       );
  //       return user;
  //     } catch (error) {
  //       console.log(error);
  //       return error;
  //     }
  //   }
  // }
}
