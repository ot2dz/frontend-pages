'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Users, Truck, Settings, Bell, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { CreateOrderDialog } from '@/components/orders/CreateOrderDialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Get user initials for avatar
const getUserInitials = (user: any) => {
    if (!user || (!user.fullName)) return 'Y';
    const name = user.fullName || '';
    return name.charAt(0).toUpperCase();
};

// روابط القائمة الجانبية حسب التصميم الجديد
const navItems = [
    { href: '/dashboard', label: 'لوحة القيادة', icon: LayoutDashboard },
    { href: '/', label: 'الطلبيات', icon: Package },
    { href: '/customers', label: 'العملاء', icon: Users },
    { href: '/distributors', label: 'الموزعون والشحن', icon: Truck },
    { href: '/settings', label: 'الإعدادات', icon: Settings },
];

// روابط شريط التنقل السفلي للموبايل (بدون زر الإضافة لأنه سيكون عائماً)
const mobileNavItems = [
    { href: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    { href: '/', label: 'الطلبات', icon: Package },
    { href: '/customers', label: 'العملاء', icon: Users },
    { href: '/distributors', label: 'الموزعون', icon: Truck },
    { href: '/settings', label: 'الإعدادات', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <div className="w-[280px] bg-white border-l border-gray-100 h-full min-h-screen text-gray-800 flex flex-col shadow-sm">
            {/* Logo Area */}
            <div className="p-6 flex items-center justify-center border-b border-gray-50 pb-6 mb-2">
                <div className="flex flex-col items-center gap-2 w-full">
                    <div className="bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-primary/20">
                        Y
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-xl font-black tracking-tight text-gray-900 leading-none mt-1">نظام يوسف للأقمشة</h1>
                        <p className="text-xs text-gray-500 mt-1 font-medium bg-gray-100 px-2 py-0.5 rounded-full">نظام إدارة الطلبات</p>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-1.5 mt-2 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    // تحديد العنصر النشط
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 font-bold text-sm ${isActive
                                ? 'bg-blue-50/80 text-primary'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon size={20} className={isActive ? 'text-primary' : 'text-gray-400'} />
                                <span>{item.label}</span>
                            </div>
                            {isActive && (
                                <div className="w-1.5 h-6 bg-primary rounded-full absolute right-0"></div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Area (Bottom) */}
            <div className="p-4 border-t border-gray-100 mt-auto bg-gray-50/50">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between p-2 rounded-xl border border-transparent">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                                {getUserInitials(user)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900 truncate max-w-[150px]">
                                    {user?.fullName || 'المستخدم'}
                                </span>
                                <span className="text-xs text-gray-500 font-medium truncate max-w-[150px]" dir="ltr">
                                    {user?.email || 'جاري التحميل...'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Button 
                        variant="ghost" 
                        onClick={() => logout()}
                        className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <LogOut size={16} />
                        تسجيل الخروج
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <div className="flex min-h-dvh bg-background selection:bg-primary/20 selection:text-primary">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-shrink-0 z-20 relative">
                <Sidebar />
            </div>

            <div className="flex flex-col flex-1 w-full relative">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 shadow-sm z-10 w-full sticky top-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary text-white w-9 h-9 rounded-xl flex items-center justify-center font-black shadow-sm">
                            Y
                        </div>
                        <h1 className="text-lg font-black text-gray-900 tracking-tight">نظام يوسف للأقمشة</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs ring-2 ring-transparent transition-all hover:ring-primary/20 focus:ring-primary/20 outline-none shadow-sm">
                                    {getUserInitials(user)}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 font-cairo">
                                <DropdownMenuLabel className="font-bold flex flex-col">
                                    <span>{user?.fullName || 'المستخدم'}</span>
                                    <span className="text-xs font-normal text-muted-foreground" dir="ltr">{user?.email}</span>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer" asChild>
                                    <Link href="/settings" className="w-full flex items-center gap-2">
                                        <Settings className="w-4 h-4 opacity-70" /> الإعدادات
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => logout()} className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer flex items-center gap-2">
                                    <LogOut className="w-4 h-4 opacity-70" /> تسجيل الخروج
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Main Content Area */}
                {/* Padding bottom is larger on mobile to avoid hiding content behind the bottom nav */}
                <main className="flex-1 p-4 md:p-8 md:pb-8 pb-bottom-nav w-full max-w-[100vw] relative custom-scrollbar">
                    <div className="max-w-[1400px] mx-auto w-full h-full">
                        {children}
                    </div>
                </main>

                {/* Mobile Bottom Navigation */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-50 px-2 pt-2" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
                    <div className="flex items-center justify-around relative">
                        {mobileNavItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            // Insert the FAB (Floating Action Button) in the middle (index 2 of 5 = center)
                            if (index === 2) {
                                return (
                                    <React.Fragment key="fab">
                                        {/* Floating Action Button for Adding Orders */}
                                        <div className="relative -top-8 z-50">
                                            <CreateOrderDialog 
                                                customTrigger={
                                                    <Button className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/40 flex items-center justify-center text-white border-[6px] border-background active:scale-95 transition-transform">
                                                        <Plus size={28} strokeWidth={3} />
                                                    </Button>
                                                }
                                            />
                                        </div>
                                        <Link
                                            href={item.href}
                                            className="flex flex-col items-center justify-center gap-1 w-16 p-1 pb-2"
                                        >
                                            <Icon size={22} className={isActive ? 'text-primary' : 'text-gray-400'} />
                                            <span className={`text-[10px] font-bold ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </React.Fragment>
                                );
                            }

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex flex-col items-center justify-center gap-1 w-16 p-1 pb-2"
                                >
                                    <Icon size={22} className={isActive ? 'text-primary' : 'text-gray-400'} />
                                    <span className={`text-[10px] font-bold ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}