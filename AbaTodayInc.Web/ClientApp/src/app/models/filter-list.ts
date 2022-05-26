import { FilterListElement } from "./filter-list-element";

export interface FilterList {
    listName: string; //List names: Countries, YesNo
    elements: FilterListElement[];
}