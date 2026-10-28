import { Routes } from '@angular/router';

export const CATEGORIA_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listar' },
  {
    path: 'cadastrar',
    loadComponent: () =>
      import('./categoria-cadastrar/categoria-cadastrar').then((m) => m.CategoriaCadastrar),
  },
  {
    path: 'listar',
    loadComponent: () => import('./categoria-listar/categoria-listar').then((m) => m.CategoriaListar),
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./categoria-cadastrar/categoria-cadastrar').then((m) => m.CategoriaCadastrar),
  },
];
