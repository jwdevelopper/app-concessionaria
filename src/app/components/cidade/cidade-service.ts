import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class CidadeService {
  urlCidade = 'http://localhost:8080/cidades';
  private readonly http =  inject(HttpClient);

  buscarCidadePorNome(nome: string) {
    return this.http.get(`${this.urlCidade}/buscar-cidade-por-nome/${nome}`);
  }

  buscarCidadePorCodigoIbge(ibge: string) {
    return this.http.get(`${this.urlCidade}/buscar-codigo-ibge/${ibge}`);
  }
}
