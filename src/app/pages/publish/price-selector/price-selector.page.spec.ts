import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceSelectorPage } from './price-selector.page';

describe('PriceSelectorPage', () => {
  let component: PriceSelectorPage;
  let fixture: ComponentFixture<PriceSelectorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PriceSelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
