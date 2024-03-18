import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateSelectorPage } from './date-selector.page';

describe('DateSelectorPage', () => {
  let component: DateSelectorPage;
  let fixture: ComponentFixture<DateSelectorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DateSelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
