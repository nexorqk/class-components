import { useState } from 'react';

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing((prev) => !prev);
  };

  return {
    isShowing,
    toggle,
  };
};
