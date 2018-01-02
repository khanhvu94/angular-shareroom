import { Routes,RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { BasicSearchComponent } from './pages/basic-search/basic-search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MapsNearRoomsComponent } from './pages/maps-near-rooms/maps-near-rooms.component';
import { RoomDetailsComponent } from './pages/room-details/room-details.component';
import { AddNewPostComponent } from './pages/add-new-post/add-new-post.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ListPostComponent } from './pages/list-post/list-post.component';


// Route config let's you map routes to components
const routes: Routes = [
    // map '/persons' to the people list component
    {
      path: '',
      component: BasicSearchComponent,
    },
    //map 'signup' to create new user component
    {
      path: 'signup',
      component: RegisterComponent
    },

    {
      path: 'login',
      component: LoginComponent 
    },

    {
      path: 'profile',
      component: ProfileComponent 
    },

    {
      path: 'maps',
      component: MapsNearRoomsComponent 
    },
    {
      path: 'details/:id',
      component: RoomDetailsComponent 
    },
    {
      path: 'post',
      component: AddNewPostComponent 
    },
    {
      path: 'post/:id',
      component: AddNewPostComponent 
    },
    {
      path: 'myprofile',
      component: MyProfileComponent 
    },
    {
      path: 'mypost',
      component: ListPostComponent 
    }
  ];

export const routing = RouterModule.forRoot(routes);