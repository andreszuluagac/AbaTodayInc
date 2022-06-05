import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { MessageService, SelectItem } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";

import { Login } from "../../../models/login";
import { AuthService } from "../../../services/auth.service";
import { IdentityService } from "../../../services/identity.service";
import { UserSettingsService } from "../../../services/user-settings.service";

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

const LANGUAGE = "language";
const DEFAULTLANGUAGE = "en";

@Component({
    selector: "app-social-login",
    templateUrl: "./social-login.component.html",
    styleUrls: ["./social-login.component.css"]
})
export class SocialLoginComponent implements OnInit {
    dark: boolean = this.userSettings.darkMode;
    login: Login = { emailAddress: null, password: null, language: DEFAULTLANGUAGE, roles: [] };
    error: string = null;
    isLoading = false;
    languages: SelectItem[] = [];
    menuColorMode = "light";
    selectedSitesName: string = null;
    selectedBusinessesName: string[] = [];
    darkColors: any;
    lightColors: any;
    customColors: any;
    menuColors: any;
    selectedColorOptions: any;
    componentThemes: any;
    user: SocialUser;
    loggedIn: boolean;


    constructor(
        private readonly identityService: IdentityService,
        private readonly messageService: MessageService,
        private readonly translate: TranslateService,
        private readonly userSettings: UserSettingsService,
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly socialAuthService: SocialAuthService) {
        if (this.identityService.isAuthenticated) {
            this.router.navigate(["/dashboard"]);
        } else {
            this.login.language = localStorage.getItem(LANGUAGE);
            if (!this.login.language) {
                this.login.language = DEFAULTLANGUAGE;
                localStorage.setItem(LANGUAGE, DEFAULTLANGUAGE);
            }
            translate.use(this.login.language);
        }
    }

    ngOnInit() {
        this.socialAuthService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
        });
    }

    signInWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFB(): void {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.socialAuthService.signOut();
    }

    doLogin() {
        this.isLoading = true;
        this.authService.login(this.login).subscribe(
            () => {
                localStorage.setItem(LANGUAGE, this.login.language);
                this.translate.use(this.login.language);
                this.isLoading = false;
                this.router.navigate(["/dashboard"]);
            }, (err: HttpErrorResponse) => {
                const error = this.translate.instant(err.error);
                this.messageService.add({
                    severity: "error",
                    summary: this.translate.instant("ACCOUNT.LOGIN.LOGINUNSUCCESSFUL"),
                    detail: error,
                    life: 7000
                });
                console.error(err);
                this.isLoading = false;
            });
    }

    changeDark(value) {
        this.dark = value;
        if (value) {
            this.menuColorMode = "dark";
            this.changeLayout(true);
        }
        else {
            this.changeLayout(false);
        }

    }

    changeLayout(mode) {
        this.userSettings.darkMode = mode;
        if (mode === true) {
            this.userSettings.menuColorMode = "dark";
            this.userSettings.menuColor = "layout-menu-dark";
            this.selectedColorOptions = this.darkColors;
            let layoutColor = this.selectedColorOptions.find(a => a.name === this.userSettings.layoutColor);
            this.userSettings.layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            this.changeLightDarkLayout("layout-css", layoutColor, "layout-dark");
            this.changeLightDarkTheme("theme-css", "theme-dark");
            this.changeLightDarkTheme("custom-css", "custom-dark");
        } else {
            this.userSettings.menuColorMode = "light";
            this.userSettings.menuColor = "layout-menu-light";
            this.selectedColorOptions = this.lightColors;
            let layoutColor = this.selectedColorOptions.find(a => a.name === this.userSettings.layoutColor);
            this.userSettings.layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            this.changeLightDarkLayout("layout-css", layoutColor, "layout-light");
            this.changeLightDarkTheme("theme-css", "theme-light");
            this.changeLightDarkTheme("custom-css", "custom-light");
        }

        event.preventDefault();
    }

    changeLightDarkTheme(id, value) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 1] = value + ".css";
        const newUrl = urlTokens.join("/");

        this.replaceLink(element, newUrl);
    }

    changeLightDarkLayout(id, color, mode) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 2] = color;
        urlTokens[urlTokens.length - 1] = mode + ".css";
        const newUrl = urlTokens.join("/");

        this.replaceLink(element, newUrl);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute("href", href);
        }
        else {
            const id = linkElement.getAttribute("id");
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute("href", href);
            cloneLinkElement.setAttribute("id", id + "-clone");

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener("load", () => {
                linkElement.remove();
                cloneLinkElement.setAttribute("id", id);
            });
        }
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }
}
