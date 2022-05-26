import { Component, OnInit } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";

import { AppMainComponent } from "../app-main/app-main.component";
import { UserSettingsService } from "../../../services/user-settings.service";

@Component({
    selector: "app-config",
    templateUrl: "app-config.component.html",
    animations: [
        trigger("children", [
            state("hiddenAnimated", style({
                opacity: 0,
                transform: " translateX(-50%) translateY(-50%)"
            })),
            state("visibleAnimated", style({
                opacity: 1,
                transform: "translateX(-50%) translateY(-50%) scale(1)",
            })),
            transition("visibleAnimated => hiddenAnimated", animate("150ms cubic-bezier(0, 0, 0.2, 1)")),
            transition("hiddenAnimated => visibleAnimated", animate("150ms cubic-bezier(0, 0, 0.2, 1)"))
        ])
    ]
})
export class AppConfigComponent implements OnInit {

    darkColors: any;
    lightColors: any;
    customColors: any;
    menuColors: any;
    selectedColorOptions: any;
    componentThemes: any;

    constructor(
        public app: AppMainComponent,
        private readonly userSettings: UserSettingsService) {
    }

    ngOnInit() {
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

    changeLayout(event, mode) {
        this.app.darkMode = mode;
        this.userSettings.darkMode = mode;
        if (mode === true) {
            this.app.menuColorMode = "dark";
            this.userSettings.menuColorMode = this.app.menuColorMode;
            this.app.menuColor = "layout-menu-dark";
            this.userSettings.menuColor = this.app.menuColor;
            this.selectedColorOptions = this.darkColors;
            let layoutColor = this.selectedColorOptions.find(a => a.name === this.userSettings.layoutColor);
            this.app.layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            this.userSettings.layoutColor = this.app.layoutColor;
            layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            this.changeLightDarkLayout("layout-css", layoutColor, "layout-dark");
            this.changeLightDarkTheme("theme-css", "theme-dark");
            this.changeLightDarkTheme("custom-css", "custom-dark");
        } else {
            this.app.menuColorMode = "light";
            this.userSettings.menuColorMode = this.app.menuColorMode;
            this.app.menuColor = "layout-menu-light";
            this.userSettings.menuColor = this.app.menuColor;
            this.selectedColorOptions = this.lightColors;
            let layoutColor = this.selectedColorOptions.find(a => a.name === this.userSettings.layoutColor);
            this.app.layoutColor = layoutColor ? layoutColor.file : this.selectedColorOptions[0].file;
            this.userSettings.layoutColor = this.app.layoutColor;
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

    changeMenuToHorizontal(event, mode) {
        this.app.horizontalMenu = mode;
        this.userSettings.horizontalMenu = this.app.horizontalMenu;
        event.preventDefault();
    }

    changeMenuColor(event, mode) {
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
            } else {
                this.selectedColorOptions = this.lightColors;
                this.app.layoutColor = this.selectedColorOptions[0].file;
                this.userSettings.layoutColor = this.app.layoutColor;
                this.changeStyleSheetsColor("layout-css", this.selectedColorOptions[0].file);
            }
        } else {
            this.app.menuColor = "layout-menu-" + this.customColors[0].file;
            this.userSettings.menuColor = this.app.menuColor;
            this.selectedColorOptions = this.customColors;
        }

        event.preventDefault();
    }

    changeMenuTheme(event, color) {
        this.userSettings.menuColorMode = this.app.menuColorMode;
        if (this.app.menuColorMode !== "custom") {
            this.changeStyleSheetsColor("layout-css", color);
            this.app.layoutColor = color;
            this.userSettings.layoutColor = this.app.layoutColor;
        } else {
            this.app.menuColor = "layout-menu-" + color;
            this.userSettings.menuColor = this.app.menuColor;
        }

        event.preventDefault();
    }

    changeComponentTheme(event, color) {
        this.app.themeColor = color;
        this.userSettings.themeColor = this.app.themeColor;
        this.changeStyleSheetsColor("theme-css", color);

        event.preventDefault();
    }

    changeStyleSheetsColor(id, value) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 2] = value;
        const newUrl = urlTokens.join("/");

        this.replaceLink(element, newUrl);
    }

    onConfigButtonClick(event) {
        this.app.configDialogActive = true;
        event.preventDefault();
    }

    onConfigCloseClick(event) {
        this.app.configDialogActive = false;
        event.preventDefault();
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
