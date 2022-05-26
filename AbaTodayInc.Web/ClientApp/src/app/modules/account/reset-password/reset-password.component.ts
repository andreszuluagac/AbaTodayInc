import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/api";

import { ResetPassword } from "../../../models/reset-password";
import { AuthService } from "../../../services/auth.service";
import { UserSettingsService } from "../../../services/user-settings.service";

@Component({
    selector: "app-reset-password",
    templateUrl: "./reset-password.component.html"
})
export class ResetPasswordComponent implements OnInit {
    dark: boolean = this.userSettings.darkMode;
    checked: boolean;
    isLoading = false;
    resetPassword: ResetPassword = { code: null, emailAddress: null };

    constructor(
        private readonly authService: AuthService,
        private readonly messageService: MessageService,
        private readonly translate: TranslateService,
        private readonly userSettings: UserSettingsService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.resetPassword.emailAddress = params["user"];
            this.resetPassword.code = params["code"];
        });
    }

    arePasswordsInvalid(): boolean {
        return this.resetPassword.password !== null &&
            this.resetPassword.confirmPassword !== null &&
            this.resetPassword.password !== this.resetPassword.confirmPassword;
    }

    doResetPassword() {
        this.isLoading = true;
        this.authService.resetPassword(this.resetPassword).subscribe(
            () => {
                this.messageService.add({
                    severity: "success",
                    summary: this.translate.instant("GENERAL.SUCCESS"),
                    detail: this.translate.instant("GENERAL.SAVESUCCESSFUL"),
                    life: 5000
                });
                this.isLoading = false;
                this.router.navigate(["/account/login"]);
            },
            (err: HttpErrorResponse) => {
                this.translate.stream("GENERAL.DATAERROR").subscribe((text) => {
                    this.messageService.add({
                        severity: "error",
                        summary: text,
                        detail: err.error
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
