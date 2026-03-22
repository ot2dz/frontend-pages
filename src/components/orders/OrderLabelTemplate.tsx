'use client';

import { QRCodeSVG } from 'qrcode.react';

export function OrderLabelTemplate({ order }: { order: any }) {
    if (!order) return null;

    return (
        <div className="flex flex-col px-4 py-3 mx-auto bg-white text-black font-sans" dir="rtl" style={{ width: '100mm', height: '148mm', boxSizing: 'border-box', overflow: 'hidden', pageBreakInside: 'avoid', pageBreakAfter: 'always', backgroundColor: 'white', color: 'black' }}>
            {/* Header: Store Info */}
            <div className="flex flex-col items-center justify-center border-b-2 pb-2 mb-2 border-black">
                <h1 className="text-4xl font-black tracking-wider text-center">يوسف للأقمشة</h1>
            </div>

            {/* Order Identifier & QR Code */}
            <div className="flex justify-between items-center border-b-2 pb-2 mb-2 border-black">
                <div className="flex flex-col gap-1 w-2/3">
                    <span className="text-[10px] uppercase font-bold text-gray-500">رقم الطلبية</span>
                    <span className="text-xl font-black">{order.customId}</span>
                    <span className="text-xs font-semibold mt-1 text-gray-600" dir="ltr" style={{ textAlign: 'right' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-GB')}
                    </span>
                </div>
                <div className="flex flex-col items-end w-1/3">
                    {/* USE QRCodeSVG from 'qrcode.react' here with size={56} */}
                    <QRCodeSVG value={order.customId} size={56} level="M" includeMargin={false} />
                </div>
            </div>

            {/* Customer Information */}
            <div className="flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-[10px] uppercase font-bold text-gray-500">إلى السيد(ة)</span>
                    <h2 className="text-2xl font-black leading-tight mt-0.5 truncate">{order.customer?.fullName || order.customerName || 'عنصر غير متوفر'}</h2>
                </div>

                <div className="mb-2">
                    <span className="text-[10px] uppercase font-bold text-gray-500">رقم الهاتف</span>
                    <p className="text-3xl font-black tracking-widest mt-0.5" dir="ltr" style={{ textAlign: 'left' }}>
                        {order.customer?.phone || order.phone || ''}
                    </p>
                </div>

                <div className="mb-1">
                    <span className="text-[10px] uppercase font-bold text-gray-500">العنوان</span>
                    <p className="text-lg font-bold leading-snug mt-0.5">
                        {order.customer?.state || order.state || ''} - {order.customer?.city || order.city || ''}
                    </p>
                    <p className="text-base font-semibold leading-snug mt-0.5 text-gray-800 line-clamp-2">
                        {order.customer?.address || order.address || ''}
                    </p>
                </div>
            </div>

            {/* Cash On Delivery Amount */}
            <div className="mt-auto border-t-2 border-dashed pt-2 border-black">
                <div className="flex justify-between items-center border-2 rounded p-2 border-black bg-gray-100" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                    <div className="flex flex-col">
                        <span className="text-sm font-black uppercase">الدفع عند الاستلام</span>
                        <span className="text-[10px] font-bold mt-0.5 text-gray-600" dir="ltr">CASH ON DELIVERY</span>
                    </div>
                    <div className="text-2xl font-black flex items-center gap-1" dir="ltr">
                        <span>{order.totalAmount}</span>
                        <span className="text-base font-bold">DZD</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
