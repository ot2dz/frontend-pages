import { NextRequest, NextResponse } from 'next/server';

// Define explicitly public routes
const publicRoutes = ['/login', '/register', '/unauthorized'];

// Define protected route prefixes
const protectedRoutes = ['/dashboard', '/customers', '/distributors', '/settings', '/orders'];

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // 1. Check if path is public
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    if (isPublicRoute) {
        // Redirect authenticated users away from login
        const token = request.cookies.get('refreshToken')?.value || request.cookies.get('accessToken')?.value;
        if (token && pathname === '/login') {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }
    
    // 2. Exact match for root layout /
    if (pathname === '/') {
        const token = request.cookies.get('refreshToken')?.value || request.cookies.get('accessToken')?.value;
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }
    
    // 3. Check if the current path is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    if (isProtectedRoute) {
        const token = request.cookies.get('refreshToken')?.value || request.cookies.get('accessToken')?.value;
        if (!token) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip static files, Next.js internals, and image requests
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
};