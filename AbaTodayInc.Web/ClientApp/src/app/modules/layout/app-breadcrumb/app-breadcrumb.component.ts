import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { MenuItem } from "primeng/api";

import { BreadcrumbService } from "../../../services/mirage/breadcrumb.service";
import { SitesService } from "../../../services/sites.service";
import { BusinessesService } from "../../../services/businesses.service";
import { TranslateService } from "@ngx-translate/core";
import { MasterFilterService } from "../../../services/master-filter.service";

@Component({
    selector: "app-breadcrumb",
    templateUrl: "./app-breadcrumb.component.html"
})
export class AppBreadcrumbComponent implements OnDestroy {
    welcomeMessage: string;
    param = {
        sites: "",
        businesses: "",
    };
    breadCrumbSubscription: Subscription;
    sitesSubscription: Subscription;
    businessesSubscription: Subscription;

    items: MenuItem[];

    constructor(
        public breadcrumbService: BreadcrumbService,
        private readonly translate: TranslateService) {
        //Load local storage data
     

        //Subscribe emiter data
        this.breadCrumbSubscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
     
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        if (this.breadCrumbSubscription) {
            this.breadCrumbSubscription.unsubscribe();
        }
    }

}
