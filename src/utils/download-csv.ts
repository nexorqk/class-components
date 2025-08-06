import { API_URL } from '../service/pokemon';
import type { Pokemon } from '../types/pokemon';

export const downloadCSV = (data: Pokemon[]) => {
  console.log(data[0].abilities.map((item) => item.ability.name).join(','));
  const csv = [
    ['num', 'name', 'weight', 'one ability', 'details url', 'total'],
    ...data.map((item, index) => [
      index + 1,
      item.name,
      item.weight,
      item.abilities[0].ability.name,
      `${API_URL}/pokemon/${item.name}`,
      data.length,
    ]),
  ]
    .map((row) => (typeof row === 'string' ? row : row.join(',')))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.length}_item${data.length > 1 ? 's' : ''}.csv`;
  window.document.body.append(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
