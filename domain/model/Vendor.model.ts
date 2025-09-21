import { Antenna } from "./Antenna.model"

export interface Vendor {
    id: string,
    picture: string,
    foundationDate: number
    vendor: string,
    antennas: Antenna[],
}