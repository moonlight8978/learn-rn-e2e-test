import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button, Text } from '@src/components';
import { Navigation } from '@src/types';

export default function RegistrationCompletedScreen() {
  const navigation = useNavigation<Navigation<'RegistrationCompleted'>>();

  return (
    <SafeAreaView style={{ justifyContent: 'center', flex: 1 }}>
      <View style={{ alignSelf: 'center' }}>
        <View style={{ justifyContent: 'center', marginBottom: 24 }}>
          <Text style={{ textAlign: 'center', marginBottom: 12 }}>
            Congratulation! Your account has been created successfully.
          </Text>
          <Text style={{ textAlign: 'center' }}>Press the below button to login.</Text>
        </View>

        <Button
          title="Login"
          onPress={() => navigation.replace('Login')}
          testableID="registrationCompleted/toLoginScreenButton"
        />
      </View>
    </SafeAreaView>
  );
}
