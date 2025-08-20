type ParamsValue = string | string[] | undefined;

const FIRST_PAGE_VALUE = 1;

export const getParamsNameValue = (paramsName: ParamsValue): string => {
  if (paramsName !== undefined) {
    return Array.isArray(paramsName) ? paramsName[0] : paramsName;
  }
  return '';
};

export const getParamsPageValue = (paramsPage: ParamsValue): number => {
  if (paramsPage !== undefined) {
    return Array.isArray(paramsPage)
      ? parseInt(paramsPage[0])
      : parseInt(paramsPage);
  }

  return FIRST_PAGE_VALUE;
};
