"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
var core_1 = require("@angular/core");
var OrdersService = /** @class */ (function () {
    function OrdersService(http) {
        this.http = http;
        this.serviceData = new core_1.EventEmitter();
    }
    OrdersService.prototype.createReceipt = function (receipt) {
        var endpoint = "api/orders/createInboundReceipt";
        return this.http.post(endpoint, receipt);
    };
    OrdersService.prototype.updateReceipt = function (receipt) {
        var endpoint = "api/orders/updateInboundReceipt";
        return this.http.post(endpoint, receipt);
    };
    OrdersService.prototype.getReceiptTypes = function () {
        var endpoint = "api/orders/getReceiptTypes";
        return this.http.get(endpoint);
    };
    OrdersService.prototype.getReceiptSubtypes = function () {
        var endpoint = "api/orders/getReceiptSubtypes";
        return this.http.get(endpoint);
    };
    OrdersService.prototype.getReceiptPresentationTypes = function () {
        var endpoint = "api/orders/getReceiptPresentationTypes";
        return this.http.get(endpoint);
    };
    OrdersService.prototype.getContainerSizes = function () {
        var endpoint = "api/orders/getContainerSizes";
        return this.http.get(endpoint);
    };
    OrdersService.prototype.getReceiptById = function (id) {
        var endpoint = "api/orders/getReceiptById/" + id;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.rollbackLine = function (id) {
        var endpoint = "api/orders/rollbackLine/" + id;
        return this.http.post(endpoint, null);
    };
    OrdersService.prototype.getLineItemsByReceiptId = function (id) {
        var endpoint = "api/orders/getLineItemsByReceiptId/" + id;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.changeItemActiveStatus = function (item) {
        var endpoint = "api/orders/changeItemActiveStatus";
        return this.http.post(endpoint, item);
    };
    OrdersService.prototype.changeItemManualQty = function (item) {
        var endpoint = "api/orders/changeItemManualQty";
        return this.http.post(endpoint, item);
    };
    OrdersService.prototype.getInboundItemRatesByReceiptId = function (id) {
        var endpoint = "api/orders/getInboundItemRatesByReceiptId/" + id;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.isReceived = function (id) {
        var endpoint = "api/orders/isReceived/" + id;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.getLineItemDetailsByLineItemId = function (id) {
        var endpoint = "api/orders/getLineItemDetailsByLineItemId/" + id;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.saveReceiptLineItem = function (receiptLineItem) {
        var endpoint = "api/orders/saveReceiptLineItem";
        return this.http.post(endpoint, receiptLineItem);
    };
    OrdersService.prototype.deleteReceiptLineItem = function (lineItemId) {
        var endpoint = "api/orders/deleteReceiptLineItem/" + lineItemId;
        return this.http.delete(endpoint);
    };
    OrdersService.prototype.saveReceiptLineItemDetail = function (receiptLineItemDetail) {
        var endpoint = "api/orders/saveReceiptLineItemDetail";
        return this.http.post(endpoint, receiptLineItemDetail);
    };
    OrdersService.prototype.deleteReceiptLineItemDetail = function (lineItemDetailId) {
        var endpoint = "api/orders/deleteReceiptLineItemDetail/" + lineItemDetailId;
        return this.http.delete(endpoint);
    };
    OrdersService.prototype.getArrivedReceipts = function (filterData) {
        var endpoint = "api/orders/getArrivedReceipts";
        return this.http.post(endpoint, filterData ? filterData : {});
    };
    OrdersService.prototype.arrivedReceipts = function (receipts) {
        var endpoint = "api/orders/arrivedReceipts";
        return this.http.post(endpoint, receipts);
    };
    OrdersService.prototype.duplicateReceipts = function (receiptBulkEdit, duplicateChildren) {
        var endpoint = "api/orders/duplicateReceipts?duplicateChildren=" + duplicateChildren;
        return this.http.post(endpoint, receiptBulkEdit);
    };
    OrdersService.prototype.bulkEditReceipts = function (receiptBulkEdit) {
        var endpoint = "api/orders/bulkEditReceipts";
        return this.http.post(endpoint, receiptBulkEdit);
    };
    OrdersService.prototype.getShippingPresentationTypes = function () {
        var endpoint = "api/orders/getShippingPresentationTypes";
        return this.http.get(endpoint);
    };
    OrdersService.prototype.getShippingTypes = function () {
        var endpoint = "api/orders/getShippingTypes";
        return this.http.get(endpoint);
    };
    OrdersService.prototype.getShippingSubtypes = function () {
        var endpoint = "api/orders/getShippingSubtypes";
        return this.http.get(endpoint);
    };
    OrdersService.prototype.duplicateShippings = function (shippingBulkEdit, duplicateChildren) {
        var endpoint = "api/orders/duplicateShippings?duplicateChildren=" + duplicateChildren;
        return this.http.post(endpoint, shippingBulkEdit);
    };
    OrdersService.prototype.bulkEditShippings = function (shippingBulkEdit) {
        var endpoint = "api/orders/bulkEditShippings";
        return this.http.post(endpoint, shippingBulkEdit);
    };
    OrdersService.prototype.createShipping = function (shiping) {
        var endpoint = "api/orders/createOutboundShipping";
        return this.http.post(endpoint, shiping);
    };
    OrdersService.prototype.getShippingById = function (id) {
        var endpoint = "api/orders/getShippingById/" + id;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.getPackagingForShippingOrder = function (id) {
        var endpoint = "api/shippings/getPackagingForShippingOrder/" + id;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.getShippingOptionsForOrder = function (id) {
        var endpoint = "api/shippings/getShippingOptionsForOrder/" + id;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.createShippingLabelsForOrder = function (id, carrier, service, packages) {
        var endpoint = "api/shippings/createShippingLabelsForOrder/" + id + "?carrier=" + carrier + "&service=" + service;
        return this.http.post(endpoint, packages);
    };
    OrdersService.prototype.updateShipping = function (shipping) {
        var endpoint = "api/orders/updateInboundShipping";
        return this.http.post(endpoint, shipping);
    };
    OrdersService.prototype.releasedShippings = function (shippings) {
        var endpoint = "api/orders/releasedShippings";
        return this.http.post(endpoint, shippings);
    };
    OrdersService.prototype.getLineItemsByShippingId = function (id) {
        var endpoint = "api/orders/getLineItemsByShippingId/" + id;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.deleteShippingLineItem = function (lineItemId) {
        var endpoint = "api/orders/deleteShippingLineItem/" + lineItemId;
        return this.http.delete(endpoint);
    };
    OrdersService.prototype.saveShippingLineItem = function (shippingLineItem) {
        var endpoint = "api/orders/saveShippingLineItem";
        return this.http.post(endpoint, shippingLineItem);
    };
    OrdersService.prototype.getBillingDocumentById = function (id) {
        var endpoint = "api/orders/getBillingDocumentById/" + id;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.createBillingDocument = function (billingDocument) {
        var endpoint = "api/orders/createBillingDocument";
        return this.http.post(endpoint, billingDocument);
    };
    OrdersService.prototype.updateBillingDocument = function (billingDocument) {
        var endpoint = "api/orders/updateBillingDocument";
        return this.http.post(endpoint, billingDocument);
    };
    OrdersService.prototype.getBillingDocumentItemById = function (id) {
        var endpoint = "api/orders/getBillingDocumentItemById/" + id;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.createBillingDocumentItem = function (billingDocumentItem) {
        var endpoint = "api/orders/createBillingDocumentItem";
        return this.http.post(endpoint, billingDocumentItem);
    };
    OrdersService.prototype.updateBillingDocumentItem = function (billingDocumentItem) {
        var endpoint = "api/orders/updateBillingDocumentItem";
        return this.http.post(endpoint, billingDocumentItem);
    };
    OrdersService.prototype.getPickTypes = function () {
        var endpoint = "api/orders/getPickTypes";
        return this.http.get(endpoint);
    };
    OrdersService.prototype.getProductsForPickType = function (pickTypeId, filterData) {
        var endpoint = "api/orders/getProductsForPickTypeId/" + pickTypeId;
        return this.http.post(endpoint, filterData ? filterData : {});
    };
    OrdersService.prototype.getActiveShippingOrdersForProduct = function (productId, pickType, filterData) {
        var endpoint = "api/orders/getActiveShippingOrdersForProductId/" + productId + "?pickType=" + pickType;
        return this.http.post(endpoint, filterData ? filterData : {});
    };
    OrdersService.prototype.getBinLocationsWithProductInventoryForShipping = function (productId, siteId) {
        var endpoint = "api/orders/getBinLocationsWithProductInventoryForShipping/" + productId + "?siteId=" + siteId;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.getInventoriesByProductIdForShipping = function (productId, siteId) {
        var endpoint = "api/orders/getInventoriesByProductIdForShipping/" + productId + "?siteId=" + siteId;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.getStageToLoadToBinLocationsByShippingId = function (shippingId, siteId) {
        var endpoint = "api/orders/getStageToLoadToBinLocationsByShippingId/" + shippingId + "?siteId=" + siteId;
        return this.http.get(endpoint);
    };
    OrdersService.prototype.getActiveShippingOrdersForSubscriptionId = function (filterData) {
        var endpoint = "api/orders/getActiveShippingOrdersForSubscriptionId";
        return this.http.post(endpoint, filterData ? filterData : {});
    };
    OrdersService.prototype.getQtyOnHandsByUnitByProduct = function (id, totalPlannedQuantity) {
        var endpoint = "api/orders/getQtyOnHandsByUnitByProduct/" + id + "?totalPlannedQuantity=" + totalPlannedQuantity;
        return this.http.get(endpoint);
    };
    OrdersService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], OrdersService);
    return OrdersService;
}());
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map