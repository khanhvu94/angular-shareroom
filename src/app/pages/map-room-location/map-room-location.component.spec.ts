import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRoomLocationComponent } from './map-room-location.component';

describe('MapRoomLocationComponent', () => {
  let component: MapRoomLocationComponent;
  let fixture: ComponentFixture<MapRoomLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRoomLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRoomLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
