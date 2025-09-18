import { render, screen } from '@testing-library/react';
import { Loader } from '../../components/ui/loader';
import { ThemeProvider } from '../../components/theme-provider';

describe('Loader', () => {
  describe('Rendering', () => {
    it('Renders loa ding indicator (spinner, skeleton, etc.)', () => {
      render(
        <ThemeProvider>
          <Loader isLoading={true} />
        </ThemeProvider>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('Shows/hides based on loading prop', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Loader isLoading={true} />
        </ThemeProvider>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();

      rerender(
        <ThemeProvider>
          <Loader isLoading={false} />
        </ThemeProvider>
      );
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('Has appropriate ARIA labels for screen readers, if your loading indicator has aria-label', () => {
      render(
        <ThemeProvider>
          <Loader isLoading={true} />
        </ThemeProvider>
      );

      const element = screen.getByText(/loading content/i);

      expect(element).toHaveAttribute('aria-label', 'Loading content');
      expect(element).toHaveClass('sr-only');
    });
  });
});
