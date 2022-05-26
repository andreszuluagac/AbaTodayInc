import { Component, OnInit, Input } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { GuidedTourService, GuidedTour, Orientation, OrientationConfiguration } from 'ngx-guided-tour';
import { TranslateService } from "@ngx-translate/core";

import { Role } from "../../../../models/role";

@Component({
    selector: "app-role-form",
    templateUrl: "./role-form.component.html",
    styleUrls: ["./role-form.component.css"],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class RoleFormComponent implements OnInit {
    @Input()
    role: Role;    

    @Input()
    pageTitle: string;

    @Input()
    form: NgForm;

    @Input()
    isLoading: boolean;

    tour: GuidedTour;

    constructor(private readonly translate: TranslateService,
        private readonly guidedTourService: GuidedTourService) {
    }

    ngOnInit(): void {
        let object = this;
        this.tour = {
            tourId: 'tour',
            useOrb: false,
            steps: [
                {
                    title: this.translate.instant("TOURS.ROLES.CREATE.STEP1.TITLE"),
                    content: this.translate.instant("TOURS.ROLES.CREATE.STEP1.CONTENT"),
                    selector: "#Section1",
                    orientation: Orientation.BottomLeft
                },
                {
                    title: this.translate.instant("TOURS.ROLES.CREATE.STEP2.TITLE"),
                    content: this.translate.instant("TOURS.ROLES.CREATE.STEP2.CONTENT"),
                    selector: "#SectionSave",
                    orientation: Orientation.TopLeft,
                    closeAction: function () {
                        window.scrollTo(0, 0);
                    }
                }
            ]
        };    
    }

    showWizard() {
        this.guidedTourService.startTour(this.tour);
    }
}