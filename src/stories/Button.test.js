import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with label', () => {
  render(<Button label="Test" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button label="Click" onClick={handleClick} />);
  fireEvent.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});