import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CategoriaService } from '../categoria-service';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Pencil } from '@primeicons/angular/pencil';
import { Trash } from '@primeicons/angular/trash';

@Component({
  selector: 'app-categoria-listar',
  imports: [RouterLink,
    TableModule,
    ButtonModule,
  Pencil, Trash,],
  templateUrl: './categoria-listar.html',
  styleUrl: './categoria-listar.css',
})
export class CategoriaListar {
  listaCategorias: any[] = [];

  private readonly categoriaService = inject(CategoriaService);

  constructor(private readonly detectaMudancas: ChangeDetectorRef){}

  ngOnInit(): void {
    this.recuperaListaCategorias();
  }

  recuperaListaCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: (categorias: any) => {
        this.listaCategorias = categorias;
        this.detectaMudancas.detectChanges();
      },
      error: (erro: any) => {
        console.error('Erro ao listar categorias:', erro);
      }
    })
  }

  excluirCategoria(id: number) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.categoriaService.deletarCategoria(id).subscribe({
        next: () => {
          console.log('Cliente excluído com sucesso!');
          this.recuperaListaCategorias(); // Atualiza a lista após exclusão
        },
        error: (erro: any) => {
          console.error('Erro ao excluir categoria:', erro);
        }
      });
    }
  }
}
