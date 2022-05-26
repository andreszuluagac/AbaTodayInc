"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigComponent = void 0;
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var AppConfigComponent = /** @class */ (function () {
    function AppConfigComponent(app, userSettings) {
        this.app = app;
        this.userSettings = userSettings;
    }
    AppConfigComponent.prototype.ngOnInit = function () {
        this.lightColors = [
            { name: "Blue", file: "blue", image: "blue.svg" },
            { name: "Green", file: "green", image: "green.svg" },
            { name: "Yellow", file: "yellow", image: "yellow.svg" },
            { name: "Cyan", file: "cyan", image: "cyan.svg" },
            { name: "Purple", file: "purple", image: "purple.svg" },
            { name: "Orange", file: "orange", image: "orange.svg" },
            { name: "Teal", file: "teal", image: "teal.svg" },
            { name: "Magenta", file: "magenta", image: "magenta.svg" },
            { name: "Lime", file: "lime", image: "lime.svg" },
            { name: "Brown", file: "brown", image: "brown.svg" },
            { name: "Red", file: "red", image: "red.svg" },
            { name: "Indigo", file: "indigo", image: "indigo.svg" }
        ];
        this.darkColors = [
            { name: "Blue", file: "blue", image: "blue.svg" },
            { name: "Green", file: "green", image: "green.svg" },
            { name: "Yellow", file: "yellow", image: "yellow.svg" },
            { name: "Cyan", file: "cyan", image: "cyan.svg" },
            { name: "Purple", file: "purple", image: "purple.svg" },
            { name: "Orange", file: "orange", image: "orange.svg" },
            { name: "Teal", file: "teal", image: "teal.svg" },
            { name: "Magenta", file: "magenta", image: "magenta.svg" },
            { name: "Lime", file: "lime", image: "lime.svg" },
            { name: "Brown", file: "brown", image: "brown.svg" },
            { name: "Red", file: "red", image: "red.svg" },
            { name: "Indigo", file: "indigo", image: "indigo.svg" }
        ];
        this.customColors = [
            { name: "Chile", file: "chile", image: "chile.png" },
            { name: "Naples", file: "naples", image: "naples.png" },
            { name: "Georgia", file: "georgia", image: "georgia.png" },
            { name: "Infinity", file: "infinity", image: "infinity.png" },
            { name: "Chicago", file: "chicago", image: "chicago.png" },
            { name: "Majesty", file: "majesty", image: "majesty.png" },
            { name: "Fish", file: "fish", image: "fish.png" },
            { name: "Dawn", file: "dawn", image: "dawn.png" },
            { name: "Record", file: "record", image: "record.png" },
            { name: "Pool", file: "pool", image: "pool.png" },
            { name: "Metal", file: "metal", image: "metal.png" },
            { name: "China", file: "china", image: "china.png" },
            { name: "Table", file: "table", image: "table.png" },
            { name: "Panorama", file: "panorama", image: "panorama.png" },
            { name: "Barcelona", file: "barcelona", image: "barcelona.png" },
            { name: "Underwater", file: "underwater", image: "underwater.png" },
            { name: "Symmetry", file: "symmetry", image: "symmetry.png" },
            { name: "Rain", file: "rain", image: "rain.png" },
            { name: "Utah", file: "utah", image: "utah.png" },
            { name: "Wave", file: "wave", image: "wave.png" },
            { name: "Flora", file: "flora", image: "flora.png" },
            { name: "Speed", file: "speed", image: "speed.png" },
            { name: "Canopy", file: "canopy", image: "canopy.png" },
            { name: "SanPaolo", file: "sanpaolo", image: "sanpaolo.png" },
            { name: "Basketball", file: "basketball", image: "basketball.png" },
            { name: "Misty", file: "misty", image: "misty.png" },
            { name: "Summit", file: "summit", image: "summit.png" },
            { name: "Wall", file: "wall", image: "wall.png" },
            { name: "Ferris", file: "ferris", image: "ferris.png" },
            { name: "Ship", file: "ship", image: "ship.png" },
            { name: "NY", file: "ny", image: "ny.png" },
            { name: "Cyan", file: "cyan", image: "cyan.png" },
            { name: "Violet", file: "violet", image: "violet.png" },
            { name: "Red", file: "red", image: "red.png" },
            { name: "Blue", file: "blue", image: "blue.png" },
            { name: "Porsuk", file: "porsuk", image: "porsuk.png" },
            { name: "Pink", file: "pink", image: "pink.png" },
            { name: "Purple", file: "purple", image: "purple.png" },
            { name: "Orange", file: "orange", image: "orange.png" }
        ];
        this.menuColors = [
            { name: "light" },
            { name: "custom" },
            { name: "dark" }
        ];
        this.selectedColorOptions = this.darkColors;
        this.componentThemes = [
            { name: "Blue", file: "blue", image: "blue.svg" },
            { name: "Green", file: "green", image: "green.svg" },
            { name: "Yellow", file: "yellow", image: "yellow.svg" },
            { name: "Cyan", file: "cyan", image: "cyan.svg" },
            { name: "Purple", file: "purple", image: "purple.svg" },
            { name: "Orange", file: "orange", image: "orange.svg" },
            { name: "Teal", file: "teal", image: "teal.svg" },
            { name: "Magenta", file: "magenta", image: "magenta.svg" },
            { name: "Lime", file: "lime", image: "lime.svg" },
            { name: "Brown", file: "brown", image: "brown.svg" },
            { name: "Red", file: "red", image: "red.svg" },
            { name: "Indigo", file: "indigo", image: "indigo.svg" }
        ];
    };
    AppConfigComponent.prototype.changeLayout = function (event, mode) {
        var _this = this;
        this.app.darkMode = mode;
        this.userSettings.darkMode = mode;
        if (mode === true) {
            this.app.menuColorMode = "dark";
            this.userSettings.menuColorMode = this.app.menuColorMode;
            this.app.menuColor = "layout-menu-dark";
            this.userSettings.menuColor = this.app.menuColor;
            this.selectedColorOptions = this.darkColors;
            var layoutColor = this.selectedColorOptions.find(function (a) { return a.name === _this.userSettings.layoutColor; });
            this.app.layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            this.userSettings.layoutColor = this.app.layoutColor;
            layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            this.changeLightDarkLayout("layout-css", layoutColor, "layout-dark");
            this.changeLightDarkTheme("theme-css", "theme-dark");
            this.changeLightDarkTheme("custom-css", "custom-dark");
        }
        else {
            this.app.menuColorMode = "light";
            this.userSettings.menuColorMode = this.app.menuColorMode;
            this.app.menuColor = "layout-menu-light";
            this.userSettings.menuColor = this.app.menuColor;
            this.selectedColorOptions = this.lightColors;
            var layoutColor = this.selectedColorOptions.find(function (a) { return a.name === _this.userSettings.layoutColor; });
            this.app.layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            this.userSettings.layoutColor = this.app.layoutColor;
            layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            this.changeLightDarkLayout("layout-css", layoutColor, "layout-light");
            this.changeLightDarkTheme("theme-css", "theme-light");
            this.changeLightDarkTheme("custom-css", "custom-light");
        }
        event.preventDefault();
    };
    AppConfigComponent.prototype.changeLightDarkTheme = function (id, value) {
        var element = document.getElementById(id);
        var urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 1] = value + ".css";
        var newUrl = urlTokens.join("/");
        this.replaceLink(element, newUrl);
    };
    AppConfigComponent.prototype.changeLightDarkLayout = function (id, color, mode) {
        var element = document.getElementById(id);
        var urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 2] = color;
        urlTokens[urlTokens.length - 1] = mode + ".css";
        var newUrl = urlTokens.join("/");
        this.replaceLink(element, newUrl);
    };
    AppConfigComponent.prototype.changeMenuToHorizontal = function (event, mode) {
        this.app.horizontalMenu = mode;
        this.userSettings.horizontalMenu = this.app.horizontalMenu;
        event.preventDefault();
    };
    AppConfigComponent.prototype.changeMenuColor = function (event, mode) {
        this.app.menuColorMode = mode;
        this.userSettings.menuColorMode = this.app.menuColorMode;
        if (mode !== "custom") {
            this.app.menuColor = "layout-menu-" + mode;
            this.userSettings.menuColor = this.app.menuColor;
            if (mode === "dark") {
                this.selectedColorOptions = this.darkColors;
                this.app.layoutColor = this.selectedColorOptions[0].file;
                this.userSettings.layoutColor = this.app.layoutColor;
                this.changeStyleSheetsColor("layout-css", this.selectedColorOptions[0].file);
            }
            else {
                this.selectedColorOptions = this.lightColors;
                this.app.layoutColor = this.selectedColorOptions[0].file;
                this.userSettings.layoutColor = this.app.layoutColor;
                this.changeStyleSheetsColor("layout-css", this.selectedColorOptions[0].file);
            }
        }
        else {
            this.app.menuColor = "layout-menu-" + this.customColors[0].file;
            this.userSettings.menuColor = this.app.menuColor;
            this.selectedColorOptions = this.customColors;
        }
        event.preventDefault();
    };
    AppConfigComponent.prototype.changeMenuTheme = function (event, color) {
        this.userSettings.menuColorMode = this.app.menuColorMode;
        if (this.app.menuColorMode !== "custom") {
            this.changeStyleSheetsColor("layout-css", color);
            this.app.layoutColor = color;
            this.userSettings.layoutColor = this.app.layoutColor;
        }
        else {
            this.app.menuColor = "layout-menu-" + color;
            this.userSettings.menuColor = this.app.menuColor;
        }
        event.preventDefault();
    };
    AppConfigComponent.prototype.changeComponentTheme = function (event, color) {
        this.app.themeColor = color;
        this.userSettings.themeColor = this.app.themeColor;
        this.changeStyleSheetsColor("theme-css", color);
        event.preventDefault();
    };
    AppConfigComponent.prototype.changeStyleSheetsColor = function (id, value) {
        var element = document.getElementById(id);
        var urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 2] = value;
        var newUrl = urlTokens.join("/");
        this.replaceLink(element, newUrl);
    };
    AppConfigComponent.prototype.onConfigButtonClick = function (event) {
        this.app.configDialogActive = true;
        event.preventDefault();
    };
    AppConfigComponent.prototype.onConfigCloseClick = function (event) {
        this.app.configDialogActive = false;
        event.preventDefault();
    };
    AppConfigComponent.prototype.replaceLink = function (linkElement, href) {
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
    AppConfigComponent.prototype.isIE = function () {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    };
    AppConfigComponent = __decorate([
        core_1.Component({
            selector: "app-config",
            templateUrl: "app-config.component.html",
            animations: [
                animations_1.trigger("children", [
                    animations_1.state("hiddenAnimated", animations_1.style({
                        opacity: 0,
                        transform: " translateX(-50%) translateY(-50%)"
                    })),
                    animations_1.state("visibleAnimated", animations_1.style({
                        opacity: 1,
                        transform: "translateX(-50%) translateY(-50%) scale(1)",
                    })),
                    animations_1.transition("visibleAnimated => hiddenAnimated", animations_1.animate("150ms cubic-bezier(0, 0, 0.2, 1)")),
                    animations_1.transition("hiddenAnimated => visibleAnimated", animations_1.animate("150ms cubic-bezier(0, 0, 0.2, 1)"))
                ])
            ]
        })
    ], AppConfigComponent);
    return AppConfigComponent;
}());
exports.AppConfigComponent = AppConfigComponent;
//# sourceMappingURL=app-config.component.js.map