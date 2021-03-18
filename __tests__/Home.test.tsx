import 'react-native';

import React from 'react';

import { useNavigation } from '@react-navigation/core';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import Home from '!/screens/Home/Home';

jest.mock('@react-navigation/core', () => {
  return {
    createNavigatorFactory: jest.fn(),
    useNavigation: jest.fn(),
  };
});

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
}));

jest.mock('@react-native-community/masked-view', () => ({}));

beforeEach(() => {
  // @ts-ignore
  useNavigation.mockReset();
});

it('renders correctly', async () => {
  // Mock navigation
  const mockNavigate = jest.fn();
  // @ts-ignore
  useNavigation.mockImplementation(() => ({ navigate: mockNavigate }));

  // Render component
  const { getByText } = render(<Home />);

  // Get button and press it
  const button = getByText(/#0/i);
  fireEvent.press(button);

  // Check if navigated
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  expect(mockNavigate).toHaveBeenCalledWith('Details', { index: 0 });
});
