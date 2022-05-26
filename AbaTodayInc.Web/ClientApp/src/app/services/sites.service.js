"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitesService = void 0;
var core_1 = require("@angular/core");
var SitesService = /** @class */ (function () {
    function SitesService(http) {
        this.http = http;
        this.serviceData = new core_1.EventEmitter();
        this.sitesReload = new core_1.EventEmitter();
    }
    SitesService.prototype.getActiveSites = function () {
        var endpoint = "api/sites/GetActiveSites";
        return this.http.get(endpoint);
    };
    SitesService.prototype.getActiveSiteNames = function () {
        var endpoint = "api/sites/getActiveSiteNames";
        return this.http.get(endpoint);
    };
    SitesService.prototype.getSiteById = function (id) {
        var endpoint = "api/sites/getById/" + id;
        return this.http.get(endpoint);
    };
    SitesService.prototype.createSite = function (site) {
        var endpoint = "api/sites/create";
        return this.http.post(endpoint, site);
    };
    SitesService.prototype.updateSite = function (site) {
        var endpoint = "api/sites/update";
        return this.http.post(endpoint, site);
    };
    SitesService.prototype.getBinTypesBySiteId = function (siteId) {
        var endpoint = "api/sites/getBinTypesBySiteId/" + siteId;
        return this.http.get(endpoint);
    };
    SitesService.prototype.getSiteBinTypeById = function (id) {
        var endpoint = "api/sites/getSiteBinTypeById/" + id;
        return this.http.get(endpoint);
    };
    SitesService.prototype.createSiteBinType = function (siteBinType) {
        var endpoint = "api/sites/createSiteBinType";
        return this.http.post(endpoint, siteBinType);
    };
    SitesService.prototype.updateSiteBinType = function (site) {
        var endpoint = "api/sites/updateSiteBinType";
        return this.http.post(endpoint, site);
    };
    SitesService.prototype.searchActiveSites = function (siteSearch) {
        var endpoint = "api/sites/searchActiveSites";
        return this.http.post(endpoint, siteSearch);
    };
    SitesService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], SitesService);
    return SitesService;
}());
exports.SitesService = SitesService;
//# sourceMappingURL=sites.service.js.map