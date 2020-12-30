import { atom, selector, useSetRecoilState } from 'recoil';

export const appLoadingState = atom({
  key: 'appLoadingState',
  default: false,
});

export const getIsLoading = selector({
  key: 'getIsLoading',
  get: ({ get }) => {
    return get(appLoadingState);
  },
});

export const useLoadingActions = () => {
  const setIsLoading = useSetRecoilState(appLoadingState);

  const startLoading = () => setIsLoading(true);
  const finishLoading = () => setIsLoading(false);

  return { startLoading, finishLoading };
};
