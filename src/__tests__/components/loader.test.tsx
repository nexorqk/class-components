import { render, screen } from '@testing-library/react';
import Loader from '../../components/ui/loader';

describe('Loader', () => {
  describe('Rendering', () => {
    it('Renders loa ding indicator (spinner, skeleton, etc.)', () => {
      render(<Loader isLoading={true} />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('Shows/hides based on loading prop', () => {
      const { rerender } = render(<Loader isLoading={true} />);

      expect(screen.getByRole('alert')).toBeInTheDocument();

      rerender(<Loader isLoading={false} />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('Has appropriate ARIA labels for screen readers, if your loading indicator has aria-label', () => {
      render(<Loader isLoading={true} />);

      const element = screen.getByText(/loading content/i);

      expect(element).toHaveAttribute('aria-label', 'Loading content');
      expect(element).toHaveClass('sr-only');
    });
  });
});
