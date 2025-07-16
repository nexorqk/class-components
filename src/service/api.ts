export const fetchResponse = async (request: Request): Promise<unknown> => {
  try {
    const response = await fetch(request);

    return await response.json();
  } catch (error) {
    if (error && error instanceof Error) throw new Error(error.message);
    else throw new Error('Uncaught error');
  }
};
