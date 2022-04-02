import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { LoginDto } from 'src/dtos/AuthDto';
import { ValidateTokenResponse } from '../dtos/validateTokenResponse';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  async login(loginDto: LoginDto): Promise<Observable<AxiosResponse<any>>> {
    const { email, password } = loginDto;

    const newLogin = {
      email,
      password,
    };

    try {
      const loginDetails = await lastValueFrom(
        this.httpService
          .post(`${process.env.SSO_URL}` + `/User/token`, newLogin, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .pipe(
            map((resp) => {
              if (
                resp.data.status == false ||
                resp.data.message === 'Email or Password is incorrect.'
              ) {
                throw new BadRequestException(
                  'Email or Password is incorrect.',
                );
              } else {
                return resp.data.data;
              }
            }),
          ),
      );
      return loginDetails;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // async forgotPassword(email): Promise<any> {
  //   const email = email;
  // }

  async GetZebrraId(
    requestHeaders,
  ): Promise<AxiosResponse<ValidateTokenResponse>> {
    const token = requestHeaders.authorization.split(' ')[1];
    const url = `${process.env.SSO_URL}` + `/User/user/token/validate`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    try {
      const axiosResponse = this.httpService.get<ValidateTokenResponse>(url, {
        headers,
      });
      const result = await lastValueFrom(axiosResponse);
      console.log('resultData: ', result.data);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
