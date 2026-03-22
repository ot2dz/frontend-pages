'use client';

import { useState } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApiClient } from '@/lib/axios';
import { useAuth } from '@/lib/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, User, Clock, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { CreateUserDialog } from '@/components/settings/CreateUserDialog';
import { EditUserDialog } from '@/components/settings/EditUserDialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type UserType = {
    id: string;
    fullName: string;
    email: string;
    roleName: 'ADMIN' | 'SALES' | 'ACCOUNTANT' | string;
    isActive: boolean;
    lastSeen: string;
};

export default function SettingsPage() {
    const queryClient = useQueryClient();
    const { token } = useAuth();
    
    const [editingUser, setEditingUser] = useState<UserType | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    
    // Create an authenticated client
    const apiClient = getApiClient(token || '');

    // 1. جلب قائمة الموظفين
    const { data: users, isLoading } = useQuery<UserType[]>({
        queryKey: ['settings-users'],
        queryFn: async () => {
            if (!token) return [];
            const res = await apiClient.get('/users');
            return res.data?.data || [];
        },
        enabled: !!token,
    });

    // 2. تحديث حالة الموظف (تفعيل / تعطيل)
    const toggleStatusMutation = useMutation({
        mutationFn: async ({ id, isActive }: { id: string, isActive: boolean }) => {
            const res = await apiClient.put(`/users/${id}/toggle-status`, { isActive });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings-users'] });
            toast.success('تم تحديث حالة الحساب بنجاح');
        },
        onError: () => {
            toast.error('حدث خطأ أثناء تحديث حالة الحساب');
        }
    });

    // 3. حذف موظف
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await apiClient.delete(`/users/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings-users'] });
            toast.success('تم حذف الموظف بنجاح');
        },
        onError: () => {
            toast.error('حدث خطأ أثناء محاولة حذف الموظف');
        }
    });

    const handleToggle = (id: string, currentStatus: boolean) => {
        toggleStatusMutation.mutate({ id, isActive: !currentStatus });
    };

    const handleDelete = (id: string, fullName: string) => {
        if (window.confirm(`هل أنت متأكد من أنك تريد حذف حساب الموظف "${fullName}" نهائياً؟`)) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden animate-in fade-in duration-500">
            <EditUserDialog user={editingUser} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
            <div className="border-b border-gray-50 p-6 flex justify-between items-center bg-gray-50/30">
                <h2 className="text-lg font-black text-gray-900">طاقم العمل والموظفين</h2>
                {/* إدراج مكون إضافة موظف هنا */}
                <CreateUserDialog />
            </div>
            
            <div className="overflow-x-auto w-full">
                <table className="w-full text-sm text-right">
                    <thead className="bg-transparent border-b-2 border-gray-100">
                        <tr>
                            <th className="font-bold text-gray-500 px-6 py-4 whitespace-nowrap">الموظف</th>
                            <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">الدور والصلاحية</th>
                            <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">حالة الحساب</th>
                            <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">آخر ظهور</th>
                            <th className="font-bold text-gray-500 px-6 py-4 whitespace-nowrap text-center">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="text-center p-12">
                                    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"></div>
                                </td>
                            </tr>
                        ) : users?.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center p-12 text-gray-500 font-bold bg-gray-50/50">لا يوجد موظفين مسجلين حالياً.</td>
                            </tr>
                        ) : (
                            users?.map((user) => (
                                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                                                {user.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900">{user.fullName}</p>
                                                <p className="text-xs text-gray-500 font-bold" dir="ltr">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {user.roleName === 'ADMIN' ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-600 border border-purple-100 shadow-sm">
                                                <Shield className="w-3.5 h-3.5" /> مدير النظام
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                                                <User className="w-3.5 h-3.5" /> {user.roleName === 'SALES' ? 'موظف مبيعات' : 'موظف'}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer"
                                                checked={user.isActive}
                                                onChange={() => handleToggle(user.id, user.isActive)}
                                                disabled={toggleStatusMutation.isPending}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 disabled:opacity-50"></div>
                                            <span className={`mr-3 text-xs font-bold ${user.isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                                                {user.isActive ? 'نشط' : 'معطل'}
                                            </span>
                                        </label>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-gray-500 font-bold text-sm flex items-center gap-1.5 mt-2">
                                        <Clock className="w-4 h-4" />
                                        {new Date(user.lastSeen).toLocaleDateString('ar-DZ')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {/* تفعيل القائمة المنسدلة للإجراءات */}
                                        <DropdownMenu dir="rtl">
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900 rounded-lg">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border-gray-100">
                                                <DropdownMenuItem 
                                                    className="cursor-pointer font-bold justify-start rounded-lg mb-1"
                                                    onClick={() => {
                                                        setEditingUser(user);
                                                        setIsEditDialogOpen(true);
                                                    }}
                                                >
                                                    <Edit className="w-4 h-4 ml-2" />
                                                    تعديل البيانات
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 font-bold justify-start rounded-lg"
                                                    onClick={() => handleDelete(user.id, user.fullName)}
                                                    disabled={deleteMutation.isPending}
                                                >
                                                    <Trash2 className="w-4 h-4 ml-2" />
                                                    حذف الموظف
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}