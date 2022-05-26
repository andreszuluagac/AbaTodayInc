import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

import { IdentityService } from "../services/identity.service";

/** Pass untouched request through to the next request handler. */
@Injectable({
    providedIn: "root"
})
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private identityService: IdentityService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //Clone the request to add the new header.
        const authReq = request.clone({
            headers: request.headers
                .set("Authorization", `Bearer ${this.identityService.identityToken.token}`)
        });
        return next.handle(authReq);
    }
}