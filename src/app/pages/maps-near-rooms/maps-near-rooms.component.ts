import {
  Component,
  NgModule,
  NgZone,
  OnInit,
  ViewChild,
  ElementRef,
  Directive,
  Input
} from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  AgmCoreModule,
  MapsAPILoader,
  GoogleMapsAPIWrapper
} from "angular2-google-maps/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DirectionsMapDirective } from "../../service/googlr-map.directive";
import { postService } from "../../service/post.service";
import { Authentication } from "../../config/authentication";
import { RoomDetailsComponent } from "../room-details/room-details.component";

import { posts } from "../../models/posts";
import { post } from "selenium-webdriver/http";

declare var google: any;
declare var jQuery: any;

@Component({
  selector: "app-maps-near-rooms",
  templateUrl: "./maps-near-rooms.component.html",
  styleUrls: ["./maps-near-rooms.component.css"],
  providers: [GoogleMapsAPIWrapper, postService, Authentication]
})
export class MapsNearRoomsComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public destinationInput: FormControl;
  public destinationOutput: FormControl;
  public zoom: number;
  public selectedPost: posts;
  private posts: any;
  private user : any;

  @ViewChild("pickupInput") public pickupInputElementRef: ElementRef;
  @ViewChild("pickupOutput") public pickupOutputElementRef: ElementRef;
  @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;
  @ViewChild(RoomDetailsComponent) RoomDetailsComponent: RoomDetailsComponent;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private postService: postService
  ) {}

  ngOnInit() {
    this.zoom = 15;
    this.latitude = 10.821581049913508;
    this.longitude = 106.78939990781248;
    this.destinationOutput = new FormControl();
    this.setCurrentPosition();
    this.loadmap();
  }

  loadmap() {
    this.mapsAPILoader.load().then(() => {
      let autocompleteOutput = new google.maps.places.Autocomplete(
        this.pickupOutputElementRef.nativeElement,
        { types: ["address"] }
      );
      this.setupPlaceChangedListener(autocompleteOutput);
    });
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.loadpoint();
    this.vc.clearDirections();
    this.loadmap();
  }


  loadpoint(){
    this.postService.loadByLocation(this.latitude,this.longitude).subscribe(posts => {
      if(posts){
        this.posts = posts.data;
      }else{
        this.posts = null;
      }
    });
  }

  private setupPlaceChangedListener(autocomplete: any) {
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (place.geometry === undefined) {
          return;
        }
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
      });
    });
  }

  private setPickUpLocation(place: any) {
    if (place.geometry === undefined || place.geometry === null) {
      return;
    }
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();
    this.zoom = 15;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.loadpoint();
      });
    }
  }

  detail(post:any){
    this.RoomDetailsComponent.post = post;
    this.RoomDetailsComponent.user = post.user;
  }

  mylocation() {
    this.setCurrentPosition();
    this.loadmap();
  }

  loadDirect(lag: number, log: number) {
    this.vc.origin = {
      longitude: this.longitude,
      latitude: this.latitude
    };
    this.vc.destination = {
      longitude: log,
      latitude: lag
    };
    if (this.vc.directionsDisplay === undefined) {
      this.mapsAPILoader.load().then(() => {
        this.vc.directionsDisplay = new google.maps.DirectionsRenderer();
      });
    }
    this.vc.updateDirections();
  }
}
