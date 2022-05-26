import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Role } from "../models/role";
import { Action } from "../models/action";
import { User } from "../models/user";
import { SelectItem, TreeNode } from "primeng/api";

@Injectable({
  providedIn: "root"
})
export class SecurityService {
    serviceData = new EventEmitter<void>();

    constructor(private readonly http: HttpClient) { }

    getUserById(id: string): Observable<User> {
        const endpoint = `api/security/getUserById/${id}`;
        return this.http.get<User>(endpoint);
    }

    getUserByUserName(id: string): Observable<User> {
        const endpoint = `api/security/getUserByUserName/${id}`;
        return this.http.get<User>(endpoint);
    }

    createUser(user: User): Observable<string> {
        const endpoint = "api/security/createUser";
        return this.http.post<string>(endpoint, user);
    }

    updateUser(user: User): Observable<User> {
        const endpoint = "api/security/updateUser";
        return this.http.post<User>(endpoint, user);
    }

    deleteUser(id: string): Observable<void> {
        const endpoint = `api/security/deleteUser/${id}`;
        return this.http.delete<void>(endpoint);
    }

    getRoleById(id: string): Observable<Role> {
        const endpoint = `api/security/getRoleById/${id}`;
        return this.http.get<Role>(endpoint);
    }

    createRole(role: Role): Observable<string> {
        const endpoint = "api/security/createRole";
        return this.http.post<string>(endpoint, role);
    }

    updateRole(role: Role): Observable<Role> {
        const endpoint = "api/security/updateRole";
        return this.http.post<Role>(endpoint, role);
    }

    updateUserLoggedState(id: string): Observable<void> {
        const endpoint = `api/security/updateUserLoggedState/${id}`;
        return this.http.get<void>(endpoint);
    }

    deleteRole(id: string): Observable<void> {
        const endpoint = `api/security/deleteRole/${id}`;
        return this.http.delete<void>(endpoint);
    }

    getRolesBySubscriptionId(): Observable<Role[]> {
        const endpoint = `api/security/getRolesBySubscriptionId`;
        return this.http.get<Role[]>(endpoint);
    }

    getModules(): Observable<Action[]> {
        const endpoint = `api/security/getModules/`;
        return this.http.get<Action[]>(endpoint);
    }

    getActionsByModuleName(id: string, roleId: string): Observable<Action[]> {
        const endpoint = `api/security/GetActionsByModuleName/${id}?roleId=${roleId}`;
        return this.http.get<Action[]>(endpoint);
    }

    getActionsByRole(id: string, roleId: string): Observable<Action[]> {
        const endpoint = `api/security/getActionsByRole/${id}?roleId=${roleId}`;
        return this.http.get<Action[]>(endpoint);
    }

    getActionsByRoleName(id: string): Observable<Action[]> {
        const endpoint = `api/security/getActionsByRoleName/${id}`;
        return this.http.get<Action[]>(endpoint);
    }

    updateRoleActions(actions: Action[], roleId: string, moduleName: string): Observable<void> {
        actions.forEach((data) => {
            data.roleId = roleId;
            data.moduleName = moduleName;
        });
        const endpoint = "api/security/updateRoleActions";
        return this.http.post<void>(endpoint, actions);
    }

    deleteRoleActions(id: string): Observable<void> {
        console.log(id);
        const endpoint = `api/security/deleteRoleActions/${id}`;
        return this.http.delete<void>(endpoint);
    }

    getRolesInUsersBySubscriptionId(): Observable<Role[]> {
        const endpoint = `api/security/getRolesInUsersBySubscriptionId`;
        return this.http.get<Role[]>(endpoint);
    }

    getUsersBySubscriptionId(id?: string): Observable<User[]> {
        let endpoint = null;
        if (id == null) {
            endpoint = `api/security/getUsersBySubscriptionId/`;
        }
        else {
            endpoint = `api/security/getUsersBySubscriptionId/${id}`;
        }
        return this.http.get<User[]>(endpoint);
    }

    getUsersBySubscriptionIdByRoleId(id: string): Observable<User[]> {
        const endpoint = `api/security/getUsersBySubscriptionIdByRoleId/${id}`;
        return this.http.get<User[]>(endpoint);
    }

    updateRoleUsers(users: User[], roleId: string): Observable<void> {
        users.forEach((data) => {
            data.roleId = roleId;
        });
        const endpoint = "api/security/updateRoleUsers";
        return this.http.post<void>(endpoint, users);
    }
    
    deleteRoleUsers(id: string): Observable<void> {
        const endpoint = `api/security/deleteRoleUsers/${id}`;
        return this.http.delete<void>(endpoint);
    }
}
