export const fetchResponse = async (request: Request): Promise<unknown> => {
  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(`Status of failed request ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error && error instanceof Error) throw new Error(error.message);
    else throw new Error('API reponse error');
  }
};
