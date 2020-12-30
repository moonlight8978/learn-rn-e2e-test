import { LoginForm, ApiLogin, RegistrationForm } from '@src/types';

import client from './client';

const login = (form: LoginForm) => {
  return client.request<ApiLogin>({
    method: 'post',
    data: {
      username: form.username,
      password: form.password,
    },
    url: '/login',
  });
};

const register = (form: RegistrationForm) => {
  return client.request<any>({
    method: 'post',
    data: {
      username: form.username,
      password: form.password,
      passwordConfirmation: form.passwordConfirmation,
      fullName: form.fullName,
      birthday: form.birthday,
      gender: form.gender,
    },
    url: '/register',
  });
};

export default { login, register };
