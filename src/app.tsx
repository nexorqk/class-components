import { Component, type ReactNode } from 'react';

import MainView from './view/main-view';
import { searchLSService } from './utils/local-storage';
import { getPokemon } from './service/pokemon';
import ErrorBoundary from './components/error-boundary';
import Button from './components/ui/button';
import Search from './components/search';

export default class App extends Component {
  state = {
    pokemonItems: null,
    pokemonIsLoadingData: true,
    isErrorButtonClick: false,
  };

  setSearchValue = (value: string): void => {
    this.setState({
      searchValue: value,
    });
  };

  setPokemon = async (searchValue: string): Promise<void> => {
    this.setState({
      pokemonIsLoadingData: true,
    });

    const data = await getPokemon(searchValue);

    this.setState({
      pokemonItems: data,
      pokemonIsLoadingData: false,
    });
  };

  async componentDidMount(): Promise<void> {
    await this.setPokemon(searchLSService.get());
  }

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
    const searchComponent = <Search setPokemon={this.setPokemon} />;

    return (
      <ErrorBoundary
        resetErrorButton={this.resetErrorButton}
        searchComponent={searchComponent}
      >
        {searchComponent}
        <MainView
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
