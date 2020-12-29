import { useEffect } from 'react';
import { Alert } from 'react-native';

export const useErrorHandler = (error: Error | null) => {
  useEffect(() => {
    if (error) {
      Alert.alert('Error occurred!', error.message);
    }
  }, [error]);
};
