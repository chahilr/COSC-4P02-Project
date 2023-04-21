import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from 'react-router-dom'
import ArtifactPreview from '../components/ArtifactPreview.js';


let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

  test('ArtifactPreview component', () => {
  	act(() => {
  	render(<BrowserRouter><ArtifactPreview></BrowserRouter>, container);
  	
  	});
  expect(container.textContent).toContain("e");
    //render(<App/>);
    //expect(screen.getByText('e')).toBeInTheDocument();
  });
