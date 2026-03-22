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
        password: '',
        role: 'SALES', // افتراضي موظف مبيعات
    });

    const mutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const res = await apiClient.post('/auth/register', data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings-users'] });
            setOpen(false);
            setFormData({ fullName: '', email: '', password: '', role: 'SALES' });
            toast.success('تمت إضافة الموظف بنجاح');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'حدث خطأ أثناء إضافة الموظف');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email || !formData.password) {
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
                        <label className="text-xs font-bold text-gray-500">كلمة المرور *</label>
                        <Input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary font-bold text-left"
                            dir="ltr"
                            placeholder="********"
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