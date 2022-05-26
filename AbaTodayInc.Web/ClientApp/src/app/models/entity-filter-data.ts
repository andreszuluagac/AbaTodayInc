import {FilterMetadata} from "primeng/api/filtermetadata";

export interface EntityFilterData {
    columnFilters?: { [index: string]: FilterMetadata; };
    numberOfRecords?: number;
    aggregationFunction?: string;
}