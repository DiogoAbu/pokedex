import React, { FC } from 'react';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { CardStyleInterpolators } from '@react-navigation/stack';

import Details from '!/screens/Details/Details';
import Home from '!/screens/Home/Home';
import ResourceList from '!/screens/ResourceList/ResourceList';
import { MainStackParams } from '!/types';

const Stack = createSharedElementStackNavigator<MainStackParams>();

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

      <Stack.Screen
        component={ResourceList}
        name='ResourceList'
        sharedElements={(route) => {
          const resource = route.params.resource as string;
          return [{ id: `${resource}.card.name`, resize: 'clip' }];
        }}
      />

      <Stack.Screen component={Details} name='Details' />
    </Stack.Navigator>
  );
};

export default MainStack;
