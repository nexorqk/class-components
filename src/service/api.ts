export const fetchResponse = async <T>(request: Request): Promise<T> => {
  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(`Status of failed request ${response.status}`);
    }

    const data: T = await response.json();

    return data;
  } catch (error) {
    if (error && error instanceof Error) throw new Error(error.message);
    else throw new Error('API reponse error');
  }
};
