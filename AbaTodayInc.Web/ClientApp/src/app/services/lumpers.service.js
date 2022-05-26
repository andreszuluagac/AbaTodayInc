"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LumpersService = void 0;
var core_1 = require("@angular/core");
var LumpersService = /** @class */ (function () {
    function LumpersService(http, translate) {
        this.http = http;
        this.translate = translate;
    }
    LumpersService.prototype.getLumpers = function () {
        var endpoint = "api/lumpers/getLumpers";
        return this.http.get(endpoint);
    };
    LumpersService.prototype.getLumperById = function (id) {
        var endpoint = "api/lumpers/getById/" + id;
        return this.http.get(endpoint);
    };
    LumpersService.prototype.createLumper = function (lumper) {
        var endpoint = "api/lumpers/create";
        return this.http.post(endpoint, lumper);
    };
    LumpersService.prototype.updateLumper = function (lumper) {
        var endpoint = "api/lumpers/update";
        return this.http.post(endpoint, lumper);
    };
    LumpersService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], LumpersService);
    return LumpersService;
}());
exports.LumpersService = LumpersService;
//# sourceMappingURL=lumpers.service.js.map