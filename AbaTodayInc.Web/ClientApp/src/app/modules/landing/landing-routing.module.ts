import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "about", component: HomeComponent },
    { path: "services", component: HomeComponent },
    { path: "features", component: HomeComponent },
    { path: "contactUs", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
