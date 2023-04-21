import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from 'react-router-dom'
import Logo from '../components/Logo.js';
import ArtifactBubble from '../components/ArtifactBubble.js';
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


  test('Logo component', () => {
  	act(() => {
  	render(<BrowserRouter><Logo/></BrowserRouter>, container);
  	
    		//render(<Logo/>, container);
  	});
  expect(container.textContent).toContain("Niagara On The LakeHistory Museum");
    //render(<App/>);
    //expect(screen.getByText('e')).toBeInTheDocument();
  });

