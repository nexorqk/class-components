export const fetchFunction = async <T>(request: Request): Promise<T> => {
  const response = await fetch(request);

  return await response.json();
};
