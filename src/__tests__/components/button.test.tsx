import { render, screen } from '@testing-library/react';

import { Button } from '../../components/ui/button';

describe('Button', () => {
  it('Renders button on page', () => {
    render(<Button>Button</Button>);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Creates secondary button style', () => {
    render(<Button secondary={true}>Button</Button>);

    expect(screen.getByRole('button')).toHaveClass('bg-amber-500 font-bold');
  });

  it('Error with special prop', () => {
    expect(() => render(<Button isError={true}>Button</Button>)).toThrowError();
  });
});
