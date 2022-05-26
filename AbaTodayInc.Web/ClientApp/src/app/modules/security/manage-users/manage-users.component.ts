import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

import { BreadcrumbService } from "../../../services/mirage/breadcrumb.service";
import { GuidedTourService, GuidedTour, Orientation } from 'ngx-guided-tour';

@Component({
    selector: "app-manage-users",
    templateUrl: "./manage-users.component.html",
    styleUrls: ["./manage-users.component.css"]
})
export class ManageUsersComponent implements OnInit {
    constructor(
        private readonly breadcrumbService: BreadcrumbService,
        private readonly translate: TranslateService) {
        this.breadcrumbService.setItems([
            { label: this.translate.instant("SECURITY.NAVTITLE") },
            { label: this.translate.instant("SECURITY.MANAGEUSERS.NAVTITLE") }
        ]);
    }

    ngOnInit(): void {
       
    }
   
}
