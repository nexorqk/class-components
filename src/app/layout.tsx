import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Pokemon App',
  description: 'My App is about pokemons',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
