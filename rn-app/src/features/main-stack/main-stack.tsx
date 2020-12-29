import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';

import { screens } from '@src/config';
import LoginScreen from '@src/screens/login';
import { getIsAuthenticated } from '@src/features/auth/auth.state';
import TodoListScreen from '@src/screens/todo-list';

const Stack = createStackNavigator();

export default function MainStack() {
  const isAuthenticated = useRecoilValue(getIsAuthenticated);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen name={screens.names.todoList} component={TodoListScreen} />
      ) : (
        <Stack.Screen name={screens.names.login} component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}
