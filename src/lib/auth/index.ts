/**
 * Auth Module Exports
 * Central export point for all auth utilities
 */

// Context
export { AuthContext } from './context';
export type { AuthContextType, User } from './context';

// Provider
export { AuthProvider } from './provider';

// Hooks
export {
    useAuth,
    useIsAdmin,
    useIsSales,
    useIsAccountant,
    useHasRole,
    useIsAuthenticated,
    useAuthUser,
} from './hooks';

// Components
export { ProtectedRoute, PublicRoute, RoleGuard } from './routes';

// Types
export type { LoginCredentials, AuthState, AuthContextProviderProps } from './types';
