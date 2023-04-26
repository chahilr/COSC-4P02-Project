import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { toHaveStyle } from '@testing-library/jest-dom/matchers';
import SelectButton from '../components/SelectButton';

expect.extend({ toHaveStyle });

describe('SelectButton', () => {
  test('renders the button with the correct text', () => {
    const { getByText } = render(<SelectButton name="Click me" />);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  test('changes the button style when clicked', () => {
    const { getByText } = render(<SelectButton name="Click me" />);
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(button).toHaveStyle({ backgroundColor: 'var(--red)' });
  });

  test('changes the button style when hovered over', () => {
    const { getByText } = render(<SelectButton name="Click me" />);
    const button = getByText('Click me');
    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle({ backgroundColor: 'var(--red)' });
    fireEvent.mouseLeave(button);
    expect(button).toHaveStyle({ backgroundColor: 'var(--grey)' });
  });

  test('calls the onClick callback when the button is clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<SelectButton name="Click me" onClick={handleClick} />);
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledWith('Click me');
  });

  test('calls the onMouseEnter callback when the button is hovered over', () => {
    const handleMouseEnter = jest.fn();
    const { getByText } = render(<SelectButton name="Click me" onMouseEnter={handleMouseEnter} />);
    const button = getByText('Click me');
    fireEvent.mouseEnter(button);
    expect(handleMouseEnter).toHaveBeenCalled();
  });

  test('calls the onMouseLeave callback when the mouse leaves the button', () => {
    const handleMouseLeave = jest.fn();
    const { getByText } = render(<SelectButton name="Click me" onMouseLeave={handleMouseLeave} />);
    const button = getByText('Click me');
    fireEvent.mouseLeave(button);
    expect(handleMouseLeave).toHaveBeenCalled();
  });
});
