"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresService = void 0;
var core_1 = require("@angular/core");
var CARTKEY = "logicpodcart";
var StoresService = /** @class */ (function () {
    function StoresService(http) {
        this.http = http;
        this.storeData = new core_1.EventEmitter();
    }
    StoresService.prototype.getStoreByBusinessId = function (id) {
        var endpoint = "api/stores/getStoreByBusinessId/" + id;
        return this.http.get(endpoint);
    };
    StoresService.prototype.getStoreByUrl = function (url) {
        var endpoint = "api/stores/getStoreByUrl/" + url;
        return this.http.get(endpoint);
    };
    StoresService.prototype.getProductsOrServices = function (businessId, categoryId) {
        if (categoryId === void 0) { categoryId = null; }
        var endpoint = "api/stores/getProductsOrServicesByBusinessForCategoryId/" + businessId;
        if (categoryId) {
            endpoint += "?categoryId=" + categoryId;
        }
        return this.http.get(endpoint);
    };
    StoresService.prototype.getStoreAboutHtml = function (businessId) {
        var endpoint = "api/stores/getStoreAboutHtml/" + businessId;
        return this.http.get(endpoint);
    };
    StoresService.prototype.getProductOrService = function (itemId) {
        var endpoint = "api/stores/getProductOrServiceById/" + itemId;
        return this.http.get(endpoint);
    };
    StoresService.prototype.isUrlSegmentValid = function (businessId, url) {
        var endpoint = "api/stores/isUrlSegmentValidForBusinessId/" + businessId + "?url=" + url;
        return this.http.get(endpoint);
    };
    StoresService.prototype.saveStoreChanges = function (store) {
        var endpoint = "api/stores/saveStoreChanges";
        return this.http.post(endpoint, store);
    };
    StoresService.prototype.deleteOnlineStore = function (businessId) {
        var endpoint = "api/stores/deleteOnlineStoreForBusiness/" + businessId;
        return this.http.delete(endpoint);
    };
    StoresService.prototype.processStoreOrder = function (checkoutSummary) {
        var endpoint = "api/stores/processStoreOrder";
        return this.http.post(endpoint, checkoutSummary);
    };
    StoresService.prototype.calculateShippingOptions = function (storeSummary) {
        var endpoint = "api/stores/calculateShippingOptions";
        return this.http.post(endpoint, storeSummary);
    };
    //Local Storage Methods
    StoresService.prototype.getCartItemsFromLocalStorage = function (businessId) {
        var cartItemsJson = localStorage.getItem(CARTKEY + businessId);
        var cartItems = JSON.parse(cartItemsJson);
        return cartItems;
    };
    StoresService.prototype.addCartItemToLocalStorage = function (businessId, item) {
        var found = false;
        var currentItems = this.getCartItemsFromLocalStorage(businessId);
        if (!currentItems) {
            currentItems = [];
        }
        for (var i = 0; i < currentItems.length; i++) {
            if (currentItems[i].itemId === item.itemId) {
                currentItems[i].quantity += +item.quantity;
                i = currentItems.length;
                found = true;
            }
        }
        if (!found) {
            currentItems.push(item);
        }
        localStorage.removeItem(CARTKEY + businessId);
        localStorage.setItem(CARTKEY + businessId, JSON.stringify(currentItems));
        return currentItems;
    };
    StoresService.prototype.emptyCartInLocalStorage = function (businessId) {
        localStorage.removeItem(CARTKEY + businessId);
    };
    StoresService.prototype.removeCartItemFromLocalStorage = function (businessId, itemId) {
        var currentItems = this.getCartItemsFromLocalStorage(businessId);
        for (var i = 0; i < currentItems.length; i++) {
            if (currentItems[i].itemId === itemId) {
                currentItems.splice(i, 1);
                i = currentItems.length;
            }
        }
        localStorage.removeItem(CARTKEY + businessId);
        localStorage.setItem(CARTKEY + businessId, JSON.stringify(currentItems));
        return currentItems;
    };
    StoresService.prototype.updateCartItemQuantityInLocalStorage = function (businessId, itemId, newQuantity) {
        if (newQuantity == 0) {
            return this.removeCartItemFromLocalStorage(businessId, itemId);
        }
        var currentItems = this.getCartItemsFromLocalStorage(businessId);
        for (var i = 0; i < currentItems.length; i++) {
            if (currentItems[i].itemId === itemId) {
                currentItems[i].quantity = newQuantity;
                i = currentItems.length;
            }
        }
        localStorage.removeItem(CARTKEY + businessId);
        localStorage.setItem(CARTKEY + businessId, JSON.stringify(currentItems));
        return currentItems;
    };
    StoresService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StoresService);
    return StoresService;
}());
exports.StoresService = StoresService;
//# sourceMappingURL=stores.service.js.map