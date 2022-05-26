import { ShippingMethod } from "./shipping-method";
import {ErrorResponse} from "./error-response";
import {Package} from "./package";

export interface QuoteResponse {
    data: ShippingMethod[];
    error: ErrorResponse;
    packages: Package[];
}