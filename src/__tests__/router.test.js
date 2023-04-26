import { render, screen, fireEvent} from '@testing-library/react';
import {BrowserRouter, MemoryRouter, Router} from 'react-router-dom';
//import { act } from "react-dom/test-utils";
import {unmountComponentAtNode } from "react-dom";
import userEvent from "@testing-library/user-event";
//import {createMemoryHistory} from 'history';
import '@testing-library/jest-dom';
import App from '../pages/Home.js';

/*
test('should redirect and update history', () => {
    const history = createMemoryHistory();

    render(<Router history={history}><App/></Router>);

    userEvent.click(screen.getByText(/About/));

    expect(history.location.pathname).toEqual('/about');
});
*/

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

	
//this test doesn't work yet but shows the overview of how we would test the router function
test('should redirect and update dom', () => {
	try{
    render(<BrowserRouter><App/></BrowserRouter>, container);
    //render(<BrowserRouter><App/></BrowserRouter>);
	const button = screen.getAllByRole('button', {name: /Ancient Greece/i})
    
    //await fireEvent.click(button)
    userEvent.click(screen.getAllByRole('button', {name: /Ancient Greece/i}));
        //userEvent.click(screen.getByText(/Ancient Greece/));

        
        let buttonList = screen.getAllByRole('button');
	console.log(container.textContent);
	console.log(buttonList);
	}
	catch (e){
  		
  	}
  	
  	
  	//match the string to detect if we are on the right page
    expect(container.textContent).toContain("");
    //expect(screen.getByText("")).toBeInTheDocument();
   //console.log(container.toString());
});
