'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '@/lib/axios';

export function CreateDistributorDialog() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        wilayas: '',
        baseFee: 0,
    });

    const mutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const res = await apiClient.post('/distributors', data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['distributors'] });
            setOpen(false);
            setFormData({ name: '', phone: '', wilayas: '', baseFee: 0 });
            toast.success('تمت إضافة الموزع بنجاح');
        },
        onError: () => {
            toast.error('حدث خطأ أثناء إضافة الموزع');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md h-11 font-bold">
                    <Plus className="mr-0 ml-2 h-4 w-4" /> إضافة موزع
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-2xl" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black text-gray-900">إضافة موزع جديد</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-right block font-bold text-gray-700">اسم الشركة</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="شركة التوصيل..."
                            required
                            className="rounded-xl border-gray-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-right block font-bold text-gray-700">رقم الهاتف</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="05..."
                            dir="ltr"
                            className="text-right rounded-xl border-gray-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="wilayas" className="text-right block font-bold text-gray-700">مناطق التغطية</Label>
                        <Input
                            id="wilayas"
                            value={formData.wilayas}
                            onChange={(e) => setFormData({ ...formData, wilayas: e.target.value })}
                            placeholder="كل الولايات، أو 16, 09..."
                            className="rounded-xl border-gray-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="baseFee" className="text-right block font-bold text-gray-700">تسعيرة التوصيل (د.ج)</Label>
                        <Input
                            id="baseFee"
                            type="number"
                            value={formData.baseFee}
                            onChange={(e) => setFormData({ ...formData, baseFee: parseFloat(e.target.value) || 0 })}
                            min="0"
                            required
                            className="rounded-xl border-gray-200 text-right"
                            dir="ltr"
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-3 w-full">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-xl w-full">
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={mutation.isPending} className="bg-primary text-white rounded-xl w-full font-bold">
                            حفظ الموزع
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
