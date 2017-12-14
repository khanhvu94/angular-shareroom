import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsNearRoomsComponent } from './maps-near-rooms.component';

describe('MapsNearRoomsComponent', () => {
  let component: MapsNearRoomsComponent;
  let fixture: ComponentFixture<MapsNearRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsNearRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsNearRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
