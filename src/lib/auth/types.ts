/**
 * Auth Context Types
 * Defines all types used in authentication context
 */

export interface User {
    id: string;
    fullName: string;
    email: string;
    roleId: string;
    roleName: string;
    isActive: boolean;
    lastSeen?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthContextType {
    // State
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;

    // Methods
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    register: (fullName: string, email: string, password: string) => Promise<void>;
    clearError: () => void;
    refreshToken: () => Promise<void>;
    verifyToken: () => Promise<boolean>;
}

export interface AuthContextProviderProps {
    children: React.ReactNode;
}
