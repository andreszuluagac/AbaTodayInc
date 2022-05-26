"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = exports.httpLoaderFactory = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var http_1 = require("@angular/common/http");
var common_2 = require("@angular/common");
//Other components
var ngx_countdown_1 = require("ngx-countdown");
//Pipes
var filter_pipe_1 = require("../pipes/filter.pipe");
//Directives
var number_input_directive_1 = require("../directives/number-input.directive");
// PrimeNG Components
var accordion_1 = require("primeng/accordion");
var autocomplete_1 = require("primeng/autocomplete");
//import { BreadcrumbModule } from "primeng/breadcrumb";
var button_1 = require("primeng/button");
var calendar_1 = require("primeng/calendar");
//import { CardModule } from "primeng/card";
//import { CarouselModule } from "primeng/carousel";
var chart_1 = require("primeng/chart");
var checkbox_1 = require("primeng/checkbox");
//import { ChipsModule } from "primeng/chips";
//import { CodeHighlighterModule } from "primeng/codehighlighter";
var confirmdialog_1 = require("primeng/confirmdialog");
//import { ColorPickerModule } from "primeng/colorpicker";
//import { ContextMenuModule } from "primeng/contextmenu";
//import { DataViewModule } from "primeng/dataview";
var dialog_1 = require("primeng/dialog");
var dynamicdialog_1 = require("primeng/dynamicdialog");
var dragdrop_1 = require("primeng/dragdrop");
var dropdown_1 = require("primeng/dropdown");
var editor_1 = require("primeng/editor");
var fieldset_1 = require("primeng/fieldset");
//import { FileUploadModule } from "primeng/fileupload";
//import { FullCalendarModule } from "primeng/fullcalendar";
var galleria_1 = require("primeng/galleria");
//import { InplaceModule } from "primeng/inplace";
var inputmask_1 = require("primeng/inputmask");
var inputnumber_1 = require("primeng/inputnumber");
//import { InputSwitchModule } from "primeng/inputswitch";
var inputtext_1 = require("primeng/inputtext");
var inputtextarea_1 = require("primeng/inputtextarea");
//import { LightboxModule } from "primeng/lightbox";
var listbox_1 = require("primeng/listbox");
var megamenu_1 = require("primeng/megamenu");
var menu_1 = require("primeng/menu");
var menubar_1 = require("primeng/menubar");
var messages_1 = require("primeng/messages");
var message_1 = require("primeng/message");
var multiselect_1 = require("primeng/multiselect");
//import { OrderListModule } from "primeng/orderlist";
var organizationchart_1 = require("primeng/organizationchart");
var overlaypanel_1 = require("primeng/overlaypanel");
//import { PaginatorModule } from "primeng/paginator";
var panel_1 = require("primeng/panel");
//import { PanelMenuModule } from "primeng/panelmenu";
var password_1 = require("primeng/password");
var picklist_1 = require("primeng/picklist");
var progressbar_1 = require("primeng/progressbar");
var radiobutton_1 = require("primeng/radiobutton");
//import { RatingModule } from "primeng/rating";
//import { ScrollPanelModule } from "primeng/scrollpanel";
//import { SelectButtonModule } from "primeng/selectbutton";
//import { SlideMenuModule } from "primeng/slidemenu";
//import { SliderModule } from "primeng/slider";
//import { SpinnerModule } from "primeng/spinner";
//import { SplitButtonModule } from "primeng/splitbutton";
//import { StepsModule } from "primeng/steps";
//import { TabMenuModule } from "primeng/tabmenu";
var table_1 = require("primeng/table");
var tabview_1 = require("primeng/tabview");
//import { TerminalModule } from "primeng/terminal";
//import { TieredMenuModule } from "primeng/tieredmenu";
var toast_1 = require("primeng/toast");
//import { ToggleButtonModule } from "primeng/togglebutton";
//import { ToolbarModule } from "primeng/toolbar";
var tooltip_1 = require("primeng/tooltip");
var tree_1 = require("primeng/tree");
//import { TreeTableModule } from "primeng/treetable";
//import { VirtualScrollerModule } from "primeng/virtualscroller";
var api_1 = require("primeng/api");
var http_request_interceptor_1 = require("../interceptors/http-request.interceptor");
var auth_guard_1 = require("../interceptors/auth-guard");
var can_deactivate_guard_1 = require("../interceptors/can-deactivate-guard");
//Exported function for translation factory. Required by AoT.
function httpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http);
}
exports.httpLoaderFactory = httpLoaderFactory;
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                filter_pipe_1.FilterPipe,
                number_input_directive_1.NumberInputDirective
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                ngx_countdown_1.CountdownModule,
                //PrimeNG Modules
                ///////////////////////////////////////
                accordion_1.AccordionModule,
                autocomplete_1.AutoCompleteModule,
                //BreadcrumbModule,
                button_1.ButtonModule,
                calendar_1.CalendarModule,
                //CardModule,
                //CarouselModule,
                chart_1.ChartModule,
                checkbox_1.CheckboxModule,
                //ChipsModule,
                //CodeHighlighterModule,
                confirmdialog_1.ConfirmDialogModule,
                //ColorPickerModule,
                //ContextMenuModule,
                //DataViewModule,
                dialog_1.DialogModule,
                dynamicdialog_1.DynamicDialogModule,
                dragdrop_1.DragDropModule,
                dropdown_1.DropdownModule,
                editor_1.EditorModule,
                fieldset_1.FieldsetModule,
                //FileUploadModule,
                //FullCalendarModule,
                galleria_1.GalleriaModule,
                //InplaceModule,
                inputmask_1.InputMaskModule,
                inputnumber_1.InputNumberModule,
                //InputSwitchModule,
                inputtext_1.InputTextModule,
                inputtextarea_1.InputTextareaModule,
                //LightboxModule,
                listbox_1.ListboxModule,
                megamenu_1.MegaMenuModule,
                menu_1.MenuModule,
                menubar_1.MenubarModule,
                message_1.MessageModule,
                messages_1.MessagesModule,
                multiselect_1.MultiSelectModule,
                //OrderListModule,
                organizationchart_1.OrganizationChartModule,
                overlaypanel_1.OverlayPanelModule,
                //PaginatorModule,
                panel_1.PanelModule,
                //PanelMenuModule,
                password_1.PasswordModule,
                picklist_1.PickListModule,
                progressbar_1.ProgressBarModule,
                radiobutton_1.RadioButtonModule,
                //RatingModule,
                //ScrollPanelModule,
                //SelectButtonModule,
                //SlideMenuModule,
                //SliderModule,
                //SpinnerModule,
                //SplitButtonModule,
                //StepsModule,
                table_1.TableModule,
                //TabMenuModule,
                tabview_1.TabViewModule,
                //TerminalModule,
                //TieredMenuModule,
                toast_1.ToastModule,
                //ToggleButtonModule,
                //ToolbarModule,
                tooltip_1.TooltipModule,
                tree_1.TreeModule,
                //TreeTableModule,
                //VirtualScrollerModule,
                //Translate
                //////////////////////////////////////
                core_2.TranslateModule.forChild({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: httpLoaderFactory,
                        deps: [http_1.HttpClient]
                    }
                })
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                ngx_countdown_1.CountdownModule,
                //PrimeNG
                ////////////////////////////////////////
                accordion_1.AccordionModule,
                autocomplete_1.AutoCompleteModule,
                //BreadcrumbModule,
                button_1.ButtonModule,
                calendar_1.CalendarModule,
                //CardModule,
                //CarouselModule,
                chart_1.ChartModule,
                checkbox_1.CheckboxModule,
                //ChipsModule,
                //CodeHighlighterModule,
                confirmdialog_1.ConfirmDialogModule,
                //ColorPickerModule,
                //ContextMenuModule,
                //DataViewModule,
                dialog_1.DialogModule,
                dynamicdialog_1.DynamicDialogModule,
                dragdrop_1.DragDropModule,
                dropdown_1.DropdownModule,
                editor_1.EditorModule,
                fieldset_1.FieldsetModule,
                //FileUploadModule,
                //FullCalendarModule,
                galleria_1.GalleriaModule,
                //InplaceModule,
                inputmask_1.InputMaskModule,
                inputnumber_1.InputNumberModule,
                //InputSwitchModule,
                inputtext_1.InputTextModule,
                inputtextarea_1.InputTextareaModule,
                //LightboxModule,
                listbox_1.ListboxModule,
                megamenu_1.MegaMenuModule,
                menu_1.MenuModule,
                menubar_1.MenubarModule,
                message_1.MessageModule,
                messages_1.MessagesModule,
                multiselect_1.MultiSelectModule,
                //OrderListModule,
                organizationchart_1.OrganizationChartModule,
                overlaypanel_1.OverlayPanelModule,
                //PaginatorModule,
                panel_1.PanelModule,
                //PanelMenuModule,
                password_1.PasswordModule,
                picklist_1.PickListModule,
                progressbar_1.ProgressBarModule,
                radiobutton_1.RadioButtonModule,
                //RatingModule,
                //ScrollPanelModule,
                //SelectButtonModule,
                //SlideMenuModule,
                //SliderModule,
                //SpinnerModule,
                //SplitButtonModule,
                //StepsModule,
                table_1.TableModule,
                //TabMenuModule,
                tabview_1.TabViewModule,
                //TerminalModule,
                //TieredMenuModule,
                toast_1.ToastModule,
                //ToggleButtonModule,
                //ToolbarModule,
                tooltip_1.TooltipModule,
                tree_1.TreeModule,
                //TreeTableModule,
                //VirtualScrollerModule,
                //Translate
                //////////////////////////////////////
                core_2.TranslateModule,
                filter_pipe_1.FilterPipe,
                number_input_directive_1.NumberInputDirective
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: http_request_interceptor_1.HttpRequestInterceptor, multi: true },
                auth_guard_1.AuthGuard,
                can_deactivate_guard_1.CanDeactivateGuard,
                common_2.DatePipe,
                //FilterPipe,
                api_1.MessageService,
                api_1.ConfirmationService,
                api_1.TreeDragDropService,
                dynamicdialog_1.DialogService,
                dynamicdialog_1.DynamicDialogConfig
            ],
            entryComponents: [],
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map