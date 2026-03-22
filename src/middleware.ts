import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login', '/register', '/unauthorized'];
const protectedRoutes = ['/dashboard', '/customers', '/distributors', '/settings', '/orders'];

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    if (isPublicRoute) {
        const token = request.cookies.get('refreshToken')?.value || request.cookies.get('accessToken')?.value;
        if (token && pathname === '/login') {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }
    
    if (pathname === '/') {
        const token = request.cookies.get('refreshToken')?.value || request.cookies.get('accessToken')?.value;
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }
    
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
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
};
