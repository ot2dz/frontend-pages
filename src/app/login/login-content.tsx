'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth, PublicRoute } from '@/lib/auth';
import type { LoginCredentials } from '@/lib/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginFormData {
    email: string;
    password: string;
}

export default function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, error, isLoading } = useAuth();

    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const redirectUrl = searchParams.get('redirect') || '/dashboard';

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // Watch password field to show/hide password indicator
    const password = watch('password');

    const onSubmit = async (data: LoginFormData) => {
        setSubmitError(null);
        setIsSubmitting(true);

        try {
            await login(data);
            // Redirect on successful login
            router.push(redirectUrl);
        } catch (err: any) {
            const isServerError = err.response?.status >= 500;
            setSubmitError(isServerError ? 'حدث خطأ في الخادم، يرجى المحاولة لاحقاً' : 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = !errors.email && !errors.password && password.length > 0;

    return (
        <PublicRoute>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Logo/Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">YoussefTex</h1>
                        <p className="text-gray-600">نظام إدارة الطلبات والتوزيع</p>
                    </div>

                    {/* Login Card */}
                    <Card className="shadow-lg">
                        <CardHeader className="space-y-2">
                            <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
                            <CardDescription className="text-center">
                                ادخل بيانات حسابك للوصول إلى النظام
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Error Messages */}
                                {(submitError || error) && (
                                    <Alert variant="destructive">
                                        <AlertDescription>
                                            {submitError || error}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-right block text-sm font-medium">
                                        البريد الإلكتروني
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        dir="ltr"
                                        disabled={isSubmitting || isLoading}
                                        {...register('email', {
                                            required: 'البريد الإلكتروني مطلوب',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'صيغة البريد الإلكتروني غير صحيحة',
                                            },
                                        })}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-right block text-sm font-medium">
                                        كلمة المرور
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            disabled={isSubmitting || isLoading}
                                            {...register('password', {
                                                required: 'كلمة المرور مطلوبة',
                                                minLength: {
                                                    value: 6,
                                                    message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
                                                },
                                            })}
                                            className={errors.password ? 'border-red-500' : ''}
                                        />
                                        {/* Password Strength Indicator */}
                                        {password && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                {password.length < 6 ? (
                                                    <span className="text-xs text-red-500">ضعيفة</span>
                                                ) : password.length < 8 ? (
                                                    <span className="text-xs text-yellow-500">متوسطة</span>
                                                ) : (
                                                    <span className="text-xs text-green-500">قوية</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={
                                        !isFormValid || isSubmitting || isLoading || !!error
                                    }
                                    className="w-full mt-6"
                                >
                                    {isSubmitting || isLoading ? (
                                        <>
                                            <span className="inline-block animate-spin mr-2">
                                                ⟳
                                            </span>
                                            جاري معالجة...
                                        </>
                                    ) : (
                                        'دخول'
                                    )}
                                </Button>

                                {/* Forgot Password Button */}
                                <div className="text-center mt-3">
                                    <button
                                        type="button"
                                        disabled
                                        className="text-sm text-gray-500 hover:text-gray-700 cursor-not-allowed"
                                    >
                                        هل نسيت كلمة المرور؟
                                    </button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Demo Credentials Note */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>معلومات التطوير:</strong>
                            <br />
                            تأكد من وجود مستخدم في قاعدة البيانات قبل محاولة تسجيل الدخول.
                        </p>
                    </div>
                </div>
            </div>
        </PublicRoute>
    );
}
