import { ApiLogin } from '@src/types/api';
import { LoginForm } from '@src/types/local';

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

export default { login };
