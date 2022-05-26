import { Component, OnInit } from "@angular/core";
import { MessageService, SelectItem } from "primeng/api";
import { HttpErrorResponse } from "@angular/common/http";
import { Location } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { GuidedTourService, GuidedTour, Orientation } from 'ngx-guided-tour';

import { User } from "../../../models/user";
import { SecurityService } from "../../../services/security.service";
import { BreadcrumbService } from "../../../services/mirage/breadcrumb.service";

@Component({
    selector: "app-manage-user-roles",
    templateUrl: "./manage-user-roles.component.html",
    styleUrls: ["./manage-user-roles.component.css"]
})
export class ManageUserRolesComponent implements OnInit {
    roles: SelectItem[];
    users: User[];
    usersRole: User[];
    selectedRole: string;
    isLoading = false;

    constructor(
        private readonly rolesService: SecurityService,
        private readonly location: Location,
        private readonly breadcrumbService: BreadcrumbService,
        private readonly messageService: MessageService,
        private readonly translate: TranslateService) {
        this.breadcrumbService.setItems([
            { label: this.translate.instant("SECURITY.NAVTITLE") },
            { label: this.translate.instant("SECURITY.MANAGEUSERSBYROL.NAVTITLE") }
        ]);
    }

    ngOnInit(): void {
        this.isLoading = true;

        this.rolesService.getRolesInUsersBySubscriptionId().subscribe((data) => {
            this.roles = data
                .map((a) => {
                    return {
                        label: this.translate.instant(a.name),
                        value: a.id,
                    }
                });
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

    onChangeRole(event: any) {
        if (event.value) {
            this.rolesService.getUsersBySubscriptionId(event.value).subscribe((data) => {
                this.users = data;
                this.rolesService.getUsersBySubscriptionIdByRoleId(event.value).subscribe((data) => {
                    this.usersRole = data;
                    this.isLoading = false;
                }, (err: HttpErrorResponse) => {
                    this.messageService.add({
                        severity: "error",
                        summary: this.translate.instant("GENERAL.DATAERROR"),
                        detail: err.error
                    });
                    this.isLoading = false;
                });
            }, (err: HttpErrorResponse) => {
                this.messageService.add({
                    severity: "error",
                    summary: this.translate.instant("GENERAL.DATAERROR"),
                    detail: err.error
                });
                this.isLoading = false;
            });
        }
        else {
            this.usersRole = null;
            this.users = null;
        }
    }

    saveChanges() {
        this.isLoading = true;
        if (this.usersRole.length > 0) {
            this.rolesService.updateRoleUsers(this.usersRole, this.selectedRole).subscribe(() => {
                this.isLoading = false;
            }, (err: HttpErrorResponse) => {
                this.messageService.add({
                    severity: "error",
                    summary: this.translate.instant("GENERAL.GENERALERROR"),
                    detail: err.error
                });
                console.error(err);
                this.isLoading = false;
            });
            this.messageService.add({
                severity: "success",
                summary: this.translate.instant("GENERAL.SUCCESS"),
                detail: this.translate.instant("GENERAL.SAVESUCCESSFUL"),
                life: 5000
            });
        }
        else {
            this.rolesService.deleteRoleUsers(this.selectedRole).subscribe(() => {
                this.isLoading = false;
                this.messageService.add({
                    severity: "success",
                    summary: this.translate.instant("GENERAL.SUCCESS"),
                    detail: this.translate.instant("GENERAL.SAVESUCCESSFUL"),
                    life: 5000
                });
            }, (err: HttpErrorResponse) => {
                this.messageService.add({
                    severity: "error",
                    summary: this.translate.instant("GENERAL.GENERALERROR"),
                    detail: err.error
                });
                console.error(err);
                this.isLoading = false;
            });
        }
    }

    goBack() {
        this.location.back();
    }

}
