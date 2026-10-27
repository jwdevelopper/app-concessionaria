import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonDirective } from 'primeng/button';
import { Save } from '@primeicons/angular/save';
import { Times } from '@primeicons/angular/times';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../cliente-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente-cadastrar',
  imports: [
    InputTextModule,
    FloatLabelModule,
    CardModule,
    SelectModule,
    InputMaskModule,
    ButtonDirective,
    Save,
    Times,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './cliente-cadastrar.html',
  styleUrl: './cliente-cadastrar.css',
})
export class ClienteCadastrar implements OnInit {
  @Input({ transform: numberAttribute }) id?: number;

  formularioCliente!: FormGroup;

  mensagemValidacao?: string;

  //TIPOS DE ATRIBUTOS
  //string = texto
  //number = numero
  //boolean = true(verdadeiro)/false(falso)
  //any = utlilizado para qualquer tipo de dado
  //produto: Produto;
  idade: number = 18;

  tipoPessoaOptions: any[] = [
    { descricao: 'Pessoa Física', valor: 'PF' },
    { descricao: 'Pessoa Jurídica', valor: 'PJ' },
  ];

  private readonly clienteService = inject(ClienteService);

  constructor(
    private readonly criadorFormulario: FormBuilder,
    private readonly routerLink: Router,
  ) {}

  ngOnInit(): void {
    this.criarFormularioCliente();

    if (this.id) {
      this.clienteService.buscarClientePorId(this.id).subscribe({
        next: (resposta: any) => {
          console.log('Cliente encontrado com sucesso!');
          console.log(resposta);
          this.formularioCliente.patchValue(resposta);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  criarFormularioCliente() {
    this.formularioCliente = this.criadorFormulario.group({
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      tipoPessoa: ['', Validators.required],
      cpfCnpj: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
    });
  }

  enviar() {
    this.formularioCliente.markAllAsTouched();
    if (this.formularioCliente.invalid) {
      console.log('Formulário inválido!');
      return;
    }

    if (this.id) {
      this.atualizarCliente();
    } else {
      this.salvarCliente();
    }
  }

  atualizarCliente() {
    this.clienteService.atualizarCliente(this.id!, this.formularioCliente.value).subscribe({
      next: (resposta: any) => {
        console.log('Cliente atualizado com sucesso!');
        console.log(resposta);
        this.routerLink.navigate(['/clientes/listar']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  salvarCliente() {
    console.log('-----------------------Objeto em JavaScript');
    console.log(this.formularioCliente.value);
    console.log('-----------------------Objeto em JSON');
    console.log(JSON.stringify(this.formularioCliente.value));
    this.clienteService.salvarCliente(this.formularioCliente.value).subscribe({
      next: (resposta: any) => {
        console.log('Cliente salvo com sucesso!');
        console.log(resposta);
        this.routerLink.navigate(['/clientes/listar']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
