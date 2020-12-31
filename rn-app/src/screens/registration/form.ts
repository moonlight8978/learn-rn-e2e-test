import { object, ref, string } from 'yup';

import { RegistrationForm, Gender } from '@src/types';

export const formInitialValues: RegistrationForm = {
  username: '',
  password: '',
  passwordConfirmation: '',
  birthday: null,
  fullName: '',
  gender: Gender.male,
};

export const validationSchema = object({
  username: string()
    .required('Please enter username')
    .matches(/^[\d|\w]+$/, 'Username must be alphabet and numbers'),
  password: string().required('Please enter password'),
  passwordConfirmation: string()
    .required('Please confirm your password')
    .oneOf([ref('password')], 'Password confirmation must match your password'),
  fullName: string().required('Please enter your full name'),
});
