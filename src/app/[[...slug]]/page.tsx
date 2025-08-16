import { ClientOnly } from './client';
import StoreProvider from '../store-provider';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return (
    <StoreProvider>
      <ClientOnly />
    </StoreProvider>
  );
}
