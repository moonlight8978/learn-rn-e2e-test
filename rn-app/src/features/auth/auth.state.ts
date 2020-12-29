import { atom, selector, useRecoilState, useResetRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthInfo, LoginForm, User } from '@src/types/local';
import { Gender } from '@src/types/api.d';

export const authState = atom<{ isAuthenticated: boolean; authToken: string; tokenType: string; currentUser: User }>({
  key: 'authState',
  default: {
    isAuthenticated: false,
    authToken: '',
    tokenType: '',
    currentUser: {
      username: '',
      fullName: '',
      gender: Gender.male,
      birthday: null,
    },
  },
});

export const getIsAuthenticated = selector({
  key: 'getIsAuthenticated',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.isAuthenticated;
  },
});

export const getCurrentUser = selector({
  key: 'getCurrentUser',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.currentUser;
  },
});

export const getAuthToken = selector({
  key: 'getAuthToken',
  get: ({ get }) => {
    const auth = get(authState);
    return [auth.tokenType, auth.authToken].join(' ');
  },
});

export const saveCredentials = async (form: LoginForm) => {
  await AsyncStorage.setItem('credentials/username', form.username);
};

export const clearSavedCredentials = async () => {
  await AsyncStorage.removeItem('credentials/username');
};

export const getSavedCredentials = selector({
  key: 'getSavedCredentials',
  get: async () => {
    const username = await AsyncStorage.getItem('credentials/username');
    return { username: username || '' };
  },
});

export const useAuthActions = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const resetAuth = useResetRecoilState(authState);

  console.log(auth);

  const loggedIn = (authInfo: AuthInfo, user: User) => setAuth({ ...auth, ...authInfo, currentUser: user });
  const loggedOut = () => resetAuth();
  const setCurrentUser = (user: User) => setAuth({ ...auth, currentUser: user });

  return { loggedIn, loggedOut, setCurrentUser };
};
