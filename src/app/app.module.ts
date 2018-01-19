//các thư viện
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { routing } from "./app.routes";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { AgmCoreModule, MapsAPILoader } from "angular2-google-maps/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { DirectionsMapDirective } from "./service/googlr-map.directive";
import { ToastyModule } from "ng2-toasty";
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

//component layout
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { HeaderComponent } from "../layouts/header/header.component";
import { FooterComponent } from "../layouts/footer/footer.component";
import { MenuBarComponent } from "../layouts/menu-bar/menu-bar.component";

//component xử lý
import { RegisterComponent } from "./pages/register/register.component";
import { BasicSearchComponent } from "./pages/basic-search/basic-search.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { MapsNearRoomsComponent } from "./pages/maps-near-rooms/maps-near-rooms.component";
import { RoomDetailsComponent } from "./pages/room-details/room-details.component";
import { AddNewPostComponent } from "./pages/add-new-post/add-new-post.component";
import { MyProfileComponent } from "./pages/my-profile/my-profile.component";
import { ListPostComponent } from "./pages/list-post/list-post.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuBarComponent,
    LoginComponent,
    RegisterComponent,
    BasicSearchComponent,
    ProfileComponent,
    MapsNearRoomsComponent,
    RoomDetailsComponent,
    AddNewPostComponent,
    DirectionsMapDirective,
    MyProfileComponent,
    ListPostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC6kqYWKv0TZyjLWZGY498aif2LD9eDB1c",
      libraries: ["places"]
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastyModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmSnazzyInfoWindowModule,
    routing,
    Ng2CloudinaryModule,
    FileUploadModule
  ],
  exports: [BrowserModule, ToastyModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
