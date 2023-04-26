// YearRangeSlider.test.js

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import YearRangeSlider, { formatYear } from '../components/YearRangeSlider.js';

describe('YearRangeSlider Component', () => {
  test('renders sliders', () => {
    const handleChange = jest.fn();
    const initialValue = [-500, 500];

    render(<YearRangeSlider value={initialValue} onChange={handleChange} />);

    const sliders = screen.getAllByRole('slider');
    expect(sliders.length).toBe(2);
  });

  test('calls onChange handler when slider values change', () => {
    const handleChange = jest.fn();
    const initialValue = [-500, 500];

    render(<YearRangeSlider value={initialValue} onChange={handleChange} />);

    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { valueAsNumber: -1000 } });
    fireEvent.change(sliders[1], { target: { valueAsNumber: 1000 } });

    expect(handleChange).toHaveBeenCalledTimes(2);
  });
});

describe('formatYear function', () => {
  test('formats year correctly', () => {
    expect(formatYear(-500)).toBe('500BCE');
    expect(formatYear(500)).toBe('500AD');
    expect(formatYear(0)).toBe('0AD');
    expect(formatYear(-2000)).toBe('2000BCE');
    expect(formatYear(2000)).toBe('2000AD');
  });
});
