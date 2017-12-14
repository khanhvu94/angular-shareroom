import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, ApplicationRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { ActivatedRoute, Router } from '@angular/router';
import { } from '@types/googlemaps';
declare var google: any;
declare var jQuery: any;

@Component({
  selector: 'app-map-room-location',
  templateUrl: './map-room-location.component.html',
  styleUrls: ['./map-room-location.component.css'],
  providers: [GoogleMapsAPIWrapper]
})
export class MapRoomLocationComponent implements OnInit {
  locInput = '';
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public currentAddress: string;
  private geoCoder;

  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.zoom = 8;
    this.latitude = 10.821581049913508;
    this.longitude = 106.78939990781248;
    this.setCurrentPosition();
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then((map) => {
      this.search_change();
    });
  }

  search_change() {
    this.geoCoder = new google.maps.Geocoder;
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"]
    });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
      });
    });
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.geoCoder.geocode({ 'location': { lat: this.latitude, lng: this.longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.currentAddress = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  mylocation() {
    this.setCurrentPosition();
    this.search_change();
    // this.currentAddress = "";
  }

  ViewDetails(id:number) {
    let link = ['/details/'+id];
    this.router.navigate(link);
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
