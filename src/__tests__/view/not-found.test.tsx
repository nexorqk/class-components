import { render, screen } from '@testing-library/react';
import { NotFound } from '../../view/not-found';
import { MemoryRouter } from 'react-router';

describe('NotFound', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
  });

  it('Render not found text', () => {
    expect(
      screen.getByRole('heading', { name: /not found/i })
    ).toBeInTheDocument();
  });

  it('Renders link to go home page', () => {
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });
});
