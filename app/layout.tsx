// app/layout.tsx
import { Jost } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

const jost = Jost({
  subsets: ['latin'],         // the character set
  weight: ['100','200','300','400','500','600','700','800','900'], // pick what you need
  display: 'swap',            // avoids invisible text flash
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jost.className}>
      <body>
        <NextTopLoader color="#0070f3" height={3}   showSpinner={false} />
        {children}
        </body>
    </html>
  );
}
