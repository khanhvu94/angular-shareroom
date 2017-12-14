import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, ApplicationRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper} from 'angular2-google-maps/core';
import { } from '@types/googlemaps';
import { ActivatedRoute, Router } from '@angular/router';
import { posts } from '../../models/posts';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.css']
})
export class AddNewPostComponent implements OnInit {
  post: posts
  sub: any;
  locInput = '';
  public searchControl: FormControl;
  public zoom: number;
  private geoCoder;

  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.post = new posts();
    let id = 0;
    this.sub = this.route.params.subscribe(params => {
      if (id = Number.parseInt(params['id'])) {
        this.post.title = "aaaaaaaaaaaaaaaaa";
      }
    });
    //set google maps defaults
    this.zoom = 4;
    this.post.latitude = 39.8282;
    this.post.longitude = -98.5795;
    this.searchControl = new FormControl();
    this.setCurrentPosition();
    this.mapsAPILoader.load().then(() => this.loadmap());
  }

  save() {

  }
  clearPost(){
    this.post = new posts();
    this.mylocation();
  }

  loadmap() {
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
          this.post.latitude = place.geometry.location.lat();
          this.post.longitude = place.geometry.location.lng();
          this.zoom = 12;
          
        });
      });
      this.getAddress();
  }

  mylocation() {
    this.setCurrentPosition();
    this.loadmap();
  }

  markerDragEnd($event: any) {
    this.post.latitude = $event.coords.lat;
    this.post.longitude = $event.coords.lng;
    this.getAddress();
  }

  getAddress() {
    this.geoCoder.geocode({ 'location': { lat: this.post.latitude, lng: this.post.longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.post.map_address = results[0].formatted_address;
          var add= results[0].formatted_address ;
          var  value=add.split(",");

          let count=value.length;
          this.post.country=value[count-1];
          this.post.city=value[count-2];
          this.post.district=value[count-3];
          this.post.town = value[count-4];
          this.post.street = value[count-5]
        } else {
          this.post.map_address = "";
        }
      } else {
        this.post.map_address = "";
      }
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.post.latitude = position.coords.latitude;
        this.post.longitude = position.coords.longitude;
        this.zoom = 12;
        this.getAddress();
      });
    }
  }
}
