import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { App } from './App';

describe('App', () => {
  it('Test for aprp mount', () => {
    render(<App />);

    expect(screen.getByRole('heading')).toHaveTextContent(/react/i);
  });
});
