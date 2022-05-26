import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { HttpErrorResponse } from "@angular/common/http";
import { CountdownEvent } from "ngx-countdown";

import { AppMainComponent } from "../app-main/app-main.component";
import { IdentityService } from "../../../services/identity.service";
import { AuthService } from "../../../services/auth.service";
import { SecurityService } from "../../../services/security.service";
import { User } from "../../../models/user";


import { GuidedTourService, GuidedTour, Orientation } from 'ngx-guided-tour';

const LANGUAGE = "language";

@Component({
    selector: "app-topbar",
    templateUrl: "app-topbar.component.html"
})
export class AppTopBarComponent {
    currentLanguage: string;
    isLoading = false;
    user: User = { emailAddress: null, fullName: null, startDate: null, trackingHoursMandatory: false, isActive: true, image: null, hasTutorialBeenShown: false };
    subscriptionUser: any;
    isPunchedIn: boolean = true;
    punchedInDate: Date = new Date();
    punchInId: string;
    userBreaks: SelectItem[];
    selectedBreak: string;
    isCurrentlyInBreak: boolean;
    currentBreakId: string;
    currentBreakName: string;
    nextBreakRemainingSeconds = 0;
    nextBreakName: string;
    countdownStarted: boolean;
    timerColor: string;

    constructor(
        public app: AppMainComponent,
        private readonly confirmationService: ConfirmationService,
        private readonly messageService: MessageService,
        private readonly router: Router,
        private readonly translate: TranslateService,
        //private readonly masterDataService: MasterDataService,
        private readonly securityService: SecurityService,
        public identity: IdentityService,
        private readonly authService: AuthService,
        private readonly translateService: TranslateService) {
        const currentLanguage = localStorage.getItem(LANGUAGE);
        if (currentLanguage) {
            this.currentLanguage = currentLanguage;
        }

        this.subscriptionUser = securityService.serviceData.subscribe(() => {
            this.securityService.getUserByUserName(this.identity.userName).subscribe((data) => {
                this.user = data;
            });
        });
    }

    ngOnInit(): void {
        this.securityService.getUserByUserName(this.identity.userName).subscribe((data) => {
            this.user = data;
        });
    }

    changeLanguage(language: string) {
        this.confirmationService.confirm({
            message: this.translate.instant("GENERAL.CONFIRMCHANGELANGUAGE"),
            accept: () => {
                this.isLoading = true;
                localStorage.setItem(LANGUAGE, language);
                this.currentLanguage = language;
                this.translate.use(language).subscribe(() => {
                    this.isLoading = false;
                    window.location.reload();
                });
            }
        });
    }

    doLogout() {
        this.authService.logout();
        this.router.navigate(["/account/login"]);
    }
}
