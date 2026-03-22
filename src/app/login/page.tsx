/**
 * Login Page
 * User authentication page with login form
 */

import React, { Suspense } from 'react';
import LoginContent from './login-content';

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
                <div className="text-2xl font-bold mb-2">جاري التحميل...</div>
            </div>
        </div>}>
            <LoginContent />
        </Suspense>
    );
}
