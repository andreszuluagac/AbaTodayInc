"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
var core_1 = require("@angular/core");
var ProductsService = /** @class */ (function () {
    function ProductsService(http) {
        this.http = http;
        this.serviceData = new core_1.EventEmitter();
    }
    ProductsService.prototype.searchActiveProducts = function (productSearch) {
        var endpoint = "api/products/searchActiveProducts";
        return this.http.post(endpoint, productSearch);
    };
    ProductsService.prototype.getUnitsOfMeasure = function (entityId, isProduct) {
        var endpoint = "api/products/getUnitsOfMeasureByEntityId/" + entityId + "?isProduct=" + isProduct;
        return this.http.get(endpoint);
    };
    ProductsService.prototype.updateUnitOfMeasureValue = function (unitOfMeasureValue) {
        var endpoint = "api/products/updateUnitOfMeasureValue";
        return this.http.post(endpoint, unitOfMeasureValue);
    };
    ProductsService.prototype.deleteUnitOfMeasure = function (productId, uomTypeId) {
        var endpoint = "api/products/deleteUnitOfMeasure?productId=" + productId + "&uomTypeId=" + uomTypeId;
        return this.http.delete(endpoint);
    };
    ProductsService.prototype.getProductById = function (id, getStoreImages) {
        if (getStoreImages === void 0) { getStoreImages = false; }
        var endpoint = "api/products/getById/" + id + "?getStoreImages=" + getStoreImages;
        return this.http.get(endpoint);
    };
    ProductsService.prototype.getProductMissingDimensionsBySubscriptionId = function () {
        var endpoint = "api/products/getProductMissingDimensionsBySubscriptionId";
        return this.http.get(endpoint);
    };
    ProductsService.prototype.getProductListVelocityBySubscriptionId = function () {
        var endpoint = "api/products/getProductListVelocityBySubscriptionId";
        return this.http.get(endpoint);
    };
    ProductsService.prototype.getListProductsMissingDimensionsBySubscriptionId = function () {
        var endpoint = "api/products/getListProductsMissingDimensionsBySubscriptionId";
        return this.http.get(endpoint);
    };
    ProductsService.prototype.createProduct = function (product) {
        console.log(product);
        var endpoint = "api/products/create";
        return this.http.post(endpoint, product);
    };
    ProductsService.prototype.updateProduct = function (product) {
        var endpoint = "api/products/update";
        return this.http.post(endpoint, product);
    };
    ProductsService.prototype.filterActiveProducts = function (productFilter) {
        var endpoint = "api/products/filterActiveProducts";
        return this.http.post(endpoint, productFilter);
    };
    ProductsService.prototype.validateProduct = function (id) {
        var endpoint = "api/products/validateproduct/" + id;
        return this.http.get(endpoint);
    };
    ProductsService.prototype.createManualCycleCount = function (manualCycleCount) {
        var endpoint = "api/products/createManualCycleCount";
        return this.http.post(endpoint, manualCycleCount);
    };
    ProductsService.prototype.getBundleById = function (id) {
        var endpoint = "api/products/getBundleById/" + id;
        return this.http.get(endpoint);
    };
    ProductsService.prototype.createBundle = function (bundle) {
        var endpoint = "api/products/createBundle";
        return this.http.post(endpoint, bundle);
    };
    ProductsService.prototype.updateBundle = function (bundle) {
        var endpoint = "api/products/updateBundle";
        return this.http.post(endpoint, bundle);
    };
    ProductsService.prototype.getBillingItemById = function (id) {
        var endpoint = "api/products/getBillingItemById/" + id;
        return this.http.get(endpoint);
    };
    ProductsService.prototype.createBillingItem = function (billingItem) {
        var endpoint = "api/products/createBillingItem";
        return this.http.post(endpoint, billingItem);
    };
    ProductsService.prototype.updateBillingItem = function (billingItem) {
        var endpoint = "api/products/updateBillingItem";
        return this.http.post(endpoint, billingItem);
    };
    //Product Categories
    ProductsService.prototype.getProductCategories = function (businessId) {
        var endpoint = "api/products/getAllProductCategoriesByBusinessId/" + businessId;
        return this.http.get(endpoint);
    };
    ProductsService.prototype.renameCategory = function (categoryId, newName) {
        var stringValue = {
            stringValue: newName
        };
        var endpoint = "api/products/renameCategory/" + categoryId;
        return this.http.post(endpoint, stringValue);
    };
    ProductsService.prototype.createChildCategory = function (businessId, parentCategoryId, newName) {
        var stringValue = {
            stringValue: newName
        };
        var endpoint = "api/products/createChildCategoryForBusiness/" + businessId;
        if (parentCategoryId) {
            endpoint += "?parentCategoryId=" + parentCategoryId;
        }
        return this.http.post(endpoint, stringValue);
    };
    ProductsService.prototype.changeParentCategory = function (nodeId, parentCategoryId, isLeaf) {
        var endpoint = "api/products/changeParentCategoryByNodeId/" + nodeId + "?parentCategoryId=" + parentCategoryId + "&isLeaf=" + isLeaf;
        return this.http.get(endpoint);
    };
    ProductsService.prototype.deleteCategory = function (categoryId) {
        var endpoint = "api/products/deleteCategory/" + categoryId;
        return this.http.delete(endpoint);
    };
    ProductsService.prototype.toggleVisibleInFrontPage = function (productId) {
        var endpoint = "api/products/toggleVisibleInFrontPageForProduct/" + productId;
        return this.http.get(endpoint);
    };
    ProductsService.prototype.removeStoreImage = function (storeImageId) {
        var endpoint = "api/products/removeStoreImage/" + storeImageId;
        return this.http.delete(endpoint);
    };
    ProductsService.prototype.updateStoreImageOrder = function (productId, storeImages) {
        var endpoint = "api/products/updateStoreImageOrderForProductId/" + productId;
        return this.http.post(endpoint, storeImages);
    };
    ProductsService.prototype.getSupplyProductsBySubscriptionId = function (id) {
        var endpoint = "api/products/getSupplyProductsBySubscriptionId/" + id;
        return this.http.get(endpoint);
    };
    ProductsService.prototype.getSupplyBundlesBySubscriptionId = function (id) {
        var endpoint = "api/products/getSupplyBundlesBySubscriptionId/" + id;
        return this.http.get(endpoint);
    };
    ProductsService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], ProductsService);
    return ProductsService;
}());
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map