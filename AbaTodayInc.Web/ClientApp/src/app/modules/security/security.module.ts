import { NgModule } from "@angular/core";

import { SharedModule } from "../shared.module";
import { SecurityRoutingModule } from "./security-routing.module";
import { ManageRolesComponent } from "./manage-roles/manage-roles.component";
import { ManageRoleActionsComponent } from "./manage-role-actions/manage-role-actions.component";
import { ManageUsersComponent } from "./manage-users/manage-users.component";
import { ManageUserRolesComponent } from "./manage-user-roles/manage-user-roles.component";
import { AddRoleComponent } from "./manage-roles/add-role/add-role.component";
import { EditRoleComponent } from "./manage-roles/edit-role/edit-role.component";
import { RoleFormComponent } from "./manage-roles/role-form/role-form.component";
import { AddUserComponent } from "./manage-users/add-user/add-user.component";
import { EditUserComponent } from "./manage-users/edit-user/edit-user.component";
import { UserFormComponent } from "./manage-users/user-form/user-form.component";


@NgModule({
    declarations: [
        ManageRolesComponent,
        ManageRoleActionsComponent,
        ManageUsersComponent,
        ManageUserRolesComponent,
        AddRoleComponent,
        EditRoleComponent,
        RoleFormComponent,
        AddUserComponent,
        EditUserComponent,
        UserFormComponent],
    imports: [
        SharedModule,
        SecurityRoutingModule
    ]
})
export class SecurityModule { }
