import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Mock auth context values
const mockAuthContext = {
  user: null,
  login: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
  loading: false,
  favorites: [],
  addToFavorites: jest.fn(),
  removeFromFavorites: jest.fn(),
  isInFavorites: jest.fn().mockReturnValue(false),
};

// Custom render with router
export const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  
  return render(ui, { wrapper: BrowserRouter });
};

// Custom render with auth context
export const renderWithAuth = (ui, contextValue = mockAuthContext) => {
  return render(
    <AuthContext.Provider value={contextValue}>
      {ui}
    </AuthContext.Provider>
  );
};

// Custom render with both router and auth context
export const renderWithRouterAndAuth = (ui, { route = '/', contextValue = mockAuthContext } = {}) => {
  window.history.pushState({}, 'Test page', route);
  
  return render(
    <AuthContext.Provider value={contextValue}>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthContext.Provider>
  );
};

// Mock logged in user
export const mockLoggedInUser = {
  ...mockAuthContext,
  user: { id: '123', username: 'testuser', email: 'test@example.com' },
};