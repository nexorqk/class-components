import { Component, type ReactNode } from 'react';

type Props = {
  isLoading: boolean;
};

export default class Loader extends Component<Props> {
  render(): ReactNode {
    if (!this.props.isLoading) return null;

    return (
      <div
        role="alert"
        aria-label="Loading content"
        className="flex gap-2  p-4 justify-center"
      >
        <div className="h-4 w-4 bg-black animate-bounce rounded-full [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 bg-black animate-bounce rounded-full [animation-delay:-0.15s]"></div>
        <div className="h-4 w-4 bg-black animate-bounce rounded-full"></div>
        <div className="sr-only" aria-label="Loading content">
          Loading content
        </div>
      </div>
    );
  }
}
