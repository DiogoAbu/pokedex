import React, { FC } from 'react';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { CardStyleInterpolators } from '@react-navigation/stack';

import HeaderBackground from '!/components/HeaderBackground';
import Icon from '!/components/Icon';
import Home from '!/screens/Home/Home';
import PokemonDetails from '!/screens/PokemonDetails/PokemonDetails';
import ResourceList from '!/screens/ResourceList/ResourceList';
import { constants } from '!/services/theme';
import { MainStackParams } from '!/types';

const Stack = createSharedElementStackNavigator<MainStackParams>();

const MainStack: FC = () => {
  return (
    <Stack.Navigator
      headerMode='screen'
      initialRouteName='Home'
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackImage: ({ tintColor }) => <Icon color={tintColor} name='chevron-left' size={40} />,
      }}
    >
      <Stack.Screen
        component={Home}
        name='Home'
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        component={ResourceList}
        name='ResourceList'
        options={{
          headerTitle: '',
          headerBackground: (props) => <HeaderBackground {...props} />,
        }}
      />

      <Stack.Screen
        component={PokemonDetails}
        name='PokemonDetails'
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: constants.colors.white,
        }}
        sharedElements={(route, otherRoute) => {
          if (otherRoute.name !== 'Details') {
            const id = route.params.id as number;
            if (!route.params.skipShared) {
              return [{ id: `pokemon.sprite.${id}` }];
            }
          }
          return [];
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
