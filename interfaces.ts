export interface Manufacturer {
    id: string;
    name: string;
    location: string;
    founded: number;
    CEO: string;
    logo: string;
}

export interface Car {
    id: string;
    name: string;
    description: string;
    engine: string;
    topSpeed: number;
    year: number;
    manufactureDate: string;
    currentlyAvailable: boolean;
    price: number;
    photo: string;
    features: string[];
    transmissionType: string;
    manufacturer: Manufacturer;
}