"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessesService = void 0;
var core_1 = require("@angular/core");
var BusinessesService = /** @class */ (function () {
    function BusinessesService(http) {
        this.http = http;
        this.serviceData = new core_1.EventEmitter();
        this.businessesReload = new core_1.EventEmitter();
    }
    BusinessesService.prototype.getActiveBusinessNames = function (businessIds, onlyBusinessesWithStores) {
        if (businessIds === void 0) { businessIds = null; }
        if (onlyBusinessesWithStores === void 0) { onlyBusinessesWithStores = false; }
        var ids = businessIds ? businessIds.toString() : null;
        var endpoint = "api/businesses/getActiveBusinessNames";
        if (ids) {
            endpoint += "/" + ids;
        }
        if (onlyBusinessesWithStores) {
            endpoint += "?onlyBusinessesWithStores=" + onlyBusinessesWithStores;
        }
        return this.http.get(endpoint);
    };
    BusinessesService.prototype.getActiveDivisionsByBusiness = function (businessId) {
        if (businessId === void 0) { businessId = null; }
        var endpoint = "api/businesses/getActiveDivisionsByBusiness/" + businessId;
        return this.http.get(endpoint);
    };
    BusinessesService.prototype.getActiveSitesByBusiness = function (businessId) {
        if (businessId === void 0) { businessId = null; }
        var endpoint = "api/businesses/getActiveSitesByBusiness/" + businessId;
        return this.http.get(endpoint);
    };
    BusinessesService.prototype.getActiveSiteLocationsByBusiness = function (businessId) {
        if (businessId === void 0) { businessId = null; }
        var endpoint = "api/businesses/getActiveSiteLocationsByBusiness/" + businessId;
        return this.http.get(endpoint);
    };
    BusinessesService.prototype.getActiveSitesLocationsByBusinesses = function (businessIds) {
        if (businessIds === void 0) { businessIds = null; }
        var ids = businessIds ? businessIds.toString() : null;
        var endpoint = "api/businesses/getActiveSitesLocationsByBusinesses/" + ids;
        return this.http.get(endpoint);
    };
    BusinessesService.prototype.getBusinessById = function (id) {
        var endpoint = "api/businesses/getById/" + id;
        return this.http.get(endpoint);
    };
    BusinessesService.prototype.createBusiness = function (business) {
        var endpoint = "api/businesses/create";
        return this.http.post(endpoint, business);
    };
    BusinessesService.prototype.updateBusiness = function (business) {
        var endpoint = "api/businesses/update";
        return this.http.post(endpoint, business);
    };
    BusinessesService.prototype.getAllDivisionsByBusiness = function (id) {
        var endpoint = "api/businesses/getAllDivisionsByBusiness/" + id;
        return this.http.get(endpoint);
    };
    BusinessesService.prototype.getDivisionById = function (id) {
        var endpoint = "api/businesses/getDivisionById/" + id;
        return this.http.get(endpoint);
    };
    BusinessesService.prototype.createDivision = function (division) {
        var endpoint = "api/businesses/createDivision";
        return this.http.post(endpoint, division);
    };
    BusinessesService.prototype.updateDivision = function (division) {
        var endpoint = "api/businesses/updateDivision";
        return this.http.post(endpoint, division);
    };
    BusinessesService.prototype.getItemRatessByCategory = function (id) {
        var endpoint = "api/businesses/GetItemRatesByCategory/" + id;
        return this.http.get(endpoint);
    };
    BusinessesService.prototype.getItemRateById = function (id) {
        var endpoint = "api/businesses/getItemRateById/" + id;
        return this.http.get(endpoint);
    };
    // To do for Hugo Aristizabal in PBI 3262
    //getBillingDocumentByItemRateId(id: string): Observable<ItemRate> {
    //    const endpoint = `api/businesses/getBillingDocumentByItemRateId/${id}`;
    //    return this.http.get<ItemRate>(endpoint);
    //}
    BusinessesService.prototype.itemRateExists = function (divisionId, type, category, billingId, uom) {
        var endpoint = "api/businesses/itemRateExists/?divisionId=" + divisionId + "&type=" + type + "&category=" + category + "&billingId=" + billingId + "&uom=" + uom;
        return this.http.get(endpoint);
    };
    BusinessesService.prototype.itemRateBillingDocumentExists = function (id) {
        var endpoint = "api/businesses/itemRateBillingDocumentExists/" + id;
        return this.http.get(endpoint);
    };
    BusinessesService.prototype.createItemRate = function (itemRate) {
        var endpoint = "api/businesses/createItemRate";
        return this.http.post(endpoint, itemRate);
    };
    BusinessesService.prototype.updateItemRate = function (itemRate) {
        var endpoint = "api/businesses/updateItemRate";
        return this.http.post(endpoint, itemRate);
    };
    BusinessesService.prototype.getItemRateByData = function (divisionId, type, category, billingId, uom) {
        var endpoint = "api/businesses/getItemRateByData/?divisionId=" + divisionId + "&type=" + type + "&category=" + category + "&billingId=" + billingId + "&uom=" + uom;
        return this.http.get(endpoint);
    };
    BusinessesService.prototype.getItemRateByFilter = function (divisionId, type, category, billingId, uom) {
        var endpoint = "api/businesses/getItemRateByFilter/?divisionId=" + divisionId + "&type=" + type + "&category=" + category + "&billingId=" + billingId + "&uom=" + uom;
        return this.http.get(endpoint);
    };
    BusinessesService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], BusinessesService);
    return BusinessesService;
}());
exports.BusinessesService = BusinessesService;
//# sourceMappingURL=businesses.service.js.map