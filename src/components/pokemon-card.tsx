import { useContext } from 'react';
import { useParams } from 'react-router';

import { ThemeContext } from '../context/theme';
import { useGetPokemonByNameQuery } from '../service/pokemon';
import { cn } from '../utils/cn';
import { Loader } from './ui/loader';

export const PokemonCard = () => {
  const params = useParams();
  const { data, isLoading, isFetching, error } = useGetPokemonByNameQuery(
    params.pokemonName || ''
  );

  const isThemeDark = useContext(ThemeContext);

  if (isLoading) return <Loader isLoading={isLoading} />;
  if (isFetching) return <Loader isLoading={isFetching} />;

  if (data === null || data === undefined) {
    return (
      <h2 className={cn(isThemeDark ? 'text-white' : 'text-slate-900')}>
        No data, error:{' '}
        {error && 'data' in error
          ? JSON.stringify(error?.data)
          : JSON.stringify(error)}
      </h2>
    );
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
