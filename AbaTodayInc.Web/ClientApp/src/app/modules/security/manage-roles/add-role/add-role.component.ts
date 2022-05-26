import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Location } from "@angular/common";
import { MessageService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { Role } from "../../../../models/role";
import { FormCanDeactivate } from "../../../../interceptors/form-can-deactivate";
import { SecurityService } from "../../../../services/security.service";
import { BreadcrumbService } from "../../../../services/mirage/breadcrumb.service";

@Component({
    selector: "app-add-role",
    templateUrl: "./add-role.component.html",
    styleUrls: ["./add-role.component.css"]
})
export class AddRoleComponent extends FormCanDeactivate implements OnInit {
    @ViewChild("newRole")
    form: NgForm;

    role: Role = { name: null, isActive: true };
    isLoading = false;

    constructor(
        private readonly securityService: SecurityService,
        private readonly messageService: MessageService,
        private readonly breadcrumbService: BreadcrumbService,
        private readonly location: Location,
        private readonly router: Router,
        private readonly translate: TranslateService) {
        super();
        this.breadcrumbService.setItems([
            { label: this.translate.instant("SECURITY.NAVTITLE") },
            { label: this.translate.instant("SECURITY.MANAGEROLES.NAVTITLE"), routerLink: "/security/roles" },
            { label: this.translate.instant("SECURITY.MANAGEROLES.ADD.CREATE") }
        ]);
    }

    ngOnInit(): void {
    }

    createRole() {
        this.isLoading = true;
        this.securityService.createRole(this.role).subscribe(() => {
            this.isLoading = false;
            this.messageService.add({
                severity: "success",
                summary: this.translate.instant("GENERAL.SUCCESS"),
                detail: this.translate.instant("GENERAL.SAVESUCCESSFUL")
            });
            this.form.form.markAsPristine();
            this.router.navigate(["/security/roles"]);
        }, (err: HttpErrorResponse) => {
            console.log(err);
            this.messageService.add({
                severity: "error",
                summary: this.translate.instant("GENERAL.GENERALERROR"),
                detail: err.error
            });
            this.isLoading = false;
        });
    }

    goBack() {
        this.location.back();
    }
}