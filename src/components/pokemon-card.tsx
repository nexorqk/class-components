import { useOutletContext } from 'react-router';
import { useContext } from 'react';

import { ThemeContext } from '../context/theme';
import { type MainData } from '../view/main-view';
import { cn } from '../utils/cn';

export const PokemonCard = () => {
  const { pokemonData: data } =
    useOutletContext<Pick<MainData, 'pokemonData'>>();

  const isThemeDark = useContext(ThemeContext);

  if (data === null || data === undefined) return <h2>No data</h2>;

  if ('abilities' in data) {
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
  }
};
