import { Routes } from '@angular/router';
import { CLIENTES_ROUTES } from './components/cliente/cliente.route';
import { CATEGORIA_ROUTES } from './components/categoria/categoria.route';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'clientes' },
  { path: 'clientes', children: CLIENTES_ROUTES },
  { path: 'categorias', children: CATEGORIA_ROUTES }
];
