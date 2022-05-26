"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var LANGUAGE = "language";
var DEFAULTLANGUAGE = "en";
var AppComponent = /** @class */ (function () {
    function AppComponent(translate, userSettings) {
        this.userSettings = userSettings;
        this.darkMode = false;
        this.menuColorMode = "light";
        this.menuColor = "layout-menu-light";
        this.themeColor = "blue";
        this.layoutColor = "blue";
        //Set default language
        translate.setDefaultLang(DEFAULTLANGUAGE);
        var currentLanguage = localStorage.getItem(LANGUAGE);
        if (currentLanguage) {
            translate.use(currentLanguage);
        }
        else {
            localStorage.setItem(LANGUAGE, DEFAULTLANGUAGE);
            translate.use(DEFAULTLANGUAGE);
        }
        var layoutColor = this.userSettings.layoutColor !== null ? this.userSettings.layoutColor : "blue";
        var darkMode = this.userSettings.darkMode !== null ? this.userSettings.darkMode : false;
        this.themeColor = this.userSettings.themeColor !== null ? this.userSettings.themeColor : "blue";
        this.loadLightDarkLayout("layout-css", layoutColor, darkMode ? "layout-dark" : "layout-light");
        if (darkMode) {
            this.loadLightDarkTheme("theme-css", "theme-dark");
            this.loadLightDarkTheme("custom-css", "custom-dark");
        }
        else {
            this.loadLightDarkTheme("theme-css", "theme-light");
            this.loadLightDarkTheme("custom-css", "custom-light");
        }
    }
    AppComponent.prototype.loadLightDarkLayout = function (id, color, mode) {
        var element = document.getElementById(id);
        var urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 2] = color;
        urlTokens[urlTokens.length - 1] = mode + ".css";
        var newUrl = urlTokens.join("/");
        this.replaceLink(element, newUrl);
    };
    AppComponent.prototype.loadLightDarkTheme = function (id, value) {
        if (this.themeColor === "blue" && id !== "custom-css") {
            var element = document.getElementById(id);
            var urlTokens = element.getAttribute("href").split("/");
            urlTokens[urlTokens.length - 1] = value + ".css";
            var newUrl = urlTokens.join("/");
            this.replaceLink(element, newUrl);
        }
        if (id === "custom-css") {
            var element = document.getElementById(id);
            var urlTokens = element.getAttribute("href").split("/");
            urlTokens[urlTokens.length - 1] = value + ".css";
            var newUrl = urlTokens.join("/");
            this.replaceLink(element, newUrl);
        }
        if (this.themeColor !== "blue" && id === "theme-css") {
            var element = document.getElementById(id);
            var urlTokens = element.getAttribute("href").split("/");
            urlTokens[urlTokens.length - 2] = this.themeColor;
            urlTokens[urlTokens.length - 1] = value + ".css";
            var newUrl = urlTokens.join("/");
            this.replaceLink(element, newUrl);
        }
    };
    AppComponent.prototype.replaceLink = function (linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute("href", href);
        }
        else {
            var id_1 = linkElement.getAttribute("id");
            var cloneLinkElement_1 = linkElement.cloneNode(true);
            cloneLinkElement_1.setAttribute("href", href);
            cloneLinkElement_1.setAttribute("id", id_1 + "-clone");
            linkElement.parentNode.insertBefore(cloneLinkElement_1, linkElement.nextSibling);
            cloneLinkElement_1.addEventListener("load", function () {
                linkElement.remove();
                cloneLinkElement_1.setAttribute("id", id_1);
            });
        }
    };
    AppComponent.prototype.isIE = function () {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "app-root",
            templateUrl: "./app.component.html",
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map