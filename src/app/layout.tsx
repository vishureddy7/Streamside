import type { Metadata } from 'next';
import { ThemeProvider } from '../components/ThemeProvider';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Streamside - Video Calls Made Simple',
  description: 'Connect instantly with HD video calls. No downloads, no hassle. Perfect for remote teams and quick sync-ups.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
