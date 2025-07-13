import { Component, type ReactNode } from 'react';

import Header from './view/header';
import Main from './view/main';
import { searchLSService } from './utils/local-storage';

export default class App extends Component {
  state = {
    searchValue: searchLSService.get(),
    pokemonItems: [],
  };

  setSearchValue = (value: string): void => {
    this.setState({
      searchValue: value,
    });

    searchLSService.set(value);
  };

  handleSearchClick = async (): Promise<void> => {};

  render(): ReactNode {
    return (
      <>
        <Header
          searchInputValue={this.state.searchValue}
          handleSearchInputChange={this.setSearchValue}
          handleSearchClick={this.handleSearchClick}
        />
        <Main />
      </>
    );
  }
}
