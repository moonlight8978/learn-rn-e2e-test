import React, { Suspense } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Formik } from 'formik';
import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, Input, Text, useErrorHandler } from '@src/components';
import { LoginForm, RootStackParamList } from '@src/types/local';
import { getSavedCredentials } from '@src/features/auth/auth.state';
import { colors } from '@src/config';

import { useLogic } from './useLogic';
import { formInitialValues, validationSchema } from './form';

function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();
  const { error, login } = useLogic();
  const savedCredentials = useRecoilValue(getSavedCredentials);

  useErrorHandler(error);

  return (
    <SafeAreaView>
      <Formik<LoginForm>
        initialValues={{
          ...formInitialValues,
          username: savedCredentials.username,
          isCredentialsSaved: !!savedCredentials.username,
        }}
        validationSchema={validationSchema}
        onSubmit={login}
      >
        {({ values, handleChange, handleSubmit, isValid, errors, touched, handleBlur }) => (
          <View style={{ paddingHorizontal: 12 }}>
            <Text style={{ alignSelf: 'center' }} size="large" bold testableID="loginScreen">
              Welcome
            </Text>

            <Input.Text
              value={values.username}
              onChange={handleChange('username')}
              onBlur={handleBlur('username')}
              label="Username"
              testableID="usernameInput"
              errorMessage={errors.username}
              touched={touched.username}
            />

            <Input.Text
              value={values.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              label="Password"
              secureTextEntry
              testableID="passwordInput"
              errorMessage={errors.password}
              touched={touched.password}
            />

            <Input.Checkbox
              value={values.isCredentialsSaved}
              onChange={(value) => handleChange({ target: { name: 'isCredentialsSaved', value } })}
              label="Save username"
              testableID="isCredentialsSavedCheckbox"
            />

            <Button
              title="Login"
              onPress={handleSubmit}
              style={{ marginTop: 8 }}
              testableID="loginButton"
              disabled={!isValid}
            />

            <View style={{ marginTop: 8, marginBottom: 8, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexGrow: 1, height: 1, backgroundColor: colors.black }} />
              <Text>OR</Text>
              <View style={{ flexGrow: 1, height: 1, backgroundColor: colors.black }} />
            </View>

            <Button
              title="Create an account"
              onPress={() => navigation.push('Registration')}
              testableID="toRegistrationScreen"
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

export default () => (
  <Suspense fallback={null}>
    <LoginScreen />
  </Suspense>
);
