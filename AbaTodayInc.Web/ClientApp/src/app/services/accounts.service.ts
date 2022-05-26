import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ManageProfile } from "../models/manage-profile";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AccountsService {

    constructor(private http: HttpClient) { }

    getProfileByEmail(): Observable<ManageProfile> {
        const endpoint = "api/account/getProfileByEmail";
        return this.http.get<ManageProfile>(endpoint);
    }

    saveProfile(manageProfile: ManageProfile): Observable<string[]> {
        const endpoint = "api/account/saveProfile";
        return this.http.post<string[]>(endpoint, manageProfile);
    }

   
}
