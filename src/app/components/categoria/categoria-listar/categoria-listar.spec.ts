import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaListar } from './categoria-listar';

describe('CategoriaListar', () => {
  let component: CategoriaListar;
  let fixture: ComponentFixture<CategoriaListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaListar],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaListar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
