import { NgForm } from "@angular/forms";
import { ComponentCanDeactivate } from "./component-can-deactivate";
import { Directive } from "@angular/core";

@Directive()
export abstract class FormCanDeactivate extends ComponentCanDeactivate {

    abstract get form(): NgForm;

    canDeactivate(): boolean {
        if (!this.form) {
            return true;
        }
        return this.form.pristine;
    }
}