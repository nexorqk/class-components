import { createBrowserRouter } from 'react-router';

import { App } from './app';
import { PokemonCard } from './components/pokemon-card';
import { PokemonListItem } from './components/pokemon-list-item';
import { About } from './view/about';
import { MainView } from './view/main-view';
import { NotFound } from './view/not-found';

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
            Component: PokemonListItem,
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
