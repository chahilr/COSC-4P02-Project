import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AdminPage from '../pages/AdminPage.js';
import { UserAuth } from '../utils/Auth.js';
/*
describe('Login', () => {
  it('should render the login form', () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    expect(getByPlaceholderText('Username or Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('should handle username input', () => {
    const { getByPlaceholderText } = render(<Login />);
    const usernameInput = getByPlaceholderText('Username or Email');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput.value).toBe('testuser');
  });

  it('should handle password input', () => {
    const { getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    expect(passwordInput.value).toBe('testpassword');
  });

  it('should show/hide password on button click', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText('Password');
    const showButton = getByText('Show');

    fireEvent.click(showButton);
    expect(passwordInput.type).toBe('text');
    expect(showButton.textContent).toBe('Hide');

    fireEvent.click(showButton);
    expect(passwordInput.type).toBe('password');
    expect(showButton.textContent).toBe('Show');
  });

  it('should submit the form on login button click', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    const usernameInput = getByPlaceholderText('Username or Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('Submitted:', {
        username: 'testuser',
        password: 'testpassword',
      });
    });
  });

  it('should redirect to adminHome if already logged in', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }));
    jest.mock('../utils/Auth.js', () => ({
      UserAuth: () => ({ loggedIn: () => true }),
    }));

    render(<Login />);
    expect(mockNavigate).toHaveBeenCalledWith('/adminHome');
  });
});
*/

 test('AdminPage', () => {
  	//render(<BrowserRouter><AdminPage/></BrowserRouter>, container);
  	try{
	  	render(<MemoryRouter><AdminPage/></MemoryRouter>, container);
  	
  	}
  	catch (e){
  		
  	}
  	console.log(container.textContent);
  //expect(container.textContent).toContain("e");
  });


