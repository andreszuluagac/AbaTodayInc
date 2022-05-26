import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppMainComponent } from "./app-main/app-main.component";
import { AppErrorComponent } from "../../shared/app-error.component";
import { AppAccessdeniedComponent } from "../../shared/app-accessdenied.component";
import { AppNotfoundComponent } from "../../shared/app-notfound.component";

const routes: Routes = [
    { path: "", loadChildren: () => import("../landing/landing.module").then(m => m.LandingModule) },
    {
        path: "",
        component: AppMainComponent,
        children: [
            { path: "dashboard", loadChildren: () => import("../dashboard/dashboard.module").then(m => m.DashboardModule) },
            { path: "security", loadChildren: () => import("../security/security.module").then(m => m.SecurityModule) },
            //{ path: "reports", loadChildren: () => import("../reports/reports.module").then(m => m.ReportsModule) },
            //{ path: "inventories", loadChildren: () => import("../inventories/inventories.module").then(m => m.InventoriesModule) },
            //{ path: "administration", loadChildren: () => import("../administration/administration.module").then(m => m.AdministrationModule) },
            //{ path: "items", loadChildren: () => import("../items/items.module").then(m => m.ItemsModule) },
            //{ path: "businessentities", loadChildren: () => import("../business-entities/business-entities.module").then(m => m.BusinessEntitiesModule) },
            //{ path: "tasks", loadChildren: () => import("../wireless-tasks/wireless-tasks.module").then(m => m.WirelessTasksModule) },
            //{ path: "orders", loadChildren: () => import("../orders/orders.module").then(m => m.OrdersModule) },
            //{ path: "finantial", loadChildren: () => import("../finantial/finantial.module").then(m => m.FinantialModule) }
        ]
    },
    { path: "account", loadChildren: () => import("../account/account.module").then(m => m.AccountModule) },
    { path: "error", component: AppErrorComponent },
    { path: "accessDenied", component: AppAccessdeniedComponent },
    { path: "notFound", component: AppNotfoundComponent },
    { path: "**", redirectTo: "/notFound" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
