"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoriesService = void 0;
var core_1 = require("@angular/core");
var InventoriesService = /** @class */ (function () {
    function InventoriesService(http, translate) {
        this.http = http;
        this.translate = translate;
        this.serviceData = new core_1.EventEmitter();
    }
    InventoriesService.prototype.getReasonCodes = function () {
        var endpoint = "api/inventories/getReasonCodes";
        return this.http.get(endpoint);
    };
    InventoriesService.prototype.getReasonCodeById = function (id) {
        var endpoint = "api/inventories/getReasonCodeById/" + id;
        return this.http.get(endpoint);
    };
    InventoriesService.prototype.createReasonCode = function (reasonCode) {
        var endpoint = "api/inventories/createReasonCode";
        return this.http.post(endpoint, reasonCode);
    };
    InventoriesService.prototype.updateReasonCode = function (reasonCode) {
        var endpoint = "api/inventories/updateReasonCode";
        return this.http.post(endpoint, reasonCode);
    };
    InventoriesService.prototype.getLpns = function (count) {
        var endpoint = "api/inventories/getLicensePlateNumbers/" + count;
        return this.http.get(endpoint);
    };
    InventoriesService.prototype.validateLpn = function (lpn) {
        var endpoint = "api/inventories/validateLicensePlateNumber/" + lpn;
        return this.http.get(endpoint);
    };
    InventoriesService.prototype.deleteLpnsByTransactionId = function (transactionId) {
        var endpoint = "api/inventories/deleteLpnsByTransactionId/" + transactionId;
        return this.http.delete(endpoint);
    };
    InventoriesService.prototype.createInventory = function (newInventory) {
        var endpoint = "api/inventories/createInventory";
        return this.http.post(endpoint, newInventory);
    };
    InventoriesService.prototype.getInventoryById = function (id) {
        var endpoint = "api/inventories/getInventoryById/" + id;
        return this.http.get(endpoint);
    };
    InventoriesService.prototype.updateInventories = function (editInventory) {
        var endpoint = "api/inventories/updateInventories";
        return this.http.post(endpoint, editInventory);
    };
    InventoriesService.prototype.transferInventories = function (transferInventory, useGeneratedId, newStatusId) {
        if (useGeneratedId === void 0) { useGeneratedId = true; }
        if (newStatusId === void 0) { newStatusId = null; }
        var endpoint = "api/inventories/transferInventories?useGeneratedId=" + useGeneratedId;
        if (newStatusId) {
            endpoint += "&newStatusId=" + newStatusId;
        }
        return this.http.post(endpoint, transferInventory);
    };
    InventoriesService.prototype.adjustInventories = function (adjustInventory) {
        var endpoint = "api/inventories/adjustInventories";
        return this.http.post(endpoint, adjustInventory);
    };
    InventoriesService.prototype.changeInventoryStatus = function (inventoryStatus) {
        var endpoint = "api/inventories/changeInventoryStatus";
        return this.http.post(endpoint, inventoryStatus);
    };
    InventoriesService.prototype.adjustCycleCount = function (adjustCycleCount) {
        var endpoint = "api/inventories/adjustCycleCount";
        return this.http.post(endpoint, adjustCycleCount);
    };
    InventoriesService.prototype.adjustCycleCountManager = function (adjustCycleCount) {
        var endpoint = "api/inventories/adjustCycleCountManager";
        return this.http.post(endpoint, adjustCycleCount);
    };
    InventoriesService.prototype.adjustManualCycleCountManager = function (adjustCycleCount) {
        console.log(adjustCycleCount);
        var endpoint = "api/inventories/adjustManualCycleCountManager";
        return this.http.post(endpoint, adjustCycleCount);
    };
    InventoriesService.prototype.changeManualCycleCountStatus = function (manualCycleCountStatus) {
        var endpoint = "api/inventories/changeManualCycleCountStatus";
        return this.http.post(endpoint, manualCycleCountStatus);
    };
    InventoriesService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], InventoriesService);
    return InventoriesService;
}());
exports.InventoriesService = InventoriesService;
//# sourceMappingURL=inventories.service.js.map