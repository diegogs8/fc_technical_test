import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Vendor } from "../model/Vendor.model";
import { TechnologyType } from "../model/Antenna.model";

interface VendorsState {
    vendors: Vendor[];
}

const initialState: VendorsState = {
    vendors: [],
};

const vendorsStore = createSlice({
    name: "vendors",
    initialState,
    reducers: {
        setVendors(state, action: PayloadAction<Vendor[]>) {
            state.vendors = action.payload;
        },
    },
});

export const { setVendors } = vendorsStore.actions;

export const selectVendors = (state: { vendors: VendorsState }) => state.vendors.vendors;

export const selectVendorById = (state: { vendors: VendorsState }, id: string) =>
    state.vendors.vendors.find(vendor => vendor.id === id);

export const selectVendorsByTechnology = (state: { vendors: VendorsState }, tech: TechnologyType) =>
    state.vendors.vendors.filter(vendor =>
        vendor.antennas.some(antenna => antenna.technology === tech)
    );

// Helper function to calculate vendor speed for a specific technology
const calculateVendorSpeedForTechnology = (vendor: Vendor, tech: TechnologyType): number => {
    const techAntennas = vendor.antennas.filter(antenna => antenna.technology === tech);
    if (techAntennas.length === 0) return 0;
    
    const totalSpeed = techAntennas.reduce((sum, antenna) => {
        const speed = parseFloat(antenna.speedMbps);
        return sum + (isNaN(speed) ? 0 : speed);
    }, 0);
    
    return totalSpeed / techAntennas.length;
};

// Get vendors filtered by technology and ordered by speed for that technology
export const selectVendorsByTechnologyOrderedBySpeed = (state: { vendors: VendorsState }, tech: TechnologyType) => {
    const vendorsWithTech = state.vendors.vendors.filter(vendor =>
        vendor.antennas.some(antenna => antenna.technology === tech)
    );
    
    return [...vendorsWithTech].sort((a, b) => {
        const speedA = calculateVendorSpeedForTechnology(a, tech);
        const speedB = calculateVendorSpeedForTechnology(b, tech);
        return speedB - speedA; // Descending order (highest speed first)
    });
};

// Get vendor speed for specific technology
export const selectVendorSpeedForTechnology = (state: { vendors: VendorsState }, vendorId: string, tech: TechnologyType): number => {
    const vendor = state.vendors.vendors.find(v => v.id === vendorId);
    if (!vendor) return 0;
    return calculateVendorSpeedForTechnology(vendor, tech);
};

export default vendorsStore.reducer;