import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { MessageService, SelectItem } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";

import { Login } from "../../../models/login";
import { AuthService } from "../../../services/auth.service";
import { IdentityService } from "../../../services/identity.service";
import { UserSettingsService } from "../../../services/user-settings.service";
import { MasterFilterService } from "../../../services/master-filter.service";
import { SitesService } from "../../../services/sites.service";
import { BusinessesService } from "../../../services/businesses.service";

const LANGUAGE = "language";
const DEFAULTLANGUAGE = "en";
const DARKMODE = "darkMode";
const MENUCOLORMODE = "menuColorMode";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
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

    constructor(
        private readonly identityService: IdentityService,
        private readonly messageService: MessageService,
        private readonly translate: TranslateService,
        //public readonly masterFilterService: MasterFilterService,
        private readonly userSettings: UserSettingsService,
        private readonly router: Router,
        private readonly authService: AuthService) {
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
