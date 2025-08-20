import { useEffect, useState } from 'react';
import { useLazyGetPokemonByNameQuery } from '../service/pokemon';
import { toggleSelect } from '../store/slices/selected-pokemons';
import { useAppDispatch } from '../store/store';

export const PokemonCheckbox = ({ name }: { name: string }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useAppDispatch();
  const [trigger, { data }] = useLazyGetPokemonByNameQuery();

  useEffect(() => {
    if (isChecked) {
      trigger(name, true);
    }
  }, [isChecked, trigger, name]);

  useEffect(() => {
    if (data !== undefined) {
      dispatch(toggleSelect({ id: name, isChecked, data }));
    }
  }, [data, isChecked]);

  return (
    <input
      id={name}
      name={name}
      type="checkbox"
      checked={isChecked}
      onChange={(event) => setIsChecked(event.target.checked)}
      className="w-4 h-4 cursor-pointer"
    />
  );
};
