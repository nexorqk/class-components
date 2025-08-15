import { render, screen } from '@testing-library/react';

import Button from '../../components/ui/button';

describe('Button', () => {
  it('Renders button on page', () => {
    render(<Button onClick={vi.fn()}>Button</Button>);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Creates secondary button style', () => {
    render(
      <Button onClick={vi.fn()} secondary={true}>
        Button
      </Button>
    );

    expect(screen.getByRole('button')).toHaveClass('bg-amber-500 font-bold');
  });

  it('Error with special prop', () => {
    expect(() =>
      render(
        <Button onClick={vi.fn()} isError={true}>
          Button
        </Button>
      )
    ).toThrowError();
  });
});
