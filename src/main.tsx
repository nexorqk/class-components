import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import ErrorBoundary from './components/error-boundary.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import { router } from './routes.ts';
import { store } from './store/store.ts';

import './index.css';

const root = document.getElementById('root');
if (root && root instanceof HTMLElement)
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </StrictMode>
  );
