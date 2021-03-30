import React from 'react';

import { render } from '@testing-library/react-native';

import App from '../src/App';

it('renders/navigates throughout app screens', async () => {
  // Render component
  const { findByTestId } = render(<App />);

  // Check what is rendered
  const welcomeText = await findByTestId('home-title');
  expect(welcomeText).not.toBeNull();

  const teamListEmpty = await findByTestId('team-list-empty');
  expect(teamListEmpty).not.toBeNull();
});
