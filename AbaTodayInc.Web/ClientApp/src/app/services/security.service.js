"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityService = void 0;
var core_1 = require("@angular/core");
var SecurityService = /** @class */ (function () {
    function SecurityService(http) {
        this.http = http;
        this.serviceData = new core_1.EventEmitter();
    }
    SecurityService.prototype.getUserById = function (id) {
        var endpoint = "api/security/getUserById/" + id;
        return this.http.get(endpoint);
    };
    SecurityService.prototype.getUserByUserName = function (id) {
        var endpoint = "api/security/getUserByUserName/" + id;
        return this.http.get(endpoint);
    };
    SecurityService.prototype.createUser = function (user) {
        var endpoint = "api/security/createUser";
        return this.http.post(endpoint, user);
    };
    SecurityService.prototype.updateUser = function (user) {
        var endpoint = "api/security/updateUser";
        return this.http.post(endpoint, user);
    };
    SecurityService.prototype.deleteUser = function (id) {
        var endpoint = "api/security/deleteUser/" + id;
        return this.http.delete(endpoint);
    };
    SecurityService.prototype.getRoleById = function (id) {
        var endpoint = "api/security/getRoleById/" + id;
        return this.http.get(endpoint);
    };
    SecurityService.prototype.createRole = function (role) {
        var endpoint = "api/security/createRole";
        return this.http.post(endpoint, role);
    };
    SecurityService.prototype.updateRole = function (role) {
        var endpoint = "api/security/updateRole";
        return this.http.post(endpoint, role);
    };
    SecurityService.prototype.updateUserLoggedState = function (id) {
        var endpoint = "api/security/updateUserLoggedState/" + id;
        return this.http.get(endpoint);
    };
    SecurityService.prototype.deleteRole = function (id) {
        var endpoint = "api/security/deleteRole/" + id;
        return this.http.delete(endpoint);
    };
    SecurityService.prototype.getRolesBySubscriptionId = function () {
        var endpoint = "api/security/getRolesBySubscriptionId";
        return this.http.get(endpoint);
    };
    SecurityService.prototype.getModules = function () {
        var endpoint = "api/security/getModules/";
        return this.http.get(endpoint);
    };
    SecurityService.prototype.getActionsByModuleName = function (id, roleId) {
        var endpoint = "api/security/GetActionsByModuleName/" + id + "?roleId=" + roleId;
        return this.http.get(endpoint);
    };
    SecurityService.prototype.getActionsByRole = function (id, roleId) {
        var endpoint = "api/security/getActionsByRole/" + id + "?roleId=" + roleId;
        return this.http.get(endpoint);
    };
    SecurityService.prototype.getActionsByRoleName = function (id) {
        var endpoint = "api/security/getActionsByRoleName/" + id;
        return this.http.get(endpoint);
    };
    SecurityService.prototype.updateRoleActions = function (actions, roleId, moduleName) {
        actions.forEach(function (data) {
            data.roleId = roleId;
            data.moduleName = moduleName;
        });
        var endpoint = "api/security/updateRoleActions";
        return this.http.post(endpoint, actions);
    };
    SecurityService.prototype.deleteRoleActions = function (id) {
        console.log(id);
        var endpoint = "api/security/deleteRoleActions/" + id;
        return this.http.delete(endpoint);
    };
    SecurityService.prototype.getRolesInUsersBySubscriptionId = function () {
        var endpoint = "api/security/getRolesInUsersBySubscriptionId";
        return this.http.get(endpoint);
    };
    SecurityService.prototype.getUsersBySubscriptionId = function (id) {
        var endpoint = null;
        if (id == null) {
            endpoint = "api/security/getUsersBySubscriptionId/";
        }
        else {
            endpoint = "api/security/getUsersBySubscriptionId/" + id;
        }
        return this.http.get(endpoint);
    };
    SecurityService.prototype.getUsersBySubscriptionIdByRoleId = function (id) {
        var endpoint = "api/security/getUsersBySubscriptionIdByRoleId/" + id;
        return this.http.get(endpoint);
    };
    SecurityService.prototype.updateRoleUsers = function (users, roleId) {
        users.forEach(function (data) {
            data.roleId = roleId;
        });
        var endpoint = "api/security/updateRoleUsers";
        return this.http.post(endpoint, users);
    };
    SecurityService.prototype.deleteRoleUsers = function (id) {
        var endpoint = "api/security/deleteRoleUsers/" + id;
        return this.http.delete(endpoint);
    };
    SecurityService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], SecurityService);
    return SecurityService;
}());
exports.SecurityService = SecurityService;
//# sourceMappingURL=security.service.js.map