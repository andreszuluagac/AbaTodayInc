import { Component, Renderer2, OnInit } from "@angular/core";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { Router } from "@angular/router";

import { MenuService } from "../../../services/mirage/menu.service";
import { IdentityService } from "../../../services/identity.service";
import { UserSettingsService } from "../../../services/user-settings.service";

@Component({
    selector: "app-main",
    templateUrl: "./app-main.component.html",
    animations: [
        trigger("mask-anim", [
            state("void", style({
                opacity: 0
            })),
            state("visible", style({
                opacity: 0.8
            })),
            transition("* => *", animate("250ms cubic-bezier(0, 0, 0.2, 1)"))
        ])
    ]
})
export class AppMainComponent implements OnInit {
    staticMenuActive = true;
    horizontalMenu: boolean;
    darkMode = false;
    menuColorMode = "light";
    menuColor = "layout-menu-light";
    themeColor = "blue";
    layoutColor = "blue";
    rightPanelClick: boolean;
    rightPanelActive: boolean;
    menuClick: boolean;
    menuMobileActive: boolean;
    megaMenuClick: boolean;
    megaMenuActive: boolean;
    megaMenuMobileClick: boolean;
    megaMenuMobileActive: boolean;
    topbarItemClick: boolean;
    topbarMobileMenuClick: boolean;
    topbarMobileMenuActive: boolean;
    configDialogActive: boolean;
    sidebarActive: boolean;
    activeTopbarItem: any;
    topbarMenuActive: boolean;
    menuHoverActive: boolean;
    isLoading = true;

    constructor(
        public identityService: IdentityService,
        public renderer: Renderer2,
        private readonly router: Router,
        private readonly userSettings: UserSettingsService,
        private readonly menuService: MenuService) { }

    ngOnInit(): void {
        this.darkMode = this.userSettings.darkMode;
        this.staticMenuActive = this.userSettings.leftMenuLock;
        this.menuColor = this.userSettings.menuColor;
        this.menuColorMode = this.userSettings.menuColorMode;
        this.layoutColor = this.userSettings.layoutColor;
        this.themeColor = this.userSettings.themeColor;
        this.horizontalMenu = this.userSettings.horizontalMenu;

        this.isLoading = false;

        if (!this.identityService.isAuthenticated) {
            this.router.navigate(["/account/login"]);
            return;
        }
    }

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.rightPanelClick) {
            this.rightPanelActive = false;
        }

        if (!this.megaMenuClick) {
            this.megaMenuActive = false;
        }

        if (!this.megaMenuMobileClick) {
            this.megaMenuMobileActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal()) {
                this.menuService.reset();
            }

            if (this.menuMobileActive) {
                this.menuMobileActive = false;
            }

            this.menuHoverActive = false;
        }


        this.menuClick = false;
        this.topbarItemClick = false;
        this.megaMenuClick = false;
        this.megaMenuMobileClick = false;
        this.rightPanelClick = false;
    }

    onMegaMenuButtonClick(event) {
        this.megaMenuClick = true;
        this.megaMenuActive = !this.megaMenuActive;
        event.preventDefault();
    }

    onMegaMenuClick(event) {
        this.megaMenuClick = true;
        this.megaMenuMobileClick = true;
        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;
        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        }
        else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }

    onRightPanelButtonClick(event) {
        this.rightPanelClick = true;
        this.rightPanelActive = !this.rightPanelActive;
        event.preventDefault();
    }

    onRightPanelClose(event) {
        this.rightPanelActive = false;
        this.rightPanelClick = false;

        event.preventDefault();
    }

    onRightPanelClick(event) {
        this.rightPanelClick = true;
        event.preventDefault();
    }

    onTopbarMobileMenuButtonClick(event) {
        console.log(event);
        this.topbarMobileMenuClick = true;
        this.topbarMobileMenuActive = !this.topbarMobileMenuActive;
        event.preventDefault();
    }

    onMegaMenuMobileButtonClick(event) {
        this.megaMenuMobileClick = true;
        this.megaMenuMobileActive = !this.megaMenuMobileActive;
        event.preventDefault();
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.topbarMenuActive = false;
        if (this.isMobile()) {
            this.menuMobileActive = !this.menuMobileActive;
        }

        event.preventDefault();
    }

    onSidebarClick(event: Event) {
        this.menuClick = true;
    }

    onToggleMenuClick(event: Event) {
        this.staticMenuActive = !this.staticMenuActive;
        this.userSettings.leftMenuLock = this.staticMenuActive;
        event.preventDefault();
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return window.innerWidth <= 991;
    }

    isHorizontal() {
        return this.horizontalMenu;
    }
}
