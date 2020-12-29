import { AxiosResponse } from 'axios';

export enum Gender {
  'male',
  'female',
  'unknown',
}

export interface ApiResponse<T> extends AxiosResponse<T> {}

export interface ApiUser {
  gender: Gender;
  birthday: Date | null;
  fullName: string;
  username: string;
}

export interface ApiLogin extends ApiUser {
  authToken: string;
  tokenType: string;
}
