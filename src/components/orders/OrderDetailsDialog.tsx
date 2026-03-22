'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EditOrderDialog } from './EditOrderDialog';
import { useState, useRef } from 'react';
import { Printer, X, Download, Package, Receipt, Info, MapPin, Phone, Hash, Calendar, FileText, CheckCircle2, Clock, Truck, ShieldCheck, Image as ImageIcon, ChevronLeft, ChevronRight, Pencil, User, ArrowRight } from 'lucide-react';

// Helper function to ensure local development images load correctly on mobile devices
const getLocalImageUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('127.0.0.1:8788') || url.includes('localhost:8788') || url.includes('localhost:8787')) {
        try {
            const parsed = new URL(url);
            return parsed.pathname;
        } catch (e) {
            return url;
        }
    }
    return url;
};
import { useReactToPrint } from 'react-to-print';
import { OrderLabelTemplate } from './OrderLabelTemplate';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { toast } from 'sonner';

export function OrderDetailsDialog({ order, open, onOpenChange }: any) {
    const [editOpen, setEditOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [isLightboxClosing, setIsLightboxClosing] = useState(false);
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

    const handleCloseLightbox = () => {
        setIsLightboxClosing(true);
        setTimeout(() => {
            setLightboxIndex(null);
            setIsLightboxClosing(false);
        }, 300);
    };

    if (!order) return null;

    const statusMap: Record<string, { label: string; color: string }> = {
        PENDING: { label: 'قيد الانتظار', color: 'bg-amber-100 text-amber-700 hover:bg-amber-200 focus:bg-amber-200' },
        PREPARING: { label: 'تم التجهيز', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:bg-blue-200' },
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

    const nextStatusMap: Record<string, string> = {
        PENDING: 'PREPARING',
        PREPARING: 'SHIPPED',
        SHIPPED: 'DELIVERED'
    };

    const nextStatusLabels: Record<string, string> = {
        PREPARING: 'تم التجهيز',
        SHIPPED: 'تم الشحن',
        DELIVERED: 'مكتمل'
    };

    const nextStatusKey = nextStatusMap[order.status];
    const nextStatusLabel = nextStatusKey ? nextStatusLabels[nextStatusKey] : null;

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className="max-w-2xl max-h-[90vh] flex flex-col p-0 bg-[#F8FAFC] border-none shadow-2xl rounded-2xl"
                    dir="rtl"
                    onInteractOutside={(e) => {
                        if (lightboxIndex !== null) {
                            e.preventDefault();
                        }
                    }}
                >

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

                    {/* Main Content Body - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">

                        {/* Order ID & Customer Card */}
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">

                            <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-4">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-black text-primary mb-1 tracking-wide">{order.customId}</h2>
                                    <p className="text-gray-500 text-sm font-medium flex items-center gap-1.5 mt-2">
                                        <Clock className="w-4 h-4" /> {orderDate}
                                    </p>
                                </div>

                                {/* زر تعديل المعلومات */}
                                <Button
                                    variant="outline"
                                    onClick={() => setEditOpen(true)}
                                    className="w-full md:w-auto h-10 px-4 rounded-xl text-sm font-bold text-primary border-primary/20 bg-primary/5 hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-center gap-2"
                                >
                                    <Pencil className="w-4 h-4" /> تعديل المعلومات
                                </Button>
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
                                    {order.images.map((img: string, i: number) => {
                                        const finalImgSrc = getLocalImageUrl(img);

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => setLightboxIndex(i)}
                                                className="block group rounded-xl overflow-hidden border border-gray-200 aspect-square w-full h-full relative"
                                            >
                                                <img src={finalImgSrc} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt={`صورة القماش ${i + 1}`} />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                            </button>
                                        );
                                    })}
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

                    {/* Footer Actions (Sticky Bottom) - مخصص للترقية والطباعة */}
                    <div className="bg-white p-4 border-t border-gray-100 mt-auto flex flex-col gap-3 rounded-b-2xl">
                        {/* الزر السريع لتغيير الحالة */}
                        {nextStatusKey && (
                            <Button
                                onClick={() => statusMutation.mutate(nextStatusKey)}
                                disabled={statusMutation.isPending}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-[3.25rem] rounded-xl font-bold font-cairo shadow-lg shadow-emerald-600/20 text-[15px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                            >
                                {statusMutation.isPending ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span className="font-black text-base">{nextStatusLabel}</span>
                                        <ArrowRight className="w-4 h-4 ml-1 opacity-80" />
                                    </>
                                )}
                            </Button>
                        )}

                        {/* زر طباعة البوليصة */}
                        <Button
                            onClick={handlePrint}
                            variant={nextStatusKey ? "outline" : "default"}
                            className={`w-full h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${nextStatusKey
                                ? 'border-gray-200 text-gray-700 bg-gray-50 hover:bg-gray-100 shadow-none'
                                : 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20'
                                }`}
                        >
                            <Printer className="w-5 h-5 ml-1" /> طباعة الملصق
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

            {/* Lightbox / Gallery Overlay */}
            {lightboxIndex !== null && order.images && (
                <div
                    className={`fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-between backdrop-blur-md pt-12 pb-6 transition-opacity duration-300 ${isLightboxClosing ? 'opacity-0' : 'opacity-100'}`}
                    onClick={handleCloseLightbox}
                    style={{ pointerEvents: 'auto' }}
                    dir="ltr"
                >
                    {/* Close button */}
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 backdrop-blur-sm"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCloseLightbox(); }}
                    >
                        <X className="w-7 h-7" />
                    </button>

                    {/* Main Large Image Display */}
                    <div
                        className="relative w-full h-[70vh] px-4 flex items-center justify-center select-none"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    >
                        <img
                            src={getLocalImageUrl(order.images[lightboxIndex])}
                            className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-xl"
                            alt={`صورة ${lightboxIndex + 1}`}
                            draggable={false}
                        />

                        {/* Counter Indicator at the top left */}
                        <div className="absolute top-0 left-4 text-white/90 font-bold tracking-widest text-sm bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg pointer-events-none">
                            {lightboxIndex + 1} / {order.images.length}
                        </div>
                    </div>

                    {/* Bottom Thumbnails */}
                    <div className="w-full max-w-2xl px-4 mt-auto mb-2" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                        <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar hide-scrollbar pb-2 pt-2 snap-x px-2">
                            {order.images.map((img: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLightboxIndex(idx); }}
                                    className={`relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-[16px] overflow-hidden border-2 transition-all duration-300 snap-center ${lightboxIndex === idx
                                        ? 'border-[#0055FF] scale-105 shadow-[0_0_15px_rgba(0,85,255,0.4)] z-10'
                                        : 'border-transparent opacity-50 hover:opacity-100 hover:scale-95'
                                        }`}
                                >
                                    <img src={getLocalImageUrl(img)} className="w-full h-full object-cover" alt={`صورة مصغرة ${idx + 1}`} draggable={false} />
                                    {lightboxIndex !== idx && <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}