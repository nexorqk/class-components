import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';

import { ThemeContext } from '../context/theme';
import { toggleSelect, unselect } from '../store/slices/selected-pokemons';
import { useAppDispatch, useAppSelector } from '../store/store';
import { type PokemonList } from '../types/pokemon';
import { cn } from '../utils/cn';
import { Loader } from './ui/loader';
import { Pagination } from './ui/pagination';
import { SelectedFlyout } from './selected-flyout';
import { downloadCSV } from '../utils/download-csv';
import { API_URL } from '../service/pokemon';
import { getOffsetByPage } from '../utils/page-counter';

export const PokemonListItem = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isThemeDark = useContext(ThemeContext);

  const dispatch = useAppDispatch();
  const selectedPokemons = useAppSelector((store) => store.selectedPokemons);

  const [pokemonData, setPokemonData] = useState<PokemonList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPokemonName, setCurrentPokemonName] = useState(
    params.pokemonName || ''
  );

  const [isOneItemSelected, setIsOneItemSelected] = useState(false);

  const handlePokemonClick = (pokemonName: string) => {
    setCurrentPokemonName(pokemonName);
    navigate(pokemonName);
  };

  const handleCloseDetail = () => {
    navigate('');
  };

  const handleCheckboxClick = async (name: string, isChecked: boolean) => {
    const getPokemon = async (name: string) => {
      try {
        const response = await fetch(`${API_URL}/pokemon/${name}`);

        return await response.json();
      } catch (error) {
        console.error(error);
      }

      return null;
    };
    const pokemonData = await getPokemon(name);

    if (pokemonData !== null && 'abilities' in pokemonData) {
      dispatch(
        toggleSelect({
          id: name,
          isChecked,
          data: pokemonData,
        })
      );
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_URL}/pokemon${
            Number(params.page) && getOffsetByPage(Number(params.page)) > 0
              ? `?offset=${getOffsetByPage(Number(params.page))}&limit=20`
              : ''
          }`
        );

        const data = await response.json();

        if (data !== undefined) {
          setPokemonData(data);
        } else {
          setPokemonData(null);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [params.page]);

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

  if (isLoading) return <Loader isLoading={isLoading} />;

  if (
    pokemonData === undefined ||
    pokemonData === null ||
    ('results' in pokemonData &&
      pokemonData.results &&
      pokemonData.results.length === 0)
  ) {
    return <h2 className="text-3xl">No Results</h2>;
  }

  // if (pokemonError !== null) {
  //   return <h2>Fetch data error: {pokemonError}</h2>;
  // }

  if (pokemonData && 'results' in pokemonData) {
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
                <input
                  id={item.name}
                  name={item.name}
                  type="checkbox"
                  checked={
                    selectedPokemons.checkedList.find(
                      (checkedItem) => checkedItem.name === item.name
                    )?.isChecked || false
                  }
                  onChange={(event) =>
                    handleCheckboxClick(item.name, event.target.checked)
                  }
                  className="w-4 h-4 cursor-pointer"
                />
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
  }
};
