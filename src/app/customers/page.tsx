'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Search, MapPin, Phone, MessageCircle, Star, Users, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Customer {
    id: string;
    fullName: string;
    phone: string;
    state: string;
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
                        <Card key={customer.id} className="h-full rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 bg-white overflow-hidden group cursor-pointer">
                                <CardContent className="p-6">
                                {/* Header: Avatar & Info - clickable area */}
                                <Link href={`/customers/${customer.id}`} className="block outline-none">
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
                                                {customer.state || 'الولاية'}
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
                                </Link>

                                {/* Action Buttons - outside Link to avoid nested <a> */}
                                <div className="flex gap-3">
                                    <a 
                                        href={`tel:${customer.phone}`} 
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 h-10 rounded-xl font-bold text-xs transition-colors"
                                    >
                                        <Phone className="w-4 h-4" /> اتصال
                                    </a>
                                    <a 
                                        href={`https://wa.me/213${customer.phone.replace(/^0/, '')}`} 
                                        target="_blank" rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
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