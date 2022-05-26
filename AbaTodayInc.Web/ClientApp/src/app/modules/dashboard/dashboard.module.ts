import { NgModule } from "@angular/core";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { HomeComponent } from "./home/home.component";
import { ManageProfileComponent } from "./manage-profile/manage-profile.component";
import { SharedModule } from "../shared.module";
import { ManageProfileDetailsComponent } from "./manage-profile/manage-profile-details/manage-profile-details.component";
import { ThreedLabComponent } from "./threed-lab/threed-lab.component";

@NgModule({
    declarations: [
        HomeComponent,
        ManageProfileComponent,
        ManageProfileDetailsComponent,
        ThreedLabComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
