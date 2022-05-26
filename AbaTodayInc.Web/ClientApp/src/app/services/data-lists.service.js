"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataListsService = void 0;
var core_1 = require("@angular/core");
var DataListsService = /** @class */ (function () {
    function DataListsService(http) {
        this.http = http;
        this.serviceData = new core_1.EventEmitter();
    }
    DataListsService.prototype.getDataListById = function (id) {
        var endpoint = "api/datalists/getById/" + id;
        return this.http.get(endpoint);
    };
    DataListsService.prototype.create = function (dataList) {
        var endpoint = "api/datalists/create";
        return this.http.post(endpoint, dataList);
    };
    DataListsService.prototype.update = function (datalist) {
        var endpoint = "api/datalists/update";
        return this.http.post(endpoint, datalist);
    };
    DataListsService.prototype.delete = function (id) {
        var endpoint = "api/datalists/delete/" + id;
        return this.http.delete(endpoint);
    };
    DataListsService.prototype.getDataListItemsByDataListId = function (id) {
        var endpoint = "api/datalists/getAllItemsByDataListId/" + id;
        return this.http.get(endpoint);
    };
    DataListsService.prototype.getDataListItemById = function (id) {
        var endpoint = "api/datalists/getDataListItemById/" + id;
        return this.http.get(endpoint);
    };
    DataListsService.prototype.createDataListItem = function (dataListItem) {
        var endpoint = "api/datalists/createDataListItem";
        return this.http.post(endpoint, dataListItem);
    };
    DataListsService.prototype.updateDataListItem = function (dataListItem) {
        var endpoint = "api/datalists/updateDataListItem";
        return this.http.post(endpoint, dataListItem);
    };
    DataListsService.prototype.deleteDataListItem = function (id) {
        var endpoint = "api/datalists/deleteDataListItem/" + id;
        return this.http.delete(endpoint);
    };
    DataListsService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], DataListsService);
    return DataListsService;
}());
exports.DataListsService = DataListsService;
//# sourceMappingURL=data-lists.service.js.map