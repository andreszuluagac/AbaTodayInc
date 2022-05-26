import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Location } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/api";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { User } from "../../../../models/user";
import { SecurityService } from "../../../../services/security.service";
import { FormCanDeactivate } from "../../../../interceptors/form-can-deactivate";
import { BreadcrumbService } from "../../../../services/mirage/breadcrumb.service";

@Component({
    selector: "app-add-user",
    templateUrl: "./add-user.component.html",
    styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent extends FormCanDeactivate implements OnInit {
    @ViewChild("newUser")
    form: NgForm;

    user: User = {
        emailAddress: null,
        fullName: null,
        trackingHoursMandatory: false,
        isActive: true,
        startDate: new Date(),
        timeScheduleStart: new Date(new Date(new Date().setHours(8)).setMinutes(0)),
        timeScheduleEnd: new Date(new Date(new Date().setHours(18)).setMinutes(0)),
        hasTutorialBeenShown : false
    };
    isLoading = false;
    days = [
        { id: 1, name: this.translate.instant("MASTERDATA.OPERATIONALDAYS.MONDAY"), "checked": false },
        { id: 2, name: "MASTERDATA.OPERATIONALDAYS.TUESDAY", "checked": false },
        { id: 3, name: "MASTERDATA.OPERATIONALDAYS.WEDNESDAY", "checked": false },
        { id: 4, name: "MASTERDATA.OPERATIONALDAYS.THURSDAY", "checked": false },
        { id: 5, name: "MASTERDATA.OPERATIONALDAYS.FRIDAY", "checked": false },
        { id: 6, name: "MASTERDATA.OPERATIONALDAYS.SATURDAY", "checked": false },
        { id: 7, name: "MASTERDATA.OPERATIONALDAYS.SUNDAY", "checked": false }
    ];
    daysSelected = [];

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
            { label: this.translate.instant("SECURITY.MANAGEUSERS.NAVTITLE"), routerLink: "/security/users" },
            { label: this.translate.instant("SECURITY.MANAGEUSERS.ADD.CREATE") }
        ]);
    }

    ngOnInit(): void {
    }

    createUser() {
        this.isLoading = true;
        this.securityService.createUser(this.user).subscribe(() => {
            this.isLoading = false;
            this.messageService.add({
                severity: "success",
                summary: this.translate.instant("GENERAL.SUCCESS"),
                detail: this.translate.instant("GENERAL.SAVESUCCESSFUL")
            });
            this.form.form.markAsPristine();
            this.router.navigate(["/security/users"]);
        }, (err: HttpErrorResponse) => {
            this.messageService.add({
                severity: "error",
                summary: this.translate.instant("GENERAL.GENERALERROR"),
                detail: err.error,
                life: 7000
            });
            this.isLoading = false;
        });
    }

    goBack() {
        this.location.back();
    }
}
