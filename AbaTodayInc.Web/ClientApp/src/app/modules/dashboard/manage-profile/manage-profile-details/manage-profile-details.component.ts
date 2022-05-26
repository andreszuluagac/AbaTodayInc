import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Action } from '../../../../models/action';
import { SecurityService } from '../../../../services/security.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-manage-profile-details',
    templateUrl: './manage-profile-details.component.html',
    styleUrls: ['./manage-profile-details.component.css']
})
export class ManageProfileDetailsComponent implements OnInit {
    actionsRole: Action[];
    selectedRole: string;
    isLoading: false;

    constructor(
        public config: DynamicDialogConfig,
        private readonly rolesService: SecurityService,
        private readonly messageService: MessageService,
        private readonly translate: TranslateService) { }

    ngOnInit(): void {
        this.selectedRole = this.config.data.entity;
        if (this.selectedRole) {
            this.rolesService.getActionsByRoleName(this.selectedRole).subscribe((data) => {
                this.actionsRole = data;
                this.isLoading = false;
            }, (err: HttpErrorResponse) => {
                this.messageService.add({
                    severity: "error",
                    summary: this.translate.instant("GENERAL.DATAERROR"),
                    detail: err.error
                });
                this.isLoading = false;
            });
        }
    }

}
