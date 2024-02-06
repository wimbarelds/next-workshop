import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pentastic!</title>
        <link rel="stylesheet" href="index.css" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-gray-800 text-white">
        <div className="flex flex-col min-h-screen mw bg-gray-900">
          <Header />
          <main className="container mx-auto flex-1 p-4">{children}</main>

          <footer className="bg-purple-700 p-4 text-center">
            <p>© 2024 Pentastic. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
