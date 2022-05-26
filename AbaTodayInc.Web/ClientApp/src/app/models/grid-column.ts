import {FilterType} from "./enums/filter-type";

export interface GridColumn {
    field?: string;
    header?: string;
    isBoolean?: boolean;
    isEmail?: boolean;
    isImageUrl?: boolean;
    isCurrency?: boolean;
    useUsd?: true;
    isProgressBar?: boolean;
    isConditionalFlag?: boolean;
    isLpn?: boolean;
    isDate?: boolean;
    isDateTime?: boolean;
    showsDetailsForList?: boolean;
    width?: string;
    latPropertyName?: string;
    lngPropertyName?: string;
    flagClassPropertyName?: string;
    rowBoolStatusPropertyName?: string;
    filterType?: FilterType;
    filterListName?: string; //List names: Countries, YesNo, Businesses
    displayProperty?: string;
    isCommaSeparated?: boolean;
    isTimespan?: boolean;
    isTime?: boolean;
    showIconForSystemCreated?: boolean;
    image?: string;
    //Entity-specific columns
    isInbountOrderStatus?: boolean;
    isOutboundOrderStatus?: boolean;
    isServiceOrderStatus?: boolean;
    badgePropertyName?: string;
}