import { Component, OnInit } from "@angular/core";
import { ForgotPassword } from "../../../models/forgot-password";
import { TranslateService } from "@ngx-translate/core";
import { HttpErrorResponse } from "@angular/common/http";

import { AuthService } from "../../../services/auth.service";
import { UserSettingsService } from "../../../services/user-settings.service";

@Component({
    selector: "app-forgot-password",
    templateUrl: "./forgot-password.component.html"
})
export class ForgotPasswordComponent implements OnInit {
    dark: boolean = this.userSettings.darkMode;
    forgotPassword: ForgotPassword = { emailAddress: null };
    error: string = null;
    isLoading = false;
    emailSent = false;

    constructor(
        private readonly translate: TranslateService,
        private readonly userSettings: UserSettingsService,
        private readonly authService: AuthService) { }

    ngOnInit() {
    }

    sendForgotPasswordEmail() {
        this.isLoading = true;
        this.error = null;
        this.authService.sendForgotPasswordEmail(this.forgotPassword).subscribe(
            () => {
                this.emailSent = true;
                this.isLoading = false;
            },
            (err: HttpErrorResponse) => {
                this.error = this.translate.instant(err.error);
                console.error(err);
                this.isLoading = false;
            });
    }

    changeDark(value) {
        this.dark = value;
        this.userSettings.darkMode = this.dark;
    }

}