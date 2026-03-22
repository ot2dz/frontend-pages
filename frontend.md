# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# .npmrc

```
legacy-peer-deps=true

```

# .vscode/settings.json

```json
{"css.lint.unknownAtRules": "ignore"}

```

# components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}

```

# eslint.config.mjs

```mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

# next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

```

# package.json

```json
{
  "name": "frontend-pages",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-dialog": "^1.1.15",
    "@tanstack/react-query": "^5.90.21",
    "@tanstack/react-table": "^8.21.3",
    "axios": "^1.13.5",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.575.0",
    "next": "16.1.6",
    "qrcode.react": "^4.2.0",
    "radix-ui": "^1.4.3",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-hook-form": "^7.71.2",
    "react-to-print": "^3.3.0",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.5.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@cloudflare/next-on-pages": "^1.13.16",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "^9",
    "eslint-config-next": "16.1.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

```

# postcss.config.mjs

```mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;

```

# public/file.svg

This is a file of the type: SVG Image

# public/globe.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# public/vercel.svg

This is a file of the type: SVG Image

# public/window.svg

This is a file of the type: SVG Image

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

# src/app/customers/page.tsx

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Phone, MessageCircle, Star, Users, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Customer {
    id: string;
    fullName: string;
    phone: string;
    state: string;
    city: string;
    address: string;
    totalSpent: number;
    orderCount: number;
    createdAt: string;
}

export default function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const { data: customers, isLoading } = useQuery<Customer[]>({
        queryKey: ['customers'],
        queryFn: async () => {
            const res = await apiClient.get('/customers');
            return res.data;
        },
    });

    // فلترة الزبائن حسب البحث (اسم أو هاتف)
    const filteredCustomers = customers?.filter(c => 
        c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.phone.includes(searchTerm)
    ) || [];

    // حساب الإحصائيات العلوية
    const totalCustomers = customers?.length || 0;
    const loyalCustomers = customers?.filter(c => c.orderCount >= 3).length || 0;
    
    // حساب الزبائن الجدد هذا الشهر (مبسط)
    const currentMonth = new Date().getMonth();
    const newCustomersThisMonth = customers?.filter(c => {
        if (!c.createdAt) return false;
        return new Date(c.createdAt).getMonth() === currentMonth;
    }).length || 0;

    // دالة لتوليد لون خلفية عشوائي للأفاتار بناءً على اسم الزبون
    const getAvatarColor = (name: string) => {
        const colors = ['bg-blue-100 text-blue-600', 'bg-emerald-100 text-emerald-600', 'bg-purple-100 text-purple-600', 'bg-orange-100 text-orange-600', 'bg-pink-100 text-pink-600', 'bg-indigo-100 text-indigo-600'];
        const index = name.length % colors.length;
        return colors[index];
    };

    // استخراج أول حرفين من الاسم للأفاتار
    const getInitials = (name: string) => {
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">قاعدة بيانات الزبائن</h1>
                    <p className="text-gray-500 font-medium text-sm">إدارة ومتابعة سجلات جميع زبائن المؤسسة</p>
                </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-500 mb-1">إجمالي الزبائن</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-primary" dir="ltr">{totalCustomers}</span>
                                <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +12%</span>
                            </div>
                        </div>
                        <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl">
                            <Users className="w-8 h-8" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-500 mb-1">الزبائن الأكثر وفاءً</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-amber-500" dir="ltr">{loyalCustomers}</span>
                                <span className="text-xs font-medium text-gray-400">أكثر من 3 طلبيات</span>
                            </div>
                        </div>
                        <div className="bg-amber-50 text-amber-500 p-4 rounded-2xl">
                            <Star className="w-8 h-8 fill-current" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-500 mb-1">زبائن جدد هذا الشهر</span>
                            <span className="text-3xl font-black text-emerald-500" dir="ltr">{newCustomersThisMonth}</span>
                        </div>
                        <div className="bg-emerald-50 text-emerald-500 p-4 rounded-2xl">
                            <Users className="w-8 h-8" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-xl mb-8 mx-auto md:mx-0">
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <Search className="h-6 w-6 text-gray-400" />
                </div>
                <Input
                    placeholder="البحث بالاسم أو رقم الهاتف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-14 w-full rounded-2xl bg-white border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 text-gray-900 placeholder:text-gray-400 pl-4 pr-14 text-base font-bold shadow-sm transition-all"
                />
            </div>

            {/* Customers Grid */}
            {isLoading ? (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-50 flex flex-col items-center justify-center h-64">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500 font-bold">جاري تحميل بيانات الزبائن...</p>
                </div>
            ) : filteredCustomers.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-50 h-64 flex items-center justify-center">
                    <p className="text-gray-500 font-bold text-lg">لم يتم العثور على أي زبون مطابق للبحث.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
                    {filteredCustomers.map((customer) => (
                        <Card key={customer.id} className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow bg-white overflow-hidden group">
                            <CardContent className="p-6">
                                {/* Header: Avatar & Info */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex gap-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm ${getAvatarColor(customer.fullName)}`}>
                                            {getInitials(customer.fullName)}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-gray-900 text-lg mb-1 truncate max-w-[140px] leading-tight" title={customer.fullName}>
                                                {customer.fullName}
                                            </h3>
                                            <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {customer.state || 'الولاية'}، {customer.city || 'المدينة'}
                                            </p>
                                        </div>
                                    </div>
                                    {customer.orderCount >= 3 && (
                                        <div className="bg-amber-100 text-amber-600 p-1.5 rounded-lg" title="زبون وفي">
                                            <Star className="w-4 h-4 fill-current" />
                                        </div>
                                    )}
                                </div>

                                {/* Stats Mini-Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50/80 p-3 rounded-xl">
                                    <div className="text-center border-l border-gray-200">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">إجمالي المشتريات</p>
                                        <p className="font-black text-gray-900" dir="ltr">
                                            {customer.totalSpent.toLocaleString('en-US')} <span className="text-[10px] text-gray-500">د.ج</span>
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">عدد الطلبيات</p>
                                        <p className="font-black text-primary">
                                            {customer.orderCount} <span className="text-[10px] text-primary/70">طلبات</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <a 
                                        href={`tel:${customer.phone}`} 
                                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 h-10 rounded-xl font-bold text-xs transition-colors"
                                    >
                                        <Phone className="w-4 h-4" /> اتصال
                                    </a>
                                    <a 
                                        href={`https://wa.me/213${customer.phone.replace(/^0/, '')}`} 
                                        target="_blank" rel="noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#E8F8F0] hover:bg-[#D1F2E0] text-[#0A8E45] h-10 rounded-xl font-bold text-xs transition-colors"
                                    >
                                        <MessageCircle className="w-4 h-4" /> مراسلة
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
```

# src/app/dashboard/page.tsx

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProtectedRoute } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Wallet, ShoppingCart, BadgeCheck, Users, Package, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    // جلب البيانات لحساب الإحصائيات (مؤقتاً نحسبها في الواجهة الأمامية)
    const { data: orders, isLoading: isLoadingOrders } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await apiClient.get('/orders');
            return res.data;
        },
    });

    const { data: customers } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const res = await apiClient.get('/customers');
            return res.data;
        },
    });

    // الحسابات
    const totalOrders = orders?.length || 0;
    const totalRevenue = orders?.filter((o: any) => o.status !== 'CANCELLED' && o.status !== 'RETURNED')
        .reduce((acc: number, o: any) => acc + (o.totalAmount || 0), 0) || 0;
    const deliveredCount = orders?.filter((o: any) => o.status === 'DELIVERED').length || 0;
    const successRate = totalOrders > 0 ? ((deliveredCount / totalOrders) * 100).toFixed(1) : '0.0';
    const activeCustomers = customers?.length || 0;

    // ترتيب الطلبيات لجلب أحدث 5 طلبيات
    const recentOrders = orders?.slice().sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 5) || [];

    // خريطة حالات الطلب لعرضها بألوان متناسقة
    const statusMap: Record<string, { label: string; color: string }> = {
        PENDING: { label: 'قيد الانتظار', color: 'bg-amber-100 text-amber-700' },
        PREPARING: { label: 'قيد التجهيز', color: 'bg-blue-100 text-blue-700' },
        SHIPPED: { label: 'قيد الشحن', color: 'bg-indigo-100 text-indigo-700' },
        DELIVERED: { label: 'مكتمل', color: 'bg-emerald-100 text-emerald-700' },
        CANCELLED: { label: 'ملغى', color: 'bg-red-100 text-red-700' },
        RETURNED: { label: 'مرتجع', color: 'bg-rose-100 text-rose-700' },
    };

    return (
        <ProtectedRoute>
            <DashboardLayout>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">مرحباً، يوسف</h1>
                    <p className="text-gray-500 font-medium mt-1">إليك ملخص العمليات اليوم</p>
                </div>
                <Link href="/">
                    <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 h-12 font-bold px-6 text-base transition-all active:scale-95">
                        <Plus className="mr-0 ml-2 w-5 h-5" />
                        طلب جديد
                    </Button>
                </Link>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {/* Revenue Card */}
                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-emerald-50 p-3 rounded-xl">
                                <Wallet className="w-6 h-6 text-emerald-500" />
                            </div>
                            <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                +12.5% <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 mb-1">إجمالي الإيرادات</p>
                            <h3 className="text-2xl font-black text-gray-900" dir="ltr">
                                {totalRevenue.toLocaleString('en-US')} <span className="text-sm text-gray-400 font-bold">د.ج</span>
                            </h3>
                        </div>
                    </CardContent>
                </Card>

                {/* Orders Card */}
                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-50 p-3 rounded-xl">
                                <ShoppingCart className="w-6 h-6 text-blue-500" />
                            </div>
                            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                +8.2% <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 mb-1">إجمالي الطلبات</p>
                            <h3 className="text-2xl font-black text-gray-900" dir="ltr">{totalOrders}</h3>
                        </div>
                    </CardContent>
                </Card>

                {/* Success Rate Card */}
                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-purple-50 p-3 rounded-xl">
                                <BadgeCheck className="w-6 h-6 text-purple-500" />
                            </div>
                            <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                +1.5% <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 mb-1">معدل النجاح</p>
                            <h3 className="text-2xl font-black text-gray-900" dir="ltr">{successRate}%</h3>
                        </div>
                    </CardContent>
                </Card>

                {/* Customers Card */}
                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-orange-50 p-3 rounded-xl">
                                <Users className="w-6 h-6 text-orange-500" />
                            </div>
                            <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                +5.4% <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 mb-1">العملاء النشطون</p>
                            <h3 className="text-2xl font-black text-gray-900" dir="ltr">{activeCustomers}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Grid (Recent Orders & Top Distributors placeholder) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Orders - Takes 2 columns on large screens */}
                <Card className="rounded-2xl border-none shadow-sm bg-white lg:col-span-2 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="text-lg font-black text-gray-900">آخر الطلبات</h2>
                        <Link href="/" className="text-primary text-sm font-bold hover:underline">عرض الكل</Link>
                    </div>
                    <div className="p-0 flex-1">
                        {isLoadingOrders ? (
                            <div className="flex justify-center items-center h-40">
                                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {recentOrders.map((order: any) => {
                                    const statusObj = statusMap[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-700' };
                                    return (
                                        <div key={order.id} className="p-4 md:p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-gray-100 w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hidden sm:flex">
                                                    <Package size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 mb-1">{order.customId}</h4>
                                                    <p className="text-xs font-medium text-gray-500 line-clamp-1 max-w-[150px] sm:max-w-[250px]">
                                                        العميل: {order.customer?.fullName || 'غير متوفر'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 md:gap-8">
                                                <div className="text-left">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap ${statusObj.color}`}>
                                                        {statusObj.label}
                                                    </span>
                                                </div>
                                                <div className="text-left min-w-[80px]">
                                                    <h4 className="font-black text-gray-900 text-sm sm:text-base" dir="ltr">
                                                        {order.totalAmount.toLocaleString('en-US')} <span className="text-xs text-gray-400">د.ج</span>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {recentOrders.length === 0 && (
                                    <div className="p-8 text-center text-gray-500 font-medium">لا توجد طلبات بعد.</div>
                                )}
                            </div>
                        )}
                    </div>
                </Card>

                {/* Top Distributors (Mocked for now since no charts) */}
                <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-50">
                        <h2 className="text-lg font-black text-gray-900">كبار الموزعين</h2>
                    </div>
                    <div className="p-6 flex-1 flex flex-col gap-6">
                        {/* Placeholder Distributor 1 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                    ي.إ
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">يالدين إكسبريس</h4>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">وطنية</p>
                                </div>
                            </div>
                            <div className="text-left">
                                <p className="font-black text-primary text-sm" dir="ltr">45,200 د.ج</p>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">128 طلب</p>
                            </div>
                        </div>

                        {/* Placeholder Distributor 2 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                                    ك.إ
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">كازا إكسبريس</h4>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">الشرق</p>
                                </div>
                            </div>
                            <div className="text-left">
                                <p className="font-black text-primary text-sm" dir="ltr">32,800 د.ج</p>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">94 طلب</p>
                            </div>
                        </div>
                        
                        {/* Placeholder Distributor 3 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
                                    ز.ر
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">ZR Express</h4>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">الغرب</p>
                                </div>
                            </div>
                            <div className="text-left">
                                <p className="font-black text-primary text-sm" dir="ltr">15,100 د.ج</p>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">45 طلب</p>
                            </div>
                        </div>
                    </div>
                </Card>

            </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
```

# src/app/dashboard/users/page.tsx

```tsx
/**
 * Users Management Page
 * Admin page for managing system users
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth, ProtectedRoute } from '@/lib/auth';
import { getApiClient } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { User } from '@/lib/auth';

interface ExtendedUser extends Omit<User, 'roleName'> {
    roleName?: string;
}

const ROLES = [
    { id: '1', name: 'ADMIN', label: 'مدير النظام' },
    { id: '2', name: 'SALES', label: 'مندوب مبيعات' },
    { id: '3', name: 'ACCOUNTANT', label: 'محاسب' },
];

export default function UsersPage() {
    const { user, token, isLoading: authLoading } = useAuth();
    const queryClient = useQueryClient();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    // Fetch all users
    const {
        data: users = [],
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const client = getApiClient(token || '');
            const response = await client.get('/users');
            return response.data.data || [];
        },
        enabled: !!token,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Delete user mutation
    const deleteUserMutation = useMutation({
        mutationFn: async (userId: string) => {
            const client = getApiClient(token || '');
            await client.delete(`/users/${userId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    // Change role mutation
    const changeRoleMutation = useMutation({
        mutationFn: async (data: { userId: string; roleId: string }) => {
            const client = getApiClient(token || '');
            await client.patch(`/users/${data.userId}/role`, {
                roleId: data.roleId,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setIsEditDialogOpen(false);
        },
    });

    // Handle delete user
    const handleDeleteUser = useCallback(
        async (userId: string) => {
            if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
                try {
                    await deleteUserMutation.mutateAsync(userId);
                } catch (error) {
                    console.error('Delete user error:', error);
                }
            }
        },
        [deleteUserMutation]
    );

    // Handle change role
    const handleChangeRole = useCallback(
        async (userId: string, roleId: string) => {
            try {
                await changeRoleMutation.mutateAsync({ userId, roleId });
            } catch (error) {
                console.error('Change role error:', error);
            }
        },
        [changeRoleMutation]
    );

    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">جاري التحقق...</p>
                </div>
            </div>
        );
    }

    return (
        <ProtectedRoute requiredRole="ADMIN">
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>
                        <p className="text-gray-600 mt-1">
                            قم بإدارة مستخدمي النظام وصلاحياتهم
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsCreateDialogOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        + مستخدم جديد
                    </Button>
                </div>

                {/* Error Alert */}
                {isError && error && (
                    <Alert variant="destructive">
                        <AlertDescription>
                            {error instanceof Error
                                ? error.message
                                : 'حدث خطأ في تحميل المستخدمين'}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>المستخدمين ({users.length})</CardTitle>
                        <CardDescription>
                            قائمة جميع مستخدمي النظام وصلاحياتهم
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                                <p className="text-gray-600 mt-2">جاري التحميل...</p>
                            </div>
                        ) : users.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">لا توجد مستخدمين حتى الآن</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>الاسم</TableHead>
                                            <TableHead>البريد الإلكتروني</TableHead>
                                            <TableHead>الدور</TableHead>
                                            <TableHead>الحالة</TableHead>
                                            <TableHead>آخر ظهور</TableHead>
                                            <TableHead>الإجراءات</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((u: ExtendedUser) => (
                                            <TableRow key={u.id}>
                                                <TableCell className="font-medium">
                                                    {u.fullName}
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-500">
                                                    {u.email}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            u.roleName === 'ADMIN'
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {ROLES.find((r) => r.name === u.roleName)
                                                            ?.label || u.roleName}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            u.isActive ? 'secondary' : 'destructive'
                                                        }
                                                    >
                                                        {u.isActive ? 'فعال' : 'معطل'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-500">
                                                    {u.lastSeen
                                                        ? new Date(u.lastSeen).toLocaleString('ar-SA')
                                                        : 'لم يسجل'}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Dialog
                                                            open={
                                                                isEditDialogOpen &&
                                                                selectedUser?.id === u.id
                                                            }
                                                            onOpenChange={(open) => {
                                                                if (open) {
                                                                    setSelectedUser(u);
                                                                    setIsEditDialogOpen(true);
                                                                } else {
                                                                    setIsEditDialogOpen(false);
                                                                }
                                                            }}
                                                        >
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        setSelectedUser(u);
                                                                    }}
                                                                >
                                                                    تعديل
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>
                                                                        تعديل دور المستخدم
                                                                    </DialogTitle>
                                                                    <DialogDescription>
                                                                        {u.fullName}
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <label className="text-sm font-medium">
                                                                            الدور الحالي:{' '}
                                                                            <span className="font-bold">
                                                                                {ROLES.find(
                                                                                    (r) =>
                                                                                        r.name ===
                                                                                        u.roleName
                                                                                )?.label}
                                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        {ROLES.map((role) => (
                                                                            <Button
                                                                                key={role.id}
                                                                                onClick={() =>
                                                                                    handleChangeRole(
                                                                                        u.id,
                                                                                        role.id
                                                                                    )
                                                                                }
                                                                                disabled={
                                                                                    u.roleName ===
                                                                                        role.name ||
                                                                                    changeRoleMutation.isPending
                                                                                }
                                                                                variant={
                                                                                    u.roleName ===
                                                                                    role.name
                                                                                        ? 'default'
                                                                                        : 'outline'
                                                                                }
                                                                                className="w-full"
                                                                            >
                                                                                {role.label}
                                                                            </Button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDeleteUser(u.id)
                                                            }
                                                            disabled={
                                                                deleteUserMutation.isPending ||
                                                                u.id === user?.id
                                                            }
                                                        >
                                                            حذف
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Create User Dialog */}
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>مستخدم جديد</DialogTitle>
                            <DialogDescription>
                                أضف مستخدماً جديداً إلى النظام
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <p className="text-sm text-gray-500">
                                سيتم تطبيق نموذج إنشاء المستخدم في التحديث التالي
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </ProtectedRoute>
    );
}

```

# src/app/distributors/[id]/page.tsx

```tsx
'use client';

import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, CircleDashed, Package, Wallet, Receipt, HandCoins, CheckSquare } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DistributorDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const queryClient = useQueryClient();

    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

    const { data: details, isLoading } = useQuery({
        queryKey: ['distributor-details', id],
        queryFn: async () => {
            const res = await apiClient.get(`/distributors/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const settleMutation = useMutation({
        mutationFn: async (orderIds: string[]) => {
            const res = await apiClient.put('/orders/actions/settle', { orderIds });
            return res.data;
        },
        onSuccess: () => {
            toast.success('تم تأكيد التسوية والتحصيل بنجاح');
            setSelectedOrders([]);
            queryClient.invalidateQueries({ queryKey: ['distributor-details', id] });
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: () => {
            toast.error('حدث خطأ أثناء محاولة التسوية');
        }
    });

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[50vh] items-center justify-center">
                    <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (!details?.distributor) {
        return (
            <DashboardLayout>
                <div className="text-center mt-20 text-gray-500 font-bold text-xl">الموزع غير موجود أو تم حذفه.</div>
            </DashboardLayout>
        );
    }

    const { distributor, orders } = details;

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);
    const totalCommission = orders.reduce((sum: number, o: any) => sum + (o.deliveryFee || 300), 0);
    
    // التعديل هنا: جلب كل الطلبيات التي لم تتم تسويتها بغض النظر عن حالة الشحن
    const unsettledOrders = orders.filter((o: any) => {
        const isSettled = o.isSettled === true || o.isSettled === 1 || o.isSettled === 'true' || o.isSettled === '1';
        return !isSettled; 
    });
    
    const totalNetDue = unsettledOrders.reduce((sum: number, o: any) => sum + ((o.totalAmount || 0) - (o.deliveryFee || 300)), 0);

    const isAllSelected = unsettledOrders.length > 0 && selectedOrders.length === unsettledOrders.length;

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedOrders(unsettledOrders.map((o: any) => o.id));
        } else {
            setSelectedOrders([]);
        }
    };

    const handleSelectOne = (orderId: string, checked: boolean) => {
        if (checked) {
            setSelectedOrders(prev => [...prev, orderId]);
        } else {
            setSelectedOrders(prev => prev.filter(id => id !== orderId));
        }
    };

    const selectedNetDue = orders
        .filter((o: any) => selectedOrders.includes(o.id))
        .reduce((sum: number, o: any) => sum + ((o.totalAmount || 0) - (o.deliveryFee || 300)), 0);

    const handleSettle = () => {
        if (selectedOrders.length === 0) return;
        settleMutation.mutate(selectedOrders);
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 w-full">
                <div className="flex items-center gap-4">
                    <Link href="/distributors">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white hover:bg-gray-100 shadow-sm border border-gray-100">
                            <ArrowRight className="w-5 h-5 text-gray-600" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">
                            {distributor.name}
                        </h1>
                        <p className="text-gray-500 font-bold text-sm">
                            {distributor.phone ? `هاتف: ${distributor.phone} ` : ''} • تغطية: {distributor.wilayas || 'كل الولايات'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <Card className="rounded-2xl border-none shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-3.5 rounded-2xl">
                                <Package className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500 mb-0.5">إجمالي الطلبيات</p>
                                <h3 className="text-2xl font-black text-gray-900" dir="ltr">{totalOrders}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-emerald-50 p-3.5 rounded-2xl">
                                <Wallet className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500 mb-0.5">إجمالي المداخيل</p>
                                <h3 className="text-2xl font-black text-gray-900" dir="ltr">{totalRevenue.toLocaleString('en-US')} <span className="text-xs text-gray-400 font-bold">د.ج</span></h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-50 p-3.5 rounded-2xl">
                                <Receipt className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500 mb-0.5">إجمالي العمولة</p>
                                <h3 className="text-2xl font-black text-gray-900" dir="ltr">{totalCommission.toLocaleString('en-US')} <span className="text-xs text-gray-400 font-bold">د.ج</span></h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm bg-primary text-white relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                    <CardContent className="p-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3.5 rounded-2xl backdrop-blur-sm">
                                <HandCoins className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-blue-100 mb-0.5">الصافي المستحق (قيد الانتظار)</p>
                                <h3 className="text-2xl font-black text-white" dir="ltr">{totalNetDue.toLocaleString('en-US')} <span className="text-xs text-blue-200 font-bold">د.ج</span></h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden mb-24">
                <div className="border-b border-gray-50 p-6 flex justify-between items-center bg-gray-50/30">
                    <h2 className="text-lg font-black text-gray-900">سجل الطلبيات للموزع</h2>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-transparent border-b-2 border-gray-100">
                            <tr>
                                <th className="px-6 py-4 w-12 text-center">
                                    <Checkbox
                                        checked={isAllSelected}
                                        onCheckedChange={handleSelectAll}
                                        className="h-5 w-5 rounded-md border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        disabled={unsettledOrders.length === 0}
                                    />
                                </th>
                                <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">رقم الطلبية</th>
                                <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">العميل</th>
                                <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">المجموع</th>
                                <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">العمولة</th>
                                <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">الصافي</th>
                                <th className="font-bold text-gray-500 px-6 py-4 whitespace-nowrap">حالة التسوية</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center p-12 text-gray-500 font-bold">لا توجد طلبيات مسجلة لهذا الموزع بعد.</td>
                                </tr>
                            ) : null}
                            {orders.map((order: any) => {
                                const isSettled = order.isSettled === true || order.isSettled === 1 || order.isSettled === 'true' || order.isSettled === '1';
                                const commission = order.deliveryFee || 300;
                                const net = (order.totalAmount || 0) - commission;
                                
                                return (
                                    <tr key={order.id} className={`border-b border-gray-50 transition-colors ${selectedOrders.includes(order.id) ? 'bg-primary/5' : 'hover:bg-gray-50/80'}`}>
                                        <td className="px-6 py-4 text-center">
                                            <Checkbox
                                                checked={selectedOrders.includes(order.id) || isSettled}
                                                onCheckedChange={(c: boolean | string) => handleSelectOne(order.id, c as boolean)}
                                                disabled={isSettled} // التعديل هنا: يتم التعطيل فقط إذا تمت التسوية بالفعل
                                                className="h-5 w-5 rounded-md border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary disabled:opacity-50"
                                            />
                                        </td>
                                        <td className="px-4 py-4 font-black text-gray-900 whitespace-nowrap">{order.customId}</td>
                                        <td className="px-4 py-4 font-bold text-gray-600 whitespace-nowrap">{order.customer?.fullName}</td>
                                        <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap" dir="ltr">{order.totalAmount?.toLocaleString('en-US')} د.ج</td>
                                        <td className="px-4 py-4 text-orange-500 font-bold whitespace-nowrap" dir="ltr">{commission.toLocaleString('en-US')} د.ج</td>
                                        <td className="px-4 py-4 font-black text-emerald-600 whitespace-nowrap" dir="ltr">{net.toLocaleString('en-US')} د.ج</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {isSettled ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                    <CheckCircle2 className="w-4 h-4" /> تمت التسوية
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
                                                    <CircleDashed className="w-4 h-4 animate-spin-slow" /> غير مسواة
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            {selectedOrders.length > 0 && (
                <div className="fixed bottom-[80px] md:bottom-0 left-0 right-0 md:left-[280px] bg-white border-t border-gray-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-40 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="bg-primary/10 text-primary font-black px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-sm border border-primary/20">
                                <CheckSquare className="w-5 h-5" />
                                تحديد <span dir="ltr" className="text-lg">{selectedOrders.length}</span> طلب
                            </div>
                            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
                            <div className="text-gray-600 font-bold flex items-center gap-2 text-sm">
                                الصافي المستحق تحصيله:
                                <span className="text-xl font-black text-emerald-600" dir="ltr">{selectedNetDue.toLocaleString('en-US')} د.ج</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleSettle}
                            disabled={settleMutation.isPending}
                            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/30 h-12 font-bold px-8 text-base transition-transform active:scale-95"
                        >
                            تأكيد التحصيل والتسوية المالية
                        </Button>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
```

# src/app/distributors/page.tsx

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { CreateDistributorDialog } from '@/components/distributors/create-distributor-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Truck, Clock, Star, MapPin, Eye, FileText } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// تعريف الواجهات
interface Distributor {
    id: string;
    name: string;
    phone: string | null;
    wilayas: string | null;
    baseFee: number;
}

interface Order {
    id: string;
    status: string;
    distributorId: string | null;
}

export default function DistributorsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    // جلب الموزعين
    const { data: distributors, isLoading: isLoadingDistributors } = useQuery<Distributor[]>({
        queryKey: ['distributors'],
        queryFn: async () => {
            const res = await apiClient.get('/distributors');
            return res.data;
        },
    });

    // جلب الطلبيات لحساب إحصائيات الموزعين (الحمل الحالي والأكثر إنجازاً)
    const { data: orders, isLoading: isLoadingOrders } = useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await apiClient.get('/orders');
            return res.data;
        },
    });

    const isLoading = isLoadingDistributors || isLoadingOrders;

    // --- الحسابات والإحصائيات ---
    const activeDistributorsCount = distributors?.length || 0;

    // حساب الأكثر إنجازاً (الموزع الذي لديه أكبر عدد طلبيات "مكتملة")
    let topPerformer = 'غير متوفر';
    if (distributors && orders) {
        const deliveredOrders = orders.filter(o => o.status === 'DELIVERED' && o.distributorId);
        const distCounts: Record<string, number> = {};
        
        deliveredOrders.forEach(o => {
            if (o.distributorId) {
                distCounts[o.distributorId] = (distCounts[o.distributorId] || 0) + 1;
            }
        });

        let maxCount = 0;
        let topDistId = null;
        for (const [distId, count] of Object.entries(distCounts)) {
            if (count > maxCount) {
                maxCount = count;
                topDistId = distId;
            }
        }

        if (topDistId) {
            const dist = distributors.find(d => d.id === topDistId);
            if (dist) topPerformer = dist.name;
        }
    }

    // فلترة الموزعين بناءً على البحث
    const filteredDistributors = distributors?.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (d.wilayas && d.wilayas.includes(searchTerm))
    ) || [];

    // دالة للحصول على الحرفين الأولين كشعار
    const getInitials = (name: string) => {
        const parts = name.split(' ');
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    // دالة لتوليد ألوان الشعار (Avatar)
    const getAvatarColor = (index: number) => {
        const colors = [
            'bg-blue-100 text-blue-600',
            'bg-orange-100 text-orange-600',
            'bg-emerald-100 text-emerald-600',
            'bg-purple-100 text-purple-600',
            'bg-rose-100 text-rose-600'
        ];
        return colors[index % colors.length];
    };

    // دالة لحساب "الحمل الحالي" (الطلبيات قيد المعالجة أو الشحن لهذا الموزع)
    const getCurrentLoad = (distributorId: string) => {
        if (!orders) return 0;
        return orders.filter(o => o.distributorId === distributorId && ['PENDING', 'PREPARING', 'SHIPPED'].includes(o.status)).length;
    };

    // دالة لمحاكاة "الأداء" (لأننا لا نملك بيانات التوصيل الدقيقة حالياً، نعتمد على نسبة وهمية أو بناءً على التوصيل)
    const getPerformance = (distributorId: string) => {
        if (!orders) return { percentage: 0, label: 'متوسط', color: 'bg-gray-200' };
        
        const distOrders = orders.filter(o => o.distributorId === distributorId);
        if (distOrders.length === 0) return { percentage: 0, label: 'جديد', color: 'bg-gray-200' };

        const delivered = distOrders.filter(o => o.status === 'DELIVERED').length;
        const failed = distOrders.filter(o => o.status === 'CANCELLED' || o.status === 'RETURNED').length;
        const totalResolved = delivered + failed;
        
        if (totalResolved === 0) return { percentage: 100, label: 'جيد', color: 'bg-blue-500' };

        const percentage = Math.round((delivered / totalResolved) * 100);
        
        if (percentage >= 90) return { percentage, label: 'ممتاز', color: 'bg-emerald-500' };
        if (percentage >= 75) return { percentage, label: 'جيد', color: 'bg-blue-500' };
        if (percentage >= 50) return { percentage, label: 'متوسط', color: 'bg-orange-500' };
        return { percentage, label: 'ضعيف', color: 'bg-red-500' };
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 w-full">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">إدارة الموزعين وشركات التوصيل</h1>
                    <p className="text-gray-500 font-medium text-sm">إدارة شركاء التوصيل، متابعة الأداء، وتسوية المستحقات المالية</p>
                </div>
                <CreateDistributorDialog />
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-500 mb-1">الموزعون النشطون</span>
                            <span className="text-3xl font-black text-primary" dir="ltr">{activeDistributorsCount}</span>
                        </div>
                        <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl">
                            <Truck className="w-8 h-8" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-500 mb-1">متوسط وقت التوصيل</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-orange-500" dir="ltr">2.4</span>
                                <span className="text-sm font-bold text-gray-400">يوم</span>
                            </div>
                        </div>
                        <div className="bg-orange-50 text-orange-500 p-4 rounded-2xl">
                            <Clock className="w-8 h-8" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-500 mb-1">الأكثر إنجازاً</span>
                            <span className="text-xl font-black text-emerald-600 mt-1 truncate max-w-[150px]">{topPerformer}</span>
                        </div>
                        <div className="bg-emerald-50 text-emerald-500 p-4 rounded-2xl">
                            <Star className="w-8 h-8 fill-current" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Toolbar (Search & Actions) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                        placeholder="البحث عن موزع، منطقة، أو رقم تواصل..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-12 w-full rounded-2xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-900 placeholder:text-gray-400 pl-4 pr-12 text-sm font-bold shadow-sm transition-all"
                    />
                </div>
                
                <Button variant="outline" className="w-full md:w-auto h-12 rounded-xl text-primary border-primary/20 bg-primary/5 hover:bg-primary/10 hover:text-primary font-bold shadow-sm px-6">
                    <FileText className="mr-0 ml-2 w-4 h-4" /> إنشاء تسوية مجمعة
                </Button>
            </div>

            {/* Enhanced Distributors List / Table */}
            <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden mb-24">
                <div className="overflow-x-auto w-full">
                    {isLoading ? (
                        <div className="p-12 text-center text-gray-500 font-bold flex flex-col items-center justify-center">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                            جاري تحميل بيانات الموزعين...
                        </div>
                    ) : filteredDistributors.length === 0 ? (
                        <div className="p-12 text-center text-gray-500 font-bold">
                            لا يوجد موزعين يطابقون البحث.
                        </div>
                    ) : (
                        <table className="w-full text-sm text-right">
                            <thead className="bg-transparent border-b-2 border-gray-100">
                                <tr>
                                    <th className="font-bold text-gray-500 px-6 py-4">الموزع</th>
                                    <th className="font-bold text-gray-500 px-6 py-4">مناطق التغطية</th>
                                    <th className="font-bold text-gray-500 px-6 py-4">سعر الشحن</th>
                                    <th className="font-bold text-gray-500 px-6 py-4">الأداء</th>
                                    <th className="font-bold text-gray-500 px-6 py-4">الحمل الحالي</th>
                                    <th className="font-bold text-gray-500 px-6 py-4">الحالة</th>
                                    <th className="font-bold text-gray-500 px-6 py-4 text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDistributors.map((distributor, index) => {
                                    // تقسيم الولايات لعمل Badges (إن وجدت)
                                    const coverageAreas = distributor.wilayas 
                                        ? distributor.wilayas.split(',').map(s => s.trim()).slice(0, 3) 
                                        : ['كل الولايات'];
                                    
                                    const hasMore = distributor.wilayas ? distributor.wilayas.split(',').length > 3 : false;

                                    const currentLoad = getCurrentLoad(distributor.id);
                                    const perf = getPerformance(distributor.id);

                                    return (
                                        <tr key={distributor.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors group">
                                            {/* Distributor Info */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${getAvatarColor(index)}`}>
                                                        {getInitials(distributor.name)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-sm whitespace-nowrap">{distributor.name}</p>
                                                        <p className="text-xs text-gray-500 font-medium">{distributor.phone || 'لوجستيات وطنية'}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Coverage Areas (Badges) */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1.5 min-w-[120px]">
                                                    {coverageAreas.map((area, i) => (
                                                        <span key={i} className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-[10px] font-bold whitespace-nowrap">
                                                            <MapPin className="w-3 h-3 text-gray-400" /> {area}
                                                        </span>
                                                    ))}
                                                    {hasMore && (
                                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-[10px] font-bold">
                                                            ...
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Shipping Rate */}
                                            <td className="px-6 py-4">
                                                <p className="font-black text-gray-900 whitespace-nowrap" dir="ltr">
                                                    {distributor.baseFee} <span className="text-xs text-gray-500 font-bold">د.ج</span>
                                                </p>
                                            </td>

                                            {/* Performance (Progress Bar) */}
                                            <td className="px-6 py-4 min-w-[140px]">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className={`text-[10px] font-bold ${perf.color.replace('bg-', 'text-')}`}>
                                                        {perf.percentage}%
                                                    </span>
                                                    <span className="text-[10px] text-gray-500 font-bold">{perf.label}</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                    <div className={`h-full rounded-full ${perf.color}`} style={{ width: `${perf.percentage}%` }}></div>
                                                </div>
                                            </td>

                                            {/* Current Load (Badge) */}
                                            <td className="px-6 py-4">
                                                <span className="inline-flex flex-col items-center justify-center bg-blue-50 text-blue-600 px-3 py-1 rounded-xl text-xs font-bold border border-blue-100 min-w-[50px]">
                                                    <span className="text-lg leading-none">{currentLoad}</span>
                                                    <span className="text-[9px]">طلب</span>
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-100">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> نشط
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link href={`/distributors/${distributor.id}`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-gray-500 hover:text-primary hover:bg-blue-50">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    {/* يمكن لاحقاً إضافة زر تعديل معلومات الموزع هنا */}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </Card>
        </DashboardLayout>
    );
}
```

# src/app/favicon.ico

This is a binary file of the type: Binary

# src/app/globals.css

```css
@import "tailwindcss";
@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
}

:root {
  --radius: 1rem;
  /* Soft light gray background matching the design */
  --background: oklch(0.98 0.01 240);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  /* Vibrant Primary Blue matching the screenshots */
  --primary: oklch(0.5 0.2 250);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.96 0.02 240);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.96 0.02 240);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.96 0.02 240);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.92 0.01 240);
  --input: oklch(0.92 0.01 240);
  --ring: oklch(0.5 0.2 250);
  --chart-1: oklch(0.5 0.2 250);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(1 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.5 0.2 250);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.96 0.02 240);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.92 0.01 240);
  --sidebar-ring: oklch(0.5 0.2 250);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.5 0.2 250);
  --primary-foreground: oklch(0.145 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.5 0.2 250);
  --chart-1: oklch(0.5 0.2 250);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.5 0.2 250);
  --sidebar-primary-foreground: oklch(0.145 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.5 0.2 250);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

# src/app/layout.tsx

```tsx
import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers';
import { Toaster } from 'sonner';

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export const metadata: Metadata = {
  title: 'YoussefTex OMS',
  description: '100% Cloudflare Native Order Management System (Arabic)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <Providers>{children}</Providers>
        <Toaster position="top-center" richColors dir="rtl" />
      </body>
    </html>
  );
}
```

# src/app/login/page.tsx

```tsx
/**
 * Login Page
 * User authentication page with login form
 */

'use client';

import React, { useState, useEffect } from 'react';
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

export default function LoginPage() {
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
            setSubmitError(err.response?.data?.error || 'فشل تسجيل الدخول');
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
                                {/* Error Alert */}
                                {(submitError || error) && (
                                    <Alert variant="destructive">
                                        <AlertDescription>
                                            {submitError || error}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-right block text-sm font-medium"
                                    >
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
                                    <Label
                                        htmlFor="password"
                                        className="text-right block text-sm font-medium"
                                    >
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

                                {/* Forgot Password Link */}
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

```

# src/app/page.tsx

```tsx
'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, Clock, Truck } from 'lucide-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { columns, Order } from '@/components/orders/columns';
import { DataTable } from '@/components/orders/data-table';
import { BulkPrintButton } from '@/components/orders/BulkPrintButton';
import { OrderLabelTemplate } from '@/components/orders/OrderLabelTemplate';

// قمنا باستدعاء المكون الجديد هنا
import { CreateOrderDialog } from '@/components/orders/CreateOrderDialog';

export default function OrdersPage() {
    const queryClient = useQueryClient();
    const printRef = useRef<HTMLDivElement>(null);

    const { data: orders, isLoading } = useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await apiClient.get('/orders');
            return res.data;
        },
    });

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: 'ملصقات_الطلبيات_الشاملة',
    }) as unknown as () => void;

    // حساب الإحصائيات للبطاقات العلوية
    const totalOrders = orders?.length || 0;
    const pendingOrders = orders?.filter(o => o.status === 'PENDING').length || 0;
    const shippedOrders = orders?.filter(o => o.status === 'SHIPPED').length || 0;
    const deliveredOrders = orders?.filter(o => o.status === 'DELIVERED').length || 0;
    const successRate = totalOrders > 0 ? Math.round((deliveredOrders / totalOrders) * 100) : 0;

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">إدارة الطلبيات</h1>
                    <p className="text-gray-500 font-medium text-sm">متابعة ومعالجة شحنات الزبائن</p>
                </div>
                <div className="flex flex-col md:flex-row w-full md:w-auto gap-3">
                    <BulkPrintButton orders={orders} />
                    <Button onClick={handlePrint} variant="outline" className="w-full md:w-auto rounded-xl shadow-sm hover:shadow h-11 font-bold text-gray-700 border-gray-200">
                        <Printer className="mr-0 ml-2 h-4 w-4" /> طباعة الكل
                    </Button>
                    {/* تم استبدال الزر الشكلي بالمكون الذي أنشأناه */}
                    <CreateOrderDialog />
                </div>
            </div>

            {/* بطاقات الإحصائيات العلوية للطلبيات */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-500 mb-1">إجمالي الطلبات</span>
                            <span className="text-3xl font-black text-primary" dir="ltr">{totalOrders}</span>
                        </div>
                        <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl">
                            <Package className="w-8 h-8" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-500 mb-1">قيد الانتظار</span>
                            <span className="text-3xl font-black text-amber-500" dir="ltr">{pendingOrders}</span>
                        </div>
                        <div className="bg-amber-50 text-amber-500 p-4 rounded-2xl">
                            <Clock className="w-8 h-8" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-500 mb-1">تم الشحن</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-indigo-500" dir="ltr">{shippedOrders}</span>
                                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{successRate}% نسبة نجاح</span>
                            </div>
                        </div>
                        <div className="bg-indigo-50 text-indigo-500 p-4 rounded-2xl">
                            <Truck className="w-8 h-8" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="w-full">
                {isLoading ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-50 flex flex-col items-center justify-center">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-bold">جاري تحميل البيانات من السيرفر...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-2 md:p-6 overflow-hidden">
                        <DataTable columns={columns} data={orders || []} />
                    </div>
                )}
            </div>

            {/* Hidden Print Template Component for ALL orders */}
            <div className="hidden">
                <div ref={printRef} style={{ margin: 0, padding: 0 }}>
                    {orders?.map(order => (
                        <OrderLabelTemplate key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}

// Dummy Icon Component Since Package is not imported from lucide
function Package(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
}
```

# src/app/settings/ai/page.tsx

```tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch'; // تأكد من وجود هذا المكون في مشروعك
import { Bot, Sparkles, Save, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsAIPage() {
    // حالات وهمية للإعدادات (سيتم ربطها بالباك إند لاحقاً)
    const [apiKey, setApiKey] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('أنت مساعد ذكي لخدمة عملاء متجر YoussefTex. تجيب بلباق وتساعد في تتبع الطلبات.');
    const [autoReplyEnabled, setAutoReplyEnabled] = useState(true);

    const handleSaveChanges = () => {
        // هنا سيتم إرسال البيانات للباك إند
        toast.success('تم حفظ إعدادات الذكاء الاصطناعي بنجاح');
    };

    return (
        <div className="space-y-6">
            {/* قسم إعدادات النموذج */}
            <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-6 border-b border-gray-50 bg-gray-50/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 rounded-xl">
                            <Bot className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-black text-gray-900">إعدادات النموذج</CardTitle>
                            <CardDescription className="text-sm text-gray-500">قم بتكوين اتصال API والسلوك العام للذكاء الاصطناعي.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="apiKey" className="text-sm font-bold text-gray-700">مفتاح API (OpenRouter / OpenAI)</Label>
                        <Input
                            id="apiKey"
                            type="password"
                            placeholder="sk-or-v1-..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:border-primary"
                        />
                        <p className="text-xs text-gray-400">يتم تخزين المفتاح بشكل مشفر في قاعدة البيانات.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="systemPrompt" className="text-sm font-bold text-gray-700">الأمر النظامي (System Prompt)</Label>
                        <Textarea
                            id="systemPrompt"
                            placeholder="أنت مساعد ذكي..."
                            value={systemPrompt}
                            onChange={(e) => setSystemPrompt(e.target.value)}
                            className="min-h-[120px] bg-gray-50 border-gray-200 rounded-xl focus:border-primary resize-none"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* قسم الردود التلقائية */}
            <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-6 border-b border-gray-50 bg-gray-50/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-50 rounded-xl">
                            <MessageSquare className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-black text-gray-900">الردود التلقائية</CardTitle>
                            <CardDescription className="text-sm text-gray-500">إدارة كيفية رد البوت على استفسارات العملاء تلقائياً.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                <span className="font-bold text-gray-800">تفعيل الرد التلقائي</span>
                            </div>
                            <p className="text-xs text-gray-500">سيمكن البوت من الرد على الرسائل غير المعروفة تلقائياً.</p>
                        </div>
                        <Switch
                            checked={autoReplyEnabled}
                            onCheckedChange={setAutoReplyEnabled}
                            className="data-[state=checked]:bg-primary"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* زر الحفظ */}
            <div className="flex justify-end">
                <Button 
                    onClick={handleSaveChanges}
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-8 font-bold shadow-lg shadow-primary/20 transition-transform active:scale-95"
                >
                    <Save className="w-4 h-4 ml-2" />
                    حفظ التغييرات
                </Button>
            </div>
        </div>
    );
}
```

# src/app/settings/layout.tsx

```tsx
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
```

# src/app/settings/page.tsx

```tsx
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, User, Clock, MoreHorizontal, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { CreateUserDialog } from '@/components/settings/CreateUserDialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type UserType = {
    id: string;
    fullName: string;
    email: string;
    role: 'ADMIN' | 'SALES';
    isActive: boolean;
    lastSeen: string;
};

export default function SettingsPage() {
    const queryClient = useQueryClient();

    // 1. جلب قائمة الموظفين
    const { data: users, isLoading } = useQuery<UserType[]>({
        queryKey: ['settings-users'],
        queryFn: async () => {
            const res = await apiClient.get('/users');
            return res.data;
        },
    });

    // 2. تحديث حالة الموظف (تفعيل / تعطيل)
    const toggleStatusMutation = useMutation({
        mutationFn: async ({ id, isActive }: { id: string, isActive: boolean }) => {
            const res = await apiClient.put(`/users/${id}/toggle-status`, { isActive });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings-users'] });
            toast.success('تم تحديث حالة الحساب بنجاح');
        },
        onError: () => {
            toast.error('حدث خطأ أثناء تحديث حالة الحساب');
        }
    });

    // 3. حذف موظف
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await apiClient.delete(`/users/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings-users'] });
            toast.success('تم حذف الموظف بنجاح');
        },
        onError: () => {
            toast.error('حدث خطأ أثناء محاولة حذف الموظف');
        }
    });

    const handleToggle = (id: string, currentStatus: boolean) => {
        toggleStatusMutation.mutate({ id, isActive: !currentStatus });
    };

    const handleDelete = (id: string, fullName: string) => {
        if (window.confirm(`هل أنت متأكد من أنك تريد حذف حساب الموظف "${fullName}" نهائياً؟`)) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden animate-in fade-in duration-500">
            <div className="border-b border-gray-50 p-6 flex justify-between items-center bg-gray-50/30">
                <h2 className="text-lg font-black text-gray-900">طاقم العمل والموظفين</h2>
                {/* إدراج مكون إضافة موظف هنا */}
                <CreateUserDialog />
            </div>
            
            <div className="overflow-x-auto w-full">
                <table className="w-full text-sm text-right">
                    <thead className="bg-transparent border-b-2 border-gray-100">
                        <tr>
                            <th className="font-bold text-gray-500 px-6 py-4 whitespace-nowrap">الموظف</th>
                            <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">الدور والصلاحية</th>
                            <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">حالة الحساب</th>
                            <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">آخر ظهور</th>
                            <th className="font-bold text-gray-500 px-6 py-4 whitespace-nowrap text-center">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="text-center p-12">
                                    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"></div>
                                </td>
                            </tr>
                        ) : users?.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center p-12 text-gray-500 font-bold bg-gray-50/50">لا يوجد موظفين مسجلين حالياً.</td>
                            </tr>
                        ) : (
                            users?.map((user) => (
                                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                                                {user.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900">{user.fullName}</p>
                                                <p className="text-xs text-gray-500 font-bold" dir="ltr">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {user.role === 'ADMIN' ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-600 border border-purple-100 shadow-sm">
                                                <Shield className="w-3.5 h-3.5" /> مدير النظام
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                                                <User className="w-3.5 h-3.5" /> موظف مبيعات
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer"
                                                checked={user.isActive}
                                                onChange={() => handleToggle(user.id, user.isActive)}
                                                disabled={toggleStatusMutation.isPending}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 disabled:opacity-50"></div>
                                            <span className={`mr-3 text-xs font-bold ${user.isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                                                {user.isActive ? 'نشط' : 'معطل'}
                                            </span>
                                        </label>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-gray-500 font-bold text-sm flex items-center gap-1.5 mt-2">
                                        <Clock className="w-4 h-4" />
                                        {new Date(user.lastSeen).toLocaleDateString('ar-DZ')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {/* تفعيل القائمة المنسدلة للإجراءات */}
                                        <DropdownMenu dir="rtl">
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900 rounded-lg">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border-gray-100">
                                                <DropdownMenuItem 
                                                    className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 font-bold justify-start rounded-lg"
                                                    onClick={() => handleDelete(user.id, user.fullName)}
                                                    disabled={deleteMutation.isPending}
                                                >
                                                    <Trash2 className="w-4 h-4 ml-2" />
                                                    حذف الموظف
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
```

# src/components/distributors/create-distributor-dialog.tsx

```tsx
'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '@/lib/axios';

export function CreateDistributorDialog() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        wilayas: '',
        baseFee: 0,
    });

    const mutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const res = await apiClient.post('/distributors', data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['distributors'] });
            setOpen(false);
            setFormData({ name: '', phone: '', wilayas: '', baseFee: 0 });
            toast.success('تمت إضافة الموزع بنجاح');
        },
        onError: () => {
            toast.error('حدث خطأ أثناء إضافة الموزع');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md h-11 font-bold">
                    <Plus className="mr-0 ml-2 h-4 w-4" /> إضافة موزع
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-2xl" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black text-gray-900">إضافة موزع جديد</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-right block font-bold text-gray-700">اسم الشركة</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="شركة التوصيل..."
                            required
                            className="rounded-xl border-gray-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-right block font-bold text-gray-700">رقم الهاتف</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="05..."
                            dir="ltr"
                            className="text-right rounded-xl border-gray-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="wilayas" className="text-right block font-bold text-gray-700">مناطق التغطية</Label>
                        <Input
                            id="wilayas"
                            value={formData.wilayas}
                            onChange={(e) => setFormData({ ...formData, wilayas: e.target.value })}
                            placeholder="كل الولايات، أو 16, 09..."
                            className="rounded-xl border-gray-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="baseFee" className="text-right block font-bold text-gray-700">تسعيرة التوصيل (د.ج)</Label>
                        <Input
                            id="baseFee"
                            type="number"
                            value={formData.baseFee}
                            onChange={(e) => setFormData({ ...formData, baseFee: parseFloat(e.target.value) || 0 })}
                            min="0"
                            required
                            className="rounded-xl border-gray-200 text-right"
                            dir="ltr"
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-3 w-full">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-xl w-full">
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={mutation.isPending} className="bg-primary text-white rounded-xl w-full font-bold">
                            حفظ الموزع
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

```

# src/components/layout/dashboard-layout.tsx

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Users, Truck, Settings, Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

// روابط القائمة الجانبية حسب التصميم الجديد
const navItems = [
    { href: '/dashboard', label: 'لوحة القيادة', icon: LayoutDashboard },
    { href: '/', label: 'الطلبيات', icon: Package },
    { href: '/customers', label: 'العملاء', icon: Users },
    { href: '/distributors', label: 'الموزعون والشحن', icon: Truck },
    { href: '/dashboard/users', label: 'إدارة المستخدمين', icon: Users },
    { href: '/settings', label: 'الإعدادات', icon: Settings },
];

// روابط شريط التنقل السفلي للموبايل (بدون زر الإضافة لأنه سيكون عائماً)
const mobileNavItems = [
    { href: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    { href: '/', label: 'الطلبات', icon: Package },
    { href: '/customers', label: 'العملاء', icon: Users },
    { href: '/settings', label: 'الإعدادات', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-[280px] bg-white border-l border-gray-100 h-full min-h-screen text-gray-800 flex flex-col shadow-sm">
            {/* Logo Area */}
            <div className="p-6 flex items-center justify-center border-b border-gray-50 pb-6 mb-2">
                <div className="flex flex-col items-center gap-2 w-full">
                    <div className="bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-primary/20">
                        Y
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-xl font-black tracking-tight text-gray-900 leading-none mt-1">YoussefTex</h1>
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
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white hover:shadow-sm cursor-pointer transition-all border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                            Y
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 truncate max-w-[150px]">
                                المسؤول
                            </span>
                            <span className="text-xs text-gray-500 font-medium truncate max-w-[150px]" dir="ltr">
                                admin@ycf.com
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/20 selection:text-primary">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-shrink-0 z-20 relative">
                <Sidebar />
            </div>

            <div className="flex flex-col flex-1 w-full overflow-hidden relative">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 shadow-sm z-10 w-full sticky top-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary text-white w-9 h-9 rounded-xl flex items-center justify-center font-black shadow-sm">
                            Y
                        </div>
                        <h1 className="text-lg font-black text-gray-900 tracking-tight">YoussefTex</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-gray-500 rounded-full bg-gray-50 hover:bg-gray-100 h-9 w-9">
                            <Bell size={18} />
                        </Button>
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                            Y
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                {/* Padding bottom is larger on mobile to avoid hiding content behind the bottom nav */}
                <main className="flex-1 p-4 pb-28 md:p-8 md:pb-8 overflow-y-auto w-full max-w-[100vw] relative custom-scrollbar">
                    <div className="max-w-[1400px] mx-auto w-full h-full">
                        {children}
                    </div>
                </main>

                {/* Mobile Bottom Navigation */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-50 px-2 pb-safe pt-2">
                    <div className="flex items-center justify-around relative">
                        {mobileNavItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            // Insert the FAB (Floating Action Button) in the middle
                            if (index === 2) {
                                return (
                                    <React.Fragment key="fab">
                                        {/* Floating Action Button for Adding Orders */}
                                        <div className="relative -top-8 z-50">
                                            <Button className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/40 flex items-center justify-center text-white border-[6px] border-background active:scale-95 transition-transform">
                                                <Plus size={28} strokeWidth={3} />
                                            </Button>
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
```

# src/components/orders/BulkPrintButton.tsx

```tsx
'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { OrderLabelTemplate } from './OrderLabelTemplate';
import { Order } from './columns';

export function BulkPrintButton({ orders }: { orders: Order[] | undefined }) {
    const printRef = useRef<HTMLDivElement>(null);

    const preparingOrders = orders?.filter((o) => o.status === 'PREPARING') || [];

    const handlePrint = useReactToPrint({
        contentRef: printRef, // For v3
        documentTitle: 'ملصقات_الرد_المجمعة',
    }) as unknown as () => void;

    return (
        <>
            <Button
                onClick={handlePrint}
                disabled={preparingOrders.length === 0}
                className="w-full md:w-auto gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md h-11 font-bold"
            >
                <Printer className="w-4 h-4" />
                طباعة ملصقات التجهيز ({preparingOrders.length})
            </Button>

            <div className="hidden">
                {/* We use a container that removes margin/padding globally so the 100mm dimensions pop perfectly per page. */}
                <div ref={printRef} style={{ margin: 0, padding: 0 }}>
                    {preparingOrders.map((order) => (
                        <OrderLabelTemplate key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </>
    );
}

```

# src/components/orders/columns.tsx

```tsx
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Printer, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { OrderDetailsDialog } from './OrderDetailsDialog';
import { DeleteOrderDialog } from './DeleteOrderDialog';
import { OrderLabelTemplate } from './OrderLabelTemplate';
import { Checkbox } from '@/components/ui/checkbox';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { toast } from 'sonner';

export type Order = {
    id: string;
    customId: string;
    status: string;
    totalAmount: number;
    notes: string | null;
    images: string[];
    createdAt: string;
    distributorId?: string | null;
    customer?: {
        fullName: string;
        phone: string;
        state: string;
        city: string;
    };
    distributor?: {
        name: string;
    };
};

export const statusMap: Record<string, { label: string; color: string }> = {
    PENDING: { label: 'قيد الانتظار', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    PREPARING: { label: 'قيد التجهيز', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    SHIPPED: { label: 'تم الشحن', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    DELIVERED: { label: 'تم التوصيل', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    CANCELLED: { label: 'ملغى', color: 'bg-red-100 text-red-800 border-red-200' },
    RETURNED: { label: 'مرتجع', color: 'bg-rose-100 text-rose-800 border-rose-200' },
};

const StatusCell = ({ row }: { row: any }) => {
    const order = row.original as Order;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newStatus: string) => {
            const res = await apiClient.put(`/orders/${order.id}`, { status: newStatus });
            return res.data;
        },
        onSuccess: () => {
            toast.success('تم تحديث حالة الطلبية بنجاح');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: () => {
            toast.error('حدث خطأ أثناء تحديث الحالة');
        }
    });

    const statusProps = statusMap[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-800 border-gray-200' };

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Select
                defaultValue={order.status}
                value={order.status}
                onValueChange={(val) => mutation.mutate(val)}
                disabled={mutation.isPending}
            >
                <SelectTrigger className={`h-8 w-[130px] rounded-full text-xs font-bold border-none focus:ring-0 shadow-none ${statusProps.color}`} dir="rtl">
                    <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent dir="rtl" className="rounded-xl shadow-lg border-gray-100 z-[100]">
                    {Object.entries(statusMap).map(([value, { label, color }]) => (
                        <SelectItem key={value} value={value} className="cursor-pointer font-bold text-xs m-1 rounded-lg">
                            <span className={`px-2 py-1 rounded-md ${color}`}>{label}</span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

const DistributorCell = ({ row }: { row: any }) => {
    const order = row.original as Order;
    const queryClient = useQueryClient();

    const { data: distributors } = useQuery({
        queryKey: ['distributors'],
        queryFn: async () => {
            const res = await apiClient.get('/distributors');
            return res.data;
        }
    });

    const mutation = useMutation({
        mutationFn: async (newDistributorId: string) => {
            const payload = { distributorId: newDistributorId === 'none' ? null : newDistributorId };
            const res = await apiClient.put(`/orders/${order.id}`, payload);
            return res.data;
        },
        onSuccess: () => {
            toast.success('تم تعيين الموزع بنجاح');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: () => {
            toast.error('حدث خطأ أثناء تعيين الموزع');
        }
    });

    const currentValue = order.distributorId || 'none';

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Select
                defaultValue={currentValue}
                value={currentValue}
                onValueChange={(val) => mutation.mutate(val)}
                disabled={mutation.isPending}
            >
                <SelectTrigger className="h-8 border-none bg-gray-50/50 hover:bg-gray-100 font-medium text-gray-700 shadow-none focus:ring-0 rounded-lg w-[140px]" dir="rtl">
                    <SelectValue placeholder="بدون موزع" />
                </SelectTrigger>
                <SelectContent dir="rtl" className="rounded-xl shadow-lg border-gray-100 z-[100]">
                    <SelectItem value="none" className="cursor-pointer font-medium text-gray-500 rounded-lg m-1">بدون موزع</SelectItem>
                    {distributors?.map((distributor: any) => (
                        <SelectItem key={distributor.id} value={distributor.id} className="cursor-pointer font-bold text-gray-800 rounded-lg m-1">
                            {distributor.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

const ActionCell = ({ order }: { order: Order }) => {
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `ملصق_${order.customId}`,
    }) as unknown as () => void;

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-lg">
                        <span className="sr-only">فتح القائمة</span>
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-gray-100 z-50">
                    <DropdownMenuLabel className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1 px-2">الإجراءات</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-50" />
                    <DropdownMenuItem
                        className="cursor-pointer gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        onClick={handlePrint}
                    >
                        <Printer className="h-4 w-4 text-gray-500" />
                        طباعة ملصق
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        onClick={() => setDetailsOpen(true)}
                    >
                        <Eye className="h-4 w-4 text-primary" />
                        عرض التفاصيل
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-50" />
                    <DropdownMenuItem
                        className="cursor-pointer gap-3 p-2.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors font-bold focus:bg-red-50 focus:text-red-700"
                        onClick={() => setDeleteOpen(true)}
                    >
                        <Trash2 className="h-4 w-4" />
                        حذف الطلبية
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden">
                <div ref={printRef} style={{ margin: 0, padding: 0 }}>
                    <OrderLabelTemplate order={order} />
                </div>
            </div>

            <OrderDetailsDialog order={order} open={detailsOpen} onOpenChange={setDetailsOpen} />
            <DeleteOrderDialog orderId={order.id} open={deleteOpen} onOpenChange={setDeleteOpen} />
        </div>
    );
};

export const columns: ColumnDef<Order>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="pr-4" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="pr-4" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
    },
    {
        accessorKey: 'customId',
        header: 'رقم الطلبية',
        cell: ({ row }) => <div className="whitespace-nowrap font-black text-primary tracking-wide pl-2">{row.getValue('customId')}</div>,
        size: 150,
    },
    {
        accessorFn: (row) => row.customer?.fullName,
        id: 'customer.fullName',
        header: 'الزبون',
        cell: ({ row }) => <div className="whitespace-nowrap font-bold text-gray-900">{row.original.customer?.fullName || '-'}</div>,
        size: 200,
    },
    {
        accessorFn: (row) => row.customer?.phone,
        id: 'customer.phone',
        header: 'رقم الهاتف',
        cell: ({ row }) => <div className="whitespace-nowrap font-medium text-gray-600" dir="ltr">{row.original.customer?.phone || '-'}</div>,
        size: 130,
    },
    {
        id: 'customer.state',
        accessorFn: row => row.customer?.state,
        header: 'الولاية',
        cell: ({ row }) => <div className="whitespace-nowrap text-gray-600">{row.original.customer?.state || '-'}</div>,
        filterFn: "arrIncludesSome",
        size: 120,
    },
    {
        id: 'distributor.name',
        accessorFn: row => row.distributor?.name || "بدون موزع",
        header: 'الموزع',
        cell: ({ row }) => <div className="whitespace-nowrap"><DistributorCell row={row} /></div>,
        filterFn: "arrIncludesSome",
        size: 150,
    },
    {
        accessorKey: 'status',
        header: 'الحالة',
        cell: ({ row }) => <div className="whitespace-nowrap"><StatusCell row={row} /></div>,
        filterFn: "arrIncludesSome",
        size: 150,
    },
    {
        accessorKey: 'totalAmount',
        header: 'المبلغ الإجمالي',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('totalAmount'));
            return (
                <div className="whitespace-nowrap font-black text-gray-900">
                    {amount.toLocaleString('en-US')} <span className="text-sm font-bold text-gray-500">د.ج</span>
                </div>
            );
        },
        size: 130,
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => <div className="whitespace-nowrap"><ActionCell order={row.original} /></div>,
        size: 60,
    },
];
```

# src/components/orders/CreateOrderDialog.tsx

```tsx
'use client';

import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '@/lib/axios';

export function CreateOrderDialog() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        state: '',
        city: '',
        address: '',
        totalAmount: '',
        notes: '',
    });
    
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImages((prev) => [...prev, ...filesArray]);
            
            const newPreviews = filesArray.map(file => URL.createObjectURL(file));
            setImagePreviews((prev) => [...prev, ...newPreviews]);
        }
        // إعادة تعيين قيمة الإدخال للسماح باختيار نفس الصورة مجدداً إذا تم مسحها
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(newPreviews);
    };

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const res = await apiClient.post('/orders', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['customers'] }); // تحديث قائمة العملاء أيضاً
            setOpen(false);
            setFormData({ fullName: '', phone: '', state: '', city: '', address: '', totalAmount: '', notes: '' });
            setImages([]);
            setImagePreviews([]);
            toast.success('تم إنشاء الطلبية بنجاح');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'حدث خطأ أثناء إنشاء الطلبية');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullName || !formData.phone || !formData.totalAmount) {
            toast.error('يرجى تعبئة الحقول الإجبارية (الاسم، الهاتف، المبلغ)');
            return;
        }

        const submitData = new FormData();
        submitData.append('fullName', formData.fullName);
        submitData.append('phone', formData.phone);
        submitData.append('totalAmount', formData.totalAmount);
        
        if (formData.state) submitData.append('state', formData.state);
        if (formData.city) submitData.append('city', formData.city);
        if (formData.address) submitData.append('address', formData.address);
        if (formData.notes) submitData.append('notes', formData.notes);

        // إضافة الصور المتعددة
        images.forEach((file) => {
            submitData.append('images', file);
        });

        mutation.mutate(submitData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 h-11 font-bold px-6">
                    <Plus className="mr-0 ml-2 h-5 w-5" /> إضافة طلبية جديدة
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white border-none shadow-2xl rounded-2xl p-0 max-h-[90vh] overflow-y-auto" dir="rtl">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10">
                    <DialogTitle className="text-xl font-black text-gray-900">إضافة طلبية جديدة</DialogTitle>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* قسم العميل */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">معلومات العميل</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500">الاسم الكامل *</label>
                                <Input
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary font-bold"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500">رقم الهاتف *</label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary font-bold text-right"
                                    dir="ltr"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500">الولاية</label>
                                <Input
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500">المدينة / البلدية</label>
                                <Input
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary font-bold"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500">العنوان الكامل</label>
                            <Input
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary font-bold"
                            />
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* قسم الطلبية */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">تفاصيل الطلبية</h3>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500">المبلغ الإجمالي (د.ج) *</label>
                            <Input
                                type="number"
                                value={formData.totalAmount}
                                onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                                className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary font-black text-xl text-primary"
                                dir="ltr"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500">الملاحظات</label>
                            <Textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary resize-none font-medium p-4"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* قسم رفع الصور */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">صور الطلبية</h3>
                        <div 
                            className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <UploadCloud className="w-8 h-8 text-gray-400" />
                            <p className="text-sm font-bold text-gray-500">اضغط هنا لإرفاق صور المنتج/التفصيل</p>
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*" 
                                className="hidden" 
                                ref={fileInputRef} 
                                onChange={handleImageChange} 
                            />
                        </div>
                        {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                                {imagePreviews.map((src, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl border border-gray-200 overflow-hidden group">
                                        <img src={src} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                                        <button 
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                                            className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-3 pt-6 mt-6 border-t border-gray-100 sm:justify-start">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-xl h-11 px-6 font-bold w-full sm:w-auto">
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={mutation.isPending} className="rounded-xl h-11 px-8 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 w-full sm:w-auto">
                            {mutation.isPending ? 'جاري الإنشاء...' : 'تأكيد وإنشاء الطلبية'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
```

# src/components/orders/data-table-faceted-filter.tsx

```tsx
import * as React from "react"
import { Check, PlusCircle } from "lucide-react"
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>
    title?: string
    options: {
        label: string
        value: string
        icon?: React.ComponentType<{ className?: string }>
    }[]
}

export function DataTableFacetedFilter<TData, TValue>({
    column,
    title,
    options,
}: DataTableFacetedFilterProps<TData, TValue>) {
    const filterValues = (column?.getFilterValue() as string[]) || [];
    const selectedValues = new Set(filterValues);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-dashed rounded-xl" dir="rtl">
                    <PlusCircle className="ml-2 h-4 w-4" />
                    {title}
                    {selectedValues.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 space-x-reverse lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.size} مختارة
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => selectedValues.has(option.value))
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 rounded-xl" align="start" dir="rtl">
                <Command>
                    <CommandInput placeholder={`بحث في ${title}...`} />
                    <CommandList>
                        <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                return (
                                    <CommandItem
                                        key={option.value}
                                        value={option.label}
                                        className="rounded-lg cursor-pointer"
                                        onSelect={() => {
                                            if (selectedValues.has(option.value)) {
                                                selectedValues.delete(option.value);
                                            } else {
                                                selectedValues.add(option.value);
                                            }
                                            const filterValuesArr = Array.from(selectedValues);
                                            column?.setFilterValue(
                                                filterValuesArr.length ? filterValuesArr : undefined
                                            );
                                        }}
                                    >
                                        <div className={cn("mr-2 flex h-4 w-4 items-center justify-center rounded-sm border", selectedValues.has(option.value) ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible")}>
                                            <Check className="h-4 w-4" />
                                        </div>
                                        {option.icon && <option.icon className="ml-2 h-4 w-4 text-muted-foreground" />}
                                        <span>{option.label}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => column?.setFilterValue(undefined)}
                                        className="justify-center text-center font-bold text-red-600 rounded-lg cursor-pointer"
                                    >
                                        مسح الفرز
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

```

# src/components/orders/data-table-toolbar.tsx

```tsx
"use client"

import * as React from "react"
import { Table } from "@tanstack/react-table"
import { X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
}

const tabsOptions = [
    { label: 'الكل', value: 'ALL' },
    { label: 'قيد الانتظار', value: 'PENDING' },
    { label: 'قيد التجهيز', value: 'PREPARING' },
    { label: 'تم الشحن', value: 'SHIPPED' },
    { label: 'مكتمل', value: 'DELIVERED' },
    { label: 'ملغى/مرتجع', value: 'FAILED' },
];

export function DataTableToolbar<TData>({
    table,
    globalFilter,
    setGlobalFilter,
}: DataTableToolbarProps<TData>) {
    
    // إخفاء زر "إلغاء الفرز" إذا كان الفلتر الوحيد المفعل هو "الحالة" من التبويبات
    // يظهر فقط عند استخدام فلتر الولاية أو الموزع
    const activeFilters = table.getState().columnFilters.filter(f => f.id !== 'status');
    const isFiltered = activeFilters.length > 0;

    const distributorColumn = table.getColumn("distributor.name");
    // @ts-expect-error
    const distributorFacets = table.options.data.map(row => row.distributor?.name || "بدون موزع");
    const uniqueDistributors = Array.from(new Set(distributorFacets)).filter(Boolean).map(dist => ({ label: dist as string, value: dist as string }));

    const stateColumn = table.getColumn("customer.state");
    // @ts-expect-error
    const stateFacets = table.options.data.map(row => row.customer?.state);
    const uniqueStates = Array.from(new Set(stateFacets)).filter(Boolean).map(state => ({ label: state as string, value: state as string }));

    // 1. بحث سلس جداً (Local State + Debouncing)
    const [searchValue, setSearchValue] = React.useState(globalFilter ?? "");
    const [activeTab, setActiveTab] = React.useState("ALL");

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setGlobalFilter(searchValue);
        }, 200); // 200ms delay for super smooth typing

        return () => clearTimeout(timeout);
    }, [searchValue, setGlobalFilter]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    // 2. التحكم في التبويبات مباشرة (تتلون بالأزرق في اللحظة نفسها)
    const handleTabClick = (tabValue: string) => {
        setActiveTab(tabValue); // تحديث اللون فوراً
        
        if (tabValue === 'ALL') {
            table.getColumn("status")?.setFilterValue(undefined);
        } else if (tabValue === 'FAILED') {
            table.getColumn("status")?.setFilterValue(['CANCELLED', 'RETURNED']);
        } else {
            table.getColumn("status")?.setFilterValue([tabValue]);
        }
    };

    return (
        <div className="flex flex-col space-y-4 mb-4" dir="rtl">
            {/* شريط البحث المدمج السلس */}
            <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                    placeholder="بحث بالاسم، رقم الهاتف، أو رقم الطلبية..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="h-12 w-full rounded-2xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-900 placeholder:text-gray-400 pl-4 pr-12 text-sm font-bold shadow-sm transition-all"
                />
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                
                {/* التبويبات الأفقية (تتلون 100%) */}
                <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar gap-2 hide-scroll-bar">
                    {tabsOptions.map((tab) => {
                        const isSelected = activeTab === tab.value;
                        return (
                            <button
                                key={tab.value}
                                onClick={() => handleTabClick(tab.value)}
                                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                                    isSelected 
                                    ? 'bg-primary text-white shadow-md shadow-primary/30 transform scale-[0.98]' 
                                    : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center space-x-2 space-x-reverse flex-wrap gap-y-2">
                    {distributorColumn && uniqueDistributors.length > 0 && (
                        <DataTableFacetedFilter column={distributorColumn} title="كل الموزعين" options={uniqueDistributors} />
                    )}
                    {stateColumn && uniqueStates.length > 0 && (
                        <DataTableFacetedFilter column={stateColumn} title="كل الولايات" options={uniqueStates} />
                    )}
                    
                    {isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => {
                                table.resetColumnFilters();
                                // لا نعيد تعيين التبويب، نحذف فقط الفلاتر الجانبية
                            }}
                            className="h-10 px-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl font-bold"
                        >
                            إلغاء الفرز
                            <X className="mr-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
```

# src/components/orders/data-table.tsx

```tsx
'use client';

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
    ColumnFiltersState,
    RowSelectionState,
} from "@tanstack/react-table";
import { DataTableToolbar } from "./data-table-toolbar";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { Order, statusMap } from "./columns";
import { Button } from "@/components/ui/button";
import { Printer, Trash2, Edit, CheckSquare, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useReactToPrint } from "react-to-print";
import { OrderLabelTemplate } from "./OrderLabelTemplate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { toast } from "sonner";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

    const queryClient = useQueryClient();
    const bulkPrintRef = React.useRef<HTMLDivElement>(null);

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter,
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "includesString", 
    });

    const handleRowClick = (order: Order, event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const isInteractiveElement = target.closest('button') || target.closest('[role="combobox"]') || target.closest('[role="menu"]') || target.closest('.pr-4'); // pr-4 is the checkbox container
        
        if (!isInteractiveElement) {
            setSelectedOrder(order);
            setIsDetailsOpen(true);
        }
    };

    // --- الإجراءات الجماعية (Bulk Actions) ---
    const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original as Order);

    const handleBulkPrint = useReactToPrint({
        contentRef: bulkPrintRef,
        documentTitle: 'ملصقات_الطلبيات_المحددة',
    }) as unknown as () => void;

    const bulkStatusMutation = useMutation({
        mutationFn: async (newStatus: string) => {
            const ids = selectedRows.map(o => o.id);
            // إرسال الطلبات بالتوازي (Promise.all)
            await Promise.all(ids.map(id => apiClient.put(`/orders/${id}`, { status: newStatus })));
        },
        onSuccess: () => {
            toast.success(`تم تحديث حالة ${selectedRows.length} طلبية بنجاح`);
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            setRowSelection({}); // إفراغ التحديد بعد النجاح
        },
        onError: () => toast.error('حدث خطأ أثناء التحديث الجماعي'),
    });

    const bulkDeleteMutation = useMutation({
        mutationFn: async () => {
            const ids = selectedRows.map(o => o.id);
            await Promise.all(ids.map(id => apiClient.delete(`/orders/${id}`)));
        },
        onSuccess: () => {
            toast.success(`تم حذف ${selectedRows.length} طلبية بنجاح`);
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            setRowSelection({});
        },
        onError: () => toast.error('حدث خطأ أثناء الحذف الجماعي'),
    });

    const handleBulkDelete = () => {
        if (window.confirm(`هل أنت متأكد من حذف ${selectedRows.length} طلبية بشكل نهائي؟`)) {
            bulkDeleteMutation.mutate();
        }
    };

    return (
        <div className="space-y-6 w-full relative pb-20 md:pb-0">
            <DataTableToolbar table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            
            <div className="w-full overflow-x-auto rounded-xl pb-2 bg-white">
                <Table className="min-w-[1000px] w-full border-none">
                    <TableHeader className="bg-transparent border-b-2 border-gray-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-none hover:bg-transparent">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="font-bold text-gray-500 text-right py-4 whitespace-nowrap h-auto"
                                            style={{
                                                width: header.getSize(),
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={(e) => handleRowClick(row.original as Order, e)}
                                    className={`border-b border-gray-50 transition-colors cursor-pointer ${
                                        row.getIsSelected() ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-gray-50/80'
                                    }`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="text-right py-4 whitespace-nowrap"
                                            style={{
                                                width: cell.column.getSize(),
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-32 text-center text-gray-500 font-medium">
                                    لا توجد طلبيات تطابق الفلتر أو البحث الحالي.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {selectedOrder && (
                <OrderDetailsDialog 
                    order={selectedOrder} 
                    open={isDetailsOpen} 
                    onOpenChange={setIsDetailsOpen} 
                />
            )}

            {/* الشريط العائم للإجراءات الجماعية (يظهر فقط عند التحديد) */}
            {selectedRows.length > 0 && (
                <div className="fixed bottom-[80px] md:bottom-0 left-0 right-0 md:left-[280px] bg-white border-t border-gray-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-40 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="bg-primary text-white font-black px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-sm">
                                <CheckSquare className="w-5 h-5" />
                                تم تحديد <span dir="ltr" className="text-lg">{selectedRows.length}</span>
                            </div>
                            <Button variant="ghost" onClick={() => setRowSelection({})} className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl px-3 font-bold">
                                <X className="w-4 h-4 ml-1" /> إلغاء
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
                            <div className="min-w-[160px]">
                                <Select
                                    onValueChange={(val) => bulkStatusMutation.mutate(val)}
                                    disabled={bulkStatusMutation.isPending || bulkDeleteMutation.isPending}
                                >
                                    <SelectTrigger className="h-11 rounded-xl bg-gray-50 font-bold border-gray-200" dir="rtl">
                                        <Edit className="w-4 h-4 ml-2 text-gray-500" />
                                        <SelectValue placeholder="تغيير الحالة للكل" />
                                    </SelectTrigger>
                                    <SelectContent dir="rtl" className="rounded-xl shadow-xl border-gray-100">
                                        {Object.entries(statusMap).map(([value, { label, color }]) => (
                                            <SelectItem key={value} value={value} className="cursor-pointer font-bold text-xs m-1 rounded-lg">
                                                <span className={`px-2 py-1 rounded-md ${color.replace('hover:', '').replace('focus:', '')}`}>{label}</span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button 
                                onClick={handleBulkPrint} 
                                variant="outline" 
                                className="h-11 rounded-xl font-bold border-2 border-gray-200 hover:bg-gray-50 whitespace-nowrap"
                                disabled={bulkStatusMutation.isPending || bulkDeleteMutation.isPending}
                            >
                                <Printer className="w-4 h-4 ml-2" /> طباعة الملصقات
                            </Button>

                            <Button 
                                onClick={handleBulkDelete} 
                                className="h-11 rounded-xl font-bold bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none whitespace-nowrap"
                                disabled={bulkStatusMutation.isPending || bulkDeleteMutation.isPending}
                            >
                                <Trash2 className="w-4 h-4 ml-2" /> حذف الكل
                            </Button>
                        </div>

                    </div>
                </div>
            )}

            {/* الحاوية المخفية للطباعة الجماعية */}
            <div className="hidden">
                <div ref={bulkPrintRef} style={{ margin: 0, padding: 0 }}>
                    {selectedRows.map(order => (
                        <OrderLabelTemplate key={order.id} order={order} />
                    ))}
                </div>
            </div>

        </div>
    );
}
```

# src/components/orders/DeleteOrderDialog.tsx

```tsx
'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export function DeleteOrderDialog({ orderId, open, onOpenChange }: { orderId: string, open: boolean, onOpenChange: (open: boolean) => void }) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            await apiClient.delete(`/orders/${orderId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            onOpenChange(false);
        },
    });

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent dir="rtl" className="rounded-2xl border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-black text-gray-900">هل أنت متأكد من حذف الطلبية؟</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-500 font-medium leading-relaxed">
                        لا يمكن التراجع عن هذا الإجراء. سيتم حذف الطلبية نهائياً من قاعدة البيانات.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-3 mt-6">
                    <AlertDialogCancel className="rounded-xl font-bold bg-white text-gray-700 hover:bg-gray-100 border-gray-200 m-0">إلغاء</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => mutation.mutate()}
                        disabled={mutation.isPending}
                        className="rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm border-none m-0"
                    >
                        {mutation.isPending ? 'جاري الحذف...' : 'نعم، احذف الطلبية'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

```

# src/components/orders/EditOrderDialog.tsx

```tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { toast } from 'sonner';

export function EditOrderDialog({ order, open, onOpenChange }: any) {
    const queryClient = useQueryClient();
    
    // حالة للنموذج تشمل معلومات الطلب والزبون معاً
    const [formData, setFormData] = useState({
        totalAmount: 0,
        notes: '',
        customerName: '',
        customerPhone: '',
        customerState: '',
        customerCity: '',
        customerAddress: '',
    });

    useEffect(() => {
        if (order) {
            setFormData({
                totalAmount: order.totalAmount || 0,
                notes: order.notes || '',
                customerName: order.customer?.fullName || '',
                customerPhone: order.customer?.phone || '',
                customerState: order.customer?.state || '',
                customerCity: order.customer?.city || '',
                customerAddress: order.customer?.address || '',
            });
        }
    }, [order]);

    // الـ Mutation لتحديث الطلبية
    const orderMutation = useMutation({
        mutationFn: async (data: any) => {
            // تحديث الطلبية (المبلغ والملاحظات)
            await apiClient.put(`/orders/${order.id}`, {
                totalAmount: Number(data.totalAmount),
                notes: data.notes,
            });

            // تحديث معلومات الزبون إذا كان موجوداً
            if (order.customerId) {
                await apiClient.put(`/customers/${order.customerId}`, {
                    fullName: data.customerName,
                    phone: data.customerPhone,
                    state: data.customerState,
                    city: data.customerCity,
                    address: data.customerAddress,
                });
            }
        },
        onSuccess: () => {
            toast.success('تم حفظ التعديلات بنجاح');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            onOpenChange(false);
        },
        onError: () => {
            toast.error('حدث خطأ أثناء حفظ التعديلات');
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        orderMutation.mutate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl bg-white border-none shadow-2xl rounded-2xl p-0 max-h-[90vh] overflow-y-auto" dir="rtl">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10">
                    <DialogTitle className="text-xl font-black text-gray-900">تعديل معلومات الطلبية والعميل</DialogTitle>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* قسم معلومات العميل */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">معلومات العميل</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500">الاسم الكامل</label>
                                <Input
                                    value={formData.customerName}
                                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                    className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500">رقم الهاتف</label>
                                <Input
                                    value={formData.customerPhone}
                                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                                    className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 font-bold text-right"
                                    dir="ltr"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500">الولاية</label>
                                <Input
                                    value={formData.customerState}
                                    onChange={(e) => setFormData({ ...formData, customerState: e.target.value })}
                                    className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500">المدينة / البلدية</label>
                                <Input
                                    value={formData.customerCity}
                                    onChange={(e) => setFormData({ ...formData, customerCity: e.target.value })}
                                    className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500">العنوان الكامل</label>
                            <Input
                                value={formData.customerAddress}
                                onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                                className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 font-bold"
                            />
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* قسم معلومات الطلبية */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">تفاصيل الطلبية</h3>
                        
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500">المبلغ الإجمالي (د.ج)</label>
                            <Input
                                type="number"
                                value={formData.totalAmount}
                                onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                                className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 font-black text-xl text-primary"
                                dir="ltr"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500">الملاحظات</label>
                            <Textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none font-medium p-4"
                                rows={4}
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-3 pt-6 mt-6 border-t border-gray-100 sm:justify-start">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl h-11 px-6 font-bold w-full sm:w-auto">
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={orderMutation.isPending} className="rounded-xl h-11 px-8 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 w-full sm:w-auto">
                            {orderMutation.isPending ? 'جاري الحفظ...' : 'حفظ كافة التعديلات'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
```

# src/components/orders/OrderDetailsDialog.tsx

```tsx
'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EditOrderDialog } from './EditOrderDialog';
import { useState, useRef } from 'react';
import { MapPin, User, Package, Truck, Receipt, Printer, Pencil, CalendarClock, ChevronRight, ImageIcon } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { OrderLabelTemplate } from './OrderLabelTemplate';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { toast } from 'sonner';

export function OrderDetailsDialog({ order, open, onOpenChange }: any) {
    const [editOpen, setEditOpen] = useState(false);
    const printRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `ملصق_${order?.customId}`,
    }) as unknown as () => void;

    // Mutation الخاص بتحديث الحالة مباشرة
    const statusMutation = useMutation({
        mutationFn: async (newStatus: string) => {
            const res = await apiClient.put(`/orders/${order.id}`, { status: newStatus });
            return res.data;
        },
        onSuccess: () => {
            toast.success('تم تحديث حالة الطلبية بنجاح');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: () => {
            toast.error('حدث خطأ أثناء تحديث الحالة');
        }
    });

    if (!order) return null;

    const statusMap: Record<string, { label: string; color: string }> = {
        PENDING: { label: 'قيد الانتظار', color: 'bg-amber-100 text-amber-700 hover:bg-amber-200 focus:bg-amber-200' },
        PREPARING: { label: 'قيد التجهيز', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:bg-blue-200' },
        SHIPPED: { label: 'تم الشحن', color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:bg-indigo-200' },
        DELIVERED: { label: 'مكتمل', color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 focus:bg-emerald-200' },
        CANCELLED: { label: 'ملغى', color: 'bg-red-100 text-red-700 hover:bg-red-200 focus:bg-red-200' },
        RETURNED: { label: 'مرتجع', color: 'bg-rose-100 text-rose-700 hover:bg-rose-200 focus:bg-rose-200' },
    };

    const statusObj = statusMap[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-700' };
    
    const orderDate = new Date(order.createdAt).toLocaleString('ar-DZ', { 
        year: 'numeric', month: 'long', day: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
    });

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 bg-[#F8FAFC] border-none shadow-2xl rounded-2xl" dir="rtl">
                    
                    {/* Header (Top Bar) - Sticky */}
                    <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-20">
                        <div className="flex items-center gap-3">
                            <button onClick={() => onOpenChange(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-500">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                            <DialogTitle className="text-xl font-black text-gray-900 m-0">تفاصيل الطلب</DialogTitle>
                        </div>

                        {/* Status Select Dropdown */}
                        <div className="relative">
                            <Select
                                defaultValue={order.status}
                                value={order.status}
                                onValueChange={(val) => statusMutation.mutate(val)}
                                disabled={statusMutation.isPending}
                            >
                                <SelectTrigger className={`h-9 px-4 rounded-full text-sm font-bold border-none shadow-none focus:ring-0 focus:ring-offset-0 transition-colors ${statusObj.color}`} dir="rtl">
                                    <SelectValue placeholder="اختر الحالة" />
                                </SelectTrigger>
                                <SelectContent dir="rtl" className="rounded-xl shadow-lg border-gray-100 min-w-[140px] z-[100]">
                                    {Object.entries(statusMap).map(([value, { label, color }]) => (
                                        <SelectItem key={value} value={value} className="cursor-pointer font-bold text-xs m-1 rounded-lg">
                                            <span className={`px-2 py-1 rounded-md ${color.replace('hover:', '').replace('focus:', '')}`}>{label}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Main Content Body */}
                    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                        
                        {/* Order ID & Customer Card */}
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between items-start gap-4 relative">
                            {/* زر تعديل المعلومات بارز في الأعلى يساراً */}
                            <Button 
                                variant="outline"
                                onClick={() => setEditOpen(true)}
                                className="absolute top-5 left-5 h-9 px-3 rounded-xl text-sm font-bold text-primary border-primary/20 bg-primary/5 hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2"
                            >
                                <Pencil className="w-3.5 h-3.5" /> تعديل المعلومات
                            </Button>

                            <div>
                                <h2 className="text-2xl font-black text-primary mb-1 tracking-wide">{order.customId}</h2>
                                <p className="text-gray-500 text-sm font-medium flex items-center gap-1.5">
                                    <CalendarClock className="w-4 h-4" /> {orderDate}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 w-full mt-2">
                                <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    <User className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <p className="font-black text-gray-900 text-lg">{order.customer?.fullName || 'غير متوفر'}</p>
                                    <p className="text-sm text-gray-600 font-bold" dir="ltr">{order.customer?.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Address Card */}
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-bold text-primary flex items-center gap-2 mb-4">
                                <MapPin className="w-5 h-5" /> عنوان التوصيل
                            </h3>
                            <div className="mr-7 space-y-1.5">
                                <p className="font-bold text-gray-900 text-lg">{order.customer?.state} - {order.customer?.city}</p>
                                <p className="text-gray-500 font-medium leading-relaxed">{order.customer?.address || 'لا يوجد عنوان تفصيلي'}</p>
                            </div>
                        </div>

                        {/* Products / Notes & Images Card */}
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-bold text-primary flex items-center gap-2 mb-4">
                                <Package className="w-5 h-5" /> تفاصيل الطلب والصور
                            </h3>
                            
                            {order.notes && (
                                <div className="bg-amber-50/50 border border-amber-100 text-amber-900 p-4 rounded-xl mb-4 font-medium leading-relaxed text-sm">
                                    {order.notes}
                                </div>
                            )}

                            {order.images && order.images.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                                    {order.images.map((img: string, i: number) => (
                                        <a key={i} href={img} target="_blank" rel="noreferrer" className="block group rounded-xl overflow-hidden border border-gray-200 aspect-square">
                                            <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt={`صورة القماش ${i+1}`} />
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-6 text-gray-400 gap-2 border-2 border-dashed border-gray-100 rounded-xl">
                                    <ImageIcon className="w-8 h-8 opacity-50" />
                                    <span className="text-sm font-medium">لا توجد صور مرفقة لهذه الطلبية</span>
                                </div>
                            )}
                        </div>

                        {/* Financial Summary Card */}
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-bold text-primary flex items-center gap-2 mb-4">
                                <Receipt className="w-5 h-5" /> الملخص المالي
                            </h3>
                            <div className="space-y-3 mr-7">
                                <div className="flex justify-between items-center text-gray-600 font-medium text-sm">
                                    <span>الإجمالي الفرعي</span>
                                    <span dir="ltr">{Number(order.totalAmount).toLocaleString('en-US')} د.ج</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600 font-medium text-sm">
                                    <span>مصاريف الشحن</span>
                                    <span dir="ltr" className={order.deliveryFee ? "text-orange-600" : ""}>
                                        {order.deliveryFee ? `${Number(order.deliveryFee).toLocaleString('en-US')} د.ج` : 'لم تحدد بعد'}
                                    </span>
                                </div>
                                <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                                    <span className="font-bold text-gray-900">الإجمالي الصافي</span>
                                    <span className="text-2xl font-black text-primary" dir="ltr">
                                        {Number(order.totalAmount).toLocaleString('en-US')} د.ج
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Info Card */}
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h3 className="text-sm font-bold text-primary flex items-center gap-2 mb-2">
                                    <Truck className="w-5 h-5" /> معلومات الشحن
                                </h3>
                                <div className="mr-7">
                                    <p className="font-bold text-gray-900 text-lg">{order.distributor?.name || 'لم يتم تعيين شركة شحن بعد'}</p>
                                </div>
                            </div>
                            {order.distributor?.name && (
                                <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold tracking-widest uppercase border border-blue-100">
                                    EXPRESS
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Footer Actions (Sticky Bottom) - مخصص الآن للطباعة فقط */}
                    <div className="bg-white p-4 border-t border-gray-100 sticky bottom-0 z-10 flex gap-3">
                        <Button 
                            onClick={handlePrint}
                            className="flex-1 bg-primary hover:bg-primary/90 text-white h-12 rounded-xl font-bold shadow-lg shadow-primary/20 text-base"
                        >
                            <Printer className="w-5 h-5 ml-2" /> طباعة البوليصة
                        </Button>
                    </div>

                </DialogContent>
            </Dialog>

            {/* Hidden Print Template Component for this specific order */}
            <div className="hidden">
                <div ref={printRef} style={{ margin: 0, padding: 0 }}>
                    <OrderLabelTemplate order={order} />
                </div>
            </div>

            {/* Edit Order Modal (لتعديل كافة المعلومات) */}
            {editOpen && <EditOrderDialog order={order} open={editOpen} onOpenChange={setEditOpen} />}
        </>
    );
}
```

# src/components/orders/OrderLabelTemplate.tsx

```tsx
'use client';

import { QRCodeSVG } from 'qrcode.react';

export function OrderLabelTemplate({ order }: { order: any }) {
    if (!order) return null;

    return (
        <div className="flex flex-col px-4 py-3 mx-auto bg-white text-black font-sans" dir="rtl" style={{ width: '100mm', height: '148mm', boxSizing: 'border-box', overflow: 'hidden', pageBreakInside: 'avoid', pageBreakAfter: 'always', backgroundColor: 'white', color: 'black' }}>
            {/* Header: Store Info */}
            <div className="flex flex-col items-center justify-center border-b-2 pb-2 mb-2 border-black">
                <h1 className="text-4xl font-black tracking-wider text-center">يوسف للأقمشة</h1>
            </div>

            {/* Order Identifier & QR Code */}
            <div className="flex justify-between items-center border-b-2 pb-2 mb-2 border-black">
                <div className="flex flex-col gap-1 w-2/3">
                    <span className="text-[10px] uppercase font-bold text-gray-500">رقم الطلبية</span>
                    <span className="text-xl font-black">{order.customId}</span>
                    <span className="text-xs font-semibold mt-1 text-gray-600" dir="ltr" style={{ textAlign: 'right' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-GB')}
                    </span>
                </div>
                <div className="flex flex-col items-end w-1/3">
                    {/* USE QRCodeSVG from 'qrcode.react' here with size={56} */}
                    <QRCodeSVG value={order.customId} size={56} level="M" includeMargin={false} />
                </div>
            </div>

            {/* Customer Information */}
            <div className="flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-[10px] uppercase font-bold text-gray-500">إلى السيد(ة)</span>
                    <h2 className="text-2xl font-black leading-tight mt-0.5 truncate">{order.customer?.fullName || order.customerName || 'عنصر غير متوفر'}</h2>
                </div>

                <div className="mb-2">
                    <span className="text-[10px] uppercase font-bold text-gray-500">رقم الهاتف</span>
                    <p className="text-3xl font-black tracking-widest mt-0.5" dir="ltr" style={{ textAlign: 'left' }}>
                        {order.customer?.phone || order.phone || ''}
                    </p>
                </div>

                <div className="mb-1">
                    <span className="text-[10px] uppercase font-bold text-gray-500">العنوان</span>
                    <p className="text-lg font-bold leading-snug mt-0.5">
                        {order.customer?.state || order.state || ''} - {order.customer?.city || order.city || ''}
                    </p>
                    <p className="text-base font-semibold leading-snug mt-0.5 text-gray-800 line-clamp-2">
                        {order.customer?.address || order.address || ''}
                    </p>
                </div>
            </div>

            {/* Cash On Delivery Amount */}
            <div className="mt-auto border-t-2 border-dashed pt-2 border-black">
                <div className="flex justify-between items-center border-2 rounded p-2 border-black bg-gray-100" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                    <div className="flex flex-col">
                        <span className="text-sm font-black uppercase">الدفع عند الاستلام</span>
                        <span className="text-[10px] font-bold mt-0.5 text-gray-600" dir="ltr">CASH ON DELIVERY</span>
                    </div>
                    <div className="text-2xl font-black flex items-center gap-1" dir="ltr">
                        <span>{order.totalAmount}</span>
                        <span className="text-base font-bold">DZD</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

```

# src/components/providers.tsx

```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthProvider } from '@/lib/auth';

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
            },
        },
    }));

    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthProvider>
    );
}

```

# src/components/settings/CreateUserDialog.tsx

```tsx
'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '@/lib/axios';

export function CreateUserDialog() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        role: 'SALES', // افتراضي موظف مبيعات
    });

    const mutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const res = await apiClient.post('/users', data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings-users'] });
            setOpen(false);
            setFormData({ fullName: '', email: '', role: 'SALES' });
            toast.success('تمت إضافة الموظف بنجاح');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'حدث خطأ أثناء إضافة الموظف');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email) {
            toast.error('يرجى تعبئة جميع الحقول المطلوبة');
            return;
        }
        mutation.mutate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 h-11 font-bold px-6">
                    <Plus className="mr-0 ml-2 h-5 w-5" /> إضافة موظف جديد
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-white border-none shadow-2xl rounded-2xl p-0" dir="rtl">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <DialogTitle className="text-xl font-black text-gray-900">إضافة موظف جديد</DialogTitle>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500">الاسم الكامل *</label>
                        <Input
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary font-bold"
                            placeholder="مثال: يوسف بلقاسم"
                            required
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500">البريد الإلكتروني * (مهم لتسجيل الدخول)</label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary font-bold text-left"
                            dir="ltr"
                            placeholder="employee@yousseftex.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500">الصلاحيات والدور *</label>
                        <select 
                            value={formData.role} 
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary font-bold px-3 text-sm"
                        >
                            <option value="SALES">موظف مبيعات (SALES)</option>
                            <option value="ADMIN">مدير نظام (ADMIN)</option>
                        </select>
                    </div>

                    <DialogFooter className="gap-3 pt-4 mt-4 border-t border-gray-100 sm:justify-start">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-xl h-11 px-6 font-bold">
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={mutation.isPending} className="rounded-xl h-11 px-8 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20">
                            {mutation.isPending ? 'جاري الإضافة...' : 'حفظ الموظف'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
```

# src/components/ui/alert-dialog.tsx

```tsx
"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  size?: "default" | "sm"
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "bg-muted mb-2 inline-flex size-16 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Action
        data-slot="alert-dialog-action"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Cancel
        data-slot="alert-dialog-cancel"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}

```

# src/components/ui/alert.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }

```

# src/components/ui/badge.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

```

# src/components/ui/button.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

```

# src/components/ui/card.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

# src/components/ui/checkbox.tsx

```tsx
"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

```

# src/components/ui/command.tsx

```tsx
"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

```

# src/components/ui/dialog.tsx

```tsx
"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

```

# src/components/ui/dropdown-menu.tsx

```tsx
"use client"

import * as React from "react"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}

```

# src/components/ui/form.tsx

```tsx
"use client"

import * as React from "react"
import type { Label as LabelPrimitive } from "radix-ui"
import { Slot } from "radix-ui"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot.Root>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot.Root
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

# src/components/ui/input.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

# src/components/ui/label.tsx

```tsx
"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

```

# src/components/ui/popover.tsx

```tsx
"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <div
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
}

```

# src/components/ui/scroll-area.tsx

```tsx
"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }

```

# src/components/ui/select.tsx

```tsx
"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="absolute right-2 flex size-3.5 items-center justify-center"
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

```

# src/components/ui/separator.tsx

```tsx
"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

```

# src/components/ui/sheet.tsx

```tsx
"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

# src/components/ui/switch.tsx

```tsx
"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

```

# src/components/ui/table.tsx

```tsx
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

# src/components/ui/textarea.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

```

# src/hooks/useApiClient.ts

```ts
// src/hooks/useApiClient.ts
import { useEffect } from 'react';
import apiClient from '@/lib/axios';

export function useApiClient() {
    useEffect(() => {
        const requestInterceptor = apiClient.interceptors.request.use(
            async (config) => {
                // Get token from localStorage if available
                const token = localStorage.getItem('authToken');
                
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Clean up the interceptor to avoid memory leaks
        return () => {
            apiClient.interceptors.request.eject(requestInterceptor);
        };
    }, []);

    return apiClient;
}
```

# src/lib/auth/context.ts

```ts
/**
 * Auth Context
 * Central context for authentication state management
 */

'use client';

import React, { createContext } from 'react';
import type { AuthContextType, User } from './types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { type AuthContextType, type User };

```

# src/lib/auth/hooks.ts

```ts
/**
 * useAuth Hook
 * Custom hook to access authentication context
 */

'use client';

import { useContext } from 'react';
import { AuthContext } from './context';
import type { AuthContextType } from './types';

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

// Helper hooks for common operations
export const useIsAdmin = () => {
    const { user } = useAuth();
    return user?.roleName === 'ADMIN';
};

export const useIsSales = () => {
    const { user } = useAuth();
    return user?.roleName === 'SALES';
};

export const useIsAccountant = () => {
    const { user } = useAuth();
    return user?.roleName === 'ACCOUNTANT';
};

export const useHasRole = (role: string) => {
    const { user } = useAuth();
    return user?.roleName === role;
};

export const useIsAuthenticated = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated;
};

export const useAuthUser = () => {
    const { user } = useAuth();
    return user;
};

```

# src/lib/auth/index.ts

```ts
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

```

# src/lib/auth/provider.tsx

```tsx
/**
 * Auth Provider
 * Manages authentication state and provides auth methods
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { AuthContext } from './context';
import type {
    AuthContextType,
    AuthState,
    LoginCredentials,
    AuthContextProviderProps,
    User,
} from './types';
import { getApiClient } from '../axios';

const STORAGE_KEYS = {
    TOKEN: 'auth_token',
    USER: 'auth_user',
    EXPIRES_AT: 'auth_expires_at',
};

export const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        isLoading: true,
        isAuthenticated: false,
        error: null,
    });

    // Initialize auth state from localStorage on mount
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
                const userStr = localStorage.getItem(STORAGE_KEYS.USER);
                const expiresAt = localStorage.getItem(STORAGE_KEYS.EXPIRES_AT);

                if (token && userStr && expiresAt) {
                    // Check if token is expired
                    if (new Date().getTime() > parseInt(expiresAt)) {
                        // Token expired, try to refresh
                        await refreshTokenInternal(token);
                    } else {
                        // Token still valid
                        const user = JSON.parse(userStr) as User;
                        setState({
                            user,
                            token,
                            isLoading: false,
                            isAuthenticated: true,
                            error: null,
                        });
                    }
                } else {
                    setState((prev) => ({
                        ...prev,
                        isLoading: false,
                    }));
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                // Clear invalid auth data
                clearAuth();
                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                }));
            }
        };

        initializeAuth();
    }, []);

    // Clear all auth data
    const clearAuth = useCallback(() => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.EXPIRES_AT);
    }, []);

    // Store auth data
    const storeAuth = useCallback((token: string, user: User, expiresIn: number) => {
        const expiresAt = new Date().getTime() + expiresIn * 1000; // Convert to milliseconds
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, expiresAt.toString());
    }, []);

    // Login function
    const login = useCallback(async (credentials: LoginCredentials) => {
        setState((prev) => ({
            ...prev,
            isLoading: true,
            error: null,
        }));

        try {
            const client = getApiClient();
            const response = await client.post('/auth/login', credentials);

            if (response.data.success) {
                const { user, token, expiresIn } = response.data.data;
                storeAuth(token, user, expiresIn);

                setState({
                    user,
                    token,
                    isLoading: false,
                    isAuthenticated: true,
                    error: null,
                });
            } else {
                throw new Error(response.data.error || 'Login failed');
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.error || error.message || 'Login failed';
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: errorMessage,
            }));
            throw error;
        }
    }, [storeAuth]);

    // Logout function
    const logout = useCallback(async () => {
        try {
            const client = getApiClient();
            if (state.token) {
                // Call logout endpoint for logging purposes
                await client.post('/auth/logout', {});
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            clearAuth();
            setState({
                user: null,
                token: null,
                isLoading: false,
                isAuthenticated: false,
                error: null,
            });
        }
    }, [state.token, clearAuth]);

    // Register function (for future use)
    const register = useCallback(async (fullName: string, email: string, password: string) => {
        setState((prev) => ({
            ...prev,
            isLoading: true,
            error: null,
        }));

        try {
            const client = getApiClient();
            const response = await client.post('/auth/register', {
                fullName,
                email,
                password,
            });

            if (response.data.success) {
                const { user } = response.data.data;
                // After registration, user should login
                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    error: null,
                }));
            } else {
                throw new Error(response.data.error || 'Registration failed');
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.error || error.message || 'Registration failed';
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: errorMessage,
            }));
            throw error;
        }
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        setState((prev) => ({
            ...prev,
            error: null,
        }));
    }, []);

    // Refresh token internal function
    const refreshTokenInternal = useCallback(
        async (currentToken: string) => {
            try {
                const client = getApiClient(currentToken);
                const response = await client.post('/auth/refresh', {});

                if (response.data.success) {
                    const { token, user, expiresIn } = response.data.data;
                    storeAuth(token, user, expiresIn);

                    setState((prev) => ({
                        ...prev,
                        user,
                        token,
                        isLoading: false,
                        isAuthenticated: true,
                    }));
                    return true;
                } else {
                    clearAuth();
                    setState((prev) => ({
                        ...prev,
                        isLoading: false,
                    }));
                    return false;
                }
            } catch (error) {
                console.error('Token refresh error:', error);
                clearAuth();
                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                }));
                return false;
            }
        },
        [storeAuth, clearAuth]
    );

    // Refresh token (public method)
    const refreshToken = useCallback(async () => {
        if (state.token) {
            await refreshTokenInternal(state.token);
        }
    }, [state.token, refreshTokenInternal]);

    // Verify token
    const verifyToken = useCallback(async () => {
        if (!state.token) {
            return false;
        }

        try {
            const client = getApiClient(state.token);
            const response = await client.post('/auth/verify', {});

            if (response.data.success && response.data.data.valid) {
                return true;
            } else {
                // Token is invalid, clear auth
                clearAuth();
                setState({
                    user: null,
                    token: null,
                    isLoading: false,
                    isAuthenticated: false,
                    error: 'Token is invalid',
                });
                return false;
            }
        } catch (error) {
            console.error('Token verify error:', error);
            clearAuth();
            setState({
                user: null,
                token: null,
                isLoading: false,
                isAuthenticated: false,
                error: 'Token verification failed',
            });
            return false;
        }
    }, [state.token, clearAuth]);

    const value: AuthContextType = {
        ...state,
        login,
        logout,
        register,
        clearError,
        refreshToken,
        verifyToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

```

# src/lib/auth/routes.tsx

```tsx
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

```

# src/lib/auth/types.ts

```ts
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

```

# src/lib/axios.ts

```ts
import axios from 'axios';

// إنشاء نسخة Axios مهيأة للاتصال بـ API الواجهة الخلفية
const defaultApiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Get API client with optional token
 * @param token - Optional JWT token for authentication
 * @returns Configured axios instance
 */
export function getApiClient(token?: string) {
    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787/api',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Add token to Authorization header if provided
    if (token) {
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return client;
}

export default defaultApiClient;
```

# src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

```

# src/middleware.ts

```ts
import { NextRequest, NextResponse } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = ['/dashboard', '/customers', '/distributors', '/settings', '/'];

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // Check if the current path is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    if (isProtectedRoute) {
        // Add your custom authentication logic here
        // For now, we'll just allow all requests
        return NextResponse.next();
    }
    
    return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
    matcher: [
        // Skip static files and Next.js internals
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```

