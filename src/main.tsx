import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { router } from './routes.tsx';
import { store } from './store/store.ts';

import './index.css';

const root = document.getElementById('root');
if (root && root instanceof HTMLElement)
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
