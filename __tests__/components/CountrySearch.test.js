import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountrySearch from '../../src/components/countries/CountrySearch';

describe('CountrySearch Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search input correctly', () => {
    render(<CountrySearch onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText(/search for a country/i)).toBeInTheDocument();
  });

  test('calls onSearch when form is submitted', () => {
    render(<CountrySearch onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(input, { target: { value: 'canada' } });
    fireEvent.submit(input.closest('form'));
    
    expect(mockOnSearch).toHaveBeenCalledWith('canada');
  });

  test('calls onSearch with empty string when input is cleared', () => {
    render(<CountrySearch onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(input, { target: { value: 'canada' } });
    fireEvent.change(input, { target: { value: '' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});