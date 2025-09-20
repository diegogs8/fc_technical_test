export interface Antenna {
    technology: TechnologyType,
    speedMbps: string
}

export enum TechnologyType {
    G2 = "2G",
    G3 = "3G",
    G4 = "4G",
    LTE = "LTE",
    G5 = "5G",
}