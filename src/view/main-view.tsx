import { Outlet } from 'react-router';

import { Search } from '../components/search';

export const MainView = () => {
  return (
    <main className="py-6 px-2 max-w-4xl mx-auto">
      <Search />
      <Outlet />
    </main>
  );
};
