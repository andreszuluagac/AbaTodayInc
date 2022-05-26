"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var UserFormComponent = /** @class */ (function () {
    function UserFormComponent(securityService, messageService, 
    //private readonly masterDataService: MasterDataService,
    translate, guidedTourService) {
        this.securityService = securityService;
        this.messageService = messageService;
        this.translate = translate;
        this.guidedTourService = guidedTourService;
        this.days = [];
        this.daysSelected = [];
        this.laborTypesDone = false;
        this.usersDone = false;
        this.areDateRangesValid = true;
        this.codeListDone = false;
    }
    UserFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.securityService.getUsersBySubscriptionId(null).subscribe(function (data) {
            _this.users = data.filter(function (a) { return a.emailAddress != _this.user.emailAddress; }).map(function (a) {
                return {
                    label: a.fullName,
                    value: a.emailAddress,
                };
            });
            _this.isLoading = false;
            _this.usersDone = true;
            _this.setIsLoading();
        }, function (err) {
            _this.messageService.add({
                severity: "error",
                summary: _this.translate.instant("GENERAL.DATAERROR"),
                detail: err.error
            });
            console.error(err);
            _this.setIsLoading();
        });
    };
    UserFormComponent.prototype.onChangeDays = function () {
        this.daysSelected = [];
        for (var u = 0; u < this.days.length; u++) {
            if (this.days[u].checked) {
                this.daysSelected.push(this.days[u].id);
            }
        }
        this.user.daysSchedule = this.daysSelected.join(",");
        this.validateDates();
    };
    UserFormComponent.prototype.setIsLoading = function () {
        this.isLoading = !(this.laborTypesDone &&
            this.usersDone &&
            this.codeListDone);
        if (!this.isLoading) {
            this.form.form.markAsPristine();
        }
    };
    UserFormComponent.prototype.validateDates = function () {
        var _a, _b;
        this.areDateRangesValid = true;
        if (this.user.timeScheduleStart && this.user.timeScheduleEnd) {
            if (this.user.timeScheduleEnd < this.user.timeScheduleStart) {
                this.areDateRangesValid = false;
                this.user.timeScheduleEnd = null;
            }
            else {
                var daysPerWeek = this.daysSelected.length;
                this.user.timeScheduleStart = new Date((_a = this.user.timeScheduleStart) === null || _a === void 0 ? void 0 : _a.toString());
                this.user.timeScheduleEnd = new Date((_b = this.user.timeScheduleEnd) === null || _b === void 0 ? void 0 : _b.toString());
                var timeDiff = Math.abs(this.user.timeScheduleEnd.getTime() - this.user.timeScheduleStart.getTime());
                this.user.hoursPerWeek = Number((timeDiff / (1000 * 60 * 60) * daysPerWeek).toFixed(1));
            }
        }
    };
    __decorate([
        core_1.Input()
    ], UserFormComponent.prototype, "user", void 0);
    __decorate([
        core_1.Input()
    ], UserFormComponent.prototype, "pageTitle", void 0);
    __decorate([
        core_1.Input()
    ], UserFormComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input()
    ], UserFormComponent.prototype, "editMode", void 0);
    __decorate([
        core_1.Input()
    ], UserFormComponent.prototype, "isLoading", void 0);
    __decorate([
        core_1.Input()
    ], UserFormComponent.prototype, "days", void 0);
    UserFormComponent = __decorate([
        core_1.Component({
            selector: "app-user-form",
            templateUrl: "./user-form.component.html",
            styleUrls: ["./user-form.component.css"],
            viewProviders: [{ provide: forms_1.ControlContainer, useExisting: forms_1.NgForm }]
        })
    ], UserFormComponent);
    return UserFormComponent;
}());
exports.UserFormComponent = UserFormComponent;
//# sourceMappingURL=user-form.component.js.map