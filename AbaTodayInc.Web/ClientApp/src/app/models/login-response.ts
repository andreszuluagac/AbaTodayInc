import { IdentityToken } from "./identity-token";

export interface LoginResponse {
    userName: string;
    identityToken: IdentityToken;
    roles: string[];
    fullName: string;
}