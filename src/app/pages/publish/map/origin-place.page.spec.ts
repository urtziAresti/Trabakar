import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OriginPlaceMap } from './map.page';

describe('MapPage', () => {
  let component: OriginPlaceMap;
  let fixture: ComponentFixture<OriginPlaceMap>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OriginPlaceMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
