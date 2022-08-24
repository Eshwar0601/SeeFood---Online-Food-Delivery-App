import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainviewProductsComponent } from './mainview-products.component';

describe('MainviewProductsComponent', () => {
  let component: MainviewProductsComponent;
  let fixture: ComponentFixture<MainviewProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainviewProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainviewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
