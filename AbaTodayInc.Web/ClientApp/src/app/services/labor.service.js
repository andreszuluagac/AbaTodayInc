"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaborService = void 0;
var core_1 = require("@angular/core");
var LaborService = /** @class */ (function () {
    function LaborService(http) {
        this.http = http;
    }
    LaborService.prototype.getLaborById = function (id) {
        var endpoint = "api/labor/getLaborById/" + id;
        return this.http.get(endpoint);
    };
    LaborService.prototype.saveLabor = function (employeeLabor) {
        var endpoint = "api/labor/saveLabor";
        return this.http.post(endpoint, employeeLabor);
    };
    LaborService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], LaborService);
    return LaborService;
}());
exports.LaborService = LaborService;
//# sourceMappingURL=labor.service.js.map