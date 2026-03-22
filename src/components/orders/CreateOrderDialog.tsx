'use client';

import { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, UploadCloud, User } from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '@/lib/axios';

interface CreateOrderDialogProps {
    customTrigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function CreateOrderDialog({ customTrigger, open: controlledOpen, onOpenChange: setControlledOpen }: CreateOrderDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setOpen = setControlledOpen || setInternalOpen;
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        state: '',
        address: '',
        totalAmount: '',
        notes: '',
    });
    
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [autoFillCustomer, setAutoFillCustomer] = useState<any>(null);

    // Fetch existing customers to enable auto-fill
    const { data: customers } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const res = await apiClient.get('/customers');
            return res.data;
        },
    });

    // Detect if phone matches an existing customer
    useEffect(() => {
        if (formData.phone && formData.phone.length >= 9 && customers) {
            const match = customers.find((c: any) => c.phone.replace(/\s+/g, '') === formData.phone.replace(/\s+/g, ''));
            if (match && match.fullName !== formData.fullName) {
                setAutoFillCustomer(match);
            } else {
                setAutoFillCustomer(null);
            }
        } else {
            setAutoFillCustomer(null);
        }
    }, [formData.phone, formData.fullName, customers]);

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
            setFormData({ fullName: '', phone: '', state: '', address: '', totalAmount: '', notes: '' });
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
                {customTrigger || (
                    <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 h-11 font-bold px-6">
                        <Plus className="mr-0 ml-2 h-5 w-5" /> إضافة طلبية جديدة
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white border-none shadow-2xl rounded-2xl p-0 max-h-[90vh] overflow-y-auto [&>button.absolute]:hidden" dir="rtl">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-20 flex items-center justify-between">
                    <DialogTitle className="text-xl font-black text-gray-900">إضافة طلبية جديدة</DialogTitle>
                    <Button 
                        type="button"
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setOpen(false)} 
                        className="rounded-full bg-white shadow-sm border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors h-8 w-8 !ring-0 !outline-none"
                    >
                        <X className="w-4 h-4" />
                    </Button>
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
                            <div className="space-y-2 relative">
                                <label className="text-xs font-bold text-gray-500">رقم الهاتف *</label>
                                <Input
                                    type="tel"
                                    inputMode="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary font-bold text-right"
                                    dir="ltr"
                                    required
                                />
                                {autoFillCustomer && (
                                    <div className="absolute top-full left-0 right-0 mt-1 z-20">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    fullName: autoFillCustomer.fullName || prev.fullName,
                                                    state: autoFillCustomer.state || prev.state,
                                                    address: autoFillCustomer.address || prev.address,
                                                }));
                                                setAutoFillCustomer(null);
                                                toast.success('تمت تعبئة بيانات الزبون تلقائياً');
                                            }}
                                            className="w-full bg-[#E8F8F0] border border-[#A7E9C5] text-[#0A8E45] p-2.5 rounded-xl shadow-lg hover:bg-[#D1F2E0] transition-colors flex items-center gap-2 text-[13px] font-bold text-right"
                                        >
                                            <div className="bg-[#0A8E45] text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                                                <User className="w-3.5 h-3.5" />
                                            </div>
                                            <span>
                                                تم العثور على زبون: <span className="text-[#055F2D] font-black">{autoFillCustomer.fullName}</span>. اضغط للتعبئة.
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500">الولاية</label>
                                <Input
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
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