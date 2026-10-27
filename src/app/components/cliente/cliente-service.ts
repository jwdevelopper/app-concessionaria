import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class ClienteService {
  urlCliente = 'http://localhost:8080/clientes';
  private readonly http =  inject(HttpClient);

  salvarCliente(cliente: any) {
    return this.http.post(`${this.urlCliente}/salvar-cliente`, cliente);
  }

  listarClientes() {
    return this.http.get(`${this.urlCliente}/listar-clientes`);
  }

  buscarClientePorId(id: number) {
    return this.http.get(`${this.urlCliente}/buscar-cliente/${id}`);
  }

  atualizarCliente(id: number, cliente: any) {
    return this.http.put(`${this.urlCliente}/atualizar-cliente/${id}`, cliente);
  }

  deletarCliente(id: number) {
    return this.http.delete(`${this.urlCliente}/deletar-cliente/${id}`);
  }
}
