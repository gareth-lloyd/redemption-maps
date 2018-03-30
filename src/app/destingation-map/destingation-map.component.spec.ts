import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestingationMapComponent } from './destingation-map.component';

describe('DestingationMapComponent', () => {
  let component: DestingationMapComponent;
  let fixture: ComponentFixture<DestingationMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestingationMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestingationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
