"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("../../interceptors/auth-guard");
var manage_roles_component_1 = require("./manage-roles/manage-roles.component");
var add_role_component_1 = require("./manage-roles/add-role/add-role.component");
var edit_role_component_1 = require("./manage-roles/edit-role/edit-role.component");
var manage_users_component_1 = require("./manage-users/manage-users.component");
var add_user_component_1 = require("./manage-users/add-user/add-user.component");
var edit_user_component_1 = require("./manage-users/edit-user/edit-user.component");
var manage_role_actions_component_1 = require("./manage-role-actions/manage-role-actions.component");
var manage_user_roles_component_1 = require("./manage-user-roles/manage-user-roles.component");
var can_deactivate_guard_1 = require("../../interceptors/can-deactivate-guard");
var routes = [
    {
        path: "roles",
        component: manage_roles_component_1.ManageRolesComponent,
        data: { actionId: "ROLLIST" },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: "roles/add",
        component: add_role_component_1.AddRoleComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { actionId: "ROLCREA" },
        canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard]
    },
    {
        path: "roles/edit/:id",
        component: edit_role_component_1.EditRoleComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { actionId: "ROLEDIT" },
        canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard]
    },
    {
        path: "users",
        component: manage_users_component_1.ManageUsersComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { actionId: "USRLIST" },
    },
    {
        path: "users/add",
        component: add_user_component_1.AddUserComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { actionId: "USRCREA" },
        canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard]
    },
    {
        path: "users/edit/:id",
        component: edit_user_component_1.EditUserComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { actionId: "USREDIT" },
        canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard]
    },
    {
        path: "manageRoleActions",
        component: manage_role_actions_component_1.ManageRoleActionsComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { actionId: "ROLEDIT" }
    },
    {
        path: "manageUserRoles",
        component: manage_user_roles_component_1.ManageUserRolesComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { actionId: "USREDIT" }
    }
];
var SecurityRoutingModule = /** @class */ (function () {
    function SecurityRoutingModule() {
    }
    SecurityRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], SecurityRoutingModule);
    return SecurityRoutingModule;
}());
exports.SecurityRoutingModule = SecurityRoutingModule;
//# sourceMappingURL=security-routing.module.js.map