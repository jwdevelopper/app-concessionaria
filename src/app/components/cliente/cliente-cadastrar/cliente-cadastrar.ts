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
import { CidadeService } from '../../cidade/cidade-service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CEPError, Endereco, NgxViacepModule, NgxViacepService } from "@brunoc/ngx-viacep";
import { catchError, EMPTY } from 'rxjs';

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
    AutoCompleteModule,
    NgxViacepModule
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

  listaCidades: any[] = [];

  private readonly clienteService = inject(ClienteService);
  private readonly cidadeService = inject(CidadeService);
  private readonly viaCepService = inject(NgxViacepService);

  constructor(
    private readonly criadorFormulario: FormBuilder,
    private readonly routerLink: Router,
  ) { }

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
      cidade: [null]
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

  buscarCidades(nomeDigitado: any) {
    const nomeCidade = nomeDigitado.query.toLowerCase();
    this.cidadeService.buscarCidadePorNome(nomeCidade).subscribe({
      next: (resposta: any) => {
        this.listaCidades = resposta;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  buscarCep() {
    console.log('Buscando CEP...');
    let cep = this.formularioCliente.get('cep')?.value;
    cep = cep.replace(/[.-]/g, '');
    if (cep.length == 8) {
      console.log('CEP digitado:', cep);
      this.viaCepService
        .buscarPorCep(cep)
        .pipe(
          catchError((error: CEPError) => {
            // Ocorreu algum erro :/
            console.log(error.message);
            return EMPTY;
          })
        )
        .subscribe((endereco: Endereco) => {
          if(endereco.ibge) {
            this.buscarCidadeCodigoIbge(endereco.ibge);
          }
          if(endereco.logradouro) {
            this.formularioCliente.get('logradouro')?.setValue(endereco.logradouro);
          }
          if(endereco.bairro) {
            this.formularioCliente.get('bairro')?.setValue(endereco.bairro);
          }
        });
    }
  }

  buscarCidadeCodigoIbge(codigoIbge: string) {
    this.cidadeService.buscarCidadePorCodigoIbge(codigoIbge).subscribe({
      next: (resposta: any) => {
        this.formularioCliente.get('cidade')?.patchValue(resposta);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
