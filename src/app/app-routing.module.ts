import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard
import { ResteauProduitsComponent } from './pages/resteau-produits/resteau-produits.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',  // Redirect to login by default
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],  // Protect the home route
  },
  {
    path: 'register',
    component: RegisterComponent,
  }, { path: '', component: HomeComponent },
  { path: 'restaurant/:id', component: ResteauProduitsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
