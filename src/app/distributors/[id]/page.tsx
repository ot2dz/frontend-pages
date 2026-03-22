'use client';

export const runtime = 'edge';

import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, CircleDashed, Package, Wallet, Receipt, HandCoins, CheckSquare, Printer } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DistributorDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const queryClient = useQueryClient();

    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

    const { data: details, isLoading } = useQuery({
        queryKey: ['distributor-details', id],
        queryFn: async () => {
            const res = await apiClient.get(`/distributors/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const settleMutation = useMutation({
        mutationFn: async (orderIds: string[]) => {
            const res = await apiClient.put('/orders/actions/settle', { orderIds });
            return res.data;
        },
        onSuccess: () => {
            toast.success('تم تأكيد التسوية والتحصيل بنجاح');
            setSelectedOrders([]);
            queryClient.invalidateQueries({ queryKey: ['distributor-details', id] });
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: () => {
            toast.error('حدث خطأ أثناء محاولة التسوية');
        }
    });

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[50vh] items-center justify-center">
                    <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (!details?.distributor) {
        return (
            <DashboardLayout>
                <div className="text-center mt-20 text-gray-500 font-bold text-xl">الموزع غير موجود أو تم حذفه.</div>
            </DashboardLayout>
        );
    }

    const { distributor, orders } = details;

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);
    const totalCommission = orders.reduce((sum: number, o: any) => sum + (o.deliveryFee || 300), 0);

    // التعديل هنا: جلب كل الطلبيات التي لم تتم تسويتها بغض النظر عن حالة الشحن
    const unsettledOrders = orders.filter((o: any) => {
        const isSettled = o.isSettled === true || o.isSettled === 1 || o.isSettled === 'true' || o.isSettled === '1';
        return !isSettled;
    });

    const totalNetDue = unsettledOrders.reduce((sum: number, o: any) => sum + ((o.totalAmount || 0) - (o.deliveryFee || 300)), 0);

    const isAllSelected = unsettledOrders.length > 0 && selectedOrders.length === unsettledOrders.length;

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedOrders(unsettledOrders.map((o: any) => o.id));
        } else {
            setSelectedOrders([]);
        }
    };

    const handleSelectOne = (orderId: string, checked: boolean) => {
        if (checked) {
            setSelectedOrders(prev => [...prev, orderId]);
        } else {
            setSelectedOrders(prev => prev.filter(id => id !== orderId));
        }
    };

    const selectedNetDue = orders
        .filter((o: any) => selectedOrders.includes(o.id))
        .reduce((sum: number, o: any) => sum + ((o.totalAmount || 0) - (o.deliveryFee || 300)), 0);

    const handleSettle = () => {
        if (selectedOrders.length === 0) return;
        settleMutation.mutate(selectedOrders);
    };

    const handlePrint = () => {
        const selectedOrdersData = orders.filter((o: any) => selectedOrders.includes(o.id));
        const totalAmount = selectedOrdersData.reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);
        const totalFee = selectedOrdersData.reduce((sum: number, o: any) => sum + (o.deliveryFee || 300), 0);
        const totalNet = totalAmount - totalFee;

        // تنسيق التاريخ والوقت
        const now = new Date();
        const formattedDate = now.toLocaleDateString('ar-DZ-u-nu-latn', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const formattedTime = now.toLocaleTimeString('ar-DZ-u-nu-latn', { hour: '2-digit', minute: '2-digit' });

        const rows = selectedOrdersData.map((o: any, i: number) => `
            <tr>
                <td class="center">${i + 1}</td>
                <td class="truncate-text">${o.customer?.fullName || '-'}</td>
                <td class="ltr center">${o.customer?.phone || '-'}</td>
                <td class="ltr amount">${(o.totalAmount || 0).toLocaleString('en-US')}</td>
            </tr>
        `).join('');

        const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8"/>
<title>قائمة شحن - ${distributor.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet"/>
<style>
  /* إعدادات الصفحة للطباعة الحرارية (عرض 100 مم وارتفاع تلقائي) */
  @page {
    size: 100mm auto;
    margin: 0;
  }
  
  :root {
    --primary-color: #0057b8;
    --dark-bg: #1a1a1a;
    --border-color: #e5e7eb;
    --text-main: #0f172a;
    --text-muted: #64748b;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body { 
    font-family: 'Cairo', Arial, sans-serif; 
    color: var(--text-main); 
    background: #fff;
    width: 100mm;
    margin: 0 auto;
    padding: 4mm; /* هوامش داخلية للورقة */
    font-size: 10px; /* تصغير الخط ليتناسب مع 100 مم */
    direction: rtl; 
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* الرأس (Header) */
  .header { 
    border-bottom: 2px solid var(--text-main); 
    padding-bottom: 4px; 
    margin-bottom: 6px; 
    text-align: center;
  }
  .header h1 { 
    font-size: 14px; 
    font-weight: 900; 
    margin-bottom: 4px;
    letter-spacing: -0.5px;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    text-align: right;
    font-size: 9px;
    margin-bottom: 4px;
  }
  .info-item {
    background: #f8fafc;
    padding: 3px 4px;
    border-radius: 4px;
    border: 1px solid var(--border-color);
  }
  .info-item span { color: var(--text-muted); display: block; font-size: 8px; }
  .info-item strong { font-weight: 700; font-size: 9px;}
  .info-item.full-width { grid-column: 1 / -1; }

  /* الجدول */
  table { 
    width: 100%; 
    border-collapse: collapse; 
    margin-bottom: 8px; 
    table-layout: fixed;
  }
  
  /* تحديد عرض الأعمدة ليتناسب مع 100 مم */
  th:nth-child(1), td:nth-child(1) { width: 8%; }  /* الرقم */
  th:nth-child(2), td:nth-child(2) { width: 33%; } /* الزبون */
  th:nth-child(3), td:nth-child(3) { width: 27%; } /* الهاتف */
  th:nth-child(4), td:nth-child(4) { width: 32%; } /* المبلغ */

  thead tr { 
    background-color: var(--dark-bg) !important; 
    color: #ffffff !important; 
  }
  
  th { 
    padding: 4px 2px; 
    font-size: 9px; 
    font-weight: 700;
    text-align: right; 
  }
  
  td { 
    padding: 4px 2px; 
    font-size: 9px; 
    border-bottom: 1px solid var(--border-color); 
    word-wrap: break-word;
  }
  
  /* تلوين تناوبي للصفوف */
  tbody tr:nth-child(even) td { background-color: #f8fafc !important; }
  
  td.center, th.center { text-align: center; }
  td.ltr { direction: ltr; }
  td.amount { font-weight: 700; text-align: left; }
  .truncate-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* التذييل (Footer) */
  .footer { 
    border-top: 2px dashed var(--border-color); 
    padding-top: 6px; 
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 0;
    font-size: 10px;
  }
  
  .summary-row span { color: var(--text-muted); font-weight: 600; }
  .summary-row strong { font-weight: 700; }
  
  .summary-row.net-total {
    margin-top: 4px;
    padding-top: 6px;
    border-top: 2px solid var(--dark-bg);
    color: var(--primary-color) !important;
  }
  .summary-row.net-total span { color: var(--primary-color) !important; font-size: 11px; font-weight: 900; }
  .summary-row.net-total strong { font-size: 13px; font-weight: 900; }

  /* توقيع أو مساحة فارغة في الأسفل */
  .signature {
    margin-top: 15px;
    text-align: center;
    font-size: 8px;
    color: var(--text-muted);
  }
</style>
</head>
<body>

<div class="header">
  <h1>بيـــان شحــــن</h1>
  <div class="info-grid">
    <div class="info-item full-width">
      <span>الموزع</span>
      <strong>${distributor.name}</strong>
    </div>
    <div class="info-item full-width">
      <span>مناطق التغطية</span>
      <strong>${distributor.wilayas || 'كل الولايات'}</strong>
    </div>
    <div class="info-item">
      <span>التاريخ والوقت</span>
      <strong class="ltr" style="display:block; text-align:right;">${formattedTime} - ${formattedDate}</strong>
    </div>
    <div class="info-item">
      <span>عدد الطلبيات</span>
      <strong>${selectedOrdersData.length}</strong>
    </div>
  </div>
</div>

<table>
  <thead>
    <tr>
      <th class="center">#</th>
      <th>الزبون</th>
      <th class="center">الهاتف</th>
      <th style="text-align: left;">المبلغ</th>
    </tr>
  </thead>
  <tbody>${rows}</tbody>
</table>

<div class="footer">
  <div class="summary-row">
    <span>إجمالي المبالغ:</span>
    <strong class="ltr">${totalAmount.toLocaleString('en-US')} د.ج</strong>
  </div>
  <div class="summary-row">
    <span>عمولة التوصيل:</span>
    <strong class="ltr">${totalFee.toLocaleString('en-US')} د.ج</strong>
  </div>
  <div class="summary-row net-total">
    <span>الصافي المستحق:</span>
    <strong class="ltr">${totalNet.toLocaleString('en-US')} د.ج</strong>
  </div>
</div>

<div class="signature">
  تم الاستخراج آلياً من النظام
</div>

</body>
</html>`;

        const win = window.open('', '_blank', 'width=400,height=600'); // تصغير النافذة المنبثقة لتناسب شكل الوصل
        if (win) {
            win.document.write(html);
            win.document.close();
            setTimeout(() => { win.focus(); win.print(); }, 800);
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 w-full">
                <div className="flex items-center gap-4">
                    <Link href="/distributors">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white hover:bg-gray-100 shadow-sm border border-gray-100">
                            <ArrowRight className="w-5 h-5 text-gray-600" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">
                            {distributor.name}
                        </h1>
                        <p className="text-gray-500 font-bold text-sm">
                            {distributor.phone ? `هاتف: ${distributor.phone} ` : ''} • تغطية: {distributor.wilayas || 'كل الولايات'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <Card className="rounded-2xl border-none shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-3.5 rounded-2xl">
                                <Package className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500 mb-0.5">إجمالي الطلبيات</p>
                                <h3 className="text-2xl font-black text-gray-900" dir="ltr">{totalOrders}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-emerald-50 p-3.5 rounded-2xl">
                                <Wallet className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500 mb-0.5">إجمالي المداخيل</p>
                                <h3 className="text-2xl font-black text-gray-900" dir="ltr">{totalRevenue.toLocaleString('en-US')} <span className="text-xs text-gray-400 font-bold">د.ج</span></h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-50 p-3.5 rounded-2xl">
                                <Receipt className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500 mb-0.5">إجمالي العمولة</p>
                                <h3 className="text-2xl font-black text-gray-900" dir="ltr">{totalCommission.toLocaleString('en-US')} <span className="text-xs text-gray-400 font-bold">د.ج</span></h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm bg-primary text-white relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                    <CardContent className="p-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3.5 rounded-2xl backdrop-blur-sm">
                                <HandCoins className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-blue-100 mb-0.5">الصافي المستحق (قيد الانتظار)</p>
                                <h3 className="text-2xl font-black text-white" dir="ltr">{totalNetDue.toLocaleString('en-US')} <span className="text-xs text-blue-200 font-bold">د.ج</span></h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden mb-6">
                <div className="border-b border-gray-50 p-6 flex justify-between items-center bg-gray-50/30">
                    <h2 className="text-lg font-black text-gray-900">سجل الطلبيات للموزع</h2>
                </div>
                <div className={`overflow-x-auto w-full transition-all duration-300 ${selectedOrders.length > 0 ? 'pb-44 md:pb-24' : 'pb-0'}`}>
                    <table className="w-full text-sm text-right">
                        <thead className="bg-transparent border-b-2 border-gray-100">
                            <tr>
                                <th className="px-6 py-4 w-12 text-center">
                                    <Checkbox
                                        checked={isAllSelected}
                                        onCheckedChange={handleSelectAll}
                                        className="h-5 w-5 rounded-md border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        disabled={unsettledOrders.length === 0}
                                    />
                                </th>
                                <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">رقم الطلبية</th>
                                <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">العميل</th>
                                <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">المجموع</th>
                                <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">العمولة</th>
                                <th className="font-bold text-gray-500 px-4 py-4 whitespace-nowrap">الصافي</th>
                                <th className="font-bold text-gray-500 px-6 py-4 whitespace-nowrap">حالة التسوية</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center p-12 text-gray-500 font-bold">لا توجد طلبيات مسجلة لهذا الموزع بعد.</td>
                                </tr>
                            ) : null}
                            {orders.map((order: any) => {
                                const isSettled = order.isSettled === true || order.isSettled === 1 || order.isSettled === 'true' || order.isSettled === '1';
                                const commission = order.deliveryFee || 300;
                                const net = (order.totalAmount || 0) - commission;

                                return (
                                    <tr key={order.id} className={`border-b border-gray-50 transition-colors ${selectedOrders.includes(order.id) ? 'bg-primary/5' : 'hover:bg-gray-50/80'}`}>
                                        <td className="px-6 py-4 text-center">
                                            <Checkbox
                                                checked={selectedOrders.includes(order.id) || isSettled}
                                                onCheckedChange={(c: boolean | string) => handleSelectOne(order.id, c as boolean)}
                                                disabled={isSettled}
                                                className="h-5 w-5 rounded-md border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary disabled:opacity-50"
                                            />
                                        </td>
                                        <td className="px-4 py-4 font-black text-gray-900 whitespace-nowrap">{order.customId}</td>
                                        <td className="px-4 py-4 font-bold text-gray-600 whitespace-nowrap">{order.customer?.fullName}</td>
                                        <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap" dir="ltr">{order.totalAmount?.toLocaleString('en-US')} د.ج</td>
                                        <td className="px-4 py-4 text-orange-500 font-bold whitespace-nowrap" dir="ltr">{commission.toLocaleString('en-US')} د.ج</td>
                                        <td className="px-4 py-4 font-black text-emerald-600 whitespace-nowrap" dir="ltr">{net.toLocaleString('en-US')} د.ج</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {isSettled ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                    <CheckCircle2 className="w-4 h-4" /> تمت التسوية
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
                                                    <CircleDashed className="w-4 h-4 animate-spin-slow" /> غير مسواة
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            {selectedOrders.length > 0 && (
                <div className="fixed bottom-bottom-nav md:bottom-0 left-0 right-0 md:left-[280px] bg-white border-t border-gray-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-40 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="bg-primary/10 text-primary font-black px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-sm border border-primary/20">
                                <CheckSquare className="w-5 h-5" />
                                تحديد <span dir="ltr" className="text-lg">{selectedOrders.length}</span> طلب
                            </div>
                            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
                            <div className="text-gray-600 font-bold flex items-center gap-2 text-sm">
                                الصافي المستحق تحصيله:
                                <span className="text-xl font-black text-emerald-600" dir="ltr">{selectedNetDue.toLocaleString('en-US')} د.ج</span>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                            <Button
                                onClick={handlePrint}
                                variant="outline"
                                className="w-full md:w-auto border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl h-12 font-bold px-6 text-base flex items-center gap-2"
                            >
                                <Printer className="w-5 h-5" />
                                طباعة قائمة الشحن
                            </Button>
                            <Button
                                onClick={handleSettle}
                                disabled={settleMutation.isPending}
                                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/30 h-12 font-bold px-8 text-base transition-transform active:scale-95"
                            >
                                تأكيد التحصيل والتسوية المالية
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}