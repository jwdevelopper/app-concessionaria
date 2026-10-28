import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class CategoriaService {
  urlCategoria = 'http://localhost:8080/categorias';
  private readonly http =  inject(HttpClient);

  salvarCategoria(categoria: any) {
    return this.http.post(`${this.urlCategoria}/salvar-categoria`, categoria);
  }

  listarCategorias() {
    return this.http.get(`${this.urlCategoria}/listar-categorias`);
  }

  buscarCategoriaPorId(id: number) {
    return this.http.get(`${this.urlCategoria}/buscar-categoria-por-id/${id}`);
  }

  atualizarCategoria(id: number, categoria: any) {
    return this.http.put(`${this.urlCategoria}/atualizar-categoria/${id}`, categoria);
  }

  deletarCategoria(id: number) {
    return this.http.delete(`${this.urlCategoria}/deletar-categoria/${id}`);
  }
}
