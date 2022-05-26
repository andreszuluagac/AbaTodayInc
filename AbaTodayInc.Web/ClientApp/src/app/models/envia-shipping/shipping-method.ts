import {DeliveryDate} from "./delivery-date";

export interface ShippingMethod {
    carrier: string;
    service: string;
    serviceDescription: string;
    deliveryEstimate: string;
    deliveryDate: DeliveryDate;
    quantity: number;
    totalPrice: number;
    currency: number;
}