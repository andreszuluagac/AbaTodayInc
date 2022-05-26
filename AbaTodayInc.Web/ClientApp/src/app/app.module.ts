import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { DatePipe } from "@angular/common";
import { GuidedTourComponent, GuidedTourModule, GuidedTourService } from 'ngx-guided-tour';

//Application Modules
import { LayoutModule } from "./modules/layout/layout.module";
import { SharedModule } from "./modules/shared.module";

// Application Components
import { AppComponent } from "./app.component";
import { AppNotfoundComponent } from "./shared/app-notfound.component";
import { AppErrorComponent } from "./shared/app-error.component";
import { AppAccessdeniedComponent } from "./shared/app-accessdenied.component";

// Application services
import { BreadcrumbService } from "./services/mirage/breadcrumb.service";
import { MenuService } from "./services/mirage/menu.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";

//Exported function for translation factory. Required by AoT.
export function httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        //AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        //
        LayoutModule,
        SharedModule,
        //Translation
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    declarations: [
        AppComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        BreadcrumbService,
        MenuService,
        MessageService,
        ConfirmationService,
        DialogService,
        DynamicDialogConfig,
        DatePipe,
        //FilterPipe
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
