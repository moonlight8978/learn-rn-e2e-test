import { useState } from 'react';

import { RegistrationForm } from '@src/types';
import { AuthApi } from '@src/api';

export const useLogic = () => {
  const [error, setError] = useState<Error | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const register = async (form: RegistrationForm) => {
    setIsLoading(true);

    try {
      await AuthApi.register(form);
      setIsRegistered(true);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isRegistered, isLoading, register };
};
