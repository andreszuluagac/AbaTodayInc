import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Location } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";

import { User } from "../../../../models/user";
import { SecurityService } from "../../../../services/security.service";
import { FormCanDeactivate } from "../../../../interceptors/form-can-deactivate";
import { BreadcrumbService } from "../../../../services/mirage/breadcrumb.service";

@Component({
    selector: "app-edit-user",
    templateUrl: "./edit-user.component.html",
    styleUrls: ["./edit-user.component.css"]
})
export class EditUserComponent extends FormCanDeactivate implements OnInit {
    @ViewChild("editUser")
    form: NgForm;

    user: User = { emailAddress: null, fullName: null, startDate: null, trackingHoursMandatory: false, isActive: true, hasTutorialBeenShown: false };
    isLoading = false;
    operationalDays: string[];
    days = [
        { id: 1, name: this.translate.instant("MASTERDATA.OPERATIONALDAYS.MONDAY"), "checked": false },
        { id: 2, name: "MASTERDATA.OPERATIONALDAYS.TUESDAY", "checked": false },
        { id: 3, name: "MASTERDATA.OPERATIONALDAYS.WEDNESDAY", "checked": false },
        { id: 4, name: "MASTERDATA.OPERATIONALDAYS.THURSDAY", "checked": false },
        { id: 5, name: "MASTERDATA.OPERATIONALDAYS.FRIDAY", "checked": false },
        { id: 6, name: "MASTERDATA.OPERATIONALDAYS.SATURDAY", "checked": false },
        { id: 7, name: "MASTERDATA.OPERATIONALDAYS.SUNDAY", "checked": false }
    ];
    day = [];
    daysSelected = [];

    constructor(
        private readonly securityService: SecurityService,
        private readonly messageService: MessageService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly breadcrumbService: BreadcrumbService,
        private readonly location: Location,
        private readonly router: Router,
        private readonly translate: TranslateService,
        private readonly datePipe: DatePipe) {
        super();
        this.breadcrumbService.setItems([
            { label: this.translate.instant("SECURITY.NAVTITLE") },
            { label: this.translate.instant("SECURITY.MANAGEUSERS.NAVTITLE"), routerLink: "/security/users" },
            { label: this.translate.instant("SECURITY.MANAGEUSERS.EDIT.PAGETITLE") }
        ]);
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.activatedRoute.params.subscribe(params => {
            this.securityService.getUserById(params["id"]).subscribe((data) => {
                this.user = data;
                this.user.startDate = this.convertToLocalDate(this.user.startDate);
                if (this.user.timeScheduleStart) {
                    this.user.timeScheduleStart = this.convertToLocalDate(this.user.timeScheduleStart);
                }
                if (this.user.timeScheduleEnd) {
                    this.user.timeScheduleEnd = this.convertToLocalDate(this.user.timeScheduleEnd);
                }
                if (this.user.daysSchedule) {
                    this.operationalDays = this.user.daysSchedule.split(",");
                    for (const val of this.operationalDays) {
                        const number = Number(val) - 1;
                        this.days[number].checked = true;
                    }
                }
                if (this.user.timeScheduleStart && this.user.timeScheduleEnd) {
                    let daysPerWeek = 0;
                    if (this.operationalDays) {
                        daysPerWeek = this.operationalDays.length;
                        const timeDiff = Math.abs(this.user.timeScheduleEnd.getTime() - this.user.timeScheduleStart.getTime());
                        this.user.hoursPerWeek = Number((timeDiff / (1000 * 60 * 60) * daysPerWeek).toFixed(1));
                    }
                }
                this.isLoading = false;
                this.form.form.markAsPristine();
            },
                (err: HttpErrorResponse) => {
                    this.messageService.add({
                        severity: "error",
                        summary: this.translate.instant("GENERAL.DATAERROR"),
                        detail: err.error
                    });
                    this.isLoading = false;
                });
        });
    }

    saveChanges() {
        this.isLoading = true;
        this.securityService.updateUser(this.user).subscribe(() => {
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
                summary: this.translate.instant("GENERAL.DATAERROR"),
                detail: err.error,
                life: 7000
            });

            this.isLoading = false;
        });
    }

    goBack() {
        this.location.back();
    }

    private convertToLocalDate(date: Date): Date {
        return new Date(this.datePipe.transform(date, "M/d/yy, h:mm a") + " UTC");
    }
}
