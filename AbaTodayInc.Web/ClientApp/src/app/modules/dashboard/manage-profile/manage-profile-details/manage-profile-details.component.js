"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageProfileDetailsComponent = void 0;
var core_1 = require("@angular/core");
var ManageProfileDetailsComponent = /** @class */ (function () {
    function ManageProfileDetailsComponent(config, rolesService, messageService, translate) {
        this.config = config;
        this.rolesService = rolesService;
        this.messageService = messageService;
        this.translate = translate;
    }
    ManageProfileDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedRole = this.config.data.entity;
        if (this.selectedRole) {
            this.rolesService.getActionsByRoleName(this.selectedRole).subscribe(function (data) {
                _this.actionsRole = data;
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
    ManageProfileDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-manage-profile-details',
            templateUrl: './manage-profile-details.component.html',
            styleUrls: ['./manage-profile-details.component.css']
        })
    ], ManageProfileDetailsComponent);
    return ManageProfileDetailsComponent;
}());
exports.ManageProfileDetailsComponent = ManageProfileDetailsComponent;
//# sourceMappingURL=manage-profile-details.component.js.map