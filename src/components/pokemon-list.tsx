import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router';
import { type MainData } from '../view/main-view';
import { Pagination } from './ui/pagination';
import { type Pokemon } from '../types/pokemon';
import { getPokemon } from '../service/pokemon';
import { useCallback, useEffect, useState } from 'react';
import { Loader } from './ui/loader';

export const PokemonList = () => {
  const { pokemonData, setPokemon } = useOutletContext<MainData>();
  const [currentPokemonName, setCurrentPokemonName] = useState('');
  const [onePokemon, setOnePokemon] = useState<Pokemon>();
  const [isOneLoading, setIsOneLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const getOnePokemon = useCallback(async () => {
    setIsOneLoading(true);
    const pokemon = await getPokemon(currentPokemonName || 'bulbasaur');

    if ('abilities' in pokemon) {
      setOnePokemon(pokemon);
      setIsOneLoading(false);
    }
  }, [currentPokemonName]);

  useEffect(() => {
    getOnePokemon();
  }, [currentPokemonName, getOnePokemon]);

  const handlePokemonClick = (pokemonName: string) => {
    setCurrentPokemonName(pokemonName);
    navigate(pokemonName);
  };

  const handleCloseDetail = () => {
    navigate('');
  };

  if (pokemonData === undefined || pokemonData === null) return null;

  if (pokemonData && 'results' in pokemonData) {
    return (
      <>
        <div className="flex gap-10">
          <ul className="text-2xl">
            Pokemon list:
            {pokemonData.results.map((item) => (
              <li key={item.name}>
                <h3
                  onClick={() => handlePokemonClick(item.name)}
                  className="text-xl"
                >
                  - {item.name}
                </h3>
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
