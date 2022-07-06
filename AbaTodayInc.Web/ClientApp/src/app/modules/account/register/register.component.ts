import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";

import { AuthService } from "../../../services/auth.service";
import { UserSettingsService } from "../../../services/user-settings.service";
import { MasterDataService } from "../../../services/master-data.service";
import { MessageService, SelectItem } from "primeng/api";
import { Customer } from "../../../models/customer";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {
    dark: boolean = this.userSettings.darkMode;
    customer: Customer = { id: "00000000-0000-0000-0000-000000000000", email: null, name: null, passwordHash: null, isSubscribed: true };
    isLoading = false;
    userRegistered = false;
    errors: string[] = [];
    codeList: SelectItem[];

    constructor(
        private readonly translate: TranslateService,
        private readonly userSettings: UserSettingsService,
        private readonly masterDataService: MasterDataService,
        private readonly messageService: MessageService,
        private readonly authService: AuthService) {
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.masterDataService.getCountries().subscribe((countries) => {
            this.codeList = countries.map(a => {
                return {
                    value: a["additionalData"],
                    label: "+" + a["additionalData"] + " " + a.label
                }
            });
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

    doRegister() {
        this.isLoading = true;
        this.errors = [];
        this.authService.registerCustomer(this.customer).subscribe(
            () => {
                this.userRegistered = true;
            }, (err: HttpErrorResponse) => {
                this.translate.stream("GENERAL.DATAERROR").subscribe(() => {
                    err.error.split(",").forEach(a => {
                        this.errors.push(`ACCOUNT.${a.toUpperCase()}`);
                    });
                    console.error(err);
                    this.isLoading = false;
                });
            });
    }

    changeDark(value) {
        this.dark = value;
        this.userSettings.darkMode = this.dark;
    }
}