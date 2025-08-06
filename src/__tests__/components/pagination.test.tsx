import { render, screen } from '@testing-library/react';
import { Pagination } from '../../components/ui/pagination';
import { MemoryRouter } from 'react-router';

describe('Pagination', () => {
  it('Renders 10 pages if item more than 200', () => {
    render(
      <MemoryRouter>
        <Pagination countOfitems={1000} setPokemon={vi.fn()} />
      </MemoryRouter>
    );

    const pagesList = screen.getAllByRole('paragraph');

    expect(pagesList).toHaveLength(10);
  });
});
