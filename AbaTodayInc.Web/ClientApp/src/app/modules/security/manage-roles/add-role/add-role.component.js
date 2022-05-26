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
exports.AddRoleComponent = void 0;
var core_1 = require("@angular/core");
var form_can_deactivate_1 = require("../../../../interceptors/form-can-deactivate");
var AddRoleComponent = /** @class */ (function (_super) {
    __extends(AddRoleComponent, _super);
    function AddRoleComponent(securityService, messageService, breadcrumbService, location, router, translate) {
        var _this = _super.call(this) || this;
        _this.securityService = securityService;
        _this.messageService = messageService;
        _this.breadcrumbService = breadcrumbService;
        _this.location = location;
        _this.router = router;
        _this.translate = translate;
        _this.role = { name: null, isActive: true };
        _this.isLoading = false;
        _this.breadcrumbService.setItems([
            { label: _this.translate.instant("SECURITY.NAVTITLE") },
            { label: _this.translate.instant("SECURITY.MANAGEROLES.NAVTITLE"), routerLink: "/security/roles" },
            { label: _this.translate.instant("SECURITY.MANAGEROLES.ADD.CREATE") }
        ]);
        return _this;
    }
    AddRoleComponent.prototype.ngOnInit = function () {
    };
    AddRoleComponent.prototype.createRole = function () {
        var _this = this;
        this.isLoading = true;
        this.securityService.createRole(this.role).subscribe(function () {
            _this.isLoading = false;
            _this.messageService.add({
                severity: "success",
                summary: _this.translate.instant("GENERAL.SUCCESS"),
                detail: _this.translate.instant("GENERAL.SAVESUCCESSFUL")
            });
            _this.form.form.markAsPristine();
            _this.router.navigate(["/security/roles"]);
        }, function (err) {
            console.log(err);
            _this.messageService.add({
                severity: "error",
                summary: _this.translate.instant("GENERAL.GENERALERROR"),
                detail: err.error
            });
            _this.isLoading = false;
        });
    };
    AddRoleComponent.prototype.goBack = function () {
        this.location.back();
    };
    __decorate([
        core_1.ViewChild("newRole")
    ], AddRoleComponent.prototype, "form", void 0);
    AddRoleComponent = __decorate([
        core_1.Component({
            selector: "app-add-role",
            templateUrl: "./add-role.component.html",
            styleUrls: ["./add-role.component.css"]
        })
    ], AddRoleComponent);
    return AddRoleComponent;
}(form_can_deactivate_1.FormCanDeactivate));
exports.AddRoleComponent = AddRoleComponent;
//# sourceMappingURL=add-role.component.js.map