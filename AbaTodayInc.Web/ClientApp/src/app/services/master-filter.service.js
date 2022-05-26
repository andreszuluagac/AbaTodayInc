"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterFilterService = void 0;
var core_1 = require("@angular/core");
var FILTEREDSITES = "filteredSites";
var FILTEREDSITENAMES = "filteredSiteNames";
var FILTEREDBUSINESSES = "filteredBusinesses";
var FILTEREDBUSINESSNAMES = "filteredBusinessNames";
var MasterFilterService = /** @class */ (function () {
    function MasterFilterService() {
        this.filterChange = new core_1.EventEmitter();
    }
    Object.defineProperty(MasterFilterService.prototype, "filteredSite", {
        get: function () {
            if (this._filteredSite) {
                return this._filteredSite;
            }
            var filteredSitesString = localStorage.getItem(FILTEREDSITES);
            if (filteredSitesString) {
                this.filteredSite = filteredSitesString;
            }
            else {
                this._filteredSite = null;
            }
            return this._filteredSite;
        },
        set: function (value) {
            this._filteredSite = value;
            if (!value) {
                localStorage.removeItem(FILTEREDSITES);
            }
            else {
                localStorage.setItem(FILTEREDSITES, value.toString());
            }
            this.filterChange.emit();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MasterFilterService.prototype, "filteredSiteNames", {
        get: function () {
            if (this._filteredSiteNames) {
                return this._filteredSiteNames;
            }
            var filteredSiteNamesString = localStorage.getItem(FILTEREDSITENAMES);
            if (filteredSiteNamesString) {
                this.filteredSiteNames = filteredSiteNamesString;
            }
            else {
                this._filteredSiteNames = null;
            }
            return this._filteredSiteNames;
        },
        set: function (value) {
            this._filteredSiteNames = value;
            if (!value) {
                localStorage.removeItem(FILTEREDSITENAMES);
            }
            else {
                localStorage.setItem(FILTEREDSITENAMES, value.toString());
            }
            this.filterChange.emit();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MasterFilterService.prototype, "filteredBusinesses", {
        get: function () {
            if (this._filteredBusinesses) {
                return this._filteredBusinesses;
            }
            var filteredBusinessesString = localStorage.getItem(FILTEREDBUSINESSES);
            if (filteredBusinessesString) {
                this._filteredBusinesses = filteredBusinessesString.split(",");
            }
            else {
                this._filteredBusinesses = [];
            }
            return this._filteredBusinesses;
        },
        set: function (value) {
            this._filteredBusinesses = value;
            if (!value) {
                localStorage.removeItem(FILTEREDBUSINESSES);
            }
            else {
                localStorage.setItem(FILTEREDBUSINESSES, value.toString());
            }
            this.filterChange.emit();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MasterFilterService.prototype, "filteredBusinessNames", {
        get: function () {
            if (this._filteredBusinessNames) {
                return this._filteredBusinessNames;
            }
            var filteredBusinessNamesString = localStorage.getItem(FILTEREDBUSINESSNAMES);
            if (filteredBusinessNamesString) {
                this._filteredBusinessNames = filteredBusinessNamesString.split(",");
            }
            else {
                this._filteredBusinessNames = [];
            }
            return this._filteredBusinessNames;
        },
        set: function (value) {
            this._filteredBusinessNames = value;
            if (!value) {
                localStorage.removeItem(FILTEREDBUSINESSNAMES);
            }
            else {
                localStorage.setItem(FILTEREDBUSINESSNAMES, value.toString());
            }
            this.filterChange.emit();
        },
        enumerable: false,
        configurable: true
    });
    MasterFilterService.prototype.getFilterChangeEmitter = function () {
        return this.filterChange;
    };
    __decorate([
        core_1.Output()
    ], MasterFilterService.prototype, "filterChange", void 0);
    MasterFilterService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], MasterFilterService);
    return MasterFilterService;
}());
exports.MasterFilterService = MasterFilterService;
//# sourceMappingURL=master-filter.service.js.map