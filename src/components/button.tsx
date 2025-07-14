import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick: () => Promise<void>;
};

export default class Button extends Component<Props> {
  render(): ReactNode {
    return (
      <button
        className="text-white bg-blue-700 cursor-pointer hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 active:text-yellow-400"
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
