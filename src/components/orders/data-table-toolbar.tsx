"use client"

import * as React from "react"
import { Table } from "@tanstack/react-table"
import { X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
}

const tabsOptions = [
    { label: 'الكل', value: 'ALL' },
    { label: 'قيد الانتظار', value: 'PENDING' },
    { label: 'تم التجهيز', value: 'PREPARING' },
    { label: 'تم الشحن', value: 'SHIPPED' },
    { label: 'تم التوصيل', value: 'DELIVERED' },
    { label: 'ملغى/مرتجع', value: 'FAILED' },
];

export function DataTableToolbar<TData>({
    table,
    globalFilter,
    setGlobalFilter,
}: DataTableToolbarProps<TData>) {
    
    // إخفاء زر "إلغاء الفرز" إذا كان الفلتر الوحيد المفعل هو "الحالة" من التبويبات
    // يظهر فقط عند استخدام فلتر الولاية أو الموزع
    const activeFilters = table.getState().columnFilters.filter(f => f.id !== 'status');
    const isFiltered = activeFilters.length > 0;

    const distributorColumn = table.getColumn("distributor.name");
    // @ts-expect-error
    const distributorFacets = table.options.data.map(row => row.distributor?.name || "بدون موزع");
    const uniqueDistributors = Array.from(new Set(distributorFacets)).filter(Boolean).map(dist => ({ label: dist as string, value: dist as string }));

    const stateColumn = table.getColumn("customer.state");
    // @ts-expect-error
    const stateFacets = table.options.data.map(row => row.customer?.state);
    const uniqueStates = Array.from(new Set(stateFacets)).filter(Boolean).map(state => ({ label: state as string, value: state as string }));

    // 1. بحث سلس جداً (Local State + Debouncing)
    const [searchValue, setSearchValue] = React.useState(globalFilter ?? "");
    const [activeTab, setActiveTab] = React.useState("ALL");

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setGlobalFilter(searchValue);
        }, 200); // 200ms delay for super smooth typing

        return () => clearTimeout(timeout);
    }, [searchValue, setGlobalFilter]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    // 2. التحكم في التبويبات مباشرة (تتلون بالأزرق في اللحظة نفسها)
    const handleTabClick = (tabValue: string) => {
        setActiveTab(tabValue); // تحديث اللون فوراً
        
        if (tabValue === 'ALL') {
            table.getColumn("status")?.setFilterValue(undefined);
        } else if (tabValue === 'FAILED') {
            table.getColumn("status")?.setFilterValue(['CANCELLED', 'RETURNED']);
        } else {
            table.getColumn("status")?.setFilterValue([tabValue]);
        }
    };

    return (
        <div className="flex flex-col space-y-4 mb-4" dir="rtl">
            {/* شريط البحث المدمج السلس */}
            <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                    placeholder="بحث بالاسم، رقم الهاتف، أو رقم الطلبية..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="h-12 w-full rounded-2xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-900 placeholder:text-gray-400 pl-4 pr-12 text-sm font-bold shadow-sm transition-all"
                />
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                
                {/* التبويبات الأفقية (تتلون 100%) */}
                <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar gap-2 hide-scroll-bar">
                    {tabsOptions.map((tab) => {
                        const isSelected = activeTab === tab.value;
                        return (
                            <button
                                key={tab.value}
                                onClick={() => handleTabClick(tab.value)}
                                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                                    isSelected 
                                    ? 'bg-primary text-white shadow-md shadow-primary/30 transform scale-[0.98]' 
                                    : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center space-x-2 space-x-reverse flex-wrap gap-y-2">
                    {distributorColumn && uniqueDistributors.length > 0 && (
                        <DataTableFacetedFilter column={distributorColumn} title="كل الموزعين" options={uniqueDistributors} />
                    )}
                    {stateColumn && uniqueStates.length > 0 && (
                        <DataTableFacetedFilter column={stateColumn} title="كل الولايات" options={uniqueStates} />
                    )}
                    
                    {isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => {
                                table.resetColumnFilters();
                                // لا نعيد تعيين التبويب، نحذف فقط الفلاتر الجانبية
                            }}
                            className="h-10 px-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl font-bold"
                        >
                            إلغاء الفرز
                            <X className="mr-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}