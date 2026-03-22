/**
 * useAuth Hook
 * Custom hook to access authentication context
 */

'use client';

import { useContext } from 'react';
import { AuthContext } from './context';
import type { AuthContextType } from './types';

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

// Helper hooks for common operations
export const useIsAdmin = () => {
    const { user } = useAuth();
    return user?.roleName === 'ADMIN';
};

export const useIsSales = () => {
    const { user } = useAuth();
    return user?.roleName === 'SALES';
};

export const useIsAccountant = () => {
    const { user } = useAuth();
    return user?.roleName === 'ACCOUNTANT';
};

export const useHasRole = (role: string) => {
    const { user } = useAuth();
    return user?.roleName === role;
};

export const useIsAuthenticated = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated;
};

export const useAuthUser = () => {
    const { user } = useAuth();
    return user;
};
