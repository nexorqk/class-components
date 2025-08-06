import { createBrowserRouter } from 'react-router';

import { App } from './app';
import { NotFound } from './view/not-found';
import { PokemonList } from './components/pokemon-list';
import { PokemonCard } from './components/pokemon-card';
import { MainView } from './view/main-view';
import { About } from './view/about';

export const routerConfig = [
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
];

export const router = createBrowserRouter(routerConfig);
