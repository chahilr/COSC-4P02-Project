// ArtifactBubble.test.js

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import ArtifactBubble from '../components/ArtifactBubble';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('ArtifactBubble component', () => {
  const sampleArtifact = {
    Exhibition: 'Ancient Greece',
    Name: 'Sample Artifact',
    Year: -500,
    Photos: ['sample-image-url.jpg'],
    // Add other properties required by ArtifactBubble component
  };

  act(() => {
    render(
      <BrowserRouter>
        <ArtifactBubble
          visible={true}
          artifact={sampleArtifact}
          alternator={0} // Set the alternator to 0 so that the first condition is met
        />
      </BrowserRouter>,
      container
    );
  });

  const imageElement = container.querySelector('img');
  expect(imageElement.style.border).toContain('green');
  expect(container.textContent).toContain('Sample Artifact');
  expect(container.textContent).toContain('500 BC');
});
