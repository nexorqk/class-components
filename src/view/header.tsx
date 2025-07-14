import { Component, type ReactNode } from 'react';

import Button from '../components/button';
import SearchInput from '../components/search-input';

type Props = {
  searchInputValue: string;
  handleSearchInputChange: (value: string) => void;
  handleSearchClick: () => Promise<void>;
};

export default class Header extends Component<Props> {
  render(): ReactNode {
    return (
      <header className="flex mx-auto px-2 py-4 gap-4 items-end max-w-4xl">
        <SearchInput
          searchInputValue={this.props.searchInputValue}
          handleSearchInputChange={this.props.handleSearchInputChange}
        />
        <Button onClick={this.props.handleSearchClick}>Search</Button>
      </header>
    );
  }
}
