import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Host } from 'react-native-portalize';
import { RecoilRoot } from 'recoil';

import MainStack from '@src/features/main-stack';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Host>
          <MainStack />
        </Host>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
