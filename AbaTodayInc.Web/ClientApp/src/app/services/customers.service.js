"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
var core_1 = require("@angular/core");
var CustomersService = /** @class */ (function () {
    function CustomersService(http) {
        this.http = http;
        this.serviceData = new core_1.EventEmitter();
    }
    CustomersService.prototype.getAllCustomer = function () {
        var endpoint = "api/customers/getAll";
        return this.http.get(endpoint);
    };
    CustomersService.prototype.getCustomerById = function (id) {
        var endpoint = "api/customers/getById/" + id;
        return this.http.get(endpoint);
    };
    CustomersService.prototype.getCustomerByEmail = function (businessId, email) {
        var endpoint = "api/customers/getByEmailForBusiness/" + businessId + "?email=" + email;
        return this.http.get(endpoint);
    };
    CustomersService.prototype.createCustomer = function (customer) {
        var endpoint = "api/customers/create";
        return this.http.post(endpoint, customer);
    };
    CustomersService.prototype.updateCustomer = function (customer) {
        var endpoint = "api/customers/update";
        return this.http.post(endpoint, customer);
    };
    CustomersService.prototype.deleteCustomer = function (id) {
        var endpoint = "api/customers/delete/" + id;
        return this.http.delete(endpoint);
    };
    CustomersService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], CustomersService);
    return CustomersService;
}());
exports.CustomersService = CustomersService;
//# sourceMappingURL=customers.service.js.map