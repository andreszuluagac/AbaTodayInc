import { Component, OnInit } from "@angular/core";
import { MessageService, SelectItem } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Location } from "@angular/common";
import { Action } from "../../../models/action";
import { SecurityService } from "../../../services/security.service";
import { BreadcrumbService } from "../../../services/mirage/breadcrumb.service";

@Component({
    selector: "app-manage-role-actions",
    templateUrl: "./manage-role-actions.component.html",
    styleUrls: ["./manage-role-actions.component.css"]
})
export class ManageRoleActionsComponent implements OnInit {
    //roles: Role[];
    roles: SelectItem[];
    //modules: Action[];
    modules: SelectItem[];
    actions: Action[];
    actionsRole: Action[];
    selectedRole: string;
    selectedModule: string;
    isLoading = false;

    constructor(
        private readonly rolesService: SecurityService,
        private readonly location: Location,
        private readonly breadcrumbService: BreadcrumbService,
        private readonly messageService: MessageService,
        private readonly translate: TranslateService) {
        this.breadcrumbService.setItems([
            { label: this.translate.instant("SECURITY.NAVTITLE") },
            { label: this.translate.instant("SECURITY.MANAGEROLESACTIONS.NAVTITLE") }
        ]);
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.rolesService.getModules().subscribe((data) => {
            this.modules = data
                .map((a) => {
                    return {
                        label: this.translate.instant(a.moduleName),
                        value: a.moduleName,
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

        this.rolesService.getRolesBySubscriptionId().subscribe((dataRoles) => {
            this.roles = dataRoles
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
        this.actionsRole = null;
        this.actions = null;
        if (event.value && this.selectedModule) {
            this.rolesService.getActionsByRole(this.selectedModule, event.value).subscribe((actions) => {
                this.actionsRole = actions;
                this.rolesService.getActionsByModuleName(this.selectedModule, event.value).subscribe((data) => {
                    this.actions = data;
                }, (err: HttpErrorResponse) => {
                    this.messageService.add({
                        severity: "error",
                        summary: this.translate.instant("GENERAL.DATAERROR"),
                        detail: err.error
                    });
                    this.isLoading = false;
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
    }

    onChangeModule(event: any) {
        this.actionsRole = null;
        this.actions = null;
        if (this.selectedRole && event.value) {
            this.rolesService.getActionsByRole(event.value, this.selectedRole).subscribe((actions) => {
                this.actionsRole = actions;
                this.rolesService.getActionsByModuleName(event.value, this.selectedRole).subscribe((data) => {
                    this.actions = data;
                }, (err: HttpErrorResponse) => {
                    this.messageService.add({
                        severity: "error",
                        summary: this.translate.instant("GENERAL.DATAERROR"),
                        detail: err.error
                    });
                    this.isLoading = false;
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
    }

    saveChanges() {
        this.isLoading = true;
        if (this.actionsRole.length > 0) {
            this.rolesService.updateRoleActions(this.actionsRole, this.selectedRole, this.selectedModule).subscribe(() => {
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
            this.rolesService.deleteRoleActions(this.selectedRole).subscribe(() => {
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
