import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PrivComponent } from './components/priv/priv.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'priv', component: PrivComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard, AuthGuard], data: { expectedRole: "admin"} }, // duplicar para moderador
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
