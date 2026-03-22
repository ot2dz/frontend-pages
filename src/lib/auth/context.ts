/**
 * Auth Context
 * Central context for authentication state management
 */

'use client';

import React, { createContext } from 'react';
import type { AuthContextType, User } from './types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { type AuthContextType, type User };
