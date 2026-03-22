// src/hooks/useApiClient.ts
import { useEffect } from 'react';
import apiClient from '@/lib/axios';

export function useApiClient() {
    useEffect(() => {
        const requestInterceptor = apiClient.interceptors.request.use(
            async (config) => {
                // Get token from localStorage if available
                const token = localStorage.getItem('authToken');
                
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Clean up the interceptor to avoid memory leaks
        return () => {
            apiClient.interceptors.request.eject(requestInterceptor);
        };
    }, []);

    return apiClient;
}