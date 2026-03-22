/**
 * Protected Route Component
 * Wraps routes that require authentication
 */

'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './hooks';
import type { User } from './types';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string | string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRole,
}: ProtectedRouteProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, isLoading, user } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            // Not authenticated, redirect to login
            if (!isAuthenticated) {
                router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
                return;
            }

            // Check role if required
            if (requiredRole && user) {
                const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
                if (user.roleName && !allowedRoles.includes(user.roleName)) {
                    // User doesn't have required role
                    router.push('/unauthorized');
                    return;
                }
            }
        }
    }, [isLoading, isAuthenticated, user, requiredRole, router, pathname]);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">جاري التحقق من الهوية...</p>
                </div>
            </div>
        );
    }

    // Only show content if authenticated and (no role required or user has required role)
    if (isAuthenticated) {
        if (requiredRole && user) {
            const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
            if (user.roleName && !allowedRoles.includes(user.roleName)) {
                return null; // Will redirect via useEffect
            }
        }
        return <>{children}</>;
    }

    return null; // Will redirect via useEffect
};

/**
 * Public Route Component
 * Redirects authenticated users away from public pages (like login)
 */

interface PublicRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
    children,
    redirectTo = '/dashboard',
}: PublicRouteProps) => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            // Redirect authenticated users away from public pages
            router.push(redirectTo);
        }
    }, [isLoading, isAuthenticated, router, redirectTo]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">جاري التحقق من الهوية...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <>{children}</>;
    }

    return null; // Will redirect via useEffect
};

/**
 * Role-Protected Content Component
 * Shows/hides content based on user role
 */

interface RoleGuardProps {
    children: React.ReactNode;
    requiredRole: string | string[];
    fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
    children,
    requiredRole,
    fallback = null,
}: RoleGuardProps) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <>{fallback}</>;
    }

    if (!user) {
        return <>{fallback}</>;
    }

    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (user.roleName && allowedRoles.includes(user.roleName)) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};
