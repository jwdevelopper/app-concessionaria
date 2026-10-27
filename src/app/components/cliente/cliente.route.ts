import { Routes } from '@angular/router';

export const CLIENTES_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listar' },
  {
    path: 'cadastrar',
    loadComponent: () =>
      import('./cliente-cadastrar/cliente-cadastrar').then((m) => m.ClienteCadastrar),
  },
  {
    path: 'listar',
    loadComponent: () => import('./cliente-listar/cliente-listar').then((m) => m.ClienteListar),
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./cliente-cadastrar/cliente-cadastrar').then((m) => m.ClienteCadastrar),
  },
];
