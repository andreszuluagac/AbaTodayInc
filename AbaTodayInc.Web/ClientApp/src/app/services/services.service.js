"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
var core_1 = require("@angular/core");
var ServicesService = /** @class */ (function () {
    function ServicesService(http) {
        this.http = http;
        this.serviceData = new core_1.EventEmitter();
    }
    ServicesService.prototype.getServicesAndCategories = function () {
        var endpoint = "api/services/getAll";
        return this.http.get(endpoint);
    };
    ServicesService.prototype.getServiceById = function (id) {
        var endpoint = "api/services/getById/" + id;
        return this.http.get(endpoint);
    };
    ServicesService.prototype.renameCategory = function (categoryId, newName) {
        var stringValue = {
            stringValue: newName
        };
        var endpoint = "api/services/renameCategory/" + categoryId;
        return this.http.post(endpoint, stringValue);
    };
    ServicesService.prototype.createChildCategory = function (parentCategoryId, newName) {
        var stringValue = {
            stringValue: newName
        };
        var endpoint = "api/services/createChildCategory";
        if (parentCategoryId) {
            endpoint += "/" + parentCategoryId;
        }
        return this.http.post(endpoint, stringValue);
    };
    ServicesService.prototype.createOrEditService = function (service, isCreating) {
        var endpoint = "api/services/createOrEditService?isCreating=" + isCreating;
        return this.http.post(endpoint, service);
    };
    ServicesService.prototype.changeParentCategory = function (nodeId, parentCategoryId, isLeaf) {
        var endpoint = "api/services/changeParentCategoryByNodeId/" + nodeId + "?parentCategoryId=" + parentCategoryId + "&isLeaf=" + isLeaf;
        return this.http.get(endpoint);
    };
    ServicesService.prototype.deleteCategory = function (categoryId) {
        var endpoint = "api/services/deleteCategory/" + categoryId;
        return this.http.delete(endpoint);
    };
    ServicesService.prototype.deleteService = function (serviceId) {
        var endpoint = "api/services/deleteService/" + serviceId;
        return this.http.delete(endpoint);
    };
    ServicesService.prototype.searchServices = function (serviceSearch) {
        var endpoint = "api/services/searchServices";
        return this.http.post(endpoint, serviceSearch);
    };
    ServicesService.prototype.duplicateServiceOrders = function (serviceDuplicate, duplicateChildren) {
        var endpoint = "api/services/duplicateServiceOrders?duplicateChildren=" + duplicateChildren;
        return this.http.post(endpoint, serviceDuplicate);
    };
    ServicesService.prototype.getServiceOrderTypes = function () {
        var endpoint = "api/services/getServiceOrderTypes";
        return this.http.get(endpoint);
    };
    ServicesService.prototype.createServiceOrder = function (serviceOrder) {
        var endpoint = "api/services/createServiceOrder";
        return this.http.post(endpoint, serviceOrder);
    };
    ServicesService.prototype.getServiceOrderById = function (id) {
        var endpoint = "api/services/getServiceOrderById/" + id;
        return this.http.get(endpoint);
    };
    ServicesService.prototype.updateServiceOrder = function (serviceOrder) {
        var endpoint = "api/services/updateServiceOrder";
        return this.http.post(endpoint, serviceOrder);
    };
    ServicesService.prototype.readyToStartServiceOrder = function (serviceDuplicate) {
        var endpoint = "api/services/readyToStartServiceOrder";
        return this.http.post(endpoint, serviceDuplicate);
    };
    ServicesService.prototype.getLineItemsByServiceOrderId = function (id) {
        var endpoint = "api/services/getLineItemsByServiceOrderId/" + id;
        return this.http.get(endpoint);
    };
    ServicesService.prototype.saveServiceOrderLineItem = function (serviceOrderLineItem) {
        var endpoint = "api/services/saveServiceOrderLineItem";
        return this.http.post(endpoint, serviceOrderLineItem);
    };
    ServicesService.prototype.deleteServiceOrderLineItem = function (lineItemId) {
        var endpoint = "api/services/deleteServiceOrderLineItem/" + lineItemId;
        return this.http.delete(endpoint);
    };
    ServicesService.prototype.getServiceOrderLineItemsStatuses = function () {
        var endpoint = "api/services/getServiceOrderLineItemStatuses";
        return this.http.get(endpoint);
    };
    ServicesService.prototype.getSuppliesByServiceId = function (id) {
        var endpoint = "api/services/getSuppliesByServiceId/" + id;
        return this.http.get(endpoint);
    };
    ServicesService.prototype.deleteServiceSupplyById = function (serviceSuplyId) {
        var endpoint = "api/services/deleteServiceSupplyById/" + serviceSuplyId;
        return this.http.delete(endpoint);
    };
    ServicesService.prototype.saveServiceSupply = function (serviceSupply) {
        var endpoint = "api/services/saveServiceSupply";
        return this.http.post(endpoint, serviceSupply);
    };
    ServicesService.prototype.getServiceLocationByServiceId = function (id) {
        var endpoint = "api/services/getServiceLocationByServiceId/" + id;
        return this.http.get(endpoint);
    };
    ServicesService.prototype.getServiceLocationById = function (id) {
        var endpoint = "api/services/getServiceLocationById/" + id;
        return this.http.get(endpoint);
    };
    ServicesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ServicesService);
    return ServicesService;
}());
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map