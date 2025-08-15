import { render, screen } from '@testing-library/react';

import ErrorBoundary from '../../components/error-boundary';

describe('ErrorBoundary', () => {
  const originalError = console.error;

  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  const ThrowError = () => {
    throw new Error('Test Error');
  };

  const checkErrorUI = () => {
    expect(screen.getByText(/error description/i)).toBeInTheDocument();
  };

  describe('Error Catching', () => {
    it('Catches and handles JavaScript errors in child components', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText(/test error/i)).toBeInTheDocument();
    });

    it('Displays fallback UI when error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      checkErrorUI();
    });
  });
});
