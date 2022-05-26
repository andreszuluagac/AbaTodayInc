"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageUserRolesComponent = void 0;
var core_1 = require("@angular/core");
var ngx_guided_tour_1 = require("ngx-guided-tour");
var ManageUserRolesComponent = /** @class */ (function () {
    function ManageUserRolesComponent(rolesService, location, breadcrumbService, messageService, translate, guidedTourService) {
        this.rolesService = rolesService;
        this.location = location;
        this.breadcrumbService = breadcrumbService;
        this.messageService = messageService;
        this.translate = translate;
        this.guidedTourService = guidedTourService;
        this.isLoading = false;
        this.breadcrumbService.setItems([
            { label: this.translate.instant("SECURITY.NAVTITLE") },
            { label: this.translate.instant("SECURITY.MANAGEUSERSBYROL.NAVTITLE") }
        ]);
    }
    ManageUserRolesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.rolesService.getRolesInUsersBySubscriptionId().subscribe(function (data) {
            _this.roles = data
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
        this.tour = {
            tourId: 'tour',
            useOrb: false,
            steps: [
                {
                    title: this.translate.instant("TOURS.MANAGEUSERSROLE.STEP1.TITLE"),
                    content: this.translate.instant("TOURS.MANAGEUSERSROLE.STEP1.CONTENT")
                },
                {
                    title: this.translate.instant("TOURS.MANAGEUSERSROLE.STEP2.TITLE"),
                    selector: '#SelectRole',
                    content: this.translate.instant("TOURS.MANAGEUSERSROLE.STEP2.CONTENT"),
                    orientation: ngx_guided_tour_1.Orientation.Right
                },
                {
                    title: this.translate.instant("TOURS.MANAGEUSERSROLE.STEP3.TITLE"),
                    selector: '.ui-picklist-source-wrapper',
                    content: this.translate.instant("TOURS.MANAGEUSERSROLE.STEP3.CONTENT"),
                    orientation: ngx_guided_tour_1.Orientation.Right
                },
                {
                    title: this.translate.instant("TOURS.MANAGEUSERSROLE.STEP4.TITLE"),
                    selector: '.ui-picklist-buttons',
                    content: this.translate.instant("TOURS.MANAGEUSERSROLE.STEP4.CONTENT"),
                    orientation: ngx_guided_tour_1.Orientation.Left
                },
                {
                    title: this.translate.instant("TOURS.MANAGEUSERSROLE.STEP5.TITLE"),
                    selector: '.ui-picklist-target-wrapper',
                    content: this.translate.instant("TOURS.MANAGEUSERSROLE.STEP5.CONTENT"),
                    orientation: ngx_guided_tour_1.Orientation.Left
                },
                {
                    title: this.translate.instant("TOURS.MANAGEUSERSROLE.STEP6.TITLE"),
                    selector: '#SectionSave',
                    content: this.translate.instant("TOURS.MANAGEUSERSROLE.STEP6.CONTENT"),
                    orientation: ngx_guided_tour_1.Orientation.Top
                }
            ]
        };
    };
    ManageUserRolesComponent.prototype.showWizard = function () {
        this.guidedTourService.startTour(this.tour);
    };
    ManageUserRolesComponent.prototype.onChangeRole = function (event) {
        var _this = this;
        if (event.value) {
            this.rolesService.getUsersBySubscriptionId(event.value).subscribe(function (data) {
                _this.users = data;
                _this.rolesService.getUsersBySubscriptionIdByRoleId(event.value).subscribe(function (data) {
                    _this.usersRole = data;
                    _this.isLoading = false;
                }, function (err) {
                    _this.messageService.add({
                        severity: "error",
                        summary: _this.translate.instant("GENERAL.DATAERROR"),
                        detail: err.error
                    });
                    _this.isLoading = false;
                });
            }, function (err) {
                _this.messageService.add({
                    severity: "error",
                    summary: _this.translate.instant("GENERAL.DATAERROR"),
                    detail: err.error
                });
                _this.isLoading = false;
            });
        }
        else {
            this.usersRole = null;
            this.users = null;
        }
    };
    ManageUserRolesComponent.prototype.saveChanges = function () {
        var _this = this;
        this.isLoading = true;
        if (this.usersRole.length > 0) {
            this.rolesService.updateRoleUsers(this.usersRole, this.selectedRole).subscribe(function () {
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
            this.rolesService.deleteRoleUsers(this.selectedRole).subscribe(function () {
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
    ManageUserRolesComponent.prototype.goBack = function () {
        this.location.back();
    };
    ManageUserRolesComponent = __decorate([
        core_1.Component({
            selector: "app-manage-user-roles",
            templateUrl: "./manage-user-roles.component.html",
            styleUrls: ["./manage-user-roles.component.css"]
        })
    ], ManageUserRolesComponent);
    return ManageUserRolesComponent;
}());
exports.ManageUserRolesComponent = ManageUserRolesComponent;
//# sourceMappingURL=manage-user-roles.component.js.map