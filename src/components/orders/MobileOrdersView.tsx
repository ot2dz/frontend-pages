'use client';

import React, { useState, useMemo, useRef } from 'react';
import { ArrowRight, Plus, Search, SlidersHorizontal, Printer, Eye, User, ChevronLeft, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Order, statusMap } from './columns';
import { OrderDetailsDialog } from './OrderDetailsDialog';
import { useReactToPrint } from 'react-to-print';
import { OrderLabelTemplate } from './OrderLabelTemplate';
import { CreateOrderDialog } from './CreateOrderDialog';

interface MobileOrdersViewProps {
    orders: Order[];
}

export function MobileOrdersView({ orders }: MobileOrdersViewProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<string>('ALL');
    const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Derived stats
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
    const preparingOrders = orders.filter(o => o.status === 'PREPARING').length;
    const shippedOrders = orders.filter(o => o.status === 'SHIPPED').length;
    const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length;

    // Filtered orders
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch = !searchQuery 
                ? true 
                : order.customId.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  (order.customer?.fullName || '').toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesFilter = activeFilter === 'ALL' ? true : order.status === activeFilter;
            
            return matchesSearch && matchesFilter;
        });
    }, [orders, searchQuery, activeFilter]);

    return (
        <div className="flex flex-col w-full font-sans pb-32" dir="rtl">
            {/* Header */}
            <header className="px-4 pt-2 pb-4 flex items-center justify-between">
                <div className="w-10">
                    <CreateOrderDialog 
                        customTrigger={
                            <Button className="w-10 h-10 rounded-xl bg-[#0055FF] hover:bg-[#0055FF]/90 text-white shadow-md flex items-center justify-center p-0">
                                <Plus className="w-6 h-6" />
                            </Button>
                        }
                    />
                </div>
                
                <h1 className="text-[22px] font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">
                    إدارة الطلبيات
                </h1>
                
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl p-0 text-slate-700 hover:bg-slate-200" onClick={() => window.history.back()}>
                    <ArrowRight className="w-6 h-6" />
                </Button>
            </header>

            <div className="px-4 space-y-5">
                {/* Search Bar */}
                <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                        type="text"
                        placeholder="بحث برقم الطلب أو العميل..."
                        className="w-full h-[52px] pr-12 pl-4 rounded-[20px] border-gray-200 bg-white shadow-sm focus-visible:ring-1 focus-visible:ring-[#0055FF] text-[15px] placeholder:text-gray-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filters Row */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 custom-scrollbar hide-scrollbar">
                    <Button variant="outline" size="icon" className="min-w-[48px] h-[40px] rounded-[16px] border-gray-200 bg-white shrink-0 text-gray-700">
                        <SlidersHorizontal className="w-5 h-5" />
                    </Button>
                    <FilterPill label="الكل" active={activeFilter === 'ALL'} onClick={() => setActiveFilter('ALL')} />
                    <FilterPill label="قيد الانتظار" active={activeFilter === 'PENDING'} onClick={() => setActiveFilter('PENDING')} />
                    <FilterPill label="تم التجهيز" active={activeFilter === 'PREPARING'} onClick={() => setActiveFilter('PREPARING')} />
                    <FilterPill label="تم الشحن" active={activeFilter === 'SHIPPED'} onClick={() => setActiveFilter('SHIPPED')} />
                    <FilterPill label="مكتمل" active={activeFilter === 'DELIVERED'} onClick={() => setActiveFilter('DELIVERED')} />
                </div>

                {/* Stats Row */}
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 custom-scrollbar hide-scrollbar">
                    <StatCard label="إجمالي الطلبات" value={totalOrders.toString()} valueColor="text-[#0055FF]" />
                    <StatCard label="قيد الانتظار" value={pendingOrders.toString()} valueColor="text-amber-500" />
                    <StatCard label="تم التجهيز" value={preparingOrders.toString()} valueColor="text-blue-500" />
                    <StatCard label="تم الشحن" value={shippedOrders.toString()} valueColor="text-[#0055FF]" />
                </div>

                {/* Orders List */}
                <div className="space-y-4 pt-2">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                            <OrderMobileCard 
                                key={order.id} 
                                order={order} 
                                onDetails={() => {
                                    setSelectedOrderDetails(order);
                                    setIsDetailsOpen(true);
                                }}
                            />
                        ))
                    ) : (
                        <div className="bg-white rounded-[24px] p-8 text-center shadow-sm border border-gray-100 mt-4">
                            <p className="text-gray-500 font-bold">لا توجد طلبيات تطابق بحثك المفصل.</p>
                        </div>
                    )}
                </div>
            </div>

            {selectedOrderDetails && (
                <OrderDetailsDialog 
                    order={selectedOrderDetails} 
                    open={isDetailsOpen} 
                    onOpenChange={setIsDetailsOpen} 
                />
            )}
            
        </div>
    );
}

// ----------------- Helper Components -----------------

function FilterPill({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`whitespace-nowrap px-6 h-[40px] rounded-[16px] text-[14px] font-bold transition-colors border shrink-0 ${
                active 
                ? 'bg-[#0055FF] text-white border-[#0055FF]' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
        >
            {label}
        </button>
    );
}

function StatCard({ label, value, valueColor }: { label: string, value: string, valueColor: string }) {
    return (
        <div className="bg-white rounded-[20px] border border-gray-100 p-4 min-w-[130px] shadow-sm shrink-0 flex flex-col justify-center items-center gap-1.5">
            <span className="text-[13px] font-bold text-gray-400">{label}</span>
            <span className={`text-[22px] font-black ${valueColor}`}>{value}</span>
        </div>
    );
}

export function OrderMobileCard({ order, onDetails }: { order: Order, onDetails: () => void }) {
    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `ملصق_${order.customId}`,
    }) as unknown as () => void;

    // Format Date: e.g. "14 مايو 2024 . 10:30 ص"
    const dateObj = new Date(order.createdAt);
    const dateStr = dateObj.toLocaleDateString('ar-EG-u-nu-latn', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = dateObj.toLocaleTimeString('ar-EG-u-nu-latn', { hour: '2-digit', minute: '2-digit' });

    // Map status colors roughly to the design
    // The design uses a very light yellow for pending.
    let statusBg = "bg-gray-100";
    let statusText = "text-gray-700";
    if (order.status === 'PENDING') {
        statusBg = "bg-[#FEF9C3]"; // light amber/yellow
        statusText = "text-[#A16207]";
    } else if (order.status === 'PREPARING') {
        statusBg = "bg-[#DBEAFE]"; // light blue
        statusText = "text-[#1D4ED8]";
    } else if (order.status === 'SHIPPED') {
        statusBg = "bg-[#E0E7FF]"; // indigo
        statusText = "text-[#4338CA]";
    } else if (order.status === 'DELIVERED') {
        statusBg = "bg-[#D1FAE5]"; // light green
        statusText = "text-[#047857]";
    }

    return (
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 relative">
            {/* Top row: Status on left, ID on right */}
            <div className="flex justify-between items-start mb-4">
                <div className={`px-4 py-1.5 rounded-full text-[12px] font-bold ${statusBg} ${statusText}`}>
                    {statusMap[order.status]?.label || order.status}
                </div>
                <div className="flex flex-col items-end">
                    <span className="bg-[#EFF6FF] text-[#0055FF] px-3 py-1.5 rounded-[12px] text-[13px] font-black tracking-wide" dir="ltr">
                        {order.customId}
                    </span>
                    <span className="text-[11px] text-gray-400 mt-2 font-medium" dir="rtl">
                        {dateStr} • {timeStr}
                    </span>
                </div>
            </div>

            {/* Middle row: Amount on left, Customer on right */}
            <div className="flex justify-between items-center mb-5">
                <div className="flex flex-col items-start mt-2">
                    <span className="text-[18px] font-black text-gray-900" dir="ltr">
                        {order.totalAmount.toLocaleString('en-US')} <span className="text-[14px]">د.ج</span>
                    </span>
                </div>
                <div className="flex items-center gap-3 text-right">
                    <div className="flex flex-col justify-center">
                        <span className="text-[15px] font-bold text-gray-900">{order.customer?.fullName || 'غير محدد'}</span>
                        <span className="text-[12px] font-medium text-gray-400 mt-0.5" dir="ltr">{order.customer?.phone || '-'}</span>
                    </div>
                    <div className="w-11 h-11 bg-[#F1F5F9] rounded-full flex items-center justify-center text-gray-400 shrink-0">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="h-[1px] w-full bg-gray-50 my-4"></div>

            {/* Bottom row: Details link, Actions */}
            <div className="flex justify-between items-center">
                <button 
                    onClick={onDetails}
                    className="flex items-center gap-1.5 text-[#0055FF] text-[14px] font-bold hover:opacity-80 transition-opacity"
                >
                    <ChevronLeft className="w-4 h-4" />
                    تفاصيل الطلب
                </button>
                <div className="flex gap-2">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-[42px] h-[42px] rounded-[14px] bg-[#F8FAFC] text-slate-600 hover:bg-slate-200"
                        onClick={onDetails}
                    >
                        <Eye className="w-5 h-5" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-[42px] h-[42px] rounded-[14px] bg-[#F8FAFC] text-slate-600 hover:bg-slate-200"
                        onClick={handlePrint}
                    >
                        <Printer className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="hidden">
                <div ref={printRef} style={{ margin: 0, padding: 0 }}>
                    <OrderLabelTemplate order={order} />
                </div>
            </div>
        </div>
    );
}
