import { Component, type FormEvent, type ReactNode } from 'react';

import Button from './ui/button';
import { searchLSService } from '../utils/local-storage';
import { getNormalizedString } from '../utils/normalize';

type Props = {
  setPokemon: (value: string) => Promise<void>;
};
export default class Search extends Component<Props> {
  WARNING_TEXT = "Please enter the Pokémon's exact name.";
  searchId = 'search-value';

  state = {
    searchValue: searchLSService.get(),
  };

  handleFormSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const normalizedValue = getNormalizedString(this.state.searchValue);

    this.setState({ searchValue: normalizedValue });

    await this.props.setPokemon(normalizedValue);

    searchLSService.set(normalizedValue);
  };

  render(): ReactNode {
    return (
      <header className="mx-auto px-2 py-4 max-w-4xl space-y-1">
        <form className="flex gap-4 items-end" onSubmit={this.handleFormSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor={this.searchId} className="text-xl font-bold">
              Search pokemon by name:
            </label>
            <input
              className="border-2 border-gray-400 rounded-md"
              id={this.searchId}
              value={this.state.searchValue}
              onChange={(event) =>
                this.setState({ searchValue: event.target.value })
              }
            />
          </div>
          <Button>Search</Button>
        </form>
        <p className="text-sm text-amber-600 max-w-[240px]">
          {this.WARNING_TEXT}
        </p>
      </header>
    );
  }
}
