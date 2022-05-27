import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MessageService, SelectItem } from "primeng/api";
import { ContactUs } from "../../../models/contactus";
import { NotificationsService } from "../../../services/notifications.service";

@Component({
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    contactUs: ContactUs = { email: null, name: null, message: null };

    constructor(
        private readonly translate: TranslateService,
        private readonly messageService: MessageService,
        private readonly router: Router,
        private readonly notificationsService: NotificationsService) {
    }

    ngOnInit() {
    }

    doContactUs() {
        this.notificationsService.sendContactUs(this.contactUs).subscribe(
            () => {
                this.contactUs = { email: null, name: null, message: null };

                this.messageService.add({
                    severity: "success",
                    summary: this.translate.instant("GENERAL.SUCCESS"),
                    detail: this.translate.instant("GENERAL.CONTACTUS.SENT"),
                    life: 5000
                });
            }, (err: HttpErrorResponse) => {

            });
    }

    navigateToDashboard() {
        this.router.navigate(["/account", "socialLogin"]);
    }

    navigateToRegister() {
        this.router.navigate(["/account", "register"]);
    }
}
