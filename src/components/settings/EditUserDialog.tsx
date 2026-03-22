'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { getApiClient } from '@/lib/axios';
import { useAuth } from '@/lib/auth';

type UserType = {
    id: string;
    fullName: string;
    email: string;
    roleName: string;
    isActive: boolean;
    lastSeen: string;
};

interface EditUserDialogProps {
    user: UserType | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditUserDialog({ user, open, onOpenChange }: EditUserDialogProps) {
    const queryClient = useQueryClient();
    const { token } = useAuth();
    const apiClient = getApiClient(token || '');
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'SALES',
    });

    useEffect(() => {
        if (user && open) {
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                password: '', // لا نعرض كلمة المرور القديمة، نتركها فارغة لتغييرها إذا أردنا
                role: user.roleName || 'SALES',
            });
        }
    }, [user, open]);

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            if (!user) return;
            // Send only changed or provided fields
            const payload: any = {
                fullName: data.fullName,
                email: data.email,
                role: data.role,
            };
            
            // Only send password if user typed one
            if (data.password && data.password.trim() !== '') {
                payload.password = data.password;
            }

            const res = await apiClient.put(`/users/${user.id}`, payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings-users'] });
            onOpenChange(false);
            toast.success('تم تحديث بيانات الموظف بنجاح');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'حدث خطأ أثناء تعديل بيانات الموظف');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email) {
            toast.error('يرجى تعبئة الحقول الإجبارية (الاسم والبريد)');
            return;
        }
        mutation.mutate(formData);
    };

    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md bg-white border-none shadow-2xl rounded-2xl p-0" dir="rtl">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <DialogTitle className="text-xl font-black text-gray-900">تعديل بيانات الموظف</DialogTitle>
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
                        <label className="text-xs font-bold text-gray-500">البريد الإلكتروني *</label>
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
                        <label className="text-xs font-bold text-gray-500">كلمة المرور الجديدة (اختياري)</label>
                        <Input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary font-bold text-left"
                            dir="ltr"
                            placeholder="اتركه فارغاً إذا لم ترد تغييره"
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
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl h-11 px-6 font-bold">
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={mutation.isPending} className="rounded-xl h-11 px-8 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20">
                            {mutation.isPending ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
