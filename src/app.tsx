import { Component, type ReactNode } from 'react';

import Header from './view/header';
import Main from './view/main';
import { searchLSService } from './utils/local-storage';
import { getPokemon } from './service/pokemon';
import ErrorBoundary from './components/error-boundary';
import Button from './components/button';

export default class App extends Component {
  state = {
    searchValue: searchLSService.get(),
    pokemonItems: null,
    pokemonIsLoadingData: true,
    isErrorButtonClick: false,
  };

  setSearchValue = (value: string): void => {
    this.setState({
      searchValue: value,
    });
  };

  setPokemon = async (): Promise<void> => {
    this.setState({
      pokemonIsLoadingData: true,
    });

    const data = await getPokemon(this.state.searchValue);

    this.setState({
      pokemonItems: data,
      pokemonIsLoadingData: false,
    });
  };

  async componentDidMount(): Promise<void> {
    await this.setPokemon();
  }

  handleSearchClick = async (): Promise<void> => {
    await this.setPokemon();

    searchLSService.set(this.state.searchValue);
  };

  handleErrorButtonClick = (): void => {
    this.setState({
      isErrorButtonClick: true,
    });
  };

  resetErrorButton = (): void => {
    this.setState({
      isErrorButtonClick: false,
    });
  };

  render(): ReactNode {
    return (
      <ErrorBoundary
        resetErrorButton={this.resetErrorButton}
        headerComponent={
          <Header
            searchInputValue={this.state.searchValue}
            handleSearchInputChange={this.setSearchValue}
            handleSearchClick={this.handleSearchClick}
          />
        }
      >
        <Header
          searchInputValue={this.state.searchValue}
          handleSearchInputChange={this.setSearchValue}
          handleSearchClick={this.handleSearchClick}
        />
        <Main
          pokemonData={this.state.pokemonItems}
          pokemonIsLoadingData={this.state.pokemonIsLoadingData}
        />
        <div className="flex justify-end p-6 max-w-3xl mx-auto">
          <Button
            onClick={this.handleErrorButtonClick}
            secondary
            isError={this.state.isErrorButtonClick}
          >
            Error button
          </Button>
        </div>
      </ErrorBoundary>
    );
  }
}
