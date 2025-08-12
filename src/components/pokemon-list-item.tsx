import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';

import { ThemeContext } from '../context/theme';
import { useGetPokemonByPageQuery } from '../service/pokemon';
import { unselect } from '../store/slices/selected-pokemons';
import { useAppDispatch, useAppSelector } from '../store/store';
import { cn } from '../utils/cn';
import { downloadCSV } from '../utils/download-csv';
import { PokemonCheckbox } from './pokemon-checkbox';
import { SelectedFlyout } from './selected-flyout';
import { Loader } from './ui/loader';
import { Pagination } from './ui/pagination';

export const PokemonListItem = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isThemeDark = useContext(ThemeContext);
  const {
    data: pokemonData,
    isFetching,
    error,
  } = useGetPokemonByPageQuery(params.page || '1');

  const dispatch = useAppDispatch();
  const selectedPokemons = useAppSelector((store) => store.selectedPokemons);

  const [currentPokemonName, setCurrentPokemonName] = useState(
    params.pokemonName || ''
  );

  const [isOneItemSelected, setIsOneItemSelected] = useState(false);

  const handlePokemonClick = (pokemonName: string) => {
    setCurrentPokemonName(pokemonName);
    navigate(pokemonName);
  };

  const handleCloseDetail = () => {
    setCurrentPokemonName('');
    navigate('');
  };

  useEffect(() => {
    if (selectedPokemons.checkedList.length > 0) {
      setIsOneItemSelected(true);
    } else {
      setIsOneItemSelected(false);
    }
  }, [isOneItemSelected, selectedPokemons]);

  const handleUnselectClick = () => {
    setIsOneItemSelected(false);

    dispatch(unselect());
  };

  const handleDownloadClick = () => {
    downloadCSV(selectedPokemons.checkedList.map((item) => item.data));
  };

  if (
    pokemonData === undefined ||
    pokemonData === null ||
    ('results' in pokemonData &&
      pokemonData.results &&
      pokemonData.results.length === 0)
  ) {
    return <h2 className="text-3xl">No Results</h2>;
  }

  if (error) {
    return (
      <h2 className={cn(isThemeDark ? 'text-white' : 'text-slate-900')}>
        Fetch data error:{' '}
        {'data' in error ? JSON.stringify(error.data) : JSON.stringify(error)}
      </h2>
    );
  }

  if (isFetching) return <Loader isLoading={isFetching} />;

  return (
    <>
      <div className="flex gap-10">
        <ul
          className={cn(
            'text-2xl',
            isThemeDark ? 'text-white' : 'text-slate-900'
          )}
        >
          Pokemon list:
          {pokemonData.results.map((item) => (
            <li
              key={item.name}
              className="flex gap-2.5 items-center hover:[&>p]:underline"
            >
              <PokemonCheckbox name={item.name} />
              <p
                className="cursor-pointer text-xl text-pink-600 decoration-wavy decoration-3"
                onClick={() => handlePokemonClick(item.name)}
              >
                {item.name}
              </p>
            </li>
          ))}
        </ul>
        <div className="flex items-start">
          {currentPokemonName && (
            <div className="flex items-start gap-2">
              <Outlet />
              <div
                role="button"
                aria-label="Close details"
                className="cursor-pointer border rounded-3xl transition-all border-pink-300 hover:border-pink-500 text-pink-700 font-bold px-2.5 py-1"
                onClick={handleCloseDetail}
              >
                X
              </div>
            </div>
          )}
        </div>
      </div>
      {pokemonData && <Pagination countOfitems={pokemonData.count} />}
      {isOneItemSelected && (
        <SelectedFlyout
          handleUnselectClick={handleUnselectClick}
          handleDownloadClick={handleDownloadClick}
          countOfItems={selectedPokemons.checkedList.length}
        />
      )}
    </>
  );
};
