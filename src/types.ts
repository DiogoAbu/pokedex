import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Main Stack Screens with Parameters
export type MainStackParams = {
  Home: undefined;
  Details: {
    index: number;
  };
};

// Navigation prop for Main Stack screens
export type MainNavigationProp<RouteName extends keyof MainStackParams> = StackNavigationProp<
  MainStackParams,
  RouteName
>;

// Route prop for Main Stack screens
export type MainRouteProp<RouteName extends keyof MainStackParams> = RouteProp<MainStackParams, RouteName>;
