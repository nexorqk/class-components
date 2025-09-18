let rootMock: ReturnType<typeof vi.fn>;
let renderMock: ReturnType<typeof vi.fn>;

vi.mock('react-dom/client', () => {
  renderMock = vi.fn();
  rootMock = vi.fn(() => ({ render: renderMock }));
  return { createRoot: rootMock };
});

beforeEach(() => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.append(root);
  vi.resetModules();
});

describe('Main', () => {
  it('calls createRoot on root element and renders app', async () => {
    await import('../main');
    const rootEl = document.getElementById('root');

    expect(rootMock).toHaveBeenCalledWith(rootEl);
    expect(renderMock).toHaveBeenCalledTimes(1);
  });
});
