'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Printer, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { OrderDetailsDialog } from './OrderDetailsDialog';
import { DeleteOrderDialog } from './DeleteOrderDialog';
import { OrderLabelTemplate } from './OrderLabelTemplate';
import { Checkbox } from '@/components/ui/checkbox';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { toast } from 'sonner';

export type Order = {
    id: string;
    customId: string;
    status: string;
    totalAmount: number;
    notes: string | null;
    images: string[];
    createdAt: string;
    distributorId?: string | null;
    customer?: {
        fullName: string;
        phone: string;
        state: string;
        city: string;
    };
    distributor?: {
        name: string;
    };
};

export const statusMap: Record<string, { label: string; color: string }> = {
    PENDING: { label: 'قيد الانتظار', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    PREPARING: { label: 'تم التجهيز', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    SHIPPED: { label: 'تم الشحن', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    DELIVERED: { label: 'مكتمل', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    CANCELLED: { label: 'ملغى', color: 'bg-red-100 text-red-800 border-red-200' },
    RETURNED: { label: 'مرتجع', color: 'bg-rose-100 text-rose-800 border-rose-200' },
};

const StatusCell = ({ row }: { row: any }) => {
    const order = row.original as Order;
    const queryClient = useQueryClient();

    const mutation = useMutation({
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

    const statusProps = statusMap[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-800 border-gray-200' };

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Select
                defaultValue={order.status}
                value={order.status}
                onValueChange={(val) => mutation.mutate(val)}
                disabled={mutation.isPending}
            >
                <SelectTrigger className={`h-8 w-[130px] rounded-full text-xs font-bold border-none focus:ring-0 shadow-none ${statusProps.color}`} dir="rtl">
                    <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent dir="rtl" className="rounded-xl shadow-lg border-gray-100 z-[100]">
                    {Object.entries(statusMap).map(([value, { label, color }]) => (
                        <SelectItem key={value} value={value} className="cursor-pointer font-bold text-xs m-1 rounded-lg">
                            <span className={`px-2 py-1 rounded-md ${color}`}>{label}</span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

const DistributorCell = ({ row }: { row: any }) => {
    const order = row.original as Order;
    const queryClient = useQueryClient();

    const { data: distributors } = useQuery({
        queryKey: ['distributors'],
        queryFn: async () => {
            const res = await apiClient.get('/distributors');
            return res.data;
        }
    });

    const mutation = useMutation({
        mutationFn: async (newDistributorId: string) => {
            const payload = { distributorId: newDistributorId === 'none' ? null : newDistributorId };
            const res = await apiClient.put(`/orders/${order.id}`, payload);
            return res.data;
        },
        onSuccess: () => {
            toast.success('تم تعيين الموزع بنجاح');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: () => {
            toast.error('حدث خطأ أثناء تعيين الموزع');
        }
    });

    const currentValue = order.distributorId || 'none';

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Select
                defaultValue={currentValue}
                value={currentValue}
                onValueChange={(val) => mutation.mutate(val)}
                disabled={mutation.isPending}
            >
                <SelectTrigger className="h-8 border-none bg-gray-50/50 hover:bg-gray-100 font-medium text-gray-700 shadow-none focus:ring-0 rounded-lg w-[140px]" dir="rtl">
                    <SelectValue placeholder="بدون موزع" />
                </SelectTrigger>
                <SelectContent dir="rtl" className="rounded-xl shadow-lg border-gray-100 z-[100]">
                    <SelectItem value="none" className="cursor-pointer font-medium text-gray-500 rounded-lg m-1">بدون موزع</SelectItem>
                    {distributors?.map((distributor: any) => (
                        <SelectItem key={distributor.id} value={distributor.id} className="cursor-pointer font-bold text-gray-800 rounded-lg m-1">
                            {distributor.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

const ActionCell = ({ order }: { order: Order }) => {
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `ملصق_${order.customId}`,
    }) as unknown as () => void;

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-lg">
                        <span className="sr-only">فتح القائمة</span>
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-gray-100 z-50">
                    <DropdownMenuLabel className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1 px-2">الإجراءات</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-50" />
                    <DropdownMenuItem
                        className="cursor-pointer gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        onClick={handlePrint}
                    >
                        <Printer className="h-4 w-4 text-gray-500" />
                        طباعة ملصق
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        onClick={() => setDetailsOpen(true)}
                    >
                        <Eye className="h-4 w-4 text-primary" />
                        عرض التفاصيل
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-50" />
                    <DropdownMenuItem
                        className="cursor-pointer gap-3 p-2.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors font-bold focus:bg-red-50 focus:text-red-700"
                        onClick={() => setDeleteOpen(true)}
                    >
                        <Trash2 className="h-4 w-4" />
                        حذف الطلبية
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden">
                <div ref={printRef} style={{ margin: 0, padding: 0 }}>
                    <OrderLabelTemplate order={order} />
                </div>
            </div>

            <OrderDetailsDialog order={order} open={detailsOpen} onOpenChange={setDetailsOpen} />
            <DeleteOrderDialog orderId={order.id} open={deleteOpen} onOpenChange={setDeleteOpen} />
        </div>
    );
};

export const columns: ColumnDef<Order>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="pr-4" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="pr-4" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
    },
    {
        accessorKey: 'customId',
        header: 'رقم الطلبية',
        cell: ({ row }) => <div className="whitespace-nowrap font-black text-primary tracking-wide pl-2">{row.getValue('customId')}</div>,
        size: 150,
    },
    {
        accessorFn: (row) => row.customer?.fullName,
        id: 'customer.fullName',
        header: 'الزبون',
        cell: ({ row }) => <div className="whitespace-nowrap font-bold text-gray-900">{row.original.customer?.fullName || '-'}</div>,
        size: 200,
    },
    {
        accessorFn: (row) => row.customer?.phone,
        id: 'customer.phone',
        header: 'رقم الهاتف',
        cell: ({ row }) => <div className="whitespace-nowrap font-medium text-gray-600" dir="ltr">{row.original.customer?.phone || '-'}</div>,
        size: 130,
    },
    {
        id: 'customer.state',
        accessorFn: row => row.customer?.state,
        header: 'الولاية',
        cell: ({ row }) => <div className="whitespace-nowrap text-gray-600">{row.original.customer?.state || '-'}</div>,
        filterFn: "arrIncludesSome",
        size: 120,
    },
    {
        id: 'distributor.name',
        accessorFn: row => row.distributor?.name || "بدون موزع",
        header: 'الموزع',
        cell: ({ row }) => <div className="whitespace-nowrap"><DistributorCell row={row} /></div>,
        filterFn: "arrIncludesSome",
        size: 150,
    },
    {
        accessorKey: 'status',
        header: 'الحالة',
        cell: ({ row }) => <div className="whitespace-nowrap"><StatusCell row={row} /></div>,
        filterFn: "arrIncludesSome",
        size: 150,
    },
    {
        accessorKey: 'totalAmount',
        header: 'المبلغ الإجمالي',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('totalAmount'));
            return (
                <div className="whitespace-nowrap font-black text-gray-900">
                    {amount.toLocaleString('en-US')} <span className="text-sm font-bold text-gray-500">د.ج</span>
                </div>
            );
        },
        size: 130,
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => <div className="whitespace-nowrap"><ActionCell order={row.original} /></div>,
        size: 60,
    },
];