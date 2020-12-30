import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { savedCredentialsState, useAuthActions } from '@src/features/auth/auth.state';
import { AuthInfo, LoginForm, User } from '@src/types';
import { AuthApi } from '@src/api';
import { getIsLoading, useLoadingActions } from '@src/features/app-loading/app-loading.state';

export const useLogic = () => {
  const [error, setError] = useState(null);
  const { loggedIn } = useAuthActions();
  const isLoading = useRecoilValue(getIsLoading);
  const { finishLoading, startLoading } = useLoadingActions();
  const saveCredentials = useSetRecoilState(savedCredentialsState);

  const login = async (form: LoginForm) => {
    startLoading();
    await saveCredentials(form);

    try {
      const { data } = await AuthApi.login(form);
      const authInfo: AuthInfo = { authToken: data.authToken, tokenType: data.tokenType };
      const user: User = {
        birthday: data.birthday,
        fullName: data.fullName,
        gender: data.gender,
        username: data.username,
      };
      loggedIn(authInfo, user);
    } catch (e) {
      setError(e);
    } finally {
      finishLoading();
    }
  };

  return { login, isLoading, error };
};
