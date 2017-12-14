import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationTableComponent } from './destination-table.component';

describe('DestinationTableComponent', () => {
  let component: DestinationTableComponent;
  let fixture: ComponentFixture<DestinationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
