import { Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    {path:'', component:UserLoginComponent},
    {path:'user-dashboard', component:UserDashboardComponent},
    {path:'admin', component:AdminLoginComponent},
    {path:'admin-dashboard', component:AdminDashboardComponent},
];
