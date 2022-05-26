import { Injectable } from "@angular/core";

const DARKMODE = "darkMode";
const MENUMODE = "menuMode";
const MENUCOLOR = "menuColor";
const MENUCOLORMODE = "menuColorMode";
const MENUTHEME = "menuTheme";
const COMPONENTSCOLOR = "componentsColor";
const LEFTMENULOCK = "leftMenuLock";
const LAYOUTCOLOR = "layoutColor";
const THEMECOLOR = "themeColor";
const HORIZONTALMENU = "horizontalMenu";
const HEADERCOLLAPSED = "headerGridCollapsed";

const ACTIVETOPBARITEM = "activeTopbarItem";
const TOPBARMENUACTIVE = "topbarMenuActive";
const RIGHTPANELACTIVE ="rightPanelActive";
const MEGAMENUACTIVE = "megaMenuActive";
const MEGAMENUMOBILEACTIVE = "megaMenuMobileActive";
const MEGAMOBILEACTIVE = "menuMobileActive";
const MEGAHOVERACTIVE = "menuHoverActive";
const MENUCLICK= "menuClick";
const TOPBARITEMCLICK = "topbarItemClick";
const MEGAMENUCLICK = "megaMenuClick";
const MEGAMENUMOBILECLICK = "megaMenuMobileClick";
const RIGHTPANELCLICK = "rightPanelClick";
const TOPBARMOBILEMENUCLICK ="topbarMobileMenuClick";
const TOPBARMOBILEMENUACTIVE ="topbarMobileMenuActive";

@Injectable({
    providedIn: "root"
})
export class UserSettingsService {
    private _headerGridCollapsed: boolean;
    get headerGridCollapsed(): boolean {
        if (this._headerGridCollapsed) {
            return this._headerGridCollapsed;
        }
        this._headerGridCollapsed = localStorage.getItem(HEADERCOLLAPSED) === "true";
        return this._headerGridCollapsed;
    }
    set headerGridCollapsed(value: boolean) {
        this._headerGridCollapsed = value;
        if (!value) {
            localStorage.removeItem(HEADERCOLLAPSED);
        } else {
            localStorage.setItem(HEADERCOLLAPSED, value ? "true" : "false");
        }
    }

    private _darkMode: boolean;
    get darkMode(): boolean {
        if (this._darkMode) {
            return this._darkMode;
        }
        this._darkMode = localStorage.getItem(DARKMODE) === "true";
        return this._darkMode;
    }
    set darkMode(value: boolean) {
        this._darkMode = value;
        if (!value) {
            localStorage.removeItem(DARKMODE);
        } else {
            localStorage.setItem(DARKMODE, value ? "true" : "false");
        }
    }

    private _menuMode: string;
    get menuMode(): string {
        if (this._menuMode) {
            return this._menuMode;
        }
        this._menuMode = localStorage.getItem(MENUMODE);
        return this._menuMode;
    }
    set menuMode(value: string) {
        this._menuMode = value;
        if (!value) {
            localStorage.removeItem(MENUMODE);
        } else {
            localStorage.setItem(MENUMODE, value);
        }
    }

    private _menuColor: string;
    get menuColor(): string {
        if (this._menuColor) {
            return this._menuColor;
        }
        this._menuColor = localStorage.getItem(MENUCOLOR);
        return this._menuColor;
    }
    set menuColor(value: string) {
        this._menuColor = value;
        if (!value) {
            localStorage.removeItem(MENUCOLOR);
        } else {
            localStorage.setItem(MENUCOLOR, value);
        }
    }

    private _menuColorMode: string;
    get menuColorMode(): string {
        if (this._menuColorMode) {
            return this._menuColorMode;
        }
        this._menuColorMode = localStorage.getItem(MENUCOLORMODE);
        return this._menuColor;
    }
    set menuColorMode(value: string) {
        this._menuColorMode = value;
        if (!value) {
            localStorage.removeItem(MENUCOLORMODE);
        } else {
            localStorage.setItem(MENUCOLORMODE, value);
        }
    }

    private _menuTheme: string;
    get menuTheme(): string {
        if (this._menuTheme) {
            return this._menuTheme;
        }
        this._menuTheme = localStorage.getItem(MENUTHEME);
        return this._menuTheme;
    }
    set menuTheme(value: string) {
        this._menuTheme = value;
        if (!value) {
            localStorage.removeItem(MENUTHEME);
        } else {
            localStorage.setItem(MENUTHEME, value);
        }
    }

    private _componentsColor: string;
    get componentsColor(): string {
        if (this._componentsColor) {
            return this._componentsColor;
        }
        this._componentsColor = localStorage.getItem(COMPONENTSCOLOR);
        return this._componentsColor;
    }
    set componentsColor(value: string) {
        this._componentsColor = value;
        if (!value) {
            localStorage.removeItem(COMPONENTSCOLOR);
        } else {
            localStorage.setItem(COMPONENTSCOLOR, value);
        }
    }

    private _leftMenuLock: boolean;
    get leftMenuLock(): boolean {
        if (this._leftMenuLock) {
            return this._leftMenuLock;
        }
        this._leftMenuLock = localStorage.getItem(LEFTMENULOCK) === "true";
        return this._leftMenuLock;
    }
    set leftMenuLock(value: boolean) {
        this._leftMenuLock = value;
        if (!value) {
            localStorage.removeItem(LEFTMENULOCK);
        } else {
            localStorage.setItem(LEFTMENULOCK, value ? "true" : "false");
        }
    }

    private _layoutColor: string;
    get layoutColor(): string {
        if (this._layoutColor) {
            return this._layoutColor;
        }
        this._layoutColor = localStorage.getItem(LAYOUTCOLOR);
        return this._layoutColor;
    }
    set layoutColor(value: string) {
        this._layoutColor = value;
        if (!value) {
            localStorage.removeItem(LAYOUTCOLOR);
        } else {
            localStorage.setItem(LAYOUTCOLOR, value);
        }
    }

    private _themeColor: string;
    get themeColor(): string {
        if (this._themeColor) {
            return this._themeColor;
        }
        this._themeColor = localStorage.getItem(THEMECOLOR);
        return this._themeColor;
    }
    set themeColor(value: string) {
        this._themeColor = value;
        if (!value) {
            localStorage.removeItem(THEMECOLOR);
        } else {
            localStorage.setItem(THEMECOLOR, value);
        }
    }

    private _horizontalMenu: boolean;
    get horizontalMenu(): boolean {
        if (this._horizontalMenu) {
            return this._horizontalMenu;
        }
        this._horizontalMenu = localStorage.getItem(HORIZONTALMENU) === "true";
        return this._horizontalMenu;
    }
    set horizontalMenu(value: boolean) {
        this._horizontalMenu = value;
        if (!value) {
            localStorage.removeItem(HORIZONTALMENU);
        } else {
            localStorage.setItem(HORIZONTALMENU, value ? "true" : "false");
        }
    }

    constructor() { }
}
