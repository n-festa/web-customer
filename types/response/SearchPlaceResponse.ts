import { SearchLocationErrorType } from "@/hooks/useSearchPlace";

export interface AddressComponent {
    long_name: string;
    short_name: string;
}

export interface PlusCode {
    compound_code: string;
    global_code: string;
}

export interface Compound {
    district: string;
    commune: string;
    province: string;
}
export interface SearchPlaceResponse {
    address_components?: AddressComponent[];
    formatted_address?: string;
    geometry: {
        location: {
            lat: 10.814227;
            lng: 106.671563;
        };
        boundary: null;
    };
    place_id: string;
    reference: string;
    plus_code: PlusCode;
    compound: Compound;
    types: string[];
    name: string;
    address: string;
}

export interface SearchError {
    type: SearchLocationErrorType;
    text: string;
}
