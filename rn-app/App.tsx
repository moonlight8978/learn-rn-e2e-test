import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Host } from 'react-native-portalize';
import { RecoilRoot } from 'recoil';

import MainStack from '@src/features/main-stack';
import AppLoading from '@src/features/app-loading';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Host>
          <MainStack />
        </Host>
      </NavigationContainer>

      <AppLoading />
    </RecoilRoot>
  );
};

export default App;
