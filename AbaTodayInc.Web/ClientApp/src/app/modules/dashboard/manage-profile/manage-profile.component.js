"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageProfileComponent = void 0;
var core_1 = require("@angular/core");
var manage_profile_details_component_1 = require("./manage-profile-details/manage-profile-details.component");
var ManageProfileComponent = /** @class */ (function () {
    function ManageProfileComponent(identityService, accountsService, 
    //private readonly fileUploadService: FileUploadService,
    //private readonly masterDataService: MasterDataService,
    messageService, location, dialogService, rolesService, breadcrumbService, translate) {
        this.identityService = identityService;
        this.accountsService = accountsService;
        this.messageService = messageService;
        this.location = location;
        this.dialogService = dialogService;
        this.rolesService = rolesService;
        this.breadcrumbService = breadcrumbService;
        this.translate = translate;
        this.isLoading = false;
        this.manageProfileDetailsComponent = manage_profile_details_component_1.ManageProfileDetailsComponent;
        this.profile = {
            email: null, fullName: null,
        };
        this.errors = [];
        this.breadcrumbService.setItems([
            { label: this.translate.instant("GENERAL.DASHBOARD"), routerLink: "/dashboard" },
            { label: this.translate.instant("ACCOUNT.MANAGEPROFILE.PAGETITLE") }
        ]);
    }
    ManageProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.accountsService.getProfileByEmail().subscribe(function (data) {
            _this.profile = data;
            _this.isLoading = false;
        }, function (err) {
            _this.messageService.add({
                severity: "error",
                summary: _this.translate.instant("GENERAL.DATAERROR"),
                detail: err.error
            });
            console.error(err);
            _this.isLoading = false;
        });
    };
    ManageProfileComponent.prototype.updateManageProfile = function (files) {
        var _this = this;
        this.isLoading = true;
        this.errors = [];
        if (files.length === 0) {
            this.accountsService.saveProfile(this.profile).subscribe(function () {
                _this.isLoading = false;
                _this.messageService.add({
                    severity: "success",
                    summary: _this.translate.instant("GENERAL.SUCCESS"),
                    detail: _this.translate.instant("GENERAL.SAVESUCCESSFUL"),
                    life: 5000
                });
            }, function (err) {
                err.error.split(",").forEach(function (a) {
                    _this.errors.push("ACCOUNT." + a.toUpperCase());
                });
                console.error(err);
                _this.isLoading = false;
            });
            return;
        }
        //const fileToUpload = <File>files[0];
        //const formData = new FormData();
        //formData.append("file", fileToUpload, fileToUpload.name);
        //this.fileUploadService.postPhotoProfile(formData).subscribe((data) => {
        //    const extn = fileToUpload.name.split(".").pop();
        //    const fileName = data + "." + extn;
        //    this.profile.image = `uploads/profiles/${fileName}`;
        //    this.profile.userId = data;
        //    this.accountsService.saveProfile(this.profile).subscribe(() => {
        //        this.isLoading = false;
        //        this.messageService.add({
        //            severity: "success",
        //            summary: this.translate.instant("GENERAL.SUCCESS"),
        //            detail: this.translate.instant("GENERAL.SAVESUCCESSFUL"),
        //            life: 5000
        //        });
        //        this.rolesService.serviceData.emit();
        //    }, (err: HttpErrorResponse) => {
        //        err.error.split(",").forEach(a => {
        //            this.errors.push(`ACCOUNT.${a.toUpperCase()}`);
        //        });
        //        console.error(err);
        //        this.isLoading = false;
        //    });
        //}), (err: HttpErrorResponse) => {
        //    this.messageService.add({
        //        severity: "error",
        //        summary: this.translate.instant("GENERAL.GENERALERROR"),
        //        detail: err.error
        //    });
        //    console.error(err);
        //    this.isLoading = false;
        //};
    };
    ManageProfileComponent.prototype.updateFile = function (file) {
        this.fileName = file;
    };
    ManageProfileComponent.prototype.changePassword = function () {
        if (!this.profile.password || this.profile.password === "") {
            this.profile.password = null;
            this.profile.newPassword = null;
            this.profile.confirmPassword = null;
        }
    };
    ManageProfileComponent.prototype.viewDetails = function (roleName) {
        var _this = this;
        this.rolesService.getActionsByRoleName(roleName).subscribe(function (data) {
            if (data.length > 0) {
                _this.dialogService.open(_this.manageProfileDetailsComponent, {
                    data: {
                        entity: roleName
                    },
                    header: roleName,
                    width: "70%"
                });
            }
            else {
                _this.messageService.add({
                    severity: "info",
                    summary: _this.translate.instant("GENERAL.NODATA"),
                    detail: _this.translate.instant("ACCOUNT.MANAGEPROFILE.FIELDS.NOACTIONS"),
                    life: 5000
                });
            }
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
    ManageProfileComponent.prototype.goBack = function () {
        this.location.back();
    };
    __decorate([
        core_1.Input()
    ], ManageProfileComponent.prototype, "form", void 0);
    ManageProfileComponent = __decorate([
        core_1.Component({
            selector: "app-manage-profile",
            templateUrl: "./manage-profile.component.html",
            styleUrls: ["./manage-profile.component.css"]
        })
    ], ManageProfileComponent);
    return ManageProfileComponent;
}());
exports.ManageProfileComponent = ManageProfileComponent;
//# sourceMappingURL=manage-profile.component.js.map