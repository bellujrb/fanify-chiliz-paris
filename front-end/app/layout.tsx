import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Web3Providers from '@/providers/Web3Providers';
import FootballCursor from '@/components/ui/footbal-cursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fanify',
  description: 'The new generation of sports engagement with Blockchain and Instagram.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FootballCursor />
        <Web3Providers>
          {children}
        </Web3Providers>
      </body>
    </html>
  );
}