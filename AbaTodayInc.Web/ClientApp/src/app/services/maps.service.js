"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapsService = void 0;
var core_1 = require("@angular/core");
var MapsService = /** @class */ (function () {
    function MapsService(http) {
        this.http = http;
        this.apiKey = "RGxf8lcneCkiipD-6evUob6RVdM0zEvfDGf2A139s2w";
        this.appId = "7mS0BOb8or2tiPALfvdB";
        this.platform = new H.service.Platform({
            'apikey': this.apiKey
        });
        this.geocoder = this.platform.getSearchService();
    }
    MapsService.prototype.searchAddress = function (text) {
        var endpoint = "https://geocode.search.hereapi.com/v1/geocode?q=" + text + "&apiKey=" + this.apiKey;
        return this.http.get(endpoint);
    };
    MapsService.prototype.getAddress = function (query) {
        this.geocoder.geocode({
            q: query
        }, function (result) {
            console.log(result);
        }, function (error) {
            console.log(error);
        });
        //return new Promise((resolve, reject) => {
        //    this.geocoder.geocode({ searchText: query }, result => {
        //        console.log(result.response);
        //        if (result.Response.View.length > 0) {
        //            if (result.Response.View[0].Result.length > 0) {
        //                resolve(result.Response.View);
        //            } else {
        //                reject({ message: "no results found" });
        //            }
        //        } else {
        //            reject({ message: "no results found" });
        //        }
        //    }, error => {
        //        reject(error);
        //    });
        //});
    };
    MapsService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], MapsService);
    return MapsService;
}());
exports.MapsService = MapsService;
//# sourceMappingURL=maps.service.js.map