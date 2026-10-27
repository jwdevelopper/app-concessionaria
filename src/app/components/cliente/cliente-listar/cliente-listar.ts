import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonDirective } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Pencil } from '@primeicons/angular/pencil';
import { Trash } from '@primeicons/angular/trash';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../cliente-service';

@Component({
  selector: 'app-cliente-listar',
  imports: [TableModule, ButtonDirective, TooltipModule, Pencil, Trash, RouterLink],
  templateUrl: './cliente-listar.html',
  styleUrl: './cliente-listar.css',
})
export class ClienteListar implements OnInit {

  listaClientes: any[] = [];

  private readonly clienteService = inject(ClienteService);

  constructor(private readonly detectaMudancas: ChangeDetectorRef){}

  ngOnInit(): void {
    this.recuperaListaClientes();
  }

  recuperaListaClientes() {
    this.clienteService.listarClientes().subscribe({
      next: (clientes: any) => {
        this.listaClientes = clientes;
        this.detectaMudancas.detectChanges();
      },
      error: (erro: any) => {
        console.error('Erro ao listar clientes:', erro);
      }
    })
  }

  excluirCliente(id: number) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.deletarCliente(id).subscribe({
        next: () => {
          console.log('Cliente excluído com sucesso!');
          this.recuperaListaClientes(); // Atualiza a lista após exclusão
        },
        error: (erro: any) => {
          console.error('Erro ao excluir cliente:', erro);
        }
      });
    }
  }
}
