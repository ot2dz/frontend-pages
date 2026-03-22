'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { User, Bot, Store } from 'lucide-react';

const settingsTabs = [
    { href: '/settings', label: 'المستخدمين', icon: User, exact: true },
    { href: '/settings/ai', label: 'الذكاء الاصطناعي', icon: Bot },
    { href: '/settings/store', label: 'المتجر', icon: Store },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">الإعدادات</h1>
                    <p className="text-gray-500 font-medium mt-1">إدارة حسابات المستخدمين وإعدادات النظام</p>
                </div>

                {/* Tabs Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 rtl:space-x-reverse" aria-label="Tabs">
                        {settingsTabs.map((tab) => {
                            const Icon = tab.icon;
                            // التحقق من التبويب النشط (الصفحة الرئيسية للإعدادات أو المسارات الفرعية)
                            const isActive = tab.exact 
                                ? pathname === tab.href 
                                : pathname.startsWith(tab.href);

                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm transition-colors ${
                                        isActive
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {tab.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Page Content Area */}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </DashboardLayout>
    );
}