import { store } from "../store/store";
import { Vendor } from "../model/Vendor.model";
import { Antenna, TechnologyType } from "../model/Antenna.model";
import { selectVendorById, selectVendors, selectVendorsByTechnology, selectVendorsByAvgSpeed, setVendors } from "../store/Vendor.store";
import vendorsData from "../../src/assets/vendors_data.json";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const calculateAverageSpeed = (antennas: Antenna[]): number => {
    if (antennas.length === 0) return 0;
    
    const totalSpeed = antennas.reduce((sum, antenna) => {
        const speedMatch = antenna.speedMbps.match(/(\d+)/);
        const speed = speedMatch ? parseInt(speedMatch[1]) : 0;
        return sum + speed;
    }, 0);
    
    return Math.round(totalSpeed / antennas.length);
};

const processVendorData = (rawVendors: any[]): Vendor[] => {
    return rawVendors.map(vendor => ({
        ...vendor,
        avgSpeed: calculateAverageSpeed(vendor.antennas)
    }));
};

export const useVendorApi = () => {
    const dispatch = useDispatch();

    const vendors: Vendor[] = useSelector(selectVendors);

    const fetchVendorsFromApi = async (): Promise<Vendor[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(vendorsData as Vendor[]), 400);
        });
    };

    const fetchVendors = async (): Promise<void> => {
        const vendorsData = await fetchVendorsFromApi();
        const processedVendors = processVendorData(vendorsData)

        dispatch(setVendors(processedVendors));
    };

    const getAllVendors = useCallback((): Vendor[] => vendors, [vendors]);

    const getVendorById = useCallback((id: string): Vendor | undefined => {
        return selectVendorById(store.getState(), id);
    }, []);

    const getVendorsByTechnology = useCallback((tech: TechnologyType): Vendor[] => {
        return selectVendorsByTechnology(store.getState(), tech);
    }, []);

    const getVendorsByAvgSpeed = useCallback((): Vendor[] => {
        return selectVendorsByAvgSpeed(store.getState());
    }, []);

    return {
        vendors,
        fetchVendors,
        getAllVendors,
        getVendorById,
        getVendorsByTechnology,
        getVendorsByAvgSpeed,
    };
};
