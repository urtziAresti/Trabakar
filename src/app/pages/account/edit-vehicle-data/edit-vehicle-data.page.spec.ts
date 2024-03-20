import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditVehicleDataPage } from './edit-vehicle-data.page';

describe('EditVehicleDataPage', () => {
  let component: EditVehicleDataPage;
  let fixture: ComponentFixture<EditVehicleDataPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditVehicleDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
