import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import ErrorBoundary from './components/error-boundary.tsx';
import { router } from './router.tsx';

import './index.css';

const root = document.getElementById('root');
if (root && root instanceof HTMLElement)
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </StrictMode>
  );
