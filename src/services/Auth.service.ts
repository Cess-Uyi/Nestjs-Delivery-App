import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { LoginDto } from 'src/dtos/Auth.dto';

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
                throw new HttpException(
                  resp.data.message,
                  HttpStatus.UNAUTHORIZED,
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

  // async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
  //   const { email } = forgotPasswordDto;

  //   try {
  //     const axiosResponse = await lastValueFrom(
  //       this.httpService
  //         .get(
  //           `${process.env.SSO_URL}` + `/User/reset/initiate/` + `${email}`,
  //           {
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //           },
  //         )
  //         .pipe(
  //           map((resp) => {
  //             if (
  //               resp.data.status === false ||
  //               resp.data.message === 'User with this email does not exist'
  //             ) {
  //               throw new BadRequestException(resp.data.message);
  //             } else {
  //               return resp.data;
  //             }
  //           }),
  //         ),
  //     );
  //     return axiosResponse;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }

  // async completeReset(completeResetDto: CompleteResetDto): Promise<any> {
  //   const { code, newPassword } = completeResetDto;

  //   const resetRequest = {
  //     code,
  //     newPassword,
  //   };

  //   try {
  //     const axiosResponse = await lastValueFrom(
  //       this.httpService
  //         .post(
  //           `${process.env.SSO_URL}` + `/User/reset/complete`,
  //           resetRequest,
  //           {
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //           },
  //         )
  //         .pipe(
  //           map((resp) => {
  //             return resp.data;
  //           }),
  //         ),
  //     );
  //     return axiosResponse;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }

  // async GetZebrraId(requestHeaders): Promise<string> {
  //   const token = requestHeaders.authorization.split(' ')[1];
  //   const url = `${process.env.SSO_URL}` + `/User/user/token/validate`;
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   };
  //   try {
  //     const axiosResponse = this.httpService.get<ValidateTokenResponse>(url, {
  //       headers,
  //     });
  //     const result = await lastValueFrom(axiosResponse);
  //     const {
  //       data: { zebrraId },
  //     } = result.data;
  //     return zebrraId;
  //   } catch (error) {
  //     if (
  //       error.response.status === 401 ||
  //       error.response.statusText === 'Unauthorized'
  //     ) {
  //       throw new BadRequestException(error.response.statusText);
  //     }
  //     return error.message;
  //   }
  // }

  // async GetUserId(requestHeaders): Promise<number> {
  //   const token = requestHeaders.authorization.split(' ')[1];
  //   const url = `${process.env.SSO_URL}` + `/User/user/token/validate`;
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   };
  //   try {
  //     const axiosResponse = this.httpService.get<ValidateTokenResponse>(url, {
  //       headers,
  //     });
  //     const result = await lastValueFrom(axiosResponse);
  //     const {
  //       data: { id },
  //     } = result.data;
  //     return id;
  //   } catch (error) {
  //     if (
  //       error.response.status === 401 ||
  //       error.response.statusText === 'Unauthorized'
  //     ) {
  //       throw new BadRequestException(error.response.statusText);
  //     }
  //     return error.message;
  //   }
  // }
}
