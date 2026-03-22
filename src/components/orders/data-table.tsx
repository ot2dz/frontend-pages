'use client';

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
    ColumnFiltersState,
    RowSelectionState,
} from "@tanstack/react-table";
import { DataTableToolbar } from "./data-table-toolbar";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { Order, statusMap } from "./columns";
import { Button } from "@/components/ui/button";
import { Printer, Trash2, Edit, CheckSquare, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useReactToPrint } from "react-to-print";
import { OrderLabelTemplate } from "./OrderLabelTemplate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { toast } from "sonner";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

    const queryClient = useQueryClient();
    const bulkPrintRef = React.useRef<HTMLDivElement>(null);

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter,
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "includesString", 
    });

    const handleRowClick = (order: Order, event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const isInteractiveElement = target.closest('button') || target.closest('[role="combobox"]') || target.closest('[role="menu"]') || target.closest('.pr-4'); // pr-4 is the checkbox container
        
        if (!isInteractiveElement) {
            setSelectedOrder(order);
            setIsDetailsOpen(true);
        }
    };

    // --- الإجراءات الجماعية (Bulk Actions) ---
    const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original as Order);

    const handleBulkPrint = useReactToPrint({
        contentRef: bulkPrintRef,
        documentTitle: 'ملصقات_الطلبيات_المحددة',
    }) as unknown as () => void;

    const bulkStatusMutation = useMutation({
        mutationFn: async (newStatus: string) => {
            const ids = selectedRows.map(o => o.id);
            // إرسال الطلبات بالتوازي (Promise.all)
            await Promise.all(ids.map(id => apiClient.put(`/orders/${id}`, { status: newStatus })));
        },
        onSuccess: () => {
            toast.success(`تم تحديث حالة ${selectedRows.length} طلبية بنجاح`);
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            setRowSelection({}); // إفراغ التحديد بعد النجاح
        },
        onError: () => toast.error('حدث خطأ أثناء التحديث الجماعي'),
    });

    const bulkDeleteMutation = useMutation({
        mutationFn: async () => {
            const ids = selectedRows.map(o => o.id);
            await Promise.all(ids.map(id => apiClient.delete(`/orders/${id}`)));
        },
        onSuccess: () => {
            toast.success(`تم حذف ${selectedRows.length} طلبية بنجاح`);
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            setRowSelection({});
        },
        onError: () => toast.error('حدث خطأ أثناء الحذف الجماعي'),
    });

    const handleBulkDelete = () => {
        if (window.confirm(`هل أنت متأكد من حذف ${selectedRows.length} طلبية بشكل نهائي؟`)) {
            bulkDeleteMutation.mutate();
        }
    };

    return (
        <div className="space-y-6 w-full relative pb-20 md:pb-0">
            <DataTableToolbar table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            
            <div className="w-full overflow-x-auto rounded-xl pb-2 bg-white">
                <Table className="min-w-[1000px] w-full border-none">
                    <TableHeader className="bg-transparent border-b-2 border-gray-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-none hover:bg-transparent">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="font-bold text-gray-500 text-right py-4 whitespace-nowrap h-auto"
                                            style={{
                                                width: header.getSize(),
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={(e) => handleRowClick(row.original as Order, e)}
                                    className={`border-b border-gray-50 transition-colors cursor-pointer ${
                                        row.getIsSelected() ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-gray-50/80'
                                    }`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="text-right py-4 whitespace-nowrap"
                                            style={{
                                                width: cell.column.getSize(),
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-32 text-center text-gray-500 font-medium">
                                    لا توجد طلبيات تطابق الفلتر أو البحث الحالي.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {selectedOrder && (
                <OrderDetailsDialog 
                    order={selectedOrder} 
                    open={isDetailsOpen} 
                    onOpenChange={setIsDetailsOpen} 
                />
            )}

            {/* الشريط العائم للإجراءات الجماعية (يظهر فقط عند التحديد) */}
            {selectedRows.length > 0 && (
                <div className="fixed bottom-bottom-nav md:bottom-0 left-0 right-0 md:left-[280px] bg-white border-t border-gray-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-40 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="bg-primary text-white font-black px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-sm">
                                <CheckSquare className="w-5 h-5" />
                                تم تحديد <span dir="ltr" className="text-lg">{selectedRows.length}</span>
                            </div>
                            <Button variant="ghost" onClick={() => setRowSelection({})} className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl px-3 font-bold">
                                <X className="w-4 h-4 ml-1" /> إلغاء
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
                            <div className="min-w-[160px]">
                                <Select
                                    onValueChange={(val) => bulkStatusMutation.mutate(val)}
                                    disabled={bulkStatusMutation.isPending || bulkDeleteMutation.isPending}
                                >
                                    <SelectTrigger className="h-11 rounded-xl bg-gray-50 font-bold border-gray-200" dir="rtl">
                                        <Edit className="w-4 h-4 ml-2 text-gray-500" />
                                        <SelectValue placeholder="تغيير الحالة للكل" />
                                    </SelectTrigger>
                                    <SelectContent dir="rtl" className="rounded-xl shadow-xl border-gray-100">
                                        {Object.entries(statusMap).map(([value, { label, color }]) => (
                                            <SelectItem key={value} value={value} className="cursor-pointer font-bold text-xs m-1 rounded-lg">
                                                <span className={`px-2 py-1 rounded-md ${color.replace('hover:', '').replace('focus:', '')}`}>{label}</span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button 
                                onClick={handleBulkPrint} 
                                variant="outline" 
                                className="h-11 rounded-xl font-bold border-2 border-gray-200 hover:bg-gray-50 whitespace-nowrap"
                                disabled={bulkStatusMutation.isPending || bulkDeleteMutation.isPending}
                            >
                                <Printer className="w-4 h-4 ml-2" /> طباعة الملصقات
                            </Button>

                            <Button 
                                onClick={handleBulkDelete} 
                                className="h-11 rounded-xl font-bold bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none whitespace-nowrap"
                                disabled={bulkStatusMutation.isPending || bulkDeleteMutation.isPending}
                            >
                                <Trash2 className="w-4 h-4 ml-2" /> حذف الكل
                            </Button>
                        </div>

                    </div>
                </div>
            )}

            {/* الحاوية المخفية للطباعة الجماعية */}
            <div className="hidden">
                <div ref={bulkPrintRef} style={{ margin: 0, padding: 0 }}>
                    {selectedRows.map(order => (
                        <OrderLabelTemplate key={order.id} order={order} />
                    ))}
                </div>
            </div>

        </div>
    );
}