export interface Customer {
    id: any;
    name: string;
    email: string;
    phoneNumberCode?: string;
    phoneNumber?: string;
    photoUrl?: string;
    passwordHash: string;
    isSubscribed: boolean;
}