"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLoginComponent = void 0;
var core_1 = require("@angular/core");
var angularx_social_login_1 = require("angularx-social-login");
var LANGUAGE = "language";
var DEFAULTLANGUAGE = "en";
var SocialLoginComponent = /** @class */ (function () {
    function SocialLoginComponent(identityService, messageService, translate, userSettings, router, authService, socialAuthService) {
        this.identityService = identityService;
        this.messageService = messageService;
        this.translate = translate;
        this.userSettings = userSettings;
        this.router = router;
        this.authService = authService;
        this.socialAuthService = socialAuthService;
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
    SocialLoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socialAuthService.authState.subscribe(function (user) {
            _this.user = user;
            _this.loggedIn = (user != null);
        });
    };
    SocialLoginComponent.prototype.signInWithGoogle = function () {
        this.socialAuthService.signIn(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID);
    };
    SocialLoginComponent.prototype.signInWithFB = function () {
        this.socialAuthService.signIn(angularx_social_login_1.FacebookLoginProvider.PROVIDER_ID);
    };
    SocialLoginComponent.prototype.signOut = function () {
        this.socialAuthService.signOut();
    };
    SocialLoginComponent.prototype.doLogin = function () {
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
    SocialLoginComponent.prototype.changeDark = function (value) {
        this.dark = value;
        if (value) {
            this.menuColorMode = "dark";
            this.changeLayout(true);
        }
        else {
            this.changeLayout(false);
        }
    };
    SocialLoginComponent.prototype.changeLayout = function (mode) {
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
    SocialLoginComponent.prototype.changeLightDarkTheme = function (id, value) {
        var element = document.getElementById(id);
        var urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 1] = value + ".css";
        var newUrl = urlTokens.join("/");
        this.replaceLink(element, newUrl);
    };
    SocialLoginComponent.prototype.changeLightDarkLayout = function (id, color, mode) {
        var element = document.getElementById(id);
        var urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 2] = color;
        urlTokens[urlTokens.length - 1] = mode + ".css";
        var newUrl = urlTokens.join("/");
        this.replaceLink(element, newUrl);
    };
    SocialLoginComponent.prototype.replaceLink = function (linkElement, href) {
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
    SocialLoginComponent.prototype.isIE = function () {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    };
    SocialLoginComponent = __decorate([
        core_1.Component({
            selector: "app-social-login",
            templateUrl: "./social-login.component.html",
            styleUrls: ["./social-login.component.css"]
        })
    ], SocialLoginComponent);
    return SocialLoginComponent;
}());
exports.SocialLoginComponent = SocialLoginComponent;
//# sourceMappingURL=social-login.component.js.map