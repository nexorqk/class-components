import { Component, type ReactNode } from 'react';
import Button from '../components/button';

type Props = {
  searchInputValue: string;
  handleSearchInputChange: (value: string) => void;
  handleSearchClick: () => Promise<void>;
};

export default class Header extends Component<Props> {
  searchId = 'search-value';

  render(): ReactNode {
    return (
      <header className="p-4">
        <label htmlFor={this.searchId} className="text-xl font-bold">
          Search pokemon by name:
        </label>
        <div className="flex gap-4 items-center">
          <input
            className="border-2 border-gray-400 rounded-md"
            id={this.searchId}
            value={this.props.searchInputValue}
            onChange={(event) =>
              this.props.handleSearchInputChange(event.target.value)
            }
          />
          <Button handleSearchClick={this.props.handleSearchClick}>
            Search
          </Button>
        </div>
      </header>
    );
  }
}
