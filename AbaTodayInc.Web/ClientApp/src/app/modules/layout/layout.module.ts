import { NgModule } from "@angular/core";

import { LayoutRoutingModule } from "./layout-routing.module";
import { SharedModule } from "../shared.module";
import { AppMainComponent } from "./app-main/app-main.component";
import { AppTopBarComponent } from "./app-topbar/app-topbar.component";
import { AppFooterComponent } from "./app-footer/app-footer.component";
import { AppMenuComponent } from "./app-menu/app-menu.component";
import { AppRightPanelComponent } from "./app-rightpanel/app-rightpanel.component";
import { AppBreadcrumbComponent } from "./app-breadcrumb/app-breadcrumb.component";
import { AppConfigComponent } from "./app-config/app-config.component";
import { AppMenuitemComponent } from "./app-menuitem/app-menuitem.component";


@NgModule({
    declarations: [
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppRightPanelComponent,
        AppConfigComponent,
        AppBreadcrumbComponent
    ],
    imports: [
        SharedModule,
        LayoutRoutingModule
    ]
})
export class LayoutModule { }
