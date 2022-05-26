import { Scoring } from "./scoring";
import { MapLocation } from "../map-location";
import { Address } from "./address";

export interface Item {
    title: string;
    id: string;
    address: Address;
    resultType: string;
    position: MapLocation;
    scoring: Scoring;
}