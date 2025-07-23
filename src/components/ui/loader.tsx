import { Component, type ReactNode } from 'react';

export default class Loader extends Component {
  render(): ReactNode {
    return (
      <div className="flex gap-2  p-4 justify-center">
        <div className="h-4 w-4 bg-black animate-bounce rounded-full [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 bg-black animate-bounce rounded-full [animation-delay:-0.15s]"></div>
        <div className="h-4 w-4 bg-black animate-bounce rounded-full"></div>
      </div>
    );
  }
}
