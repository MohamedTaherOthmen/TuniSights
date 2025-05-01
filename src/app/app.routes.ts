import { Routes } from '@angular/router';
import { SignupHomeComponent } from './components/signup-home/signup-home.component';
import { TouristSignupComponent } from './components/tourist-signup/tourist-signup.component'
import { GuideSignupComponent } from './components/guide-signup/guide-signup.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeeComponent } from './components/welcomee/welcomee.component';
import { GuideDashboardComponent } from './components/guide-dashboard/guide-dashboard.component';
import { CreatePlanFormComponent } from './components/create-plan-form/create-plan-form.component';
import { ExplorePlansComponent } from './components/explore-plans/explore-plans.component';
import { GuidePlansComponent } from './components/guide-plans/guide-plans.component';
import { EditPlanFormComponent } from './components/edit-plan-form/edit-plan-form.component';
import { GuideBookingsComponent } from './components/guide-bookings/guide-bookings.component';
import { TouristBookingsComponent } from './components/tourist-bookings/tourist-bookings.component';
import { TouristWishlistComponent } from './components/tourist-wishlist/tourist-wishlist.component';
import { GuideProfileSettingsComponent } from './components/guide-profile-settings/guide-profile-settings.component';


export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  //{ path: '**', component: NotfoundComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupHomeComponent },
  { path: 'signup/tourist', component: TouristSignupComponent },
  { path: 'signup/guide', component: GuideSignupComponent },
  { path: 'welcome', component: WelcomeeComponent },
  { path: 'guide/dashboard', component: GuideDashboardComponent },
  { path: 'create/plan', component: CreatePlanFormComponent },
  { path: 'tourist/explore', component: ExplorePlansComponent },

  { path: 'guide/plans', component: GuidePlansComponent },
  { path: 'edit/plan', component: EditPlanFormComponent },

  { path: 'guide/bookings', component: GuideBookingsComponent },

  { path: 'tourist/bookings', component: TouristBookingsComponent },

  { path: 'tourist/wishlist', component: TouristWishlistComponent },

  { path: 'guide/profile', component: GuideProfileSettingsComponent }
  
  //{ path: 'signup', loadComponent: () => import('./components/signup-home/signup-home.component').then(m => m.SignupHomeComponent) },
  //{ path: 'signup/tourist', loadComponent: () => import('./components/tourist-signup/tourist-signup.component').then(m => m.TouristSignupComponent) },
  //{ path: 'signup/guide', loadComponent: () => import('./components/guide-signup/guide-signup.component').then(m => m.GuideSignupComponent) },
  //{ path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  //{ path: 'welcome', loadComponent: () => import('./components/welcome/welcome.component').then(m => m.WelcomeComponent)}
];
