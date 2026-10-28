import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaCadastrar } from './categoria-cadastrar';

describe('CategoriaCadastrar', () => {
  let component: CategoriaCadastrar;
  let fixture: ComponentFixture<CategoriaCadastrar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaCadastrar],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaCadastrar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
