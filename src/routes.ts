import { createBrowserRouter } from 'react-router';

import { App } from './app';
import { NotFound } from './view/not-found';
import { PokemonList } from './components/pokemon-list';
import { PokemonCard } from './components/pokemon-card';
import { MainView } from './view/main-view';
import { About } from './view/about';
import { Loader } from './components/ui/loader';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: 'pokemon',
        Component: MainView,
        children: [
          {
            path: 'list/:page',
            Component: PokemonList,
            children: [
              {
                path: ':pokemonName',
                Component: PokemonCard,
                loader: Loader,
              },
            ],
          },
          {
            path: ':pokemonName',
            Component: PokemonCard,
          },
        ],
      },
      {
        path: 'about',
        Component: About,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
