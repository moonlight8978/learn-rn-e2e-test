import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { colors } from '@src/config';
import { testProps } from '@src/utils';

import { getIsLoading } from './app-loading.state';

const Backdrop = ({ children }: any) => (
  <View
    style={{ ...StyleSheet.absoluteFillObject, justifyContent: 'center', zIndex: 1, backgroundColor: colors.black40 }}
  >
    {children}
  </View>
);

export default function AppLoading() {
  const isLoading = useRecoilValue(getIsLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <Backdrop>
      <ActivityIndicator
        size="large"
        style={{ alignSelf: 'center' }}
        color={colors.dodgerBlue}
        {...testProps('appLoadingSpinner')}
      />
    </Backdrop>
  );
}
