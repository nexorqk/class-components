export type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string | undefined;
    url: string;
  }[];
};

type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number | null;
};

export type Pokemon = {
  name: string;
  weight: number;
  abilities: Ability[];
};
