'use client';

import { useEffect, useState } from 'react';

import { Navigation } from './components/navigation';
import { ThemeChanger } from './components/theme-changer';
import { ThemeContext } from './context/theme';
import { getThemeStorage } from './utils/theme-storage';

const App = () => {
  const [isThemeDark, setIsThemeDark] = useState(getThemeStorage());
  // const location = useLocation();
  // const navigate = useNavigate();

  useEffect(() => {
    // if (location.pathname === '/') {
    // navigate('/pokemon/list/1');
    // }

    console.log('navigate');
  }, []);

  return (
    <ThemeContext value={isThemeDark}>
      <header className="relative mx-auto px-2 py-4 max-w-4xl space-y-1">
        <ThemeChanger
          isThemeDark={isThemeDark}
          setIsThemeDark={setIsThemeDark}
        />
        <Navigation />
      </header>
      {/* <Outlet /> */}
    </ThemeContext>
  );
};

export default App;
