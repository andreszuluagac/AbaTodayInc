"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var LANGUAGE = "language";
var DEFAULTLANGUAGE = "en";
var DARKMODE = "darkMode";
var MENUCOLORMODE = "menuColorMode";
var LoginComponent = /** @class */ (function () {
    function LoginComponent(identityService, messageService, translate, 
    //public readonly masterFilterService: MasterFilterService,
    userSettings, router, authService) {
        this.identityService = identityService;
        this.messageService = messageService;
        this.translate = translate;
        this.userSettings = userSettings;
        this.router = router;
        this.authService = authService;
        this.dark = this.userSettings.darkMode;
        this.login = { emailAddress: null, password: null, language: DEFAULTLANGUAGE, roles: [] };
        this.error = null;
        this.isLoading = false;
        this.languages = [];
        this.menuColorMode = "light";
        this.selectedSitesName = null;
        this.selectedBusinessesName = [];
        if (this.identityService.isAuthenticated) {
            this.router.navigate(["/dashboard"]);
        }
        else {
            this.login.language = localStorage.getItem(LANGUAGE);
            if (!this.login.language) {
                this.login.language = DEFAULTLANGUAGE;
                localStorage.setItem(LANGUAGE, DEFAULTLANGUAGE);
            }
            translate.use(this.login.language);
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.languages.push({ label: "English", value: "en" });
        this.languages.push({ label: "Español", value: "es" });
        this.languages.push({ label: "Français", value: "fr" });
        this.languages.push({ label: "Portuguese", value: "pt" });
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
    LoginComponent.prototype.doLogin = function () {
        var _this = this;
        this.isLoading = true;
        this.authService.login(this.login).subscribe(function () {
            localStorage.setItem(LANGUAGE, _this.login.language);
            _this.translate.use(_this.login.language);
            _this.isLoading = false;
            _this.router.navigate(["/dashboard"]);
        }, function (err) {
            var error = _this.translate.instant(err.error);
            _this.messageService.add({
                severity: "error",
                summary: _this.translate.instant("ACCOUNT.LOGIN.LOGINUNSUCCESSFUL"),
                detail: error,
                life: 7000
            });
            console.error(err);
            _this.isLoading = false;
        });
    };
    LoginComponent.prototype.changeDark = function (value) {
        this.dark = value;
        if (value) {
            this.menuColorMode = "dark";
            this.changeLayout(true);
        }
        else {
            this.changeLayout(false);
        }
    };
    LoginComponent.prototype.changeLayout = function (mode) {
        var _this = this;
        this.userSettings.darkMode = mode;
        if (mode === true) {
            this.userSettings.menuColorMode = "dark";
            this.userSettings.menuColor = "layout-menu-dark";
            this.selectedColorOptions = this.darkColors;
            var layoutColor = this.selectedColorOptions.find(function (a) { return a.name === _this.userSettings.layoutColor; });
            this.userSettings.layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            this.changeLightDarkLayout("layout-css", layoutColor, "layout-dark");
            this.changeLightDarkTheme("theme-css", "theme-dark");
            this.changeLightDarkTheme("custom-css", "custom-dark");
        }
        else {
            this.userSettings.menuColorMode = "light";
            this.userSettings.menuColor = "layout-menu-light";
            this.selectedColorOptions = this.lightColors;
            var layoutColor = this.selectedColorOptions.find(function (a) { return a.name === _this.userSettings.layoutColor; });
            this.userSettings.layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            this.changeLightDarkLayout("layout-css", layoutColor, "layout-light");
            this.changeLightDarkTheme("theme-css", "theme-light");
            this.changeLightDarkTheme("custom-css", "custom-light");
        }
        event.preventDefault();
    };
    LoginComponent.prototype.changeLightDarkTheme = function (id, value) {
        var element = document.getElementById(id);
        var urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 1] = value + ".css";
        var newUrl = urlTokens.join("/");
        this.replaceLink(element, newUrl);
    };
    LoginComponent.prototype.changeLightDarkLayout = function (id, color, mode) {
        var element = document.getElementById(id);
        var urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 2] = color;
        urlTokens[urlTokens.length - 1] = mode + ".css";
        var newUrl = urlTokens.join("/");
        this.replaceLink(element, newUrl);
    };
    LoginComponent.prototype.replaceLink = function (linkElement, href) {
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
    LoginComponent.prototype.isIE = function () {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "app-login",
            templateUrl: "./login.component.html"
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map