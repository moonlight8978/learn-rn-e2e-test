import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';

import { Button, Divider, Input, Text, useErrorHandler } from '@src/components';
import { Navigation, RegistrationForm, Gender } from '@src/types';

import { formInitialValues, validationSchema } from './form';
import { useLogic } from './useLogic';

export default function RegistrationScreen() {
  const navigation = useNavigation<Navigation<'Registration'>>();
  const { register, isRegistered, error } = useLogic();

  useEffect(() => {
    if (isRegistered) {
      navigation.replace('RegistrationCompleted');
    }
  }, [isRegistered, navigation]);

  useErrorHandler(error);

  return (
    <SafeAreaView>
      <Formik<RegistrationForm>
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={register}
      >
        {({ values, isValid, touched, errors, handleChange, handleBlur, handleSubmit }) => (
          <ScrollView style={{ paddingHorizontal: 12 }}>
            <Text size="large" bold style={{ alignSelf: 'center' }}>
              Join us
            </Text>

            <Input.Text
              label="Username"
              value={values.username}
              onChange={handleChange('username')}
              onBlur={handleBlur('username')}
              errorMessage={errors.username}
              touched={touched.username}
              testableID="registration/usernameInput"
            />

            <Input.Text
              label="Password"
              value={values.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              errorMessage={errors.password}
              touched={touched.password}
              secureTextEntry
              testableID="registration/passwordInput"
            />

            <Input.Text
              label="Password confirmation"
              value={values.passwordConfirmation}
              onChange={handleChange('passwordConfirmation')}
              onBlur={handleBlur('passwordConfirmation')}
              errorMessage={errors.passwordConfirmation}
              touched={touched.passwordConfirmation}
              secureTextEntry
              testableID="registration/passwordConfirmationInput"
            />

            <Input.Text
              label="Full name"
              value={values.fullName}
              onChange={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              errorMessage={errors.fullName}
              touched={touched.fullName}
              testableID="registration/fullNameInput"
            />

            <Input.Select
              label="Gender"
              value={values.gender}
              onChange={(value) => handleChange({ target: { name: 'gender', value } })}
              onBlur={handleBlur('gender')}
              errorMessage={errors.gender}
              touched={touched.gender}
              items={[
                { value: Gender.male, label: 'Male' },
                { value: Gender.female, label: 'Female' },
                { value: Gender.unknown, label: 'Unknown' },
              ]}
              testableID="registration/genderSelect"
            />

            <Input.Datetime
              label="Birthday"
              value={values.birthday}
              onChange={(value) => handleChange({ target: { name: 'birthday', value } })}
              onBlur={handleBlur('birthday')}
              errorMessage={errors.birthday}
              touched={touched.birthday}
              testableID="registration/birthdaySelect"
            />

            <Button
              title="Register"
              onPress={handleSubmit}
              disabled={!isValid}
              testableID="registration/registerButton"
            />

            <Divider text="OR" />

            <Button
              title="Login with existing account"
              onPress={() => navigation.replace('Login')}
              testableID="registration/toLoginScreenButton"
            />
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
}
