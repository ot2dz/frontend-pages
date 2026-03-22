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
import { MobileOrdersView } from '@/components/orders/MobileOrdersView';

export default function OrdersPage() {
    const queryClient = useQueryClient();
    const printRef = useRef<HTMLDivElement>(null);

    const { data: rawOrders, isLoading } = useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await apiClient.get('/orders');
            return res.data;
        },
    });

    // Sort orders by newest first
    const orders = rawOrders ? [...rawOrders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : undefined;

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
            <div className="w-full">
                {/* Mobile View */}
                <div className="block md:hidden">
                    {!isLoading && orders ? (
                        <MobileOrdersView orders={orders} />
                    ) : (
                        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 font-bold">جاري تحميل الطلبات المفصلة...</p>
                        </div>
                    )}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">إدارة الطلبات المتقدمة</h1>
                            <p className="text-gray-500 font-medium text-sm">متابعة ومعالجة جميع الطلبات الواردة والشحنات</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="h-11 rounded-xl font-bold bg-white text-gray-700 border-gray-200 shadow-sm hover:bg-gray-50 hidden md:flex items-center gap-2">
                                <Clock className="w-4 h-4" /> السجل والتقارير
                            </Button>
                            <BulkPrintButton orders={orders} />
                            <CreateOrderDialog />
                        </div>
                    </div>

                    {/* Top Stats Cards (Desktop Only) */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                        <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                            <CardContent className="p-6 flex flex-row items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-500 mb-1">إجمالي الطلبات</span>
                                    <span className="text-3xl font-black text-primary" dir="ltr">{totalOrders}</span>
                                </div>
                                <div className="bg-blue-50 text-primary p-4 rounded-2xl">
                                    <Printer className="w-8 h-8" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                            <CardContent className="p-6 flex flex-row items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-500 mb-1">قيد الانتظار والتجهيز</span>
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
                                    <span className="text-3xl font-black text-indigo-500" dir="ltr">{shippedOrders}</span>
                                </div>
                                <div className="bg-indigo-50 text-indigo-500 p-4 rounded-2xl">
                                    <Truck className="w-8 h-8" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-emerald-600 relative overflow-hidden">
                            <div className="absolute inset-0 bg-emerald-600/90 mix-blend-multiply"></div>
                            <CardContent className="p-6 relative z-10 flex flex-row items-center justify-between">
                                <div className="flex flex-col text-white">
                                    <span className="text-sm font-bold text-white/80 mb-1">معدل التوصيل الناجح</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-black" dir="ltr">{successRate}%</span>
                                        <span className="text-xs font-bold text-emerald-200">({deliveredOrders} طلب)</span>
                                    </div>
                                </div>
                                <div className="bg-white/20 text-white p-4 rounded-2xl backdrop-blur-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100/60 p-1 md:p-6 mb-6">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-24">
                                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <DataTable columns={columns} data={orders || []} />
                        )}
                    </div>
                </div>

                {/* Hidden Print Template Component for ALL orders */}
                <div className="hidden">
                    <div ref={printRef} style={{ margin: 0, padding: 0 }}>
                        {orders?.map(order => (
                            <OrderLabelTemplate key={order.id} order={order} />
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

// Dummy Icon Component Since Package is not imported from lucide
function Package(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
}