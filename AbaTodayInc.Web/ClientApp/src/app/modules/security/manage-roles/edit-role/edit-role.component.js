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
exports.EditRoleComponent = void 0;
var core_1 = require("@angular/core");
var form_can_deactivate_1 = require("../../../../interceptors/form-can-deactivate");
var EditRoleComponent = /** @class */ (function (_super) {
    __extends(EditRoleComponent, _super);
    function EditRoleComponent(securityService, messageService, activatedRoute, breadcrumbService, location, router, translate) {
        var _this = _super.call(this) || this;
        _this.securityService = securityService;
        _this.messageService = messageService;
        _this.activatedRoute = activatedRoute;
        _this.breadcrumbService = breadcrumbService;
        _this.location = location;
        _this.router = router;
        _this.translate = translate;
        _this.role = { name: null, isActive: true };
        _this.isLoading = false;
        _this.breadcrumbService.setItems([
            { label: _this.translate.instant("SECURITY.NAVTITLE") },
            { label: _this.translate.instant("SECURITY.MANAGEROLES.NAVTITLE"), routerLink: "/security/roles" },
            { label: _this.translate.instant("SECURITY.MANAGEROLES.EDIT.PAGETITLE") }
        ]);
        return _this;
    }
    EditRoleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.activatedRoute.params.subscribe(function (params) {
            _this.securityService.getRoleById(params["id"]).subscribe(function (data) {
                _this.role = data;
                _this.form.form.markAsPristine();
                _this.isLoading = false;
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
    EditRoleComponent.prototype.saveChanges = function () {
        var _this = this;
        this.isLoading = true;
        this.securityService.updateRole(this.role).subscribe(function () {
            _this.isLoading = false;
            _this.messageService.add({
                severity: "success",
                summary: _this.translate.instant("GENERAL.SUCCESS"),
                detail: _this.translate.instant("GENERAL.SAVESUCCESSFUL")
            });
            _this.form.form.markAsPristine();
            _this.router.navigate(["/security/roles"]);
        }, function (err) {
            _this.messageService.add({
                severity: "error",
                summary: _this.translate.instant("GENERAL.DATAERROR"),
                detail: err.error
            });
            _this.isLoading = false;
        });
    };
    EditRoleComponent.prototype.goBack = function () {
        this.location.back();
    };
    __decorate([
        core_1.ViewChild("editRole")
    ], EditRoleComponent.prototype, "form", void 0);
    EditRoleComponent = __decorate([
        core_1.Component({
            selector: "app-edit-role",
            templateUrl: "./edit-role.component.html",
            styleUrls: ["./edit-role.component.css"]
        })
    ], EditRoleComponent);
    return EditRoleComponent;
}(form_can_deactivate_1.FormCanDeactivate));
exports.EditRoleComponent = EditRoleComponent;
//# sourceMappingURL=edit-role.component.js.map