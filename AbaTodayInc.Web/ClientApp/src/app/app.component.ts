import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { UserSettingsService } from "./services/user-settings.service";
import { AppMainComponent } from "./modules/layout/app-main/app-main.component";

const LANGUAGE = "language";
const DEFAULTLANGUAGE = "en";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent {

    darkMode = false;
    menuColorMode = "light";
    menuColor = "layout-menu-light";
    themeColor = "blue";
    layoutColor = "blue";

    constructor(translate: TranslateService,
        private readonly userSettings: UserSettingsService) {
        //Set default language
        translate.setDefaultLang(DEFAULTLANGUAGE);

        const currentLanguage = localStorage.getItem(LANGUAGE);
        if (currentLanguage) {
            translate.use(currentLanguage);
        } else {
            localStorage.setItem(LANGUAGE, DEFAULTLANGUAGE);
            translate.use(DEFAULTLANGUAGE);
        }
        const layoutColor = this.userSettings.layoutColor !== null ? this.userSettings.layoutColor : "blue";
        const darkMode = this.userSettings.darkMode !== null ? this.userSettings.darkMode : false;
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

    loadLightDarkLayout(id, color, mode) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 2] = color;
        urlTokens[urlTokens.length - 1] = mode + ".css";
        const newUrl = urlTokens.join("/");

        this.replaceLink(element, newUrl);
    }

    loadLightDarkTheme(id, value) {
        if (this.themeColor === "blue" && id !== "custom-css") {
            const element = document.getElementById(id);
            const urlTokens = element.getAttribute("href").split("/");
            urlTokens[urlTokens.length - 1] = value + ".css";
            const newUrl = urlTokens.join("/");
            this.replaceLink(element, newUrl);
        }
        if (id === "custom-css") {
            const element = document.getElementById(id);
            const urlTokens = element.getAttribute("href").split("/");
            urlTokens[urlTokens.length - 1] = value + ".css";
            const newUrl = urlTokens.join("/");
            this.replaceLink(element, newUrl);
        }
        if (this.themeColor !== "blue" && id === "theme-css") {
            const element = document.getElementById(id);
            const urlTokens = element.getAttribute("href").split("/");
            urlTokens[urlTokens.length - 2] = this.themeColor;
            urlTokens[urlTokens.length - 1] = value + ".css";
            const newUrl = urlTokens.join("/");
            this.replaceLink(element, newUrl);
        }
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
