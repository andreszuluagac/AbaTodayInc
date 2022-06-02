import { NgModule } from "@angular/core";

import { AccountRoutingModule } from "./account-routing.module";
import { SharedModule } from "../shared.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ConfirmEmailComponent } from "./confirm-email/confirm-email.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { SocialLoginComponent } from "./social-login/social-login.component";

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ConfirmEmailComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        SocialLoginComponent],
    imports: [
        SharedModule,
        AccountRoutingModule,
        SocialLoginModule
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            '624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com'
                        ),
                    },
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider('724180225375591'),
                    }
                ],
            } as SocialAuthServiceConfig,
        }
    ]
})
export class AccountModule { }
