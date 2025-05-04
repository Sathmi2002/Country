import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndAuth } from '../../src/utils/testUtils';
import CountryCard from '../../src/components/countries/CountryCard';

// Mock country data
const mockCountry = {
  name: { common: 'Canada', official: 'Canada' },
  population: 38005238,
  region: 'Americas',
  capital: ['Ottawa'],
  flags: { 
    svg: 'https://flagcdn.com/ca.svg',
    alt: 'The flag of Canada'
  },
  cca3: 'CAN',
  languages: { eng: 'English', fra: 'French' }
};

describe('CountryCard Component', () => {
  test('renders country card with correct information', () => {
    renderWithRouterAndAuth(<CountryCard country={mockCountry} />);
    
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.getByText(/38,005,238/)).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Ottawa')).toBeInTheDocument();
    
    const flagImage = screen.getByAltText('The flag of Canada');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', 'https://flagcdn.com/ca.svg');
  });

  test('does not show favorite button when user is not logged in', () => {
    renderWithRouterAndAuth(<CountryCard country={mockCountry} />);
    
    expect(screen.queryByLabelText(/add to favorites/i)).not.toBeInTheDocument();
  });

  test('shows favorite button when user is logged in', () => {
    renderWithRouterAndAuth(<CountryCard country={mockCountry} />, {
      contextValue: {
        user: { id: '123', username: 'testuser' },
        isInFavorites: jest.fn().mockReturnValue(false),
        addToFavorites: jest.fn(),
        removeFromFavorites: jest.fn()
      }
    });
    
    expect(screen.getByLabelText(/add to favorites/i)).toBeInTheDocument();
  });

  test('adds country to favorites when favorite button is clicked', async () => {
    const user = userEvent.setup();
    const mockAddToFavorites = jest.fn();
    
    renderWithRouterAndAuth(<CountryCard country={mockCountry} />, {
      contextValue: {
        user: { id: '123', username: 'testuser' },
        isInFavorites: jest.fn().mockReturnValue(false),
        addToFavorites: mockAddToFavorites,
        removeFromFavorites: jest.fn()
      }
    });
    
    const favoriteButton = screen.getByLabelText(/add to favorites/i);
    await user.click(favoriteButton);
    
    expect(mockAddToFavorites).toHaveBeenCalledWith(mockCountry);
  });

  test('removes country from favorites when favorite button is clicked and country is already a favorite', async () => {
    const user = userEvent.setup();
    const mockRemoveFromFavorites = jest.fn();
    
    renderWithRouterAndAuth(<CountryCard country={mockCountry} />, {
      contextValue: {
        user: { id: '123', username: 'testuser' },
        isInFavorites: jest.fn().mockReturnValue(true),
        addToFavorites: jest.fn(),
        removeFromFavorites: mockRemoveFromFavorites
      }
    });
    
    const favoriteButton = screen.getByLabelText(/remove from favorites/i);
    await user.click(favoriteButton);
    
    expect(mockRemoveFromFavorites).toHaveBeenCalledWith('CAN');
  });
});