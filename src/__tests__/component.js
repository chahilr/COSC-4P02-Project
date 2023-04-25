import { render } from '@testing-library/react';
import MyComponent from './MyComponent';
import ArtifactBubble from '../components/ArtifactBubble.js';
import styles from '../styles/ArtifactBubble.module.css';

test('renders without crashing', () => {
  render(<MyComponent />);
});

test('renders with correct text content', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Hello, World!')).toBeInTheDocument();
  });

  test('handles button click correctly', () => {
    const { getByText } = render(<MyComponent />);
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(button).toHaveStyle({ backgroundColor: 'red' });
  });