import React, { FC } from 'react';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import Details from '!/screens/Details/Details';
import Home from '!/screens/Home/Home';
import { MainStackParams } from '!/types';

const Stack = createStackNavigator<MainStackParams>();

const MainStack: FC = () => {
  return (
    <Stack.Navigator
      headerMode='screen'
      initialRouteName='Home'
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen component={Home} name='Home' />
      <Stack.Screen component={Details} name='Details' />
    </Stack.Navigator>
  );
};

export default MainStack;
