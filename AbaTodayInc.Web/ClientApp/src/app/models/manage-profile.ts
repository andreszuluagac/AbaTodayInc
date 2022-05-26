export interface ManageProfile {
    userId?: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    phoneNumberCode?: string;
    image?: string;
    password?: string;
    newPassword?: string;
    confirmPassword?: string;
    roles?: string[];
}