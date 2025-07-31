import { render, screen } from '@testing-library/react';
import { About } from '../../view/about';

describe('About', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('Renders about content on component render', () => {
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('Renders school and github link', () => {
    expect(
      screen.getByRole('link', { name: 'link' }).getAttribute('href')
    ).toMatch(/github/i);
  });

  it('Renders link for rs school react course', () => {
    expect(
      screen.getByRole('link', { name: /rs school/i }).getAttribute('href')
    ).toMatch(/rs.school\/courses\/react/i);
  });
});
