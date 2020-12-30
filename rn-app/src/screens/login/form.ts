import { object, string } from 'yup';

import { LoginForm } from '@src/types';

export const formInitialValues: LoginForm = {
  username: '',
  password: '',
  isCredentialsSaved: false,
};

export const validationSchema = object({
  username: string()
    .required('Please enter username!')
    .matches(/^[\d|\w]+$/, 'Username must be alphabet and numbers!'),
  password: string().required('Please enter password'),
});
