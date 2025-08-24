import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './index.css';
import { Router } from './Router';

const rootElement = document.getElementById('root');

if (rootElement !== null && rootElement instanceof HTMLElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </StrictMode>
  );
}
