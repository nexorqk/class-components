import { useOutletContext } from 'react-router';

import { type MainData } from '../view/main-view';
import { cn } from '../utils/cn';
import { useTheme } from '../hooks/theme';
import { themeVariants } from '../utils/constants';

export const PokemonCard = () => {
  const { themeValue } = useTheme();

  const { pokemonData: data } =
    useOutletContext<Pick<MainData, 'pokemonData'>>();

  if (data === null || data === undefined) return <h2>No data</h2>;

  if ('abilities' in data) {
    const { name, weight, abilities } = data;

    return (
      <div
        className={cn(
          'p-4 border space-y-4',
          themeValue === themeVariants.DARK ? 'text-white' : 'text-slate-900'
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
