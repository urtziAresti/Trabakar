import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailableSeatsPage } from './available-seats.page';

describe('AvailableSeatsPage', () => {
  let component: AvailableSeatsPage;
  let fixture: ComponentFixture<AvailableSeatsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AvailableSeatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
