import {Dimensions} from "./dimensions";

export interface Package {
    content: string;
    amount: number;
    type: string;
    weight: number;
    insurance?: number;
    declaredValue?: number;
    weightUnit: string;
    lengthUnit: string;
    dimensions: Dimensions;
    //AbaToday properties
    containerId?: string;
    productId?: string;
}