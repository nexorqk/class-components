import type { Metadata } from 'next';

import StoreProvider from '../components/store-provider';
import { ThemeChanger } from '../components/theme-changer';
import { Navigation } from '../components/navigation';

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
    <StoreProvider>
      <html lang="en">
        <body>
          <div id="root">
            <header className="relative mx-auto px-2 py-4 max-w-4xl space-y-1">
              <ThemeChanger />
              <Navigation />
            </header>
            {children}
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
