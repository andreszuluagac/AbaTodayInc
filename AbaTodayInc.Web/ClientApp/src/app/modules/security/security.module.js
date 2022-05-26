"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityModule = void 0;
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared.module");
var security_routing_module_1 = require("./security-routing.module");
var manage_roles_component_1 = require("./manage-roles/manage-roles.component");
var manage_role_actions_component_1 = require("./manage-role-actions/manage-role-actions.component");
var manage_users_component_1 = require("./manage-users/manage-users.component");
var manage_user_roles_component_1 = require("./manage-user-roles/manage-user-roles.component");
var add_role_component_1 = require("./manage-roles/add-role/add-role.component");
var edit_role_component_1 = require("./manage-roles/edit-role/edit-role.component");
var role_form_component_1 = require("./manage-roles/role-form/role-form.component");
var add_user_component_1 = require("./manage-users/add-user/add-user.component");
var edit_user_component_1 = require("./manage-users/edit-user/edit-user.component");
var user_form_component_1 = require("./manage-users/user-form/user-form.component");
var SecurityModule = /** @class */ (function () {
    function SecurityModule() {
    }
    SecurityModule = __decorate([
        core_1.NgModule({
            declarations: [
                manage_roles_component_1.ManageRolesComponent,
                manage_role_actions_component_1.ManageRoleActionsComponent,
                manage_users_component_1.ManageUsersComponent,
                manage_user_roles_component_1.ManageUserRolesComponent,
                add_role_component_1.AddRoleComponent,
                edit_role_component_1.EditRoleComponent,
                role_form_component_1.RoleFormComponent,
                add_user_component_1.AddUserComponent,
                edit_user_component_1.EditUserComponent,
                user_form_component_1.UserFormComponent
            ],
            imports: [
                shared_module_1.SharedModule,
                security_routing_module_1.SecurityRoutingModule
            ]
        })
    ], SecurityModule);
    return SecurityModule;
}());
exports.SecurityModule = SecurityModule;
//# sourceMappingURL=security.module.js.map