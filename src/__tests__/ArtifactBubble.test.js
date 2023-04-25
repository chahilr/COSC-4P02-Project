import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import ArtifactBubble from '../components/ArtifactBubble.js';
import styles from '../styles/ArtifactBubble.module.css';

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
  act(() => {
    render(
      <BrowserRouter>
        <ArtifactBubble
          visible={true}
          artifact={{
            Name: 'Mask',
            Year: 1000,
            Exhibition: 'Ancient Greece',
            Photos: [null],
          }}
          onClick={null}
          alternator={1}
        />
      </BrowserRouter>,
      container
    );
  });
  expect(container.textContent).toContain('Mask');
  //render(<App/>);
  //expect(screen.getByText('e')).toBeInTheDocument();
});
