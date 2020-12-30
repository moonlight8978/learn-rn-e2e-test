import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { RegistrationForm } from '@src/types';
import { AuthApi } from '@src/api';
import { getIsLoading, useLoadingActions } from '@src/features/app-loading/app-loading.state';

export const useLogic = () => {
  const [error, setError] = useState<Error | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const isLoading = useRecoilValue(getIsLoading);
  const { finishLoading, startLoading } = useLoadingActions();

  const register = async (form: RegistrationForm) => {
    startLoading();

    try {
      await AuthApi.register(form);
      setIsRegistered(true);
    } catch (e) {
      setError(e);
    } finally {
      finishLoading();
    }
  };

  return { error, isRegistered, isLoading, register };
};
