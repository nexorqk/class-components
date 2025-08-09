import { useState } from 'react';
import { Outlet } from 'react-router';

import { Navigation } from './components/navigation';
import { ThemeChanger } from './components/theme-changer';
import { ThemeContext } from './context/theme';
import { getThemeStorage } from './utils/theme-storage';

export const App = () => {
  const [isThemeDark, setIsThemeDark] = useState(getThemeStorage());

  return (
    <ThemeContext value={isThemeDark}>
      <header className="relative mx-auto px-2 py-4 max-w-4xl space-y-1">
        <ThemeChanger
          isThemeDark={isThemeDark}
          setIsThemeDark={setIsThemeDark}
        />
        <Navigation />
      </header>
      <Outlet />
    </ThemeContext>
  );
};
