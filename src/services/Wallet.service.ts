import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { UserView } from 'src/dtos/Interfaces.dto';
import {
  DebitWalletDto,
  NGNBankTransferDto,
  WalletPinDto,
  WalletTransferDto,
} from 'src/dtos/Wallet.dto';

@Injectable()
export class WalletService {
  constructor(private httpService: HttpService) {}

  async createPin(user: UserView, body): Promise<any> {
    const { pin } = body;
    const zebrraId = user.zebrraId;

    if (pin.toString().length != 4) {
      throw new HttpException('pin must be 4 digits', HttpStatus.BAD_REQUEST);
    }

    const walletPinDto: WalletPinDto = {
      zebrraId,
      pin,
    };

    try {
      const url = `${process.env.WALLET_URL}` + `/create/pin`;
      const headers = {
        'Content-Type': 'application/json',
      };
      const axiosResponse = await lastValueFrom(
        this.httpService.post(url, walletPinDto, { headers }).pipe(
          map((resp) => {
            if (
              resp.data.status === false ||
              resp.data.message === 'WALLET_NOT_FOUND'
            ) {
              throw new HttpException(
                resp.data.message,
                HttpStatus.UNAUTHORIZED,
              );
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

  async getWalletBalance(user: UserView): Promise<any> {
    const zebrraId = user.zebrraId;
    console.log(zebrraId);
    try {
      const url =
        `${process.env.WALLET_URL}` + `/balance` + `?zebrraId=` + `${zebrraId}`;
      const headers = {
        'Content-Type': 'application/json',
      };
      const axiosResponse = await lastValueFrom(
        this.httpService.get(url, { headers }).pipe(
          map((resp) => {
            if (
              resp.data.status === false ||
              resp.data.message === 'Unsuccessful'
            ) {
              throw new HttpException(
                resp.data.message,
                HttpStatus.UNAUTHORIZED,
              );
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

  async getWalletPin(user: UserView): Promise<any> {
    const zebrraId = user.zebrraId;
    try {
      const url = `${process.env.WALLET_URL}` + `/pin/` + `${zebrraId}`;
      const headers = {
        'Content-Type': 'application/json',
      };
      const axiosResponse = await lastValueFrom(
        this.httpService.get(url, { headers }).pipe(
          map((resp) => {
            if (
              resp.data.status === false ||
              resp.data.message === 'WALLET_NOT_FOUND'
            ) {
              throw new HttpException(
                resp.data.message,
                HttpStatus.UNAUTHORIZED,
              );
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

  async GetStatementOfAccount(user: UserView, body): Promise<any> {
    const zebrraId = user.zebrraId;
    const { startDate, endDate } = body;

    try {
      const url =
        `${process.env.WALLET_URL}` +
        `/statementOfAccount/` +
        `${zebrraId}/` +
        `${startDate}/` +
        `${endDate}`;
      const headers = {
        'Content-Type': 'application/json',
      };

      const axiosResponse = await lastValueFrom(
        this.httpService.get(url, { headers }).pipe(
          map((resp) => {
            console.log(resp.data.data.value);
            return resp.data.data.value;
          }),
        ),
      );
      console.log(axiosResponse);
      return axiosResponse;
    } catch (error) {
      if (
        error.response.status === 400 ||
        error.response.statusText === 'Bad Request'
      ) {
        throw new HttpException(
          error.response.statusText,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(error.message);
        return error.message;
      }
    }
  }

  async NGNBankTransfer(user: UserView, body): Promise<any> {
    const { accountBank, accountNumber, amount, narration } = body;
    const zebrraId = user.zebrraId;

    if (accountNumber.length != 10) {
      throw new HttpException(
        'account number must be ten digits',
        HttpStatus.BAD_REQUEST,
      );
    }

    const ngnBankTransferDto: NGNBankTransferDto = {
      accountBank,
      accountNumber,
      amount,
      narration,
      zebrraId,
    };

    try {
      const url = `${process.env.WALLET_URL}` + `/transfer/nigerianbank`;
      const headers = {
        'Content-Type': 'application/json',
      };
      const axiosResponse = await lastValueFrom(
        this.httpService.post(url, ngnBankTransferDto, { headers }).pipe(
          map((resp) => {
            if (
              resp.data.status === false ||
              resp.data.message === 'Insufficient funds'
            ) {
              throw new HttpException(resp.data.status, HttpStatus.BAD_REQUEST);
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

  async WalletTransfer(user: UserView, body): Promise<any> {
    const zebrraId = user.zebrraId;
    const { amount, narration, recipientZebrraId, description } = body;

    const walletTransferDto: WalletTransferDto = {
      amount,
      narration,
      recipientZebrraId,
      description,
      zebrraId,
    };

    try {
      const url = `${process.env.WALLET_URL}` + `/transfer`;
      const headers = {
        'Content-Type': 'application/json',
      };
      const axiosResponse = await lastValueFrom(
        this.httpService.post(url, walletTransferDto, { headers }).pipe(
          map((resp) => {
            if (
              resp.data.status === false ||
              resp.data.message === 'WALLET_NOT_FOUND' ||
              resp.data.message === 'Insufficient funds'
            ) {
              throw new HttpException(
                resp.data.message,
                HttpStatus.BAD_REQUEST,
              );
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

  async DebitWallet(user, body): Promise<any> {
    const zebrraId = user.zebrraId;
    const { amount } = body;

    const debitWalletDto: DebitWalletDto = {
      zebrraId,
      amount,
    };

    try {
      const url = `${process.env.WALLET_URL}` + `/debit`;
      const headers = {
        'Content-Type': 'application/json',
      };
      const axiosResponse = await lastValueFrom(
        this.httpService.post(url, debitWalletDto, { headers }).pipe(
          map((resp) => {
            console.log(resp.data);
            if (resp.data.status === false) {
              throw new HttpException(
                resp.data.message,
                HttpStatus.BAD_REQUEST,
              );
            } else {
              return resp.data;
            }
          }),
        ),
      );
      return axiosResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async GetAllTransactions(user: UserView): Promise<any> {
    const zebrraId = user.zebrraId;
    try {
      const url =
        `${process.env.WALLET_URL}` + `/transaction/` + `${zebrraId}` + `/list`;
      console.log(url);
      const headers = {
        'Content-Type': 'application/json',
      };
      const axiosResponse = await lastValueFrom(
        this.httpService.get(url, { headers }).pipe(
          map((resp) => {
            console.log(resp.data.data.value);
            return resp.data.data.value;
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

  async GetCards(user): Promise<any> {
    const zebrraId = user.zebrraId;
    try {
      const url =
        `${process.env.WALLET_URL}` + `/card/` + `${zebrraId}` + `/list`;
      const headers = {
        'Content-Type': 'application/json',
      };
      const axiosResponse = await lastValueFrom(
        this.httpService.get(url, { headers }).pipe(
          map((resp) => {
            return resp.data.data.value;
          }),
        ),
      );
      return axiosResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // async createWallet(user): Promise<any> {
  //   const zebrraId = user.zebrraId;
  //   const userId = user.userId;
  //   const balance = '0';
  //   const currency = 'ngn';
  //   const walletTypeId = 1;

  //   const createWalletDto: CreateWalletDto = {
  //     zebrraId,
  //     userId,
  //     balance,
  //     currency,
  //     walletTypeId,
  //   };

  //   try {
  //     const url = `${process.env.WALLET_URL}` + `/create`;
  //     const headers = {
  //       'Content-Type': 'application/json',
  //     };
  //     const axiosResponse = await lastValueFrom(
  //       this.httpService.post(url, createWalletDto, { headers }).pipe(
  //         map((resp) => {
  //           return resp.data;
  //         }),
  //       ),
  //     );
  //     console.log(axiosResponse);
  //     return axiosResponse;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }

  // TestAG(user): any {
  //   console.log(`zebrraId =`, user.zebrraId);
  //   return user;
  // }
}
