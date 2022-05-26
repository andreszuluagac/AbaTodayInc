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
exports.EditUserComponent = void 0;
var core_1 = require("@angular/core");
var form_can_deactivate_1 = require("../../../../interceptors/form-can-deactivate");
var EditUserComponent = /** @class */ (function (_super) {
    __extends(EditUserComponent, _super);
    function EditUserComponent(securityService, messageService, activatedRoute, breadcrumbService, location, router, translate, datePipe) {
        var _this = _super.call(this) || this;
        _this.securityService = securityService;
        _this.messageService = messageService;
        _this.activatedRoute = activatedRoute;
        _this.breadcrumbService = breadcrumbService;
        _this.location = location;
        _this.router = router;
        _this.translate = translate;
        _this.datePipe = datePipe;
        _this.user = { emailAddress: null, fullName: null, startDate: null, trackingHoursMandatory: false, isActive: true, hasTutorialBeenShown: false };
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
        _this.day = [];
        _this.daysSelected = [];
        _this.breadcrumbService.setItems([
            { label: _this.translate.instant("SECURITY.NAVTITLE") },
            { label: _this.translate.instant("SECURITY.MANAGEUSERS.NAVTITLE"), routerLink: "/security/users" },
            { label: _this.translate.instant("SECURITY.MANAGEUSERS.EDIT.PAGETITLE") }
        ]);
        return _this;
    }
    EditUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.activatedRoute.params.subscribe(function (params) {
            _this.securityService.getUserById(params["id"]).subscribe(function (data) {
                _this.user = data;
                _this.user.startDate = _this.convertToLocalDate(_this.user.startDate);
                if (_this.user.timeScheduleStart) {
                    _this.user.timeScheduleStart = _this.convertToLocalDate(_this.user.timeScheduleStart);
                }
                if (_this.user.timeScheduleEnd) {
                    _this.user.timeScheduleEnd = _this.convertToLocalDate(_this.user.timeScheduleEnd);
                }
                if (_this.user.daysSchedule) {
                    _this.operationalDays = _this.user.daysSchedule.split(",");
                    for (var _i = 0, _a = _this.operationalDays; _i < _a.length; _i++) {
                        var val = _a[_i];
                        var number = Number(val) - 1;
                        _this.days[number].checked = true;
                    }
                }
                if (_this.user.timeScheduleStart && _this.user.timeScheduleEnd) {
                    var daysPerWeek = 0;
                    if (_this.operationalDays) {
                        daysPerWeek = _this.operationalDays.length;
                        var timeDiff = Math.abs(_this.user.timeScheduleEnd.getTime() - _this.user.timeScheduleStart.getTime());
                        _this.user.hoursPerWeek = Number((timeDiff / (1000 * 60 * 60) * daysPerWeek).toFixed(1));
                    }
                }
                _this.isLoading = false;
                _this.form.form.markAsPristine();
            }, function (err) {
                _this.messageService.add({
                    severity: "error",
                    summary: _this.translate.instant("GENERAL.DATAERROR"),
                    detail: err.error
                });
                _this.isLoading = false;
            });
        });
    };
    EditUserComponent.prototype.saveChanges = function () {
        var _this = this;
        this.isLoading = true;
        this.securityService.updateUser(this.user).subscribe(function () {
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
                summary: _this.translate.instant("GENERAL.DATAERROR"),
                detail: err.error,
                life: 7000
            });
            _this.isLoading = false;
        });
    };
    EditUserComponent.prototype.goBack = function () {
        this.location.back();
    };
    EditUserComponent.prototype.convertToLocalDate = function (date) {
        return new Date(this.datePipe.transform(date, "M/d/yy, h:mm a") + " UTC");
    };
    __decorate([
        core_1.ViewChild("editUser")
    ], EditUserComponent.prototype, "form", void 0);
    EditUserComponent = __decorate([
        core_1.Component({
            selector: "app-edit-user",
            templateUrl: "./edit-user.component.html",
            styleUrls: ["./edit-user.component.css"]
        })
    ], EditUserComponent);
    return EditUserComponent;
}(form_can_deactivate_1.FormCanDeactivate));
exports.EditUserComponent = EditUserComponent;
//# sourceMappingURL=edit-user.component.js.map