import { ApiLogin, ApiUser } from './api';

export interface BaseComponentProps {
  testableID?: string;
}

export type RootStackParamList = {
  Registration: undefined;
  Login: undefined;
  TodoList: undefined;
};

export interface User {
  gender: ApiUser['gender'];
  birthday: ApiUser['birthday'];
  fullName: ApiUser['fullName'];
  username: ApiUser['username'];
}

interface LoginForm {
  username: string;
  password: string;
  isCredentialsSaved: boolean;
}

export interface AuthInfo {
  authToken: ApiLogin['authToken'];
  tokenType: ApiLogin['tokenType'];
}

export interface RegistrationForm extends User {
  password: LoginForm['password'];
  passwordConfirmation: LoginForm['password'];
}
