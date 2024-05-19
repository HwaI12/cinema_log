import '../app/globals.css';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>CinemaLog</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
