'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { toast } from 'sonner';
import { X } from 'lucide-react';

export function EditOrderDialog({ order, open, onOpenChange }: any) {
    const queryClient = useQueryClient();
    
    // حالة للنموذج تشمل معلومات الطلب والزبون معاً
    const [formData, setFormData] = useState({
        totalAmount: 0,
        notes: '',
        customerName: '',
        customerPhone: '',
        customerState: '',
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
            <DialogContent className="max-w-2xl bg-white border-none shadow-2xl rounded-2xl p-0 max-h-[90vh] overflow-y-auto [&>button.absolute]:hidden" dir="rtl">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-20 flex items-center justify-between">
                    <DialogTitle className="text-xl font-black text-gray-900">تعديل معلومات الطلبية والعميل</DialogTitle>
                    <Button 
                        type="button"
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onOpenChange(false)} 
                        className="rounded-full bg-white shadow-sm border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors h-8 w-8 !ring-0 !outline-none"
                    >
                        <X className="w-4 h-4" />
                    </Button>
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
                                    type="tel"
                                    inputMode="tel"
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