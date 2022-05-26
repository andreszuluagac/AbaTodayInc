import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { SelectItem } from "primeng/api";

import { EntityList } from "../models/entity-list";
import { StaticData } from "./static-data";
import { EntityFilterData } from "../models/entity-filter-data";
import { DatePipe } from "@angular/common";
import { User } from "../models/user";
import { StringValue } from "../models/string-value";

@Injectable({
    providedIn: "root"
})
export class MasterDataService {
    gridDataLoaded = new EventEmitter<any[]>();
    processTaskCompleted = new EventEmitter<void>();

    constructor(
        private readonly http: HttpClient,
        private readonly datePipe: DatePipe,
        private readonly translate: TranslateService) {
    }

    getGridColumns(entityName: string) {
        switch (entityName.toLowerCase()) {
            case "roles":
                StaticData.rolesCols.forEach(a => {
                    a.header = this.translate.instant(a.header);
                });
                return StaticData.rolesCols;
            case "users":
                StaticData.usersCols.forEach(a => {
                    a.header = this.translate.instant(a.header);
                });
                return StaticData.usersCols;
            default:
                console.error("Could not find columns for " + entityName);
                return [];

        }
    }

    searchEntitiesByEntityType(entityName: string,
        skip: number,
        take: number,
        orderBy?: string,
        sortOrder?: number,
        globalFilter?: string,
        parentEntityId: string = null,
        filterData: EntityFilterData = null,
        showFinalized: boolean = false) {
        let endpoint = `api/masterdata/searchEntitiesByEntityType/${entityName}?$skip=${skip}&$take=${take}`;
        if (parentEntityId) {
            endpoint += `&parentEntityId=${parentEntityId}`;
        }
        if (showFinalized) {
            endpoint += `&showFinalized=${showFinalized}`;
        }
        if (orderBy) {
            endpoint += `&$orderBy=${orderBy}`;
        }
        if (sortOrder) {
            endpoint += `&$sortOrder=${sortOrder}`;
        }
        if (globalFilter) {
            endpoint += `&$filter=${globalFilter}`;
        }
        return this.http.post<EntityList>(endpoint, filterData ? filterData : {});
    }

    deleteEntity(entityName: string, id: string): Observable<void> {
        const endpoint = `api/masterData/deleteEntity/${entityName}?entityId=${id}`;
        return this.http.delete<void>(endpoint);
    }

    getCountries(): Observable<SelectItem[]> {
        const endpoint = "api/masterData/getCountries";
        return this.http.get<SelectItem[]>(endpoint);
    }

    getAllUsers(): Observable<User[]> {
        const endpoint = "api/masterData/getAllUsers";
        return this.http.get<User[]>(endpoint);
    }

    getSubscriptionApiKey(): Observable<StringValue> {
        const endpoint = "api/masterData/getSubscriptionApiKey";
        return this.http.get<StringValue>(endpoint);
    }

    generateApiKey(): Observable<StringValue> {
        const endpoint = "api/masterData/generateApiKey";
        return this.http.get<StringValue>(endpoint);
    }

    deleteApiKey(): Observable<void> {
        const endpoint = "api/masterData/deleteApiKey";
        return this.http.delete<void>(endpoint);
    }

    convertToLocalDate(date: Date): Date {
        if (date) {
            return new Date(this.datePipe.transform(date, "M/d/yy, h:mm a") + " UTC");
        }
        return null;
    }

    convertToShortDateString(date: Date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    exportToCsv(filename: string, rows: object[], header: object[] = null, footer: object[] = null) {
        if (!rows || !rows.length) {
            return;
        }
        const separator = ",";
        let csvContent = "";

        if (header && header.length) {
            const headerKeys = Object.keys(header[0]);
            csvContent +=
                headerKeys.join(separator) +
                "\n" +
                header.map(row => {
                    return headerKeys.map(k => {
                        let cell = row[k] === null || row[k] === undefined ? '' : row[k];
                        cell = cell instanceof Date
                            ? cell.toLocaleString()
                            : cell.toString().replace(/"/g, '""');
                        if (cell.search(/([",\n])/g) >= 0) {
                            cell = `"${cell}"`;
                        }
                        return cell;
                    }).join(separator);
                }).join("\n");
            csvContent += "\n" + "\n";
        }

        const bodyKeys = Object.keys(rows[0]);
        csvContent +=
            bodyKeys.join(separator) +
            "\n" +
            rows.map(row => {
                return bodyKeys.map(k => {
                    let cell = row[k] === null || row[k] === undefined ? '' : row[k];
                    cell = cell instanceof Date
                        ? cell.toLocaleString()
                        : cell.toString().replace(/"/g, '""');
                    if (cell.search(/([",\n])/g) >= 0) {
                        cell = `"${cell}"`;
                    }
                    return cell;
                }).join(separator);
            }).join("\n");

        if (footer && footer.length) {
            const footerKeys = Object.keys(footer[0]);
            csvContent += "\n" + "\n" +
                footerKeys.join(separator) +
                "\n" +
                footer.map(row => {
                    return footerKeys.map(k => {
                        let cell = row[k] === null || row[k] === undefined ? '' : row[k];
                        cell = cell instanceof Date
                            ? cell.toLocaleString()
                            : cell.toString().replace(/"/g, '""');
                        if (cell.search(/([",\n])/g) >= 0) {
                            cell = `"${cell}"`;
                        }
                        return cell;
                    }).join(separator);
                }).join("\n");
        }

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) {
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
}