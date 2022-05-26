"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserComponent = void 0;
var core_1 = require("@angular/core");
var form_can_deactivate_1 = require("../../../../interceptors/form-can-deactivate");
var AddUserComponent = /** @class */ (function (_super) {
    __extends(AddUserComponent, _super);
    function AddUserComponent(securityService, messageService, breadcrumbService, location, router, translate) {
        var _this = _super.call(this) || this;
        _this.securityService = securityService;
        _this.messageService = messageService;
        _this.breadcrumbService = breadcrumbService;
        _this.location = location;
        _this.router = router;
        _this.translate = translate;
        _this.user = {
            emailAddress: null,
            fullName: null,
            trackingHoursMandatory: false,
            isActive: true,
            startDate: new Date(),
            timeScheduleStart: new Date(new Date(new Date().setHours(8)).setMinutes(0)),
            timeScheduleEnd: new Date(new Date(new Date().setHours(18)).setMinutes(0)),
            hasTutorialBeenShown: false
        };
        _this.isLoading = false;
        _this.days = [
            { id: 1, name: _this.translate.instant("MASTERDATA.OPERATIONALDAYS.MONDAY"), "checked": false },
            { id: 2, name: "MASTERDATA.OPERATIONALDAYS.TUESDAY", "checked": false },
            { id: 3, name: "MASTERDATA.OPERATIONALDAYS.WEDNESDAY", "checked": false },
            { id: 4, name: "MASTERDATA.OPERATIONALDAYS.THURSDAY", "checked": false },
            { id: 5, name: "MASTERDATA.OPERATIONALDAYS.FRIDAY", "checked": false },
            { id: 6, name: "MASTERDATA.OPERATIONALDAYS.SATURDAY", "checked": false },
            { id: 7, name: "MASTERDATA.OPERATIONALDAYS.SUNDAY", "checked": false }
        ];
        _this.daysSelected = [];
        _this.breadcrumbService.setItems([
            { label: _this.translate.instant("SECURITY.NAVTITLE") },
            { label: _this.translate.instant("SECURITY.MANAGEUSERS.NAVTITLE"), routerLink: "/security/users" },
            { label: _this.translate.instant("SECURITY.MANAGEUSERS.ADD.CREATE") }
        ]);
        return _this;
    }
    AddUserComponent.prototype.ngOnInit = function () {
    };
    AddUserComponent.prototype.createUser = function () {
        var _this = this;
        this.isLoading = true;
        this.securityService.createUser(this.user).subscribe(function () {
            _this.isLoading = false;
            _this.messageService.add({
                severity: "success",
                summary: _this.translate.instant("GENERAL.SUCCESS"),
                detail: _this.translate.instant("GENERAL.SAVESUCCESSFUL")
            });
            _this.form.form.markAsPristine();
            _this.router.navigate(["/security/users"]);
        }, function (err) {
            _this.messageService.add({
                severity: "error",
                summary: _this.translate.instant("GENERAL.GENERALERROR"),
                detail: err.error,
                life: 7000
            });
            _this.isLoading = false;
        });
    };
    AddUserComponent.prototype.goBack = function () {
        this.location.back();
    };
    __decorate([
        core_1.ViewChild("newUser")
    ], AddUserComponent.prototype, "form", void 0);
    AddUserComponent = __decorate([
        core_1.Component({
            selector: "app-add-user",
            templateUrl: "./add-user.component.html",
            styleUrls: ["./add-user.component.css"]
        })
    ], AddUserComponent);
    return AddUserComponent;
}(form_can_deactivate_1.FormCanDeactivate));
exports.AddUserComponent = AddUserComponent;
//# sourceMappingURL=add-user.component.js.map