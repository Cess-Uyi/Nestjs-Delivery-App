export interface ValidateTokenResponse {
  href: string;
  status: boolean;
  message: string;
  data: UserView;
  statusCode: string;
  errors: object;
  self: object;
}

export interface UserView {
  id: number;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  token: string;
  phoneNumber: string;
  zebrraId: string;
}

export class Response {
  statusCode: number;
  status: string;
  message: string;
  data: object;
}
