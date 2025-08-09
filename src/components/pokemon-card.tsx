import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ThemeContext } from '../context/theme';
import { API_URL } from '../service/pokemon';
import type { Pokemon } from '../types/pokemon';
import { cn } from '../utils/cn';
import { Loader } from './ui/loader';

export const PokemonCard = () => {
  const params = useParams();
  const [data, setData] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const repsonse = await fetch(
          `${API_URL}/pokemon/${params.pokemonName}`
        );
        const pokemonData = await repsonse.json();
        if ('abilities' in pokemonData) {
          setData(pokemonData);
        } else {
          setData(null);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (params.pokemonName !== undefined) {
      getData();
    }
  }, [params]);

  const isThemeDark = useContext(ThemeContext);

  if (isLoading) return <Loader isLoading={isLoading} />;

  if (data === null || data === undefined) {
    return <h2>No data</h2>;
  }

  const { name, weight, abilities } = data;
  return (
    <div
      className={cn(
        'p-4 border space-y-4',
        isThemeDark ? 'text-white' : 'text-slate-900'
      )}
    >
      <h2>Name: {name}</h2>
      <p>Weight: {weight}</p>
      <div>
        <h3>Abilities:</h3>
        <ul>
          {abilities.map((item) => (
            <li key={item.ability.name}>{item.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
