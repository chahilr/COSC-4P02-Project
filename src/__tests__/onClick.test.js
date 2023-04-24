import {render, screen, fireEvent} from '@testing-library/react'



const Button = ({onClick, children}) => (
  <button onClick={onClick}>{children}</button>
)

test('base onClick function', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click Me</Button>)
  fireEvent.click(screen.getByText(/click me/i))
  expect(handleClick).toHaveBeenCalledTimes(1)
})

