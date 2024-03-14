import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinyPlaceMapPage } from './destiny-place-map.page';

describe('DestinyPlaceMapPage', () => {
  let component: DestinyPlaceMapPage;
  let fixture: ComponentFixture<DestinyPlaceMapPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DestinyPlaceMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
