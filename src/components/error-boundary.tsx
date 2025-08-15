import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default class ErrorBoundary extends Component<Props> {
  state = {
    hasError: false,
    error: '',
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message.toString() };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="max-w-4xl mx-auto text-xl text-red-500 p-4">
          Error description:
          <h2>{this.state.error}</h2>
        </div>
      );
    }

    return this.props.children;
  }
}
