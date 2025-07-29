import { Outlet, useOutletContext } from 'react-router';
import { type MainData } from '../view/main-view';
import { Pagination } from './ui/pagination';
import { type Pokemon } from '../types/pokemon';
import { getPokemon } from '../service/pokemon';
import { useEffect, useState } from 'react';

export const PokemonList = () => {
  const { pokemonData, setPokemon } = useOutletContext<MainData>();
  const [onePokemon, setOnePokemon] = useState<Pokemon>();

  const getOnePokemon = async () => {
    const pokemon = await getPokemon('bulbasaur');

    if ('abilities' in pokemon) setOnePokemon(pokemon);
  };

  useEffect(() => {
    getOnePokemon();
  }, []);

  if (pokemonData === undefined || pokemonData === null) return null;

  if (pokemonData && 'results' in pokemonData) {
    return (
      <>
        <div className="flex gap-10">
          <ul className="text-2xl">
            Pokemon list:
            {pokemonData.results.map((item) => (
              <li key={item.name || `no name ${crypto.randomUUID()}`}>
                <h3 className="text-xl">- {item.name || 'no name'}</h3>
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
        <Pagination
          setPokemon={setPokemon}
          countOfitems={pokemonData.count}
          next={pokemonData.next}
          previous={pokemonData.previous}
        />
      </>
    );
  }
};
