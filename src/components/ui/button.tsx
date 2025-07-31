import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';

type Props = {
  children: ReactNode;
  onClick?: () => Promise<void> | void;
  secondary?: boolean;
  isError?: boolean;
  disabled?: boolean;
};

export const Button = (props: Props) => {
  if (props.isError) throw new Error('Error button');

  return (
    <button
      className={cn(
        'text-white cursor-pointer rounded-lg text-sm px-4 py-2 ',
        !props.disabled && 'active:text-yellow-400',
        props.secondary
          ? 'bg-amber-500 font-bold'
          : `${props.disabled ? 'bg-slate-500' : 'bg-blue-700 hover:bg-blue-800 font-medium'}`
      )}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
