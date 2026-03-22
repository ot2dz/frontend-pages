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
        PREPARING: { label: 'تم التجهيز', color: 'bg-blue-100 text-blue-700' },
        SHIPPED: { label: 'تم الشحن', color: 'bg-indigo-100 text-indigo-700' },
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