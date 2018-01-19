import {
  Component,
  ElementRef,
  NgModule,
  NgZone,
  OnInit,
  ViewChild,
  ApplicationRef
} from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  AgmCoreModule,
  MapsAPILoader,
  GoogleMapsAPIWrapper
} from "angular2-google-maps/core";
import {} from "@types/googlemaps";
import { ActivatedRoute, Router } from "@angular/router";
import { CloudinaryOptions, CloudinaryUploader } from "ng2-cloudinary";

import { postService } from "../../service/post.service";
import { Authentication } from "../../config/authentication";
import { posts } from "../../models/posts";
import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from "ng2-toasty";

@Component({
  selector: "app-add-new-post",
  templateUrl: "./add-new-post.component.html",
  styleUrls: ["./add-new-post.component.css"],
  providers: [GoogleMapsAPIWrapper, postService, Authentication]
})
export class AddNewPostComponent implements OnInit {
  post: posts;
  sub: any;
  locInput = "";
  cloudinaryImage: any;

  public searchControl: FormControl;
  public zoom: number;
  public geoCoder;
  public typeUpdate = false;

  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private postService: postService,
    private toastyService: ToastyService,
    public Authentication: Authentication,
    private toastyConfig: ToastyConfig
  ) {}

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: "dagoega0j", uploadPreset: "cc7sdoi2" })
  );

  ngOnInit() {
    if(!this.Authentication.isAuthen()){
      this.link_rout("");
    }
    this.post = new posts();
    let id = 0;
    this.sub = this.route.params.subscribe(params => {
      if ((id = Number.parseInt(params["id"]))) {
        this.postService.loadById(id).subscribe(post => {
          this.post = post.data[0];
          this.typeUpdate = true;
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
    this.post.user_id = this.Authentication.getAuthenid();
    console.log(this.post)
    this.uploader.onSuccessItem = (
      item: any,
      response: string,
      status: number,
      headers: any
    ) => {
      this.cloudinaryImage = JSON.parse(response);
      this.post.url_image = this.cloudinaryImage.url;

      if (!this.post.id) {
        this.postService.create(this.post).subscribe(rs => {
          this.addToast("success", "Thông báo", "Thêm bài đăng thành công");
        });
      } else {
        this.postService.update(this.post).subscribe(rs => {
          this.addToast("success", "Thông báo", "Cập nhật bài đăng thành công");
        });
      }

      return { item, response, status, headers };
    };
    this.uploader.uploadAll();
  }

  backtolist() {
    this.link_rout("myprofile");
  }

  link_rout(url: string) {
    let link = ["/" + url];
    this.router.navigate(link, { skipLocationChange: true });
  }

  clearPost() {
    this.post = new posts();
    this.mylocation();
  }

  loadmap() {
    this.geoCoder = new google.maps.Geocoder();
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement,
      {
        types: ["address"]
      }
    );
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
    this.geoCoder.geocode(
      { location: { lat: this.post.latitude, lng: this.post.longitude } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.post.address = results[0].formatted_address;
          } else {
            this.post.address = "";
          }
        } else {
          this.post.address = "";
        }
      }
    );
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.post.latitude = position.coords.latitude;
        this.post.longitude = position.coords.longitude;
        this.zoom = 12;
        this.getAddress();
      });
    }
  }

  addToast(type: string, title: string, mgs: string) {
    var toastOptions: ToastOptions = {
      title: title,
      msg: mgs,
      showClose: true,
      timeout: 5000,
      theme: "bootstrap",
      onAdd: (toast: ToastData) => {
        // console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function(toast: ToastData) {
        // console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    switch (type) {
      case "default":
        this.toastyService.default(toastOptions);
        break;
      case "info":
        this.toastyService.info(toastOptions);
        break;
      case "success":
        this.toastyService.success(toastOptions);
        break;
      case "wait":
        this.toastyService.wait(toastOptions);
        break;
      case "error":
        this.toastyService.error(toastOptions);
        break;
      case "warning":
        this.toastyService.warning(toastOptions);
        break;
    }
  }
}
