import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from 'react-router-dom'
import Home from '../pages/Home.js';


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


  test('Home page', () => {
  	act(() => {
  	render(<BrowserRouter><Home/></BrowserRouter>, container);
  	
  	});
  expect(container.textContent).toContain("e");
  });

