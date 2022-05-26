"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinLocationsService = void 0;
var core_1 = require("@angular/core");
var BinLocationsService = /** @class */ (function () {
    function BinLocationsService(http) {
        this.http = http;
        this.serviceData = new core_1.EventEmitter();
    }
    BinLocationsService.prototype.getBinLocationById = function (id) {
        var endpoint = "api/binLocations/getBinLocationById/" + id;
        return this.http.get(endpoint);
    };
    BinLocationsService.prototype.createBinLocation = function (binLocation) {
        var endpoint = "api/binLocations/createBinLocation";
        return this.http.post(endpoint, binLocation);
    };
    BinLocationsService.prototype.updateBinLocation = function (binLocation) {
        var endpoint = "api/binLocations/updateBinLocation";
        return this.http.post(endpoint, binLocation);
    };
    BinLocationsService.prototype.getActiveBinLocationNamesBySiteId = function (siteId, excludeInboundBinLocations, includeOnlyInboundBinLocations, productId) {
        if (excludeInboundBinLocations === void 0) { excludeInboundBinLocations = false; }
        if (includeOnlyInboundBinLocations === void 0) { includeOnlyInboundBinLocations = false; }
        if (productId === void 0) { productId = ""; }
        var endpoint = "api/binLocations/getActiveBinLocationNamesBySiteId/" + (siteId ? siteId : "") + "?excludeIn=" + excludeInboundBinLocations + "&includeOnlyIn=" + includeOnlyInboundBinLocations;
        if (productId) {
            endpoint += "&productId=" + productId;
        }
        return this.http.get(endpoint);
    };
    BinLocationsService.prototype.getActiveBinLocationNamesBySiteIdAndType = function (siteId, typeId, checkOtherCategories) {
        if (checkOtherCategories === void 0) { checkOtherCategories = false; }
        //OUTB OUDK
        var endpoint = "api/binLocations/getActiveBinLocationNamesBySiteIdAndType/" + (siteId ? siteId : "") + "?typeId=" + typeId + "&checkOtherCategories=" + checkOtherCategories;
        return this.http.get(endpoint);
    };
    BinLocationsService.prototype.binLocationExistsByIdentifier = function (id) {
        var endpoint = "api/binLocations/binLocationExistsByIdentifier/" + id;
        return this.http.get(endpoint);
    };
    BinLocationsService.prototype.validateInventoryByBinLocationId = function (id) {
        var endpoint = "api/binLocations/validateInventoryByBinLocationId/" + id;
        return this.http.get(endpoint);
    };
    BinLocationsService.prototype.validateSingleLotCodeByBinLocationId = function (id) {
        var endpoint = "api/binLocations/validateSingleLotCodeByBinLocationId/" + id;
        return this.http.get(endpoint);
    };
    BinLocationsService.prototype.getLotCodeByBinLocationId = function (id) {
        var endpoint = "api/binLocations/getLotCodeByBinLocationId/" + id;
        return this.http.get(endpoint);
    };
    BinLocationsService.prototype.filterBinLocations = function (binlocationFilter) {
        var endpoint = "api/binLocations/filterBinLocations";
        return this.http.post(endpoint, binlocationFilter);
    };
    BinLocationsService.prototype.hasDifferentProductId = function (id, productId) {
        var endpoint = "api/binLocations/hasDifferentProductId/" + id + "?productId=" + productId;
        return this.http.get(endpoint);
    };
    BinLocationsService.prototype.getFirstExpirationDateByBinLocationId = function (id) {
        var endpoint = "api/binLocations/getFirstExpirationDateByBinLocationId/" + id;
        return this.http.get(endpoint);
    };
    BinLocationsService.prototype.createManualCycleCount = function (binLocationList) {
        var endpoint = "api/binLocations/createManualCycleCount";
        return this.http.post(endpoint, binLocationList);
    };
    BinLocationsService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], BinLocationsService);
    return BinLocationsService;
}());
exports.BinLocationsService = BinLocationsService;
//# sourceMappingURL=bin-locations.service.js.map