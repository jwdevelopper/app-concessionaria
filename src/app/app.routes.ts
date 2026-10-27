import { Routes } from '@angular/router';
import { CLIENTES_ROUTES } from './components/cliente/cliente.route';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'clientes' },
  { path: 'clientes', children: CLIENTES_ROUTES }
];
