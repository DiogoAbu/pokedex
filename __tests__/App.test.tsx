import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react-native';

import App from '../src/App';

it('renders/navigates throughout app screens', async () => {
  // Render component
  const { getByText } = render(<App />);

  // Check what is rendered
  const welcomeText = getByText(/Welcome to Pokedex/i);
  expect(welcomeText).not.toBeNull();

  // Change screen
  fireEvent.press(getByText(/#0/i));

  await waitFor(() => {
    // Check what is rendered
    const indexText = getByText(/Index #/i);
    expect(indexText.props.children).toEqual(['Index #', 0]);
  });
});
