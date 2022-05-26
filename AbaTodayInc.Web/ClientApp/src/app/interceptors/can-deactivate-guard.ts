import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { ComponentCanDeactivate } from "./component-can-deactivate";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
    constructor(private readonly translate: TranslateService) {

    }

    canDeactivate(component: ComponentCanDeactivate): boolean {
        if (!component.canDeactivate()) {
            if (confirm(this.translate.instant("GENERAL.UNSAVEDCHANGES"))) {
                return true;
            } else {
                return false;
            }
        }

        return true;
    }
}