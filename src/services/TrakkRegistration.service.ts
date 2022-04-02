import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { TrakkRegistrationDto } from 'src/dtos/TrakkRegistration.dto';
import { TrakkRegistration } from 'src/entities/TrakkRegistration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrakkRegistrationService {
  constructor(
    @InjectRepository(TrakkRegistration)
    private readonly trakkRegistrationRepository: Repository<TrakkRegistration>,
    private httpService: HttpService,
  ) {}

  async register(
    trakkRegistrationDto: TrakkRegistrationDto,
  ): Promise<Observable<AxiosResponse<TrakkRegistration, any>>> {
    const {
      zebrraId,
      email,
      password,
      firstName,
      middleName,
      lastName,
      phoneNumber,
      address,
      dateOfBirth,
      isAdmin,
    } = trakkRegistrationDto;

    const newRegistration: TrakkRegistrationDto = {
      zebrraId,
      email,
      password,
      firstName,
      middleName,
      lastName,
      phoneNumber,
      address,
      dateOfBirth,
      isAdmin,
    };
    try {
      const newUser = await lastValueFrom(
        this.httpService
          .post(`${process.env.SSO_URL}` + `/User/register`, newRegistration, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .pipe(
            map((resp) => {
              if (
                resp.data.status == false ||
                resp.data.message === 'A user with this email already exists.'
              ) {
                throw new BadRequestException(
                  'A user with this email already exists.',
                );
              } else {
                return resp.data.data;
              }
            }),
          ),
      );

      const saveToDb = { ...newRegistration };
      await delete saveToDb['password'];

      const user = this.trakkRegistrationRepository.create({
        ...saveToDb,
        zebrraId: newUser.zebrraId,
      });
      await this.trakkRegistrationRepository.save(user);
      return newUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
