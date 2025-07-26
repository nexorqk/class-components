import { http, HttpResponse } from 'msw';

import { API_URL } from '../../service/pokemon';
import { pokemon } from './data';

export const handlers = [
  http.get(`${API_URL}/pokemon`, () => {
    return HttpResponse.json({ name: 'pokl' });
  }),
  http.get(`${API_URL}/pokemon/${pokemon.name}`, () => {
    return HttpResponse.json(pokemon);
  }),
];
