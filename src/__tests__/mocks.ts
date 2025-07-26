import { http, HttpResponse } from 'msw';
import { API_URL } from '../service/pokemon';

export const handlers = [
  http.get(`${API_URL}/pokemon`, () => {
    return HttpResponse.json({ name: 'pokl' });
  }),
];
