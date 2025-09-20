import { store } from "../store/store";
import { Vendor } from "../model/Vendor.model";
import { TechnologyType } from "../model/Antenna.model";
import { selectVendorById, selectVendors, selectVendorsByTechnology, setVendors } from "../store/Vendor.store";
import vendorsData from "../../src/assets/vendors_data.json";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useVendorApi = () => {
    const dispatch = useDispatch();

    const vendors: Vendor[] = useSelector(selectVendors);

    const fetchVendorsFromApi = async (): Promise<Vendor[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(vendorsData as Vendor[]), 300);
        });
    };

    const fetchVendors = async (): Promise<void> => {
        const vendors = await fetchVendorsFromApi();
        console.log(vendors)
        dispatch(setVendors(vendors));
    };

    const getAllVendors = useCallback((): Vendor[] => vendors, [vendors]);

    const getVendorById = useCallback((id: string): Vendor | undefined => {
        return selectVendorById(store.getState(), id);
    }, []);

    const getVendorsByTechnology = useCallback((tech: TechnologyType): Vendor[] => {
        return selectVendorsByTechnology(store.getState(), tech);
    }, []);

    return {
        vendors,
        fetchVendors,
        getAllVendors,
        getVendorById,
        getVendorsByTechnology,
    };
};
