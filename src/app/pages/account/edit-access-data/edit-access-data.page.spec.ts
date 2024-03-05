import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAccessDataPage } from './edit-access-data.page';

describe('EditAccessDataPage', () => {
  let component: EditAccessDataPage;
  let fixture: ComponentFixture<EditAccessDataPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditAccessDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
