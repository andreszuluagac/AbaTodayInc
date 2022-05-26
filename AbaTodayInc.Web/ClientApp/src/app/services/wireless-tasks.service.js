"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WirelessTasksService = void 0;
var core_1 = require("@angular/core");
var WirelessTasksService = /** @class */ (function () {
    function WirelessTasksService(http) {
        this.http = http;
        this.serviceData = new core_1.EventEmitter();
    }
    //Automated Cycle Count
    WirelessTasksService.prototype.getActiveAutomatedCycleCounts = function () {
        var endpoint = "api/tasks/getActiveAutomatedCycleCounts";
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getAutomatedCycleCountResultByProductId = function (cycleCountId) {
        var endpoint = "api/tasks/getAutomatedCycleCountResultByProductId/" + cycleCountId;
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.saveCycleCountValue = function (activeAutomatedCycleCountResult) {
        var endpoint = "api/tasks/saveCycleCountValue";
        return this.http.post(endpoint, activeAutomatedCycleCountResult);
    };
    WirelessTasksService.prototype.finalizeCycleCount = function (cycleCount) {
        var endpoint = "api/tasks/finalizeCycleCount";
        return this.http.post(endpoint, cycleCount);
    };
    WirelessTasksService.prototype.getProductsWithCycleCounts = function (selectedShowAll) {
        var endpoint = "";
        if (selectedShowAll) {
            endpoint = "api/tasks/getProductsWithAllCycleCounts";
        }
        else {
            endpoint = "api/tasks/getProductsWithCycleCounts";
        }
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getPendingTasksSummary = function (filterData) {
        var endpoint = "api/tasks/getPendingTasksSummary";
        return this.http.post(endpoint, filterData);
    };
    WirelessTasksService.prototype.getCycleCountDetails = function (cycleCountId) {
        var endpoint = "api/tasks/getCycleCountDetails/" + cycleCountId;
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getProductStatusesWithCount = function (cycleCountResultId) {
        var endpoint = "api/tasks/getProductStatusesWithCount/" + cycleCountResultId;
        return this.http.get(endpoint);
    };
    //Manual Cycle Count
    WirelessTasksService.prototype.getActiveManualCycleCounts = function () {
        var endpoint = "api/tasks/getActiveManualCycleCounts";
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getBinLocationByManualCycleCountId = function (id) {
        var endpoint = "api/tasks/getBinLocationByManualCycleCountId/" + id;
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getManualCycleCountResultByProductId = function (cycleCountId) {
        var endpoint = "api/tasks/getManualCycleCountResultByProductId/" + cycleCountId;
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getManualCycleCountById = function (id) {
        var endpoint = "api/tasks/getManualCycleCountById/" + id;
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getManualCycleCountResultByBinLocationId = function (cycleCountId, binLocationId) {
        var endpoint = "api/tasks/getManualCycleCountResultByBinLocationId/" + cycleCountId + "?binLocationId=" + binLocationId;
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.saveManualCycleCountValue = function (activeManualCycleCountResult) {
        var endpoint = "api/tasks/saveManualCycleCountValue";
        return this.http.post(endpoint, activeManualCycleCountResult);
    };
    WirelessTasksService.prototype.finalizeManualCycleCount = function (id) {
        var endpoint = "api/tasks/finalizeManualCycleCount/" + id;
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getProductsWithManualCycleCounts = function (selectedShowAll) {
        var endpoint = "";
        if (selectedShowAll) {
            endpoint = "api/tasks/getProductsWithAllManualCycleCounts";
        }
        else {
            endpoint = "api/tasks/getProductsWithManualCycleCounts";
        }
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getManualCycleCountPendingTasksSummary = function () {
        var endpoint = "api/tasks/getManualCycleCountPendingTasksSummary";
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getManualCycleCountDetails = function (cycleCountId) {
        var endpoint = "api/tasks/getManualCycleCountDetails/" + cycleCountId;
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getProductStatusesWithManualCycleCount = function (cycleCountResultId) {
        var endpoint = "api/tasks/getProductStatusesWithManualCount/" + cycleCountResultId;
        return this.http.get(endpoint);
    };
    //Direct Put Away
    WirelessTasksService.prototype.getBinLocationsForDirectPutAway = function (siteId) {
        var endpoint = "api/tasks/getBinLocationsForDirectPutAwayBySiteId/" + (siteId ? siteId : "");
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getProductsForDirectPutAwayByBinLocationId = function (binLocationId) {
        var endpoint = "api/tasks/getProductsForDirectPutAwayByBinLocationId/" + (binLocationId ? binLocationId : "");
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getLineItemDetailsForDirectPutAwayByProductId = function (productId) {
        var endpoint = "api/tasks/getLineItemDetailsForDirectPutAwayByProductId/" + (productId ? productId : "");
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getTargetBinLocationsForDirectPutAway = function (siteId) {
        var endpoint = "api/tasks/getTargetBinLocationsForDirectPutAwayBySiteId/" + (siteId ? siteId : "");
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getSuggestedBinLocationByDetailId = function (siteId, detailId) {
        var endpoint = "api/tasks/getSuggestedBinLocationByDetailId/" + detailId + "?siteId=" + siteId;
        return this.http.get(endpoint);
    };
    //Replenishment
    WirelessTasksService.prototype.getProductsForReplenishment = function (siteId) {
        var endpoint = "api/tasks/getProductsForReplenishmentBySiteId/" + (siteId ? siteId : "");
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getSourceBinLocationsForReplenishment = function (siteId, productId) {
        var endpoint = "api/tasks/getSourceBinLocationsForReplenishmentBySiteId/" + siteId + "?productId=" + productId;
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getInventoriesForSourceBinLocation = function (binLocationId, productId) {
        var endpoint = "api/tasks/getInventoriesForProductBySourceBinLocationId/" + binLocationId + "?productId=" + productId;
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getTargetBinLocationsForReplenishment = function (siteId) {
        var endpoint = "api/tasks/getTargetBinLocationsForReplenishmentBySiteId/" + (siteId ? siteId : "");
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.getSuggestedBinLocationByProductId = function (siteId, productId, quantity) {
        var endpoint = "api/tasks/getSuggestedBinLocationByProductId/" + productId + "?siteId=" + siteId + "&quantity=" + quantity;
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.markReplenishmentTasksAsComplete = function (replenishmentTask) {
        var endpoint = "api/tasks/markReplenishmentTasksAsComplete";
        return this.http.post(endpoint, replenishmentTask);
    };
    //Consolidation
    WirelessTasksService.prototype.getTargetBinLocationsForConsolidation = function (siteId) {
        var endpoint = "api/tasks/getTargetBinLocationsForConsolidationBySiteId/" + (siteId ? siteId : "");
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.consolidateBinLocationInventories = function (consolidationBinLocation) {
        var endpoint = "api/tasks/consolidateBinLocationInventories";
        return this.http.post(endpoint, consolidationBinLocation);
    };
    //Services
    WirelessTasksService.prototype.getServiceOrdersForActiveUser = function () {
        var endpoint = "api/tasks/getServiceOrdersForActiveUser";
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.startServiceLineItem = function (lineItemId) {
        var endpoint = "api/tasks/startServiceLineItem/" + lineItemId;
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.endServiceLineItem = function (lineItemId) {
        var endpoint = "api/tasks/endServiceLineItem/" + lineItemId;
        return this.http.get(endpoint);
    };
    WirelessTasksService.prototype.markServiceAsNotCompleted = function (serviceOrderId, reason) {
        var stringValue = {
            stringValue: reason
        };
        var endpoint = "api/tasks/markServiceAsNotCompleted/" + serviceOrderId;
        return this.http.post(endpoint, stringValue);
    };
    WirelessTasksService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], WirelessTasksService);
    return WirelessTasksService;
}());
exports.WirelessTasksService = WirelessTasksService;
//# sourceMappingURL=wireless-tasks.service.js.map