import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegionFilter from '../../src/components/countries/RegionFilter';

describe('RegionFilter Component', () => {
  const mockOnRegionChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders select element with all regions', () => {
    render(<RegionFilter onRegionChange={mockOnRegionChange} selectedRegion="" />);
    
    const selectElement = screen.getByTestId('region-filter');
    expect(selectElement).toBeInTheDocument();
    
    // Check if all 6 regions are present (All, Africa, Americas, Asia, Europe, Oceania)
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(6);
    expect(options[0]).toHaveValue('All');
    expect(options[1]).toHaveValue('Africa');
    expect(options[2]).toHaveValue('Americas');
    expect(options[3]).toHaveValue('Asia');
    expect(options[4]).toHaveValue('Europe');
    expect(options[5]).toHaveValue('Oceania');
  });

  test('calls onRegionChange with empty string when "All" is selected', () => {
    render(<RegionFilter onRegionChange={mockOnRegionChange} selectedRegion="Europe" />);
    
    const selectElement = screen.getByTestId('region-filter');
    fireEvent.change(selectElement, { target: { value: 'All' } });
    
    expect(mockOnRegionChange).toHaveBeenCalledWith('');
  });

  test('calls onRegionChange with region name when a specific region is selected', () => {
    render(<RegionFilter onRegionChange={mockOnRegionChange} selectedRegion="" />);
    
    const selectElement = screen.getByTestId('region-filter');
    fireEvent.change(selectElement, { target: { value: 'Asia' } });
    
    expect(mockOnRegionChange).toHaveBeenCalledWith('Asia');
  });

  test('displays the selected region when provided', () => {
    render(<RegionFilter onRegionChange={mockOnRegionChange} selectedRegion="Europe" />);
    
    const selectElement = screen.getByTestId('region-filter');
    expect(selectElement).toHaveValue('Europe');
  });
});