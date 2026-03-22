/**
 * Auth Provider
 * Manages authentication state and provides auth methods
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { AuthContext } from './context';
import type {
    AuthContextType,
    AuthState,
    LoginCredentials,
    AuthContextProviderProps,
} from './types';
import { getApiClient } from '../axios';

export const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        isLoading: true,
        isAuthenticated: false,
        error: null,
    });

    const verifyTokenInternal = useCallback(async () => {
        try {
            const client = getApiClient();
            const response = await client.post('/auth/verify', {});

            if (response.data.success && response.data.data.valid) {
                const user = response.data.data.user;
                setState({
                    user,
                    token: 'cookie-handled',
                    isLoading: false,
                    isAuthenticated: true,
                    error: null,
                });
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }, []);

    const refreshTokenInternal = useCallback(async () => {
        try {
            const client = getApiClient();
            const response = await client.post('/auth/refresh', {});

            if (response.data.success) {
                const user = response.data.data.user;
                setState({
                    user,
                    token: 'cookie-handled',
                    isLoading: false,
                    isAuthenticated: true,
                    error: null,
                });
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }, []);

    // Initialize auth state on mount
    useEffect(() => {
        const initializeAuth = async () => {
            // First try verify
            const isValid = await verifyTokenInternal();
            
            if (!isValid) {
                // If verify failed (token missing or expired), try refresh
                const isRefreshed = await refreshTokenInternal();
                if (!isRefreshed) {
                    setState(prev => ({
                        ...prev,
                        user: null,
                        token: null,
                        isLoading: false,
                        isAuthenticated: false,
                    }));
                }
            }
        };

        initializeAuth();
    }, [verifyTokenInternal, refreshTokenInternal]);

    const login = useCallback(async (credentials: LoginCredentials) => {
        setState((prev) => ({
            ...prev,
            isLoading: true,
            error: null,
        }));

        try {
            const client = getApiClient();
            const response = await client.post('/auth/login', credentials);

            if (response.data.success) {
                const { user } = response.data.data;
                setState({
                    user,
                    token: 'cookie-handled',
                    isLoading: false,
                    isAuthenticated: true,
                    error: null,
                });
            } else {
                throw new Error(response.data.error || 'Login failed');
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.error || error.message || 'Login failed';
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: errorMessage,
            }));
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            const client = getApiClient();
            await client.post('/auth/logout', {});
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setState({
                user: null,
                token: null,
                isLoading: false,
                isAuthenticated: false,
                error: null,
            });
            window.location.href = '/login';
        }
    }, []);

    const register = useCallback(async (fullName: string, email: string, password: string) => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        try {
            const client = getApiClient();
            const response = await client.post('/auth/register', { fullName, email, password });
            if (response.data.success) {
                setState((prev) => ({ ...prev, isLoading: false, error: null }));
            } else {
                throw new Error(response.data.error || 'Registration failed');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || 'Registration failed';
            setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
            throw error;
        }
    }, []);

    const clearError = useCallback(() => {
        setState((prev) => ({ ...prev, error: null }));
    }, []);

    const refreshToken = useCallback(async () => {
        await refreshTokenInternal();
    }, [refreshTokenInternal]);

    const verifyToken = useCallback(async () => {
        const valid = await verifyTokenInternal();
        if (!valid) {
            setState(prev => ({
                ...prev,
                user: null,
                token: null,
                isAuthenticated: false,
            }));
        }
        return valid;
    }, [verifyTokenInternal]);

    const value: AuthContextType = {
        ...state,
        login,
        logout,
        register,
        clearError,
        refreshToken,
        verifyToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
