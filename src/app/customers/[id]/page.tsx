'use client';

export const runtime = 'edge';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ArrowRight, MapPin, Phone, MessageCircle, CalendarClock, Receipt, Package, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';
import { OrderMobileCard } from '@/components/orders/MobileOrdersView';
import { OrderDetailsDialog } from '@/components/orders/OrderDetailsDialog';
import { Order } from '@/components/orders/columns';
import { CreateOrderDialog } from '@/components/orders/CreateOrderDialog';

// Helpers
const getInitials = (name: string) => name ? name.substring(0, 2).toUpperCase() : '؟';
const getAvatarColor = (name: string) => {
    const colors = ['bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700', 'bg-purple-100 text-purple-700', 'bg-rose-100 text-rose-700', 'bg-amber-100 text-amber-700'];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
};

export default function CustomerDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const customerId = params.id as string;

    const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);

    // Fetch Customer Data
    const { data: customer, isLoading, error } = useQuery({
        queryKey: ['customer', customerId],
        queryFn: async () => {
            const res = await apiClient.get(`/customers/${customerId}`);
            return res.data;
        },
        enabled: !!customerId,
    });

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex bg-gray-50/50 justify-center items-center h-[80vh]">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (error || !customer) {
        return (
            <DashboardLayout>
                <div className="text-center py-20">
                    <p className="text-gray-500 font-bold mb-4">حدث خطأ أثناء تحميل بيانات الزبون أو الزبون غير موجود.</p>
                    <Button onClick={() => router.push('/customers')} variant="outline">العودة للزبائن</Button>
                </div>
            </DashboardLayout>
        );
    }

    const orderCount = customer.orders?.length || 0;
    const totalSpent = customer.totalSpent || 0;
    const isLoyal = orderCount >= 3;
    const joinDate = customer.createdAt ? new Date(customer.createdAt).toLocaleDateString('ar-EG-u-nu-latn', { year: 'numeric', month: 'long' }) : 'غير محدد';

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto pb-24">
                
                {/* Hero Header Section */}
                <div className="relative bg-gradient-to-br from-primary/[0.03] to-primary/10 rounded-[32px] p-6 sm:p-10 mb-8 border border-primary/10 shadow-sm overflow-hidden">
                    {/* Decorative Blob */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    
                    {/* Back Button */}
                    <button 
                        onClick={() => router.push('/customers')}
                        className="absolute top-6 left-6 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white text-gray-700 transition-all shadow-sm"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 mt-8 sm:mt-0 text-center sm:text-right">
                        {/* Avatar */}
                        <div className={`w-28 h-28 rounded-3xl flex items-center justify-center font-black text-4xl shadow-md border-4 border-white ${getAvatarColor(customer.fullName)}`}>
                            {getInitials(customer.fullName)}
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 mt-2">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-2">
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{customer.fullName}</h1>
                                {isLoyal && (
                                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                                        <Star className="w-3.5 h-3.5 fill-current" /> زبون وفي
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-6 text-sm font-medium text-gray-600 mt-4">
                                <a href={`tel:${customer.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors bg-white/60 px-4 py-2 rounded-xl">
                                    <Phone className="w-4 h-4 text-primary" /> {customer.phone}
                                </a>
                                {(customer.state || customer.address) && (
                                    <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl">
                                        <MapPin className="w-4 h-4 text-emerald-500" /> {customer.state} {customer.address && `- ${customer.address}`}
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons Row */}
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-6">
                                <Button 
                                    onClick={() => setIsCreateOrderOpen(true)}
                                    className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20 text-sm font-bold flex items-center gap-2 px-5 py-2.5 h-10"
                                >
                                    <Plus className="w-4 h-4" /> إضافة طلبية
                                </Button>
                                
                                <a 
                                    href={`https://wa.me/213${customer.phone.replace(/^0/, '')}`}
                                    target="_blank" rel="noreferrer"
                                    className="rounded-xl bg-[#E8F8F0] text-[#0A8E45] hover:bg-[#D1F2E0] shadow-sm text-sm font-bold flex items-center gap-2 px-5 py-2.5 h-10 transition-colors"
                                >
                                    <MessageCircle className="w-4 h-4" /> واتساب
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                            <Receipt className="w-5 h-5" />
                        </div>
                        <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">إجمالي المصروفات</p>
                        <p className="font-black text-xl text-gray-900" dir="ltr">
                            {totalSpent.toLocaleString('en-US')} <span className="text-xs text-gray-500">د.ج</span>
                        </p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                            <Package className="w-5 h-5" />
                        </div>
                        <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">الطلبيات</p>
                        <p className="font-black text-xl text-gray-900">
                            {orderCount} <span className="text-xs text-primary/70 font-medium">طلبية</span>
                        </p>
                    </div>
                </div>

                {/* Order History */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
                            <Star className="w-5 h-5 text-amber-500 fill-current" /> سجل الطلبيات
                        </h2>
                    </div>
                    
                    {customer.orders && customer.orders.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {customer.orders.map((order: Order) => (
                                <OrderMobileCard 
                                    key={order.id} 
                                    order={{...order, customer: customer}} // Inject customer deeply for the card
                                    onDetails={() => {
                                        setSelectedOrderDetails({...order, customer: customer});
                                        setIsDetailsOpen(true);
                                    }} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-gray-500 font-bold mb-2">لا توجد طلبيات سابقة لهذا الزبون.</p>
                            <Button onClick={() => setIsCreateOrderOpen(true)} variant="outline" className="mt-2 text-primary border-primary/20 hover:bg-primary/5">
                                إنشاء أول طلبية
                            </Button>
                        </div>
                    )}
                </div>

            </div>

            {/* Order Details Modal */}
            {selectedOrderDetails && (
                <OrderDetailsDialog
                    order={selectedOrderDetails}
                    open={isDetailsOpen}
                    onOpenChange={setIsDetailsOpen}
                />
            )}

            {/* Create Order Modal */}
            {isCreateOrderOpen && (
                <CreateOrderDialog
                    open={isCreateOrderOpen}
                    onOpenChange={setIsCreateOrderOpen}
                />
            )}
        </DashboardLayout>
    );
}
