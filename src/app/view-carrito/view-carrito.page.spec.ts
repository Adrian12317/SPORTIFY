import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCarritoPage } from './view-carrito.page';

describe('ViewCarritoPage', () => {
  let component: ViewCarritoPage;
  let fixture: ComponentFixture<ViewCarritoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCarritoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
