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

/*
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

*/
	
test('should redirect and update dom', () => {
    //render(<BrowserRouter><App/></BrowserRouter>, container);
    render(<BrowserRouter><App/></BrowserRouter>);
	const button = screen.getByRole('button', {name: /Ancient Greece/i})
    
    //await fireEvent.click(button)
    userEvent.click(screen.getByRole('button', {name: /Ancient Greece/i}));
        //userEvent.click(screen.getByText(/Ancient Greece/));

        
        //let buttonList = screen.getAllByRole('button');
	//console.log(container.textContent);
	//console.log(buttonList);
    expect(screen.getByText("card")).toBeInTheDocument();
   //console.log(container.toString());
    //expect(container.textContent).toContain("card");
});
