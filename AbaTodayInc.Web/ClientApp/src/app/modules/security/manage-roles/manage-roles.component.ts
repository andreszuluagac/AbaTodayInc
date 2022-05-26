import { Component, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { GridComponent } from "../../../shared/grid/grid.component";

import { BreadcrumbService } from "../../../services/mirage/breadcrumb.service";

@Component({
    selector: "app-manage-roles",
    templateUrl: "./manage-roles.component.html",
    styleUrls: ["./manage-roles.component.css"]
})
export class ManageRolesComponent implements OnInit {
    @ViewChild("grid")
    grid: GridComponent;

    constructor(
        private readonly breadcrumbService: BreadcrumbService,
        private readonly translate: TranslateService) {
        this.breadcrumbService.setItems([
            { label: this.translate.instant("SECURITY.NAVTITLE") },
            { label: this.translate.instant("SECURITY.MANAGEROLES.NAVTITLE") }
        ]);
    }
    ngOnInit(): void {
       
    }

}