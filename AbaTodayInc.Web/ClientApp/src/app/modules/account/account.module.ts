import { NgModule } from "@angular/core";

import { AccountRoutingModule } from "./account-routing.module";
import { SharedModule } from "../shared.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ConfirmEmailComponent } from "./confirm-email/confirm-email.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ConfirmEmailComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent],
  imports: [
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
