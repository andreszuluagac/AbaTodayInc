"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageRoleActionsComponent = void 0;
var core_1 = require("@angular/core");
var ManageRoleActionsComponent = /** @class */ (function () {
    function ManageRoleActionsComponent(rolesService, location, breadcrumbService, messageService, translate) {
        this.rolesService = rolesService;
        this.location = location;
        this.breadcrumbService = breadcrumbService;
        this.messageService = messageService;
        this.translate = translate;
        this.isLoading = false;
        this.breadcrumbService.setItems([
            { label: this.translate.instant("SECURITY.NAVTITLE") },
            { label: this.translate.instant("SECURITY.MANAGEROLESACTIONS.NAVTITLE") }
        ]);
    }
    ManageRoleActionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.rolesService.getModules().subscribe(function (data) {
            _this.modules = data
                .map(function (a) {
                return {
                    label: _this.translate.instant(a.moduleName),
                    value: a.moduleName,
                };
            });
            _this.isLoading = false;
        }, function (err) {
            _this.messageService.add({
                severity: "error",
                summary: _this.translate.instant("GENERAL.DATAERROR"),
                detail: err.error
            });
            _this.isLoading = false;
        });
        this.rolesService.getRolesBySubscriptionId().subscribe(function (dataRoles) {
            _this.roles = dataRoles
                .map(function (a) {
                return {
                    label: _this.translate.instant(a.name),
                    value: a.id,
                };
            });
            _this.isLoading = false;
        }, function (err) {
            _this.messageService.add({
                severity: "error",
                summary: _this.translate.instant("GENERAL.DATAERROR"),
                detail: err.error
            });
            _this.isLoading = false;
        });
    };
    ManageRoleActionsComponent.prototype.onChangeRole = function (event) {
        var _this = this;
        this.actionsRole = null;
        this.actions = null;
        if (event.value && this.selectedModule) {
            this.rolesService.getActionsByRole(this.selectedModule, event.value).subscribe(function (actions) {
                _this.actionsRole = actions;
                _this.rolesService.getActionsByModuleName(_this.selectedModule, event.value).subscribe(function (data) {
                    _this.actions = data;
                }, function (err) {
                    _this.messageService.add({
                        severity: "error",
                        summary: _this.translate.instant("GENERAL.DATAERROR"),
                        detail: err.error
                    });
                    _this.isLoading = false;
                });
                _this.isLoading = false;
            }, function (err) {
                _this.messageService.add({
                    severity: "error",
                    summary: _this.translate.instant("GENERAL.DATAERROR"),
                    detail: err.error
                });
                _this.isLoading = false;
            });
        }
    };
    ManageRoleActionsComponent.prototype.onChangeModule = function (event) {
        var _this = this;
        this.actionsRole = null;
        this.actions = null;
        if (this.selectedRole && event.value) {
            this.rolesService.getActionsByRole(event.value, this.selectedRole).subscribe(function (actions) {
                _this.actionsRole = actions;
                _this.rolesService.getActionsByModuleName(event.value, _this.selectedRole).subscribe(function (data) {
                    _this.actions = data;
                }, function (err) {
                    _this.messageService.add({
                        severity: "error",
                        summary: _this.translate.instant("GENERAL.DATAERROR"),
                        detail: err.error
                    });
                    _this.isLoading = false;
                });
                _this.isLoading = false;
            }, function (err) {
                _this.messageService.add({
                    severity: "error",
                    summary: _this.translate.instant("GENERAL.DATAERROR"),
                    detail: err.error
                });
                _this.isLoading = false;
            });
        }
    };
    ManageRoleActionsComponent.prototype.saveChanges = function () {
        var _this = this;
        this.isLoading = true;
        if (this.actionsRole.length > 0) {
            this.rolesService.updateRoleActions(this.actionsRole, this.selectedRole, this.selectedModule).subscribe(function () {
                _this.isLoading = false;
            }, function (err) {
                _this.messageService.add({
                    severity: "error",
                    summary: _this.translate.instant("GENERAL.GENERALERROR"),
                    detail: err.error
                });
                console.error(err);
                _this.isLoading = false;
            });
            this.messageService.add({
                severity: "success",
                summary: this.translate.instant("GENERAL.SUCCESS"),
                detail: this.translate.instant("GENERAL.SAVESUCCESSFUL"),
                life: 5000
            });
        }
        else {
            this.rolesService.deleteRoleActions(this.selectedRole).subscribe(function () {
                _this.isLoading = false;
                _this.messageService.add({
                    severity: "success",
                    summary: _this.translate.instant("GENERAL.SUCCESS"),
                    detail: _this.translate.instant("GENERAL.SAVESUCCESSFUL"),
                    life: 5000
                });
            }, function (err) {
                _this.messageService.add({
                    severity: "error",
                    summary: _this.translate.instant("GENERAL.GENERALERROR"),
                    detail: err.error
                });
                console.error(err);
                _this.isLoading = false;
            });
        }
    };
    ManageRoleActionsComponent.prototype.goBack = function () {
        this.location.back();
    };
    ManageRoleActionsComponent = __decorate([
        core_1.Component({
            selector: "app-manage-role-actions",
            templateUrl: "./manage-role-actions.component.html",
            styleUrls: ["./manage-role-actions.component.css"]
        })
    ], ManageRoleActionsComponent);
    return ManageRoleActionsComponent;
}());
exports.ManageRoleActionsComponent = ManageRoleActionsComponent;
//# sourceMappingURL=manage-role-actions.component.js.map