export interface Register {
    emailAddress: string;
    fullName: string;
    phoneNumber?: string;
    phoneNumberCode?: string;
    password: string;
    confirmPassword: string;
    code?: string;
    //language: string;
}