import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { MemoryRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import App from '../App.js';


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


  test('renders home page by default', () => {
  	//act(() => {
    	//	render(<App/>, container);
  	//});
  //expect(container.textContent).toContain("e");
    //render(<App/>);
    //expect(screen.getByText('e')).toBeInTheDocument();
  });

