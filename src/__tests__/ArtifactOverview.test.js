import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
//import {unmountComponentAtNode } from "react-dom";
//import {render, screen, fireEvent} from '@testing-library/react'
import { act } from "react-dom/test-utils";
import { BrowserRouter } from 'react-router-dom'
import ArtifactOverview from '../pages/ArtifactOverview.js';


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


  test('AdminPage', () => {
  	act(() => {
  	//render(<BrowserRouter><ArtifactOverview/></BrowserRouter>, container);
  	
  	});
  //expect(container.textContent).toContain(" ");
  });




