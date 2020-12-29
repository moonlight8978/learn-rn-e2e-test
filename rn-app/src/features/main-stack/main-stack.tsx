import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';

import LoginScreen from '@src/screens/login';
import { getIsAuthenticated } from '@src/features/auth/auth.state';
import TodoListScreen from '@src/screens/todo-list';
import { RootStackParamList } from '@src/types/local';
import RegistrationScreen from '@src/screens/registration';

const Stack = createStackNavigator<RootStackParamList>();

export default function MainStack() {
  const isAuthenticated = useRecoilValue(getIsAuthenticated);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen name="TodoList" component={TodoListScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}
