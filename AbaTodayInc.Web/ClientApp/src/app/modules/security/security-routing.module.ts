import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../../interceptors/auth-guard";
import { ManageRolesComponent } from "./manage-roles/manage-roles.component";
import { AddRoleComponent } from "./manage-roles/add-role/add-role.component";
import { EditRoleComponent } from "./manage-roles/edit-role/edit-role.component";
import { ManageUsersComponent } from "./manage-users/manage-users.component";
import { AddUserComponent } from "./manage-users/add-user/add-user.component";
import { EditUserComponent } from "./manage-users/edit-user/edit-user.component";
import { ManageRoleActionsComponent } from "./manage-role-actions/manage-role-actions.component";
import { ManageUserRolesComponent } from "./manage-user-roles/manage-user-roles.component";
import { CanDeactivateGuard } from "../../interceptors/can-deactivate-guard";

const routes: Routes = [
    {
        path: "roles",
        component: ManageRolesComponent,
        data: { actionId: "ROLLIST" },
        canActivate: [AuthGuard]
    },
    {
        path: "roles/add",
        component: AddRoleComponent,
        canActivate: [AuthGuard],
        data: { actionId: "ROLCREA" },
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: "roles/edit/:id",
        component: EditRoleComponent,
        canActivate: [AuthGuard],
        data: { actionId: "ROLEDIT" },
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: "users",
        component: ManageUsersComponent,
        canActivate: [AuthGuard],
        data: { actionId: "USRLIST" },
    },
    {
        path: "users/add",
        component: AddUserComponent,
        canActivate: [AuthGuard],
        data: { actionId: "USRCREA" },
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: "users/edit/:id",
        component: EditUserComponent,
        canActivate: [AuthGuard],
        data: { actionId: "USREDIT" },
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: "manageRoleActions",
        component: ManageRoleActionsComponent,
        canActivate: [AuthGuard],
        data: { actionId: "ROLEDIT" }
    },
    {
        path: "manageUserRoles",
        component: ManageUserRolesComponent,
        canActivate: [AuthGuard],
        data: { actionId: "USREDIT" }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityRoutingModule { }
