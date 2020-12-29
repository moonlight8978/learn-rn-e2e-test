import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Formik } from 'formik';

import { Input, Text } from '@src/components';
import { RegistrationForm } from '@src/types/local';
import { Gender } from '@src/types/api.d';

export default function RegistrationScreen() {
  return (
    <SafeAreaView>
      <Formik<RegistrationForm> initialValues={{}} onSubmit={() => {}}>
        {({ values, isValid, touched, errors, handleChange, handleBlur, handleSubmit }) => (
          <View style={{ paddingHorizontal: 12 }}>
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
            />

            <Input.Text
              label="Password"
              value={values.password}
              onChange={handleChange('password')}
              onBlur={handleChange('password')}
              errorMessage={errors.password}
              touched={touched.password}
            />

            <Input.Text
              label="Password confirmation"
              value={values.passwordConfirmation}
              onChange={handleChange('passwordConfirmation')}
              onBlur={handleChange('passwordConfirmation')}
              errorMessage={errors.passwordConfirmation}
              touched={touched.passwordConfirmation}
            />

            <Input.Text
              label="Full name"
              value={values.fullName}
              onChange={handleChange('fullName')}
              onBlur={handleChange('fullName')}
              errorMessage={errors.fullName}
              touched={touched.fullName}
            />

            <Input.Select
              label="Gender"
              value={values.gender}
              onChange={handleChange('gender')}
              onBlur={handleBlur('gender')}
              errorMessage={errors.gender}
              touched={touched.gender}
              items={[
                { value: Gender.male, label: 'Male' },
                { value: Gender.female, label: 'Female' },
                { value: Gender.unknown, label: 'Unknown' },
              ]}
            />

            <Input.Datetime
              label="Birthday"
              value={values.birthday}
              onChange={(value) => handleChange({ target: { name: 'birthday', value } })}
              onBlur={handleBlur('birthday')}
              errorMessage={errors.birthday}
              touched={touched.birthday}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
