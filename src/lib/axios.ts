import axios from 'axios';

const defaultConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
};

// إنشاء نسخة Axios مهيأة للاتصال بـ API الواجهة الخلفية
const defaultApiClient = axios.create(defaultConfig);

/**
 * Get API client with optional token (token kept for compatibility but not needed for cookies)
 * @param token - Optional JWT token for authentication
 * @returns Configured axios instance
 */
export function getApiClient(token?: string) {
    const client = axios.create(defaultConfig);

    // Add token to Authorization header if provided
    if (token) {
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return client;
}

export default defaultApiClient;