"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
var core_1 = require("@angular/core");
var FileUploadService = /** @class */ (function () {
    function FileUploadService(http) {
        this.http = http;
    }
    FileUploadService.prototype.postFileProduct = function (formData) {
        var endpoint = "api/products/upload";
        return this.http.post(endpoint, formData);
    };
    FileUploadService.prototype.postFileProductUpdate = function (formData, productId) {
        var endpoint = "api/products/upload/" + productId;
        return this.http.post(endpoint, formData);
    };
    FileUploadService.prototype.postFileBundle = function (formData) {
        var endpoint = "api/products/uploadBundle";
        return this.http.post(endpoint, formData);
    };
    FileUploadService.prototype.postFileBundleUpdate = function (formData, bundleId) {
        var endpoint = "api/products/uploadBundle/" + bundleId;
        return this.http.post(endpoint, formData);
    };
    FileUploadService.prototype.postPhotoProfile = function (formData) {
        var endpoint = "api/account/upload";
        return this.http.post(endpoint, formData);
    };
    FileUploadService.prototype.postFileLineItem = function (formData, detailId, receiptLineItemId, quantity, inventoryStatusId) {
        var endpoint = "api/orders/uploadImage/" + detailId + "?receiptLineItemId=" + receiptLineItemId + "&quantity=" + quantity + "&inventoryStatusId=" + inventoryStatusId;
        return this.http.post(endpoint, formData);
    };
    FileUploadService.prototype.postFileOrders = function (formData, pathFolder, receiptId) {
        if (receiptId === void 0) { receiptId = null; }
        if (receiptId) {
            var endpoint_1 = "api/orders/attachFile/" + receiptId + "?pathFolder=" + pathFolder;
            return this.http.post(endpoint_1, formData);
        }
        var endpoint = "api/orders/attachFile?pathFolder=" + pathFolder;
        return this.http.post(endpoint, formData);
    };
    FileUploadService.prototype.postFileService = function (formData, serviceId) {
        var endpoint = "api/services/uploadImage";
        if (serviceId) {
            endpoint += "/" + serviceId;
        }
        return this.http.post(endpoint, formData);
    };
    FileUploadService.prototype.postFileProductStoreImage = function (formData, productId, order) {
        var endpoint = "api/products/uploadStoreImage/" + productId + "?order=" + order;
        return this.http.post(endpoint, formData);
    };
    FileUploadService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], FileUploadService);
    return FileUploadService;
}());
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=file-upload.service.js.map