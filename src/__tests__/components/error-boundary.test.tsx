import { fireEvent, render, screen } from '@testing-library/react';

import ErrorBoundary from '../../components/error-boundary';
import Button from '../../components/ui/button';

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
        <ErrorBoundary resetErrorButton={vi.fn()}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText(/test error/i)).toBeInTheDocument();
    });

    it('Displays fallback UI when error occurs', () => {
      render(
        <ErrorBoundary resetErrorButton={vi.fn()}>
          <ThrowError />
        </ErrorBoundary>
      );

      checkErrorUI();
    });

    it('Logs error to console', () => {});
  });

  describe('Error Button', () => {
    const renderingButtonError = () => {
      render(
        <ErrorBoundary resetErrorButton={vi.fn()}>
          <Button onClick={vi.fn()} isError={true}>
            Erorr button
          </Button>
        </ErrorBoundary>
      );

      fireEvent.click(
        screen.getByRole('button'),
        new MouseEvent('click', { bubbles: true, cancelable: true })
      );
    };

    it('Throws error when test button is clicked', () => {
      renderingButtonError();

      expect(screen.getByText(/error button/i)).toBeInTheDocument();
    });

    it('Triggers error boundary fallback UI', () => {
      renderingButtonError();

      checkErrorUI();
    });
  });
});
