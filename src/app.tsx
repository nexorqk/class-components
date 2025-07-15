import { Component, type ReactNode } from 'react';

import Header from './view/header';
import Main from './view/main';
import { searchLSService } from './utils/local-storage';
import { getPokemon } from './service/pokemon';

export default class App extends Component {
  state = {
    searchValue: searchLSService.get(),
    pokemonItems: null,
  };

  setSearchValue = (value: string): void => {
    this.setState({
      searchValue: value,
    });

    searchLSService.set(value);
  };

  setPokemon = async (): Promise<void> => {
    const data = await getPokemon(this.state.searchValue);

    this.setState({
      pokemonItems: data,
    });
  };

  async componentDidMount(): Promise<void> {
    await this.setPokemon();
  }

  handleSearchClick = async (): Promise<void> => {
    await this.setPokemon();

    console.log('search click');
  };

  render(): ReactNode {
    return (
      <>
        <Header
          searchInputValue={this.state.searchValue}
          handleSearchInputChange={this.setSearchValue}
          handleSearchClick={this.handleSearchClick}
        />
        <Main pokemonData={this.state.pokemonItems} />
      </>
    );
  }
}
