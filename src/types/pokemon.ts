export type PokemonList = {
  count: number;
  next: string | null;
  reviuse: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Pokemon = {
  name: string;
  weight: number;
};
