import {Component,NgModule,NgZone,OnInit,ViewChild,ElementRef,Directive,Input} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper} from 'angular2-google-maps/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DirectionsMapDirective} from '../../service/googlr-map.directive';
import { posts } from '../../models/posts';

declare var google : any;
declare var jQuery : any;

@Component({selector: 'app-maps-near-rooms',
    templateUrl: './maps-near-rooms.component.html',
    styleUrls: ['./maps-near-rooms.component.css'],
    providers: [GoogleMapsAPIWrapper]
  })

export class MapsNearRoomsComponent implements OnInit {
  public latitude : number;
  public longitude : number;
  public destinationInput : FormControl;
  public destinationOutput : FormControl;
  public zoom : number;
  // public mapCustomStyles : any;
  private Posts : posts[];

  @ViewChild("pickupInput")public pickupInputElementRef : ElementRef;
  @ViewChild("pickupOutput")public pickupOutputElementRef : ElementRef;
  @ViewChild(DirectionsMapDirective)vc : DirectionsMapDirective;

  constructor(private mapsAPILoader : MapsAPILoader, 
    private ngZone : NgZone, 
    private gmapsApi : GoogleMapsAPIWrapper, 
    private _elementRef : ElementRef, 
    private route : ActivatedRoute, 
    private router : Router) {}

  ngOnInit() {
    this.zoom = 4;
    this.latitude = 10.821581049913508;
    this.longitude = 106.78939990781248;
    this.destinationOutput = new FormControl();
    this.setCurrentPosition();
    this.loadListPost();
    this.mapsAPILoader.load().then(() => {
        this.loadmap();
      });
  }

  loadmap(){
    let autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {types: ["address"]});
    this.setupPlaceChangedListener(autocompleteOutput);
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  private setupPlaceChangedListener(autocomplete : any) {
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
          let place : google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
    });

  }

  // getDistanceAndDuration() {
  //   this.estimatedTime = this.vc.estimatedTime;
  //   this.estimatedDistance = this.vc.estimatedDistance;
  // }

  private setPickUpLocation(place : any) {
    if (place.geometry === undefined || place.geometry === null) {
      return;
    }
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();
    this.zoom = 12;
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

  private loadListPost(){
    this.Posts = [];
    let post = new posts();
    post.id = 1;
    post.title = "chung cư 12 tầng";
    post.latitude = 10.821581049913508;
    post.longitude = 106.78939990781248;
    post.price = 1000;
    this.Posts.push(post);
  }

  ViewDetails(id : number) {
    let link = ['/details/' + id];
    this.router.navigate(link);
  }

  mylocation() {
    this.setCurrentPosition();
    this.loadmap();
    
  }

  loadDirect(lag:number,log:number){
    this.vc.origin = {
      longitude: this.longitude,
      latitude: this.latitude
    };
    this.vc.destination = {
      longitude: log,
      latitude: lag
    }

    if (this.vc.directionsDisplay === undefined) {
      this.mapsAPILoader.load().then(() => {
          this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
        });
    }
    this.vc.updateDirections();
    // this.getDistanceAndDuration() ;
  }
}
