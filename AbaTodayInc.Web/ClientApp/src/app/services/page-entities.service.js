"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageEntitiesService = void 0;
var core_1 = require("@angular/core");
var PageEntitiesService = /** @class */ (function () {
    function PageEntitiesService(http) {
        this.http = http;
    }
    PageEntitiesService.prototype.getPageEntities = function () {
        var endpoint = "api/pageEntities/getAll";
        return this.http.get(endpoint);
    };
    PageEntitiesService.prototype.getChartsByPageAndEntityId = function (entityId, pageId) {
        var endpoint = "api/pageEntities/getChartsByPageAndEntityId/" + entityId + "?pageId=" + pageId;
        return this.http.get(endpoint);
    };
    PageEntitiesService.prototype.getPageHeaderCharts = function (pageId) {
        var endpoint = "api/pageEntities/getPageHeaderCharts/" + pageId;
        return this.http.get(endpoint);
    };
    PageEntitiesService.prototype.deletePageHeaderChartThreshold = function (id) {
        var endpoint = "api/pageEntities/deletePageHeaderChartThreshold/" + id;
        return this.http.delete(endpoint);
    };
    PageEntitiesService.prototype.addPageHeaderChartThreshold = function (headerThreshold) {
        var endpoint = "api/pageEntities/addPageHeaderChartThreshold";
        return this.http.post(endpoint, headerThreshold);
    };
    PageEntitiesService.prototype.saveHeaderChartVariables = function (variables) {
        var endpoint = "api/pageEntities/saveHeaderChartVariables";
        return this.http.post(endpoint, variables);
    };
    PageEntitiesService.prototype.saveHeaderChart = function (pageId, gridPosition, headerCharts) {
        var endpoint = "api/pageEntities/saveHeaderChartForPageId/" + pageId + "?gridPosition=" + gridPosition;
        return this.http.post(endpoint, headerCharts);
    };
    PageEntitiesService.prototype.removeHeaderChart = function (pageId, gridPosition) {
        var endpoint = "api/pageEntities/removeHeaderChart/" + pageId + "?gridPosition=" + gridPosition;
        return this.http.delete(endpoint);
    };
    PageEntitiesService.prototype.getExtendedAttributesByPageId = function (id) {
        var endpoint = "api/pageEntities/getExtendedAttributesByPageId/" + id;
        return this.http.get(endpoint);
    };
    PageEntitiesService.prototype.getActiveExtendedAttributesByPageId = function (id) {
        var endpoint = "api/pageEntities/getActiveExtendedAttributesByPageId/" + id;
        return this.http.get(endpoint);
    };
    PageEntitiesService.prototype.createExtendedAttribute = function (extendedAttributes) {
        var endpoint = "api/pageEntities/createExtendedAttribute";
        return this.http.post(endpoint, extendedAttributes);
    };
    PageEntitiesService.prototype.updateExtendedAttribute = function (extendedAttributes) {
        var endpoint = "api/pageEntities/updateExtendedAttribute";
        return this.http.post(endpoint, extendedAttributes);
    };
    PageEntitiesService.prototype.deleteExtendedAttribute = function (id) {
        var endpoint = "api/pageEntities/deleteExtendedAttribute/" + id;
        return this.http.delete(endpoint);
    };
    PageEntitiesService.prototype.getExtendedAttributesById = function (id) {
        var endpoint = "api/pageEntities/getExtendedAttributesById/" + id;
        return this.http.get(endpoint);
    };
    PageEntitiesService.prototype.getDataList = function () {
        var endpoint = "api/dataLists/getAll";
        return this.http.get(endpoint);
    };
    //Header Chart Results
    PageEntitiesService.prototype.getNumberHeaderChartResult = function (chartTypeId, filterData) {
        var endpoint = "api/pageEntities/getNumberHeaderChartResultByChartTypeId/" + chartTypeId;
        return this.http.post(endpoint, filterData);
    };
    PageEntitiesService.prototype.getLocationsHeaderChartResult = function (chartTypeId, filterData) {
        var endpoint = "api/pageEntities/getLocationsHeaderChartResultByChartTypeId/" + chartTypeId;
        return this.http.post(endpoint, filterData);
    };
    PageEntitiesService.prototype.getChartHeaderChartResult = function (chartTypeId, filterData) {
        var endpoint = "api/pageEntities/getChartHeaderChartResultByChartTypeId/" + chartTypeId;
        return this.http.post(endpoint, filterData);
    };
    PageEntitiesService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], PageEntitiesService);
    return PageEntitiesService;
}());
exports.PageEntitiesService = PageEntitiesService;
//# sourceMappingURL=page-entities.service.js.map