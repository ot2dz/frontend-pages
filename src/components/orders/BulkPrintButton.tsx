'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { OrderLabelTemplate } from './OrderLabelTemplate';
import { Order } from './columns';

export function BulkPrintButton({ orders }: { orders: Order[] | undefined }) {
    const printRef = useRef<HTMLDivElement>(null);

    const preparingOrders = orders?.filter((o) => o.status === 'PREPARING') || [];

    const handlePrint = useReactToPrint({
        contentRef: printRef, // For v3
        documentTitle: 'ملصقات_الرد_المجمعة',
    }) as unknown as () => void;

    return (
        <>
            <Button
                onClick={handlePrint}
                disabled={preparingOrders.length === 0}
                className="w-full md:w-auto gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md h-11 font-bold"
            >
                <Printer className="w-4 h-4" />
                طباعة ملصقات التجهيز ({preparingOrders.length})
            </Button>

            <div className="hidden">
                {/* We use a container that removes margin/padding globally so the 100mm dimensions pop perfectly per page. */}
                <div ref={printRef} style={{ margin: 0, padding: 0 }}>
                    {preparingOrders.map((order) => (
                        <OrderLabelTemplate key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </>
    );
}
