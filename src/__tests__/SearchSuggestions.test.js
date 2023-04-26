// SearchSuggestions.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchSuggestions from '../components/SearchSuggestions.js';
import '@testing-library/jest-dom';


const sampleResults = [
  [
    '1',
    {
      Name: 'Sample Artifact 1',
      Year: '2020',
      Exhibition: 'Sample Exhibition 1',
      Photos: ['image1.jpg'],
      Tags: ['tag1', 'tag2'],
    },
  ],
  [
    '2',
    {
      Name: 'Sample Artifact 2',
      Year: '2019',
      Exhibition: 'Sample Exhibition 2',
      Photos: ['image2.jpg'],
      Tags: ['tag3', 'tag4'],
    },
  ],
];

describe('SearchSuggestions Component', () => {
  test('renders search suggestions list', () => {
    render(
      <MemoryRouter>
        <SearchSuggestions results={sampleResults} />
      </MemoryRouter>
    );

    const searchSuggestions = screen.getAllByRole('listitem');
    expect(searchSuggestions.length).toBe(sampleResults.length);
    sampleResults.forEach(([_, artifact], index) => {
      expect(searchSuggestions[index]).toHaveTextContent(artifact.Name);
    });
  });

  test('renders empty list when no results are passed', () => {
    render(
      <MemoryRouter>
        <SearchSuggestions results={[]} />
      </MemoryRouter>
    );

    const searchSuggestions = screen.queryAllByRole('listitem');
    expect(searchSuggestions.length).toBe(0);
  });
});
