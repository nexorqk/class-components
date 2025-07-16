import clsx from 'clsx';
import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick: () => Promise<void> | void;
  secondary?: boolean;
  isError?: boolean;
};

export default class Button extends Component<Props> {
  render(): ReactNode {
    if (this.props.isError) throw new Error('Error button');

    return (
      <button
        className={clsx(
          'text-white cursor-pointer rounded-lg text-sm px-4 py-2 active:text-yellow-400',
          this.props.secondary
            ? 'bg-amber-500 font-bold'
            : 'bg-blue-700 hover:bg-blue-800 font-medium'
        )}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
