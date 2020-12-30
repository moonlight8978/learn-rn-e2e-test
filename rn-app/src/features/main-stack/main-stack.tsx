import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { View } from 'react-native';

import { getIsAuthenticated, useAuthActions } from '@src/features/auth/auth.state';
import { RootStackParamList } from '@src/types';
import LoginScreen from '@src/screens/login';
import TodoListScreen from '@src/screens/todo-list';
import RegistrationScreen from '@src/screens/registration';
import RegistrationCompletedScreen from '@src/screens/registration-completed';
import { BaseTouchable, Text } from '@src/components';
import { colors } from '@src/config';

const Stack = createStackNavigator<RootStackParamList>();

export default function MainStack() {
  const isAuthenticated = useRecoilValue(getIsAuthenticated);
  const { loggedOut } = useAuthActions();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.dodgerBlue },
        headerTitleStyle: { color: colors.white },
        headerRight: () => (
          <BaseTouchable style={{ marginRight: 8 }} testableID="global/logoutButton" onPress={loggedOut}>
            <View style={{ flexDirection: 'row', padding: 8, backgroundColor: colors.dodgerBlue30, borderRadius: 4 }}>
              <SimpleLineIcons name="logout" color={colors.white} />
              <Text style={{ fontSize: 10, marginLeft: 4 }} color={colors.white}>
                LOGOUT
              </Text>
            </View>
          </BaseTouchable>
        ),
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="TodoList" component={TodoListScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="RegistrationCompleted"
            component={RegistrationCompletedScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
