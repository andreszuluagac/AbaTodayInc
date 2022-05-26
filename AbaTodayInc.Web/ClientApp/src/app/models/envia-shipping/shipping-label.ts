export interface ShippingLabel {
    carrier: string;
    service: string;
    trackingNumber: string;
    trackUrl: string;
    label: string;
    totalPrice: number;
    currentBalance?: number;
    currency: string;
}