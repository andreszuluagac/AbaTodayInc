import { Component, OnInit, Input, Type } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { NgForm } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { IdentityService } from "../../../services/identity.service";
import { MessageService, SelectItem } from "primeng/api";
import { Location } from "@angular/common";

import { TranslateService } from "@ngx-translate/core";
import { AccountsService } from "../../../services/accounts.service";
import { FileUploadService } from "../../../services/file-upload.service";
import { ManageProfile } from "../../../models/manage-profile";
import { SecurityService } from "../../../services/security.service";
import { ManageProfileDetailsComponent } from "./manage-profile-details/manage-profile-details.component";
import { BreadcrumbService } from "../../../services/mirage/breadcrumb.service";
import { MasterDataService } from "../../../services/master-data.service";

@Component({
    selector: "app-manage-profile",
    templateUrl: "./manage-profile.component.html",
    styleUrls: ["./manage-profile.component.css"]
})
export class ManageProfileComponent implements OnInit {
    @Input()
    form: NgForm;

    isLoading = false;
    manageProfileDetailsComponent: Type<any> = ManageProfileDetailsComponent;

    profile: ManageProfile = {
        email: null, fullName: null,
    };
    fileName: string;
    errors: string[] = [];
    codeList: SelectItem[];

    constructor(
        public identityService: IdentityService,
        private readonly accountsService: AccountsService,
        //private readonly fileUploadService: FileUploadService,
        //private readonly masterDataService: MasterDataService,
        private readonly messageService: MessageService,
        private readonly location: Location,
        private readonly dialogService: DialogService,
        private readonly rolesService: SecurityService,
        private readonly breadcrumbService: BreadcrumbService,
        private readonly translate: TranslateService) {
        this.breadcrumbService.setItems([
            { label: this.translate.instant("GENERAL.DASHBOARD"), routerLink: "/dashboard" },
            { label: this.translate.instant("ACCOUNT.MANAGEPROFILE.PAGETITLE") }
        ]);
    }


    ngOnInit(): void {
        this.isLoading = true;
        this.accountsService.getProfileByEmail().subscribe((data) => {
            this.profile = data;
            this.isLoading = false;
        }, (err: HttpErrorResponse) => {
            this.messageService.add({
                severity: "error",
                summary: this.translate.instant("GENERAL.DATAERROR"),
                detail: err.error
            });
            console.error(err);
            this.isLoading = false;
        });
    }

    updateManageProfile(files: any) {
        this.isLoading = true;
        this.errors = [];
        if (files.length === 0) {
            this.accountsService.saveProfile(this.profile).subscribe(() => {
                this.isLoading = false;
                this.messageService.add({
                    severity: "success",
                    summary: this.translate.instant("GENERAL.SUCCESS"),
                    detail: this.translate.instant("GENERAL.SAVESUCCESSFUL"),
                    life: 5000
                });

            }, (err: HttpErrorResponse) => {
                err.error.split(",").forEach(a => {
                    this.errors.push(`ACCOUNT.${a.toUpperCase()}`);
                });
                console.error(err);
                this.isLoading = false;
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
    }

    updateFile(file: string) {
        this.fileName = file;
    }

    changePassword() {
        if (!this.profile.password || this.profile.password === "") {
            this.profile.password = null;
            this.profile.newPassword = null;
            this.profile.confirmPassword = null;
        }
    }

    viewDetails(roleName: string) {
        this.rolesService.getActionsByRoleName(roleName).subscribe((data) => {
            if (data.length > 0) {
                this.dialogService.open(this.manageProfileDetailsComponent, {
                    data: {
                        entity: roleName
                    },
                    header: roleName,
                    width: "70%"
                });
            }
            else {
                this.messageService.add({
                    severity: "info",
                    summary: this.translate.instant("GENERAL.NODATA"),
                    detail: this.translate.instant("ACCOUNT.MANAGEPROFILE.FIELDS.NOACTIONS"),
                    life: 5000
                });
            }
            this.isLoading = false;
        }, (err: HttpErrorResponse) => {
            this.messageService.add({
                severity: "error",
                summary: this.translate.instant("GENERAL.DATAERROR"),
                detail: err.error
            });
            this.isLoading = false;
        });
    }


    goBack() {
        this.location.back();
    }
}
