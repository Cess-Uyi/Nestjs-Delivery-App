// import { HttpService } from '@nestjs/axios';
// import { Injectable } from '@nestjs/common';
// import { AxiosResponse } from 'axios';
// import {
//   lastValueFrom,
//   map,
//   Observable,
// } from 'rxjs';

// @Injectable()
// export class GetZebrraIdFromToken(request): Promise<Observable<AxiosResponse<any>>> {
//       const token = request.headers.authorization.split(' ')[1];
//       try {
//         const user = lastValueFrom(
//           this.httpService
//             .post(`${process.env.SSO_URL}` + `/User/usertoken/validate`, token, {
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             })
//             .pipe(
//               map((resp) => {
//                 return resp.data.data;
//               }),
//             ),
//         );
//         return user;
//       } catch (error) {
//         console.log(error);
//         return error;
//       }
//     }
//   }

// const jwt = request.headers.authorization.replace('Bearer ', '');

// const userToken = request.headers.authorization;
// try {
//   const user = await lastValueFrom(
//     this.httpService
//       .post(
//         `${process.env.SSO_URL}` + `/User/usertoken/validate`,
//         userToken,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       )
//       .pipe(
//         map((resp) => {
//           return resp.data.data;
//         }),
//       ),
//   );
//   return user;
// } catch (error) {
//   console.log(error);
//   return error;
// }
