'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { CreateDistributorDialog } from '@/components/distributors/create-distributor-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Truck, Clock, Star, MapPin, Eye, FileText } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// تعريف الواجهات
interface Distributor {
    id: string;
    name: string;
    phone: string | null;
    wilayas: string | null;
    baseFee: number;
}

interface Order {
    id: string;
    status: string;
    distributorId: string | null;
}

export default function DistributorsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    // جلب الموزعين
    const { data: distributors, isLoading: isLoadingDistributors } = useQuery<Distributor[]>({
        queryKey: ['distributors'],
        queryFn: async () => {
            const res = await apiClient.get('/distributors');
            return res.data;
        },
    });

    // جلب الطلبيات لحساب إحصائيات الموزعين (الحمل الحالي والأكثر إنجازاً)
    const { data: orders, isLoading: isLoadingOrders } = useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await apiClient.get('/orders');
            return res.data;
        },
    });

    const isLoading = isLoadingDistributors || isLoadingOrders;

    // --- الحسابات والإحصائيات ---
    const activeDistributorsCount = distributors?.length || 0;

    // حساب الأكثر إنجازاً (الموزع الذي لديه أكبر عدد طلبيات "مكتملة")
    let topPerformer = 'غير متوفر';
    if (distributors && orders) {
        const deliveredOrders = orders.filter(o => o.status === 'DELIVERED' && o.distributorId);
        const distCounts: Record<string, number> = {};
        
        deliveredOrders.forEach(o => {
            if (o.distributorId) {
                distCounts[o.distributorId] = (distCounts[o.distributorId] || 0) + 1;
            }
        });

        let maxCount = 0;
        let topDistId = null;
        for (const [distId, count] of Object.entries(distCounts)) {
            if (count > maxCount) {
                maxCount = count;
                topDistId = distId;
            }
        }

        if (topDistId) {
            const dist = distributors.find(d => d.id === topDistId);
            if (dist) topPerformer = dist.name;
        }
    }

    // فلترة الموزعين بناءً على البحث
    const filteredDistributors = distributors?.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (d.wilayas && d.wilayas.includes(searchTerm))
    ) || [];

    // دالة للحصول على الحرفين الأولين كشعار
    const getInitials = (name: string) => {
        const parts = name.split(' ');
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    // دالة لتوليد ألوان الشعار (Avatar)
    const getAvatarColor = (index: number) => {
        const colors = [
            'bg-blue-100 text-blue-600',
            'bg-orange-100 text-orange-600',
            'bg-emerald-100 text-emerald-600',
            'bg-purple-100 text-purple-600',
            'bg-rose-100 text-rose-600'
        ];
        return colors[index % colors.length];
    };

    // دالة لحساب "الحمل الحالي" (الطلبيات قيد المعالجة أو الشحن لهذا الموزع)
    const getCurrentLoad = (distributorId: string) => {
        if (!orders) return 0;
        return orders.filter(o => o.distributorId === distributorId && ['PENDING', 'PREPARING', 'SHIPPED'].includes(o.status)).length;
    };

    // دالة لمحاكاة "الأداء" (لأننا لا نملك بيانات التوصيل الدقيقة حالياً، نعتمد على نسبة وهمية أو بناءً على التوصيل)
    const getPerformance = (distributorId: string) => {
        if (!orders) return { percentage: 0, label: 'متوسط', color: 'bg-gray-200' };
        
        const distOrders = orders.filter(o => o.distributorId === distributorId);
        if (distOrders.length === 0) return { percentage: 0, label: 'جديد', color: 'bg-gray-200' };

        const delivered = distOrders.filter(o => o.status === 'DELIVERED').length;
        const failed = distOrders.filter(o => o.status === 'CANCELLED' || o.status === 'RETURNED').length;
        const totalResolved = delivered + failed;
        
        if (totalResolved === 0) return { percentage: 100, label: 'جيد', color: 'bg-blue-500' };

        const percentage = Math.round((delivered / totalResolved) * 100);
        
        if (percentage >= 90) return { percentage, label: 'ممتاز', color: 'bg-emerald-500' };
        if (percentage >= 75) return { percentage, label: 'جيد', color: 'bg-blue-500' };
        if (percentage >= 50) return { percentage, label: 'متوسط', color: 'bg-orange-500' };
        return { percentage, label: 'ضعيف', color: 'bg-red-500' };
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 w-full">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">إدارة الموزعين وشركات التوصيل</h1>
                    <p className="text-gray-500 font-medium text-sm">إدارة شركاء التوصيل، متابعة الأداء، وتسوية المستحقات المالية</p>
                </div>
                <CreateDistributorDialog />
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-500 mb-1">الموزعون النشطون</span>
                            <span className="text-3xl font-black text-primary" dir="ltr">{activeDistributorsCount}</span>
                        </div>
                        <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl">
                            <Truck className="w-8 h-8" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-500 mb-1">متوسط وقت التوصيل</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-orange-500" dir="ltr">2.4</span>
                                <span className="text-sm font-bold text-gray-400">يوم</span>
                            </div>
                        </div>
                        <div className="bg-orange-50 text-orange-500 p-4 rounded-2xl">
                            <Clock className="w-8 h-8" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6 flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-500 mb-1">الأكثر إنجازاً</span>
                            <span className="text-xl font-black text-emerald-600 mt-1 truncate max-w-[150px]">{topPerformer}</span>
                        </div>
                        <div className="bg-emerald-50 text-emerald-500 p-4 rounded-2xl">
                            <Star className="w-8 h-8 fill-current" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Toolbar (Search & Actions) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                        placeholder="البحث عن موزع، منطقة، أو رقم تواصل..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-12 w-full rounded-2xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-900 placeholder:text-gray-400 pl-4 pr-12 text-sm font-bold shadow-sm transition-all"
                    />
                </div>
                
                <Button variant="outline" className="w-full md:w-auto h-12 rounded-xl text-primary border-primary/20 bg-primary/5 hover:bg-primary/10 hover:text-primary font-bold shadow-sm px-6">
                    <FileText className="mr-0 ml-2 w-4 h-4" /> إنشاء تسوية مجمعة
                </Button>
            </div>

            {/* Enhanced Distributors List / Table */}
            <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden mb-24">
                <div className="overflow-x-auto w-full">
                    {isLoading ? (
                        <div className="p-12 text-center text-gray-500 font-bold flex flex-col items-center justify-center">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                            جاري تحميل بيانات الموزعين...
                        </div>
                    ) : filteredDistributors.length === 0 ? (
                        <div className="p-12 text-center text-gray-500 font-bold">
                            لا يوجد موزعين يطابقون البحث.
                        </div>
                    ) : (
                        <table className="w-full text-sm text-right">
                            <thead className="bg-transparent border-b-2 border-gray-100">
                                <tr>
                                    <th className="font-bold text-gray-500 px-6 py-4">الموزع</th>
                                    <th className="font-bold text-gray-500 px-6 py-4">مناطق التغطية</th>
                                    <th className="font-bold text-gray-500 px-6 py-4">سعر الشحن</th>
                                    <th className="font-bold text-gray-500 px-6 py-4">الأداء</th>
                                    <th className="font-bold text-gray-500 px-6 py-4">الحمل الحالي</th>
                                    <th className="font-bold text-gray-500 px-6 py-4">الحالة</th>
                                    <th className="font-bold text-gray-500 px-6 py-4 text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDistributors.map((distributor, index) => {
                                    // تقسيم الولايات لعمل Badges (إن وجدت)
                                    const coverageAreas = distributor.wilayas 
                                        ? distributor.wilayas.split(',').map(s => s.trim()).slice(0, 3) 
                                        : ['كل الولايات'];
                                    
                                    const hasMore = distributor.wilayas ? distributor.wilayas.split(',').length > 3 : false;

                                    const currentLoad = getCurrentLoad(distributor.id);
                                    const perf = getPerformance(distributor.id);

                                    return (
                                        <tr key={distributor.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors group">
                                            {/* Distributor Info */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${getAvatarColor(index)}`}>
                                                        {getInitials(distributor.name)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-sm whitespace-nowrap">{distributor.name}</p>
                                                        <p className="text-xs text-gray-500 font-medium">{distributor.phone || 'لوجستيات وطنية'}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Coverage Areas (Badges) */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1.5 min-w-[120px]">
                                                    {coverageAreas.map((area, i) => (
                                                        <span key={i} className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-[10px] font-bold whitespace-nowrap">
                                                            <MapPin className="w-3 h-3 text-gray-400" /> {area}
                                                        </span>
                                                    ))}
                                                    {hasMore && (
                                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-[10px] font-bold">
                                                            ...
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Shipping Rate */}
                                            <td className="px-6 py-4">
                                                <p className="font-black text-gray-900 whitespace-nowrap" dir="ltr">
                                                    {distributor.baseFee} <span className="text-xs text-gray-500 font-bold">د.ج</span>
                                                </p>
                                            </td>

                                            {/* Performance (Progress Bar) */}
                                            <td className="px-6 py-4 min-w-[140px]">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className={`text-[10px] font-bold ${perf.color.replace('bg-', 'text-')}`}>
                                                        {perf.percentage}%
                                                    </span>
                                                    <span className="text-[10px] text-gray-500 font-bold">{perf.label}</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                    <div className={`h-full rounded-full ${perf.color}`} style={{ width: `${perf.percentage}%` }}></div>
                                                </div>
                                            </td>

                                            {/* Current Load (Badge) */}
                                            <td className="px-6 py-4">
                                                <span className="inline-flex flex-col items-center justify-center bg-blue-50 text-blue-600 px-3 py-1 rounded-xl text-xs font-bold border border-blue-100 min-w-[50px]">
                                                    <span className="text-lg leading-none">{currentLoad}</span>
                                                    <span className="text-[9px]">طلب</span>
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-100">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> نشط
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link href={`/distributors/${distributor.id}`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-gray-500 hover:text-primary hover:bg-blue-50">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    {/* يمكن لاحقاً إضافة زر تعديل معلومات الموزع هنا */}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </Card>
        </DashboardLayout>
    );
}