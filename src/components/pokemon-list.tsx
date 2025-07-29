import { Outlet, useNavigate, useOutletContext } from 'react-router';
import { type MainData } from '../view/main-view';
import { Pagination } from './ui/pagination';
import { type Pokemon } from '../types/pokemon';
import { getPokemon } from '../service/pokemon';
import { useCallback, useEffect, useState } from 'react';

export const PokemonList = () => {
  const { pokemonData, setPokemon } = useOutletContext<MainData>();
  const [currentPokemonName, setCurrentPokemonName] = useState('');
  const [onePokemon, setOnePokemon] = useState<Pokemon>();

  const navigate = useNavigate();

  const getOnePokemon = useCallback(async () => {
    const pokemon = await getPokemon(currentPokemonName || 'bulbasaur');

    if ('abilities' in pokemon) setOnePokemon(pokemon);
  }, [currentPokemonName]);

  useEffect(() => {
    getOnePokemon();
  }, [currentPokemonName, getOnePokemon]);

  const handlePokemonClick = (pokemonName: string) => {
    setCurrentPokemonName(pokemonName);
    navigate(pokemonName);
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
              <Outlet
                context={
                  { pokemonData: onePokemon } satisfies {
                    pokemonData: Pokemon;
                  }
                }
              />
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
