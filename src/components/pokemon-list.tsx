import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router';

import { ThemeContext } from '../context/theme';
import { getPokemon } from '../service/pokemon';
import { toggleSelect } from '../store/slices/selected-pokemons';
import { useAppDispatch, useAppSelector } from '../store/store';
import { type Pokemon } from '../types/pokemon';
import { cn } from '../utils/cn';
import { type MainData } from '../view/main-view';
import { CheckedPokemon } from './ui/checked-pokemon';
import { Loader } from './ui/loader';
import { Pagination } from './ui/pagination';

export const PokemonList = () => {
  const { pokemonData, setPokemon, pokemonError } =
    useOutletContext<MainData>();
  const navigate = useNavigate();
  const params = useParams();
  const themeIsDark = useContext(ThemeContext);

  const dispatch = useAppDispatch();
  const selectedPokemons = useAppSelector((store) => store.selectedPokemons);

  const [currentPokemonName, setCurrentPokemonName] = useState(
    params.pokemonName || ''
  );
  const [onePokemon, setOnePokemon] = useState<Pokemon>();
  const [isOneLoading, setIsOneLoading] = useState(false);

  useEffect(() => {
    const getOnePokemon = async () => {
      setIsOneLoading(true);
      const pokemon = await getPokemon(currentPokemonName || 'bulbasaur');

      if ('abilities' in pokemon) {
        setOnePokemon(pokemon);
        setIsOneLoading(false);
      }

      // TODO failed fetch from server in UI
    };

    getOnePokemon();
  }, [currentPokemonName]);

  const handlePokemonClick = (pokemonName: string) => {
    setCurrentPokemonName(pokemonName);
    navigate(pokemonName);
  };

  const handleCloseDetail = () => {
    navigate('');
  };

  const storeCheckedList = async (name: string, isChecked: boolean) => {
    const pokemonData = await getPokemon(name);

    if ('abilities' in pokemonData) {
      dispatch(
        toggleSelect({
          id: name,
          isChecked: isChecked,
          data: pokemonData,
        })
      );
    }
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

  if (pokemonError !== null) {
    return <h2>Fetch data error: {pokemonError}</h2>;
  }

  if (pokemonData && 'results' in pokemonData) {
    return (
      <>
        <div className="flex gap-10">
          <ul
            className={cn(
              'text-2xl',
              themeIsDark ? 'text-white' : 'text-slate-900'
            )}
          >
            Pokemon list:
            {pokemonData.results.map((item) => (
              <li
                key={item.name}
                className="flex gap-2.5 items-center hover:[&>p]:underline"
              >
                <CheckedPokemon
                  name={item.name}
                  initialValue={
                    selectedPokemons.checkedList.find(
                      (list) => list.name === item.name
                    )?.isChecked
                  }
                  storeCheckedList={storeCheckedList}
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
            {onePokemon && 'abilities' in onePokemon && (
              <>
                <Loader isLoading={isOneLoading} />
                {!isOneLoading && params.pokemonName !== undefined && (
                  <div className="flex items-start gap-2">
                    <Outlet
                      context={
                        { pokemonData: onePokemon } satisfies {
                          pokemonData: Pokemon;
                        }
                      }
                    />
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
              </>
            )}
          </div>
        </div>
        {pokemonData && (
          <Pagination
            setPokemon={setPokemon}
            countOfitems={pokemonData.count}
          />
        )}
      </>
    );
  }
};
