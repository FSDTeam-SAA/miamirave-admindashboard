
import ReactQueryProvider from '@/components/provider/QueryClientProvider ';
import SessionProvider from '@/components/shyard/SessionProvider';
import { Toaster } from '@/components/ui/sonner';
import { Metadata } from 'next';
import { Jost } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

const jost = Jost({
  subsets: ['latin'],         
  weight: ['100','200','300','400','500','600','700','800','900'], 
  display: 'swap',            
});

export const metadata: Metadata = {
  title: 'Mary janes Bakery Co || Admin Dashboard.',
  description: 'Admin Dashboard for Mary Janes Bakery Co. Manage orders, inventory, users, and track sales all in one place.',
   icons: {
    icon: '/assets/logo.png', 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jost.className}>
      <body>
        <NextTopLoader color="#0070f3" height={3}   showSpinner={false} />
        <SessionProvider>
        <ReactQueryProvider>
        {children}
         <Toaster
          position="top-right" 
          richColors
          closeButton
        />
        </ReactQueryProvider>
        </SessionProvider>
        </body>
    </html>
  );
}
