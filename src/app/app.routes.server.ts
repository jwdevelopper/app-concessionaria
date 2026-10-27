import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // O id só é conhecido em tempo de execução, então esta rota não pode ser
    // pré-renderizada no build — é renderizada apenas no navegador.
    path: 'clientes/editar/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
