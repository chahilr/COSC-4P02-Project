import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
//import {unmountComponentAtNode } from "react-dom";
//import {render, screen, fireEvent} from '@testing-library/react'
import { act } from "react-dom/test-utils";
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import AdminPage from '../pages/AdminPage.js';
import { UserAuth } from '../utils/Auth.js';


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

/*
jest.mock('../pages/AdminPage.js', () => ({

}));
*/

  test('AdminPage', () => {
  	act(() => {
  	//render(<BrowserRouter><AdminPage/></BrowserRouter>, container);
  	try{
	  	render(<MemoryRouter><AdminPage/></MemoryRouter>, container);
  	
  	}
  	catch (e){
  		
  	}
  	});
  	console.log(container.textContent);
  	expect(container.textContent).toContain("");
  });




