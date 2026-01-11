import React from 'react';
import { AuthProvider } from '../../context/AuthContext';

export default function AppProviders({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

