import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, Input } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { MessageService, SelectItem } from "primeng/api";

import { User } from "../../../../models/user";
import { MasterDataService } from "../../../../services/master-data.service";
import { SecurityService } from "../../../../services/security.service";
import { GuidedTourService, GuidedTour, Orientation } from 'ngx-guided-tour';

@Component({
    selector: "app-user-form",
    templateUrl: "./user-form.component.html",
    styleUrls: ["./user-form.component.css"],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class UserFormComponent implements OnInit {
    @Input()
    user: User;

    @Input()
    pageTitle: string;

    @Input()
    form: NgForm;

    @Input()
    editMode: boolean;

    @Input()
    isLoading: boolean;

    @Input()
    days = [];

    daysSelected = [];
    laborTypes: SelectItem[];
    users: SelectItem[];
    laborTypesDone = false;
    usersDone = false;
    areDateRangesValid = true;
    codeList: SelectItem[];
    codeListDone = false;
    tour: GuidedTour;

    constructor(
        private readonly securityService: SecurityService,
        private readonly messageService: MessageService,
        //private readonly masterDataService: MasterDataService,
        private readonly translate: TranslateService,
        private readonly guidedTourService: GuidedTourService) {
    }

    ngOnInit(): void {
        this.securityService.getUsersBySubscriptionId(null).subscribe((data) => {
            this.users = data.filter(a => a.emailAddress != this.user.emailAddress).map((a) => {
                return {
                    label: a.fullName,
                    value: a.emailAddress,
                }
            });
            this.isLoading = false;
            this.usersDone = true;
            this.setIsLoading();
        }, (err: HttpErrorResponse) => {
            this.messageService.add({
                severity: "error",
                summary: this.translate.instant("GENERAL.DATAERROR"),
                detail: err.error
            });
            console.error(err);
            this.setIsLoading();
        });
    }

    onChangeDays() {
        this.daysSelected = [];
        for (let u = 0; u < this.days.length; u++) {
            if (this.days[u].checked) {
                this.daysSelected.push(this.days[u].id);
            }
        }
        this.user.daysSchedule = this.daysSelected.join(",");
        this.validateDates();
    }

    private setIsLoading() {
        this.isLoading = !(
            this.laborTypesDone &&
            this.usersDone &&
            this.codeListDone);
        if (!this.isLoading) {
            this.form.form.markAsPristine();
        }
    }

    validateDates() {
        this.areDateRangesValid = true;
        if (this.user.timeScheduleStart && this.user.timeScheduleEnd) {
            if (this.user.timeScheduleEnd < this.user.timeScheduleStart) {
                this.areDateRangesValid = false;
                this.user.timeScheduleEnd = null;
            }
            else {
                let daysPerWeek = this.daysSelected.length;
                this.user.timeScheduleStart = new Date(this.user.timeScheduleStart?.toString());
                this.user.timeScheduleEnd = new Date(this.user.timeScheduleEnd?.toString());
                const timeDiff = Math.abs(this.user.timeScheduleEnd.getTime() - this.user.timeScheduleStart.getTime());
                this.user.hoursPerWeek = Number((timeDiff / (1000 * 60 * 60) * daysPerWeek).toFixed(1));
            }
        }

    }

}