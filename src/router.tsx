import { createBrowserRouter } from 'react-router';

import { App } from './app';
import { NotFound } from './view/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
