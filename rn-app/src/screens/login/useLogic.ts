import { useState } from 'react';

import { AuthApi } from '@src/api';
import { clearSavedCredentials, saveCredentials, useAuthActions } from '@src/features/auth/auth.state';
import { AuthInfo, LoginForm, User } from '@src/types/local';

export const useLogic = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loggedIn } = useAuthActions();

  const login = async (form: LoginForm) => {
    setIsLoading(true);
    if (form.isCredentialsSaved) {
      await saveCredentials(form);
    } else {
      await clearSavedCredentials();
    }

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
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
