"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterDataService = void 0;
var core_1 = require("@angular/core");
var static_data_1 = require("./static-data");
var MasterDataService = /** @class */ (function () {
    function MasterDataService(http, datePipe, translate) {
        this.http = http;
        this.datePipe = datePipe;
        this.translate = translate;
        this.gridDataLoaded = new core_1.EventEmitter();
        this.processTaskCompleted = new core_1.EventEmitter();
    }
    MasterDataService.prototype.getGridColumns = function (entityName) {
        var _this = this;
        switch (entityName.toLowerCase()) {
            case "roles":
                static_data_1.StaticData.rolesCols.forEach(function (a) {
                    a.header = _this.translate.instant(a.header);
                });
                return static_data_1.StaticData.rolesCols;
            case "users":
                static_data_1.StaticData.usersCols.forEach(function (a) {
                    a.header = _this.translate.instant(a.header);
                });
                return static_data_1.StaticData.usersCols;
            default:
                console.error("Could not find columns for " + entityName);
                return [];
        }
    };
    MasterDataService.prototype.searchEntitiesByEntityType = function (entityName, skip, take, orderBy, sortOrder, globalFilter, parentEntityId, filterData, showFinalized) {
        if (parentEntityId === void 0) { parentEntityId = null; }
        if (filterData === void 0) { filterData = null; }
        if (showFinalized === void 0) { showFinalized = false; }
        var endpoint = "api/masterdata/searchEntitiesByEntityType/" + entityName + "?$skip=" + skip + "&$take=" + take;
        if (parentEntityId) {
            endpoint += "&parentEntityId=" + parentEntityId;
        }
        if (showFinalized) {
            endpoint += "&showFinalized=" + showFinalized;
        }
        if (orderBy) {
            endpoint += "&$orderBy=" + orderBy;
        }
        if (sortOrder) {
            endpoint += "&$sortOrder=" + sortOrder;
        }
        if (globalFilter) {
            endpoint += "&$filter=" + globalFilter;
        }
        return this.http.post(endpoint, filterData ? filterData : {});
    };
    MasterDataService.prototype.deleteEntity = function (entityName, id) {
        var endpoint = "api/masterData/deleteEntity/" + entityName + "?entityId=" + id;
        return this.http.delete(endpoint);
    };
    MasterDataService.prototype.getCountries = function () {
        var endpoint = "api/masterData/getCountries";
        return this.http.get(endpoint);
    };
    MasterDataService.prototype.getAllUsers = function () {
        var endpoint = "api/masterData/getAllUsers";
        return this.http.get(endpoint);
    };
    MasterDataService.prototype.getSubscriptionApiKey = function () {
        var endpoint = "api/masterData/getSubscriptionApiKey";
        return this.http.get(endpoint);
    };
    MasterDataService.prototype.generateApiKey = function () {
        var endpoint = "api/masterData/generateApiKey";
        return this.http.get(endpoint);
    };
    MasterDataService.prototype.deleteApiKey = function () {
        var endpoint = "api/masterData/deleteApiKey";
        return this.http.delete(endpoint);
    };
    MasterDataService.prototype.convertToLocalDate = function (date) {
        if (date) {
            return new Date(this.datePipe.transform(date, "M/d/yy, h:mm a") + " UTC");
        }
        return null;
    };
    MasterDataService.prototype.convertToShortDateString = function (date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    };
    MasterDataService.prototype.exportToCsv = function (filename, rows, header, footer) {
        if (header === void 0) { header = null; }
        if (footer === void 0) { footer = null; }
        if (!rows || !rows.length) {
            return;
        }
        var separator = ",";
        var csvContent = "";
        if (header && header.length) {
            var headerKeys_1 = Object.keys(header[0]);
            csvContent +=
                headerKeys_1.join(separator) +
                    "\n" +
                    header.map(function (row) {
                        return headerKeys_1.map(function (k) {
                            var cell = row[k] === null || row[k] === undefined ? '' : row[k];
                            cell = cell instanceof Date
                                ? cell.toLocaleString()
                                : cell.toString().replace(/"/g, '""');
                            if (cell.search(/([",\n])/g) >= 0) {
                                cell = "\"" + cell + "\"";
                            }
                            return cell;
                        }).join(separator);
                    }).join("\n");
            csvContent += "\n" + "\n";
        }
        var bodyKeys = Object.keys(rows[0]);
        csvContent +=
            bodyKeys.join(separator) +
                "\n" +
                rows.map(function (row) {
                    return bodyKeys.map(function (k) {
                        var cell = row[k] === null || row[k] === undefined ? '' : row[k];
                        cell = cell instanceof Date
                            ? cell.toLocaleString()
                            : cell.toString().replace(/"/g, '""');
                        if (cell.search(/([",\n])/g) >= 0) {
                            cell = "\"" + cell + "\"";
                        }
                        return cell;
                    }).join(separator);
                }).join("\n");
        if (footer && footer.length) {
            var footerKeys_1 = Object.keys(footer[0]);
            csvContent += "\n" + "\n" +
                footerKeys_1.join(separator) +
                "\n" +
                footer.map(function (row) {
                    return footerKeys_1.map(function (k) {
                        var cell = row[k] === null || row[k] === undefined ? '' : row[k];
                        cell = cell instanceof Date
                            ? cell.toLocaleString()
                            : cell.toString().replace(/"/g, '""');
                        if (cell.search(/([",\n])/g) >= 0) {
                            cell = "\"" + cell + "\"";
                        }
                        return cell;
                    }).join(separator);
                }).join("\n");
        }
        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        }
        else {
            var link = document.createElement('a');
            if (link.download !== undefined) {
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };
    MasterDataService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], MasterDataService);
    return MasterDataService;
}());
exports.MasterDataService = MasterDataService;
//# sourceMappingURL=master-data.service.js.map