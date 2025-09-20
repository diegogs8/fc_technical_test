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

export default vendorsStore.reducer;