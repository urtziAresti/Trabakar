import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrailPage } from './trail.page';

describe('TrailPage', () => {
  let component: TrailPage;
  let fixture: ComponentFixture<TrailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TrailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
