const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemon = async <T>(value: string): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}/pokemon/${value ? value : ''}`);

    return response.json();
  } catch (error) {
    if (error && error instanceof Error) throw new Error(error.message);
    else throw new Error('Uncaught error');
  }
};
