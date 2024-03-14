import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinyFinderPage } from './destiny-finder.page';

describe('DestinyFinderPage', () => {
  let component: DestinyFinderPage;
  let fixture: ComponentFixture<DestinyFinderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DestinyFinderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
