import { PokemonListItem } from '@/components/pokemon-list-item';

//  children: [
//       {
//         path: 'list/:page',
//         Component: PokemonListItem,
//         children: [
//           {
//             path: ':pokemonName',
//             Component: PokemonCard,
//           },
//         ],
//       },
//       {
//         path: ':pokemonName',
//         Component: PokemonCard,
//       },
//     ],

const PokemonListPage = () => {
  return (
    <div>
      <PokemonListItem />
    </div>
  );
};

export default PokemonListPage;
