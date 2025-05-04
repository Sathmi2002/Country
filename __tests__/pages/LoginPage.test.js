import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndAuth } from '../../src/utils/testUtils';
import LoginPage from '../../src/pages/LoginPage';

describe('LoginPage Component', () => {
  test('renders login form', () => {
    renderWithRouterAndAuth(<LoginPage />);
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows link to register page', () => {
    renderWithRouterAndAuth(<LoginPage />);
    
    const registerLink = screen.getByText(/register here/i);
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.closest('a')).toHaveAttribute('href', '/register');
  });

  test('login form validation - shows error when fields are empty', () => {
    renderWithRouterAndAuth(<LoginPage />);
    
    // Try to submit the form without filling in the fields
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    // Check for error message
    expect(screen.getByText(/please enter both username and password/i)).toBeInTheDocument();
  });

  test('login form validation - shows error for invalid credentials', () => {
    // Mock localStorage.getItem to return an empty array (no users)
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    getItemSpy.mockReturnValue(JSON.stringify([]));
    
    renderWithRouterAndAuth(<LoginPage />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    // Check for error message
    expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    
    // Clean up
    getItemSpy.mockRestore();
  });
});