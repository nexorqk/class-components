import { Component, type ReactNode } from 'react';

import Button from '../components/button';
import SearchInput from '../components/search-input';

type Props = {
  searchInputValue: string;
  handleSearchInputChange: (value: string) => void;
  handleSearchClick: () => Promise<void>;
};

export default class Header extends Component<Props> {
  WARNING_TEXT = "Please enter the Pokémon's exact name.";

  render(): ReactNode {
    return (
      <header className="mx-auto px-2 py-4 max-w-4xl space-y-1">
        <div className="flex gap-4 items-end">
          <SearchInput
            searchInputValue={this.props.searchInputValue}
            handleSearchInputChange={this.props.handleSearchInputChange}
          />
          <Button onClick={this.props.handleSearchClick}>Search</Button>
        </div>
        <p className="text-sm text-amber-600 max-w-[240px]">
          {this.WARNING_TEXT}
        </p>
      </header>
    );
  }
}
