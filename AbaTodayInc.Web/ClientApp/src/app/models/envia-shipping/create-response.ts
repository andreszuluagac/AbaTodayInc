import {ErrorResponse} from "./error-response";
import {ShippingLabel} from "./shipping-label";

export interface CreateResponse {
    data: ShippingLabel[];
    error: ErrorResponse;
}