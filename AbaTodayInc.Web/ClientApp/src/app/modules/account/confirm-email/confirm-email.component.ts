import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";

import { AuthService } from "../../../services/auth.service";
import { AuthToken } from "../../../models/auth-token";
import { UserSettingsService } from "../../../services/user-settings.service";

@Component({
    selector: "app-confirm-email",
    templateUrl: "./confirm-email.component.html",
    styleUrls: ["./confirm-email.component.css"]
})
export class ConfirmEmailComponent implements OnInit {
    dark: boolean = this.userSettings.darkMode;
    isLoading = true;
    isConfirmed = false;
    error: string;

    constructor(
        private readonly router: ActivatedRoute,
        private readonly translate: TranslateService,
        private readonly userSettings: UserSettingsService,
        private readonly authService: AuthService) { }

    ngOnInit(): void {
        this.router.queryParams.subscribe(params => {
            const authToken: AuthToken = { userId: params["user"], code: params["code"] };
            this.authService.confirmEmail(authToken).subscribe(() => {
                this.isConfirmed = true;
                this.error = null;
                this.isLoading = false;
            }, (err: HttpErrorResponse) => {
                this.error = this.translate.instant(err.error);
                console.error(err);
                this.isLoading = false;
            });
        });
    }
}