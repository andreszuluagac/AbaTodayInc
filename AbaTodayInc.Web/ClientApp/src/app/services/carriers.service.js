"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarriersService = void 0;
var core_1 = require("@angular/core");
var CarriersService = /** @class */ (function () {
    function CarriersService(http, translate) {
        this.http = http;
        this.translate = translate;
    }
    CarriersService.prototype.getCarriers = function () {
        var endpoint = "api/carriers/getCarriers";
        return this.http.get(endpoint);
    };
    CarriersService.prototype.getCarrierById = function (id) {
        var endpoint = "api/carriers/getById/" + id;
        return this.http.get(endpoint);
    };
    CarriersService.prototype.createCarrier = function (carrier) {
        var endpoint = "api/carriers/create";
        return this.http.post(endpoint, carrier);
    };
    CarriersService.prototype.updateCarrier = function (carrier) {
        var endpoint = "api/carriers/update";
        return this.http.post(endpoint, carrier);
    };
    CarriersService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], CarriersService);
    return CarriersService;
}());
exports.CarriersService = CarriersService;
//# sourceMappingURL=carriers.service.js.map