import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "filter"
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, props: string[], includeEmptyRows: boolean = false): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter((item) => {
            for (let p = 0; p < props.length; p++) {
                if (!item[props[p]] && includeEmptyRows) {
                    return true;
                }
                if (item[props[p]].toLowerCase().includes(searchText)) {
                    return true;
                }
            }
            return false;
        });
    }

}