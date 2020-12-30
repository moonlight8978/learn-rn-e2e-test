import { atom, selector, useRecoilState, useResetRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthInfo, LoginForm, User, Gender } from '@src/types';

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
    isCredentialsSaved: false,
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

const _savedCredentialsState = atom({
  key: '_savedCredentialsState',
  default: false,
});

// @ts-expect-error
export const savedCredentialsState = selector<LoginForm>({
  key: 'savedCredentialsState',
  get: async ({ get }) => {
    const isSaved = get(_savedCredentialsState);
    const username = await AsyncStorage.getItem('credentials/username');
    return { username: username || '', isCredentialsSaved: !!username || isSaved, password: '' };
  },
  set: ({ set }, form: LoginForm) => {
    set(_savedCredentialsState, form.isCredentialsSaved);
    if (form.isCredentialsSaved) {
      AsyncStorage.setItem('credentials/username', form.username);
    } else {
      AsyncStorage.removeItem('credentials/username');
    }
  },
});

export const useAuthActions = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const resetAuth = useResetRecoilState(authState);

  console.log(auth);

  const loggedIn = (authInfo: AuthInfo, user: User) =>
    setAuth({ ...auth, ...authInfo, isAuthenticated: true, currentUser: user });
  const loggedOut = () => resetAuth();
  const setCurrentUser = (user: User) => setAuth({ ...auth, currentUser: user });

  return { loggedIn, loggedOut, setCurrentUser };
};
