export interface ResetPassword {
    code: string;
    emailAddress: string;
    password?: string;
    confirmPassword?: string;
}