import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers';
import { Toaster } from 'sonner';

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export const metadata: Metadata = {
  title: 'نظام يوسف للأقمشة',
  description: '100% Cloudflare Native Order Management System (Arabic)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <Providers>{children}</Providers>
        <Toaster position="bottom-center" richColors dir="rtl" />
      </body>
    </html>
  );
}