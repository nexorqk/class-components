import { Component, type ErrorInfo, type ReactNode } from 'react';

import Button from './ui/button';

type Props = {
  children: ReactNode;
  searchComponent?: ReactNode;
  resetErrorButton: () => void;
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

  handleResetButton = () => {
    this.setState({
      error: '',
      hasError: false,
    });

    this.props.resetErrorButton();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <>
          {this.props.searchComponent}
          <div className="max-w-4xl mx-auto text-xl text-red-500 p-4">
            Error description:
            <h2>{this.state.error}</h2>
            <Button onClick={this.handleResetButton}>Reset</Button>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
