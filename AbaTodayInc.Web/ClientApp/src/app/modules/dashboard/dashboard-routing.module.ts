import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ManageProfileComponent } from "./manage-profile/manage-profile.component";
import { ThreedLabComponent } from "./threed-lab/threed-lab.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "manageProfile", component: ManageProfileComponent },
    { path: "threed", component: ThreedLabComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
