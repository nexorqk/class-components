import { Component, type ReactNode } from 'react';

type Props = {
  searchInputValue: string;
  handleSearchInputChange: (value: string) => void;
};

export default class SearchInput extends Component<Props> {
  searchId = 'search-value';

  render(): ReactNode {
    return (
      <div className="flex flex-col gap-3">
        <label htmlFor={this.searchId} className="text-xl font-bold">
          Search pokemon by name:
        </label>
        <input
          className="border-2 border-gray-400 rounded-md"
          id={this.searchId}
          value={this.props.searchInputValue}
          onChange={(event) =>
            this.props.handleSearchInputChange(event.target.value)
          }
        />
      </div>
    );
  }
}
