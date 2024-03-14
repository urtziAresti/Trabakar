import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OriginDepartureTimePage } from './origin-departure-time.page';

describe('OriginDepartureTimePage', () => {
  let component: OriginDepartureTimePage;
  let fixture: ComponentFixture<OriginDepartureTimePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OriginDepartureTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
