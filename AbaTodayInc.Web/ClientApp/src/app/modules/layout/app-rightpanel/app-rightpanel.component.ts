import { Component, Inject, forwardRef } from "@angular/core";

import { AppMainComponent } from "../app-main/app-main.component";

@Component({
    selector: "app-rightpanel",
    templateUrl: "app-rightpanel.component.html"
})
export class AppRightPanelComponent {
    today = new Date();
    constructor(public app: AppMainComponent) { }
}
