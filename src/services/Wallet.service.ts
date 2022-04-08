import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { CreateWalletDto, WalletPinDto } from 'src/dtos/Wallet.dto';
import { AuthService } from './Auth.service';

@Injectable()
export class WalletService {
  constructor(
    private authService: AuthService,
    private httpService: HttpService,
  ) {}

  async createWallet(headers): Promise<any> {
    const zebrraId = await this.authService.GetZebrraId(headers);
    const userId = await this.authService.GetUserId(headers);
    const balance = '0';
    const currency = 'ngn';
    const walletTypeId = 1;

    const newWallet: CreateWalletDto = {
      zebrraId,
      userId,
      balance,
      currency,
      walletTypeId,
    };
    try {
      console.log(newWallet);
      // const url = `${process.env.WALLET_URL}` + `/create`;
      // const headers = {
      //   'Content-Type': 'application/json',
      // };
      // const axiosResponse = await lastValueFrom(
      //   this.httpService.post(url, newWallet, { headers }).pipe(
      //     map((resp) => {
      //       if (
      //         resp.data.status === false ||
      //         resp.data.message === 'WALLET_NOT_FOUND'
      //       ) {
      //         throw new BadRequestException(resp.data.message);
      //       } else {
      //         return resp.data;
      //       }
      //     }),
      //   ),
      // );
      // console.log(axiosResponse);
      // return axiosResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createPin(pin: number, headers): Promise<any> {
    /* fetch zebrraId via the token */
    const zebrraId = await this.authService.GetZebrraId(headers);
    pin = pin['pin'];

    try {
      const setPin: WalletPinDto = {
        zebrraId,
        pin,
      };
      const url = `${process.env.WALLET_URL}` + `/create/pin`;
      const headers = {
        'Content-Type': 'application/json',
      };
      const axiosResponse = await lastValueFrom(
        this.httpService.post(url, setPin, { headers }).pipe(
          map((resp) => {
            if (
              resp.data.status === false ||
              resp.data.message === 'WALLET_NOT_FOUNDt'
            ) {
              throw new BadRequestException(resp.data.message);
            } else {
              return resp.data;
            }
          }),
        ),
      );
      console.log(axiosResponse);
      return axiosResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
