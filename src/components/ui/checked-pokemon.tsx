import { useState } from 'react';

export const CheckedPokemon = ({
  name,
  initialValue,
  storeCheckedList,
}: {
  name: string;
  initialValue: boolean | undefined;
  storeCheckedList: (name: string, isChecked: boolean) => void;
}) => {
  const [isChecked, setIsChecked] = useState(initialValue || false);

  const handleCheckboxClick = () => {
    setIsChecked((prevValue) => !prevValue);

    storeCheckedList(name, !isChecked);
  };

  return (
    <input
      id={name}
      name={name}
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxClick}
      className="w-4 h-4 cursor-pointer"
    />
  );
};
