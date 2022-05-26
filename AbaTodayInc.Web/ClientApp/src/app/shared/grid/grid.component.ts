import { Component, EventEmitter, Input, OnInit, Output, Type, ViewChild } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Table } from "primeng/table";
import { ConfirmationService, FilterMetadata, LazyLoadEvent, MenuItem, MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { TranslateService } from "@ngx-translate/core";
import { DatePipe } from "@angular/common";

import { GridColumn } from "../../models/grid-column";
import { EntityList } from "../../models/entity-list";
import { MasterDataService } from "../../services/master-data.service";
import { FilterType } from "../../models/enums/filter-type";
import { FilterListElement } from "../../models/filter-list-element";
import { FilterList } from "../../models/filter-list";
import { EntityFilterData } from "../../models/entity-filter-data";
import { AuthService } from "../../services/auth.service";
//import { ImageComponent } from "../image/image.component";

@Component({
    selector: "app-grid",
    templateUrl: "./grid.component.html",
    styleUrls: ["./grid.component.css"]
})
export class GridComponent implements OnInit {
    @ViewChild("dt")
    dt: Table;

    private _selectedColumns: GridColumn[] = [];

    get selectedColumns(): GridColumn[] {
        return this._selectedColumns;
    }

    set selectedColumns(val: GridColumn[]) {
        let orderedColumns: GridColumn[] = [];
        for (let i = 0; i < val.length; i++) {
            orderedColumns.push(this.masterDataService
                .getGridColumns(this.entityName)
                .find(col => col.field === val[i].field));
        }
        this._selectedColumns = orderedColumns;
        setTimeout(() => {
            this.dt.saveState();
        },
            200);
    }

    get filterType() { return FilterType; }

    @Input()
    singleSelection: boolean;
    @Input()
    entityName: string;
    @Input()
    detailsPropertyName: string;
    @Input()
    childRoutes: string[];
    @Input()
    childIcons: string[];
    @Input()
    childTitles: string[];
    @Input()
    parentEntityId: string;
    @Input()
    showEditAction = true;
    @Input()
    editComponent: Type<any>;
    @Input()
    editActionId: string;
    @Input()
    editTabTitle: string;
    @Input()
    detailsComponent: Type<any>;
    @Input()
    showRowNumbers: boolean;
    @Input()
    showDeleteAction = true;
    @Input()
    deleteActionId: string;
    @Input()
    enableColumnFilters: false;
    @Input()
    filterLists?: FilterList[];
    @Input()
    enableRowExpand: false;
    @Input()
    toolbarItems: MenuItem[];

    @Output()
    selectedEntitiesChange = new EventEmitter();

    @Output()
    onGridReset = new EventEmitter();

    selectedEntities: any;

    toolbarStaticItems: MenuItem[];
    entityList: EntityList = { entities: [], count: 0 };
    isLoading = true;
    globalFilter: string;
    columnFilters: { [index: string]: FilterMetadata; };
    gridWidth: number;
    filterData: EntityFilterData;
    isPositive: boolean;
    gridEvent: LazyLoadEvent;

    subscription: any;
    subscriptionCurrency: any;
    currentCurrency: string;

    constructor(
        private readonly auth: AuthService,
        public masterDataService: MasterDataService,
        private readonly confirmationService: ConfirmationService,
        private readonly messageService: MessageService,
        private readonly dialogService: DialogService,
        private readonly translate: TranslateService,
        private readonly datePipe: DatePipe) {
    }

    ngOnInit(): void {
        this.toolbarStaticItems = [
            {
                items: [
                    {
                        icon: "fas fa-fw fa-file-excel",
                        label: "",
                        command: () => this.dt.exportCSV()
                    },
                    {
                        icon: "far fa-fw fa-file-excel",
                        label: "",
                        command: () => this.dt.exportCSV({ selectionOnly: true })
                    },
                    {
                        icon: "fas fa-fw fa-sync-alt",
                        label: "",
                        command: () => this.resetGridStatus()
                    }
                ]
            }
        ];
        this.translate.stream("GRIDACTIONS.TITLE").subscribe((text) => {
            this.toolbarStaticItems[0].label = text;
        });
        this.translate.stream("GRIDACTIONS.EXPORTALLPAGE").subscribe((text) => {
            this.toolbarStaticItems[0].items[0]["label"] = text;
        });
        this.translate.stream("GRIDACTIONS.EXPORTSELECTED").subscribe((text) => {
            this.toolbarStaticItems[0].items[1]["label"] = text;
        });
        this.translate.stream("GRIDACTIONS.RESETGRID").subscribe((text) => {
            this.toolbarStaticItems[0].items[2]["label"] = text;
        });
        if (this.toolbarItems) {
            this.toolbarItems.forEach(a => {
                this.toolbarStaticItems.push(a);
            });
        }
        this._selectedColumns = this.masterDataService.getGridColumns(this.entityName);
    }

    resetGridStatus() {
        if (this.singleSelection) {
            this.selectedEntities = null;
        } else {
            this.selectedEntities = [];
        }

        this.dt.clearState();
        this.dt.reset();
        this.selectedColumns = this.masterDataService.getGridColumns(this.entityName);
        this.dt.saveState();
        this.onGridReset.emit();
    }

    loadEntities(event: LazyLoadEvent = null, showFinalized = false) {
        this.isLoading = true;
        if (!event) {
            event = this.gridEvent;
        } else {
            this.gridEvent = event;
        }
        if (!this.gridEvent) {
            this.gridEvent = {
                first: 0,
                rows: 10
            };
        }
        this.columnFilters = event.filters;
        this.filterData = {
            columnFilters: this.columnFilters
        }
        //this.globalFilter = event.globalFilter;
        this.masterDataService
            .searchEntitiesByEntityType(
                this.entityName,
                this.gridEvent.first,
                this.gridEvent.rows,
                this.gridEvent.sortField,
                this.gridEvent.sortOrder,
                this.globalFilter,
                this.parentEntityId,
                this.filterData,
                showFinalized)
            .subscribe((data) => {
                this.entityList = data;
                this.isLoading = false;
                const element = document.getElementsByClassName("ui-table-logicpod")[0];
                if (element) {
                    this.gridWidth = element.clientWidth - 30;
                } else {
                    this.gridWidth = 1024;
                }
                this.selectedEntitiesChange.emit(this.selectedEntities);
                this.resetGridSelection();
                this.masterDataService.gridDataLoaded.emit(this.entityList.entities);
            }, (err: HttpErrorResponse) => {
                this.messageService.add({
                    severity: "error",
                    summary: this.translate.instant("GENERAL.DATAERROR"),
                    detail: err.error
                });
                console.error(err);
                this.isLoading = false;
            });
    }

    confirmDeleteRecord(entityId: string) {
        this.auth.tryAuthorize(this.deleteActionId).subscribe(() => {
            this.confirmationService.confirm({
                message: this.translate.instant("GENERAL.CONFIRMDELETE"),
                accept: () => {
                    this.confirmationService.close();
                    this.doDelete(entityId);
                },
                reject: () => {
                    this.confirmationService.close();
                }
            });
        }, (err: HttpErrorResponse) => {
            this.messageService.add({
                severity: "error",
                summary: this.translate.instant("GENERAL.GENERALERROR"),
                detail: this.translate.instant("GENERAL.NOTAUTHORIZED"),
                life: 7000
            });
            console.error(err);
        });
    }

    resetGridSelection() {
        if (this.singleSelection) {
            this.selectedEntities = null;
        } else {
            this.selectedEntities = [];
        }
    }

    restoreState(event) {
        console.log("Restoring state for " + this.entityName, event);
        setTimeout(() => {
            let orderedColumns: GridColumn[] = [];
            for (let i = 0; i < event.columnOrder.length; i++) {
                orderedColumns.push(this.masterDataService
                    .getGridColumns(this.entityName)
                    .find(col => col.field === event.columnOrder[i]));
            }
            this._selectedColumns = orderedColumns;
            console.log("State restored for " + this.entityName, this._selectedColumns);
        }, 300);
    }

    onRowSelectionChanged(event: any) {
        this.selectedEntitiesChange.emit(this.selectedEntities);
    }

    viewDetails(entity: any, detailsComponent: Type<any>) {
        if (detailsComponent) {
            let header = this.detailsPropertyName ? entity[this.detailsPropertyName] : this.translate.instant("GENERAL.DETAILS");
            if (entity.isActive != undefined && entity.isActive === false) {
                const active = ` (${this.translate.instant("GENERAL.INACTIVE")})`;
                header += active;
            }
            this.dialogService.open(detailsComponent,
                {
                    data: {
                        entity: entity
                    },
                    header: header,
                    width: "70%"
                });
        }
    }

    getDetailsComponentForListColumn(filterListName: string): Type<any> {
        switch (filterListName) {
            //case "Businesses":
            //    return BusinessDetailsComponent;
            //case "Sites":
            //    return SiteDetailsComponent;
            //case "BinLocations":
            //    return BinLocationDetailsComponent;
            //case "Products":
            //    return ProductDetailsComponent;
            //case "ManualCycleCounts":
            //    return ManageManualCycleCountCountedComponent;
            //case "Carriers":
            //    return CarrierDetailsComponent;
            //case "Lumpers":
            //    return LumperDetailsComponent;
            //case "Divisions":
            //    return BusinessDivisionDetailsComponent;
            //case "Customers":
            //    return CustomerDetailsComponent;
        }
        return null;
    }

    showMap(lat: number, lng: number, header: string) {
        //this.dialogService.open(MapComponent,
        //    {
        //        data: {
        //            lat: lat,
        //            lng: lng
        //        },
        //        header: header,
        //        width: "70%",
        //    });
    }

    showImage(image: string) {
        //this.dialogService.open(ImageComponent,
        //    {
        //        data: {
        //            image: image
        //        },
        //        width: "30%",
        //    });
    }

    getActionsWidth(): string {
        let baseWidth = 50;
        if (this.showEditAction) {
            baseWidth += 32;
        }
        if (this.showDeleteAction) {
            baseWidth += 32;
        }
        if (this.detailsComponent) {
            baseWidth += 32;
        }
        if (this.childRoutes && this.childRoutes.length > 0) {
            baseWidth += 32 * this.childRoutes.length;
        }
        if (this.enableRowExpand) {
            baseWidth += 32;
        }
        return `${baseWidth}px`;
    }

    getGridHeight() {
        const height = window.innerHeight - 460;
        return `${height}px`;
    }

    getFilterListValues(listName: string): FilterListElement[] {
        if (this.filterLists) {
            const list = this.filterLists.find(a => a.listName === listName);
            if (list) {
                list.elements.forEach((element) => {
                    element.label = this.translate.instant(element.label);
                });
                return list.elements;
            }
        }
        return null;
    }

    translateCommaSeparatedField(list: string) {
        let translatedValues = "";
        list.split(",").forEach(a => {
            if (a !== "") {
                translatedValues += `${this.translate.instant(a)}, `;
            }
        });
        if (translatedValues.endsWith(", ")) {
            return translatedValues.slice(0, -2);
        }
        return list;
    }

    getValueForProgressBar(barValue: string): number {
        if (barValue) {
            const values = barValue.toString().split("/");
            if (values.length === 2) {
                return +values[0];
            }
            return +barValue;
        }
        return 0;
    }

    getPercentageForProgressBar(barValue: string): number {
        if (barValue) {
            const values = barValue.toString().split("/");
            if (values.length === 2) {
                const value1 = +values[0];
                let value2 = +values[1];
                if (value2 === 0) {
                    value2 = 1;
                }
                const result = Math.round(value1 * 100 / value2);
                return result;
            }
            return +barValue;
        }
        return 0;
    }

    getTextForConditionalFlag(text: string): string {
        if (text === "No") {
            text = this.translate.instant("ITEMS.PRODUCTS.FIELDS.NOINVENTORY");
        }
        else {
            if (Number(text) > 0) {
                setTimeout(() => this.isPositive = true);
                text = text + " " + this.translate.instant("ITEMS.PRODUCTS.FIELDS.DAYSLEFT");
            } else if (Number(text) === 0) {
                text = this.translate.instant("ITEMS.PRODUCTS.FIELDS.TODAY");
            }
            else {
                setTimeout(() => this.isPositive = false);
                text = text + " " + this.translate.instant("ITEMS.PRODUCTS.FIELDS.DAYSLATE");
            }
        }


        return text;
    }

    getDuration(seconds: number): string {
        const hh = Math.floor(seconds / 3600);
        const mm = Math.floor((seconds - (hh * 3600)) / 60);
        const ss = seconds - (hh * 3600) - (mm * 60);

        return hh.toString() + ":" +
            (mm < 10 ? "0" : "") + mm.toString() + ":" +
            (ss < 10 ? "0" : "") + ss.toString();

    }

    resetGridFilter() {
        this.globalFilter = null;
        this.loadEntities();
    }

    private doDelete(entityId: string) {
        this.masterDataService.deleteEntity(this.entityName, entityId).subscribe(() => {
            //If back-end deletion was ok, delete record from HTML table
            for (let i = 0; i < this.entityList.entities.length; i++) {
                if (this.entityList.entities[i].id === entityId) {
                    this.entityList.entities.splice(i, 1);
                    i = this.entityList.entities.length;
                    this.messageService.add({
                        severity: "success",
                        summary: this.translate.instant("GENERAL.SUCCESS"),
                        detail: this.translate.instant("GENERAL.DELETED")
                    });
                }
            }
        }, (err: HttpErrorResponse) => {
            this.messageService.add({
                severity: "error",
                summary: this.translate.instant("GENERAL.GENERALERROR"),
                detail: err.error
            });
            console.error(err);
        });
    }
}
