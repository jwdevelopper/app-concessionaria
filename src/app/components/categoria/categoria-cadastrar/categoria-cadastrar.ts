import { Component, inject, Input, numberAttribute } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria-service';
import { Router, RouterLink } from '@angular/router';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';

import { Save } from '@primeicons/angular/save';
import { Times } from '@primeicons/angular/times';

@Component({
  selector: 'app-categoria-cadastrar',
  imports: [
    InputTextModule,
    FloatLabelModule,
    ButtonDirective,
    CardModule,
    Save,
    Times,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './categoria-cadastrar.html',
  styleUrl: './categoria-cadastrar.css',
})
export class CategoriaCadastrar {
  @Input({ transform: numberAttribute }) id?: number;

  formularioCategoria!: FormGroup;

  mensagemValidacao?: string;


  private readonly categoriaService = inject(CategoriaService);

  constructor(
    private readonly criadorFormulario: FormBuilder,
    private readonly routerLink: Router,
  ) {}

  ngOnInit(): void {
    this.criarFormularioCategoria();

    if (this.id) {
      this.categoriaService.buscarCategoriaPorId(this.id).subscribe({
        next: (resposta: any) => {
          console.log('Cliente encontrado com sucesso!');
          console.log(resposta);
          this.formularioCategoria.patchValue(resposta);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  criarFormularioCategoria() {
    this.formularioCategoria = this.criadorFormulario.group({
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
    });
  }

  enviar() {
    this.formularioCategoria.markAllAsTouched();
    if (this.formularioCategoria.invalid) {
      console.log('Formulário inválido!');
      return;
    }

    if (this.id) {
      this.atualizarCategoria();
    } else {
      this.salvarCategoria();
    }
  }

  atualizarCategoria() {
    this.categoriaService.atualizarCategoria(this.id!, this.formularioCategoria.value).subscribe({
      next: (resposta: any) => {
        console.log('Categoria atualizada com sucesso!');
        console.log(resposta);
        this.routerLink.navigate(['/categorias/listar']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  salvarCategoria() {
    console.log('-----------------------Objeto em JavaScript');
    console.log(this.formularioCategoria.value);
    console.log('-----------------------Objeto em JSON');
    console.log(JSON.stringify(this.formularioCategoria.value));
    this.categoriaService.salvarCategoria(this.formularioCategoria.value).subscribe({
      next: (resposta: any) => {
        console.log('Categoria salva com sucesso!');
        console.log(resposta);
        this.routerLink.navigate(['/categorias/listar']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
