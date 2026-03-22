'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export function DeleteOrderDialog({ orderId, open, onOpenChange }: { orderId: string, open: boolean, onOpenChange: (open: boolean) => void }) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            await apiClient.delete(`/orders/${orderId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            onOpenChange(false);
        },
    });

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent dir="rtl" className="rounded-2xl border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-black text-gray-900">هل أنت متأكد من حذف الطلبية؟</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-500 font-medium leading-relaxed">
                        لا يمكن التراجع عن هذا الإجراء. سيتم حذف الطلبية نهائياً من قاعدة البيانات.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-3 mt-6">
                    <AlertDialogCancel className="rounded-xl font-bold bg-white text-gray-700 hover:bg-gray-100 border-gray-200 m-0">إلغاء</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => mutation.mutate()}
                        disabled={mutation.isPending}
                        className="rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm border-none m-0"
                    >
                        {mutation.isPending ? 'جاري الحذف...' : 'نعم، احذف الطلبية'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
