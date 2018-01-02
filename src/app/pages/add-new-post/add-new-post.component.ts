import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, ApplicationRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper} from 'angular2-google-maps/core';
import { } from '@types/googlemaps';
import { ActivatedRoute, Router } from '@angular/router';
import { postService } from '../../service/post.service';
import { Authentication } from '../../config/authentication';
import { posts } from '../../models/posts';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.css'],
  providers: [GoogleMapsAPIWrapper,postService,Authentication]
  
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
    private ngZone: NgZone,
    private postService : postService    
  ) { }

  ngOnInit() {
    this.post = new posts();
    let id = 0;
    this.sub = this.route.params.subscribe(params => {
      if (id = Number.parseInt(params['id'])) {
        this.postService.loadById(id).subscribe(post=>{
          this.post = post.data[0];
          console.log(this.post);
        });
      }
    });
    this.zoom = 4;
    this.post.latitude = 10.8393845;
    this.post.longitude = 106.79473569999999;
    this.searchControl = new FormControl();
    this.setCurrentPosition();
    this.mapsAPILoader.load().then(() => this.loadmap());
  }

  save() {
    this.post.user_id = 1;
    this.postService.create(this.post).subscribe(rs=>{
      console.log(rs.success);
    });
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
          this.post.address = results[0].formatted_address;
          // var add= results[0].formatted_address ;
          // var  value=add.split(",");

          // let count=value.length;
          // this.post.country=value[count-1];
          // this.post.city=value[count-2];
          // this.post.district=value[count-3];
        } else {
          this.post.address = "";
        }
      } else {
        this.post.address = "";
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
