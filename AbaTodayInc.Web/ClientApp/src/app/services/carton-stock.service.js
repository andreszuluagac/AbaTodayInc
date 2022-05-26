"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartonStockService = void 0;
var core_1 = require("@angular/core");
var CartonStockService = /** @class */ (function () {
    function CartonStockService(http, translate) {
        this.http = http;
        this.translate = translate;
        this.serviceData = new core_1.EventEmitter();
        this.cartonStocksReload = new core_1.EventEmitter();
    }
    CartonStockService.prototype.getCartonStocks = function () {
        var endpoint = "api/cartonStocks/getCartonStocks";
        return this.http.get(endpoint);
    };
    CartonStockService.prototype.getCartonStockById = function (id) {
        var endpoint = "api/cartonStocks/getById/" + id;
        return this.http.get(endpoint);
    };
    CartonStockService.prototype.createCartonStock = function (lumper) {
        var endpoint = "api/cartonStocks/create";
        return this.http.post(endpoint, lumper);
    };
    CartonStockService.prototype.updateCartonStock = function (cartonStock) {
        var endpoint = "api/cartonStocks/update";
        return this.http.post(endpoint, cartonStock);
    };
    CartonStockService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CartonStockService);
    return CartonStockService;
}());
exports.CartonStockService = CartonStockService;
//# sourceMappingURL=carton-stock.service.js.map