import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routerConfig } from '../routes';

describe('App', () => {
  const memoryRouter = createMemoryRouter(routerConfig, {
    initialEntries: ['/pokemon'],
  });

  it('Test for outlet', () => {
    render(<RouterProvider router={memoryRouter} />);
  });
});
