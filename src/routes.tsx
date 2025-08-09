import { createBrowserRouter } from 'react-router';

import { App } from './app';
import { NotFound } from './view/not-found';
import { PokemonCard } from './components/pokemon-card';
import { MainView } from './view/main-view';
import { About } from './view/about';
import { PokemonListItem } from './components/pokemon-list-item';
import ErrorBoundary from './components/error-boundary';

export const routerConfig = [
  {
    path: '/',
    Element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
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
