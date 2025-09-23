import { store } from "../store/store"
import { Vendor } from "../model/Vendor.model"
import { TechnologyType, Antenna } from "../model/Antenna.model"
import {
    fetchVendorsPending,
    fetchVendorsFulfilled,
    fetchVendorsRejected,
    selectStatus,
    selectError,
    selectLastFetchedAt,
    selectVendors as selectAllVendors,
    makeSelectVendorById,
    makeSelectVendorsByTechnology,
    makeSelectVendorsByTechnologyOrderedBySpeed,
    makeSelectVendorSpeedForTechnology,
} from "../store/Vendor.store"
import vendorsData from "../../src/assets/vendors_data.json"
import { useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"

export const extractSpeedValue = (speedMbps: string): number => {
    const match = speedMbps.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
};

export const calculateGlobalRanking = (antenna: Antenna, allVendors: Vendor[]): number => {
    const sameTechnologyAntennas = allVendors
        .flatMap(vendor => vendor.antennas)
        .filter(a => a.technology === antenna.technology)
        .map(a => ({
            antenna: a,
            speedValue: extractSpeedValue(a.speedMbps)
        }))
        .sort((a, b) => b.speedValue - a.speedValue);

    const currentSpeedValue = extractSpeedValue(antenna.speedMbps);

    const ranking = sameTechnologyAntennas.findIndex(
        item => item.speedValue === currentSpeedValue
    ) + 1;

    return ranking;
};

export const useVendorApi = () => {
    const dispatch = useDispatch()

    const vendors: Vendor[] = useSelector(selectAllVendors)
    const status = useSelector(selectStatus)
    const error = useSelector(selectError)
    const lastFetchedAt = useSelector(selectLastFetchedAt)

    //const fetchVendorsFromApi = async (): Promise<Vendor[]> => {
    //  return new Promise((resolve) => {
    //    setTimeout(() => resolve(vendorsData as Vendor[]), 400)
    //})
    //}

    //const fetchVendors = useCallback(async (_force: boolean = false): Promise<void> => {
    //    try {
    //        const state = store.getState()
    //        const currentStatus = selectStatus(state)
    //        if (currentStatus === 'loading') return

    //        dispatch(fetchVendorsPending())
    //        const data = await fetchVendorsFromApi()
    //        dispatch(fetchVendorsFulfilled(data))
    //    } catch (e: any) {
    //        dispatch(fetchVendorsRejected(e?.message))
    //    }
    //}, [dispatch])

    const fetchVendors = useCallback(async (_force: boolean = false): Promise<void> => {
        try {
            const state = store.getState()
            const currentStatus = selectStatus(state)
            if (currentStatus === 'loading') return
            dispatch(fetchVendorsPending())

            const res = await fetch("http://localhost:8000/vendors");
            const vendors = await res.json();
            dispatch(fetchVendorsFulfilled(vendors))
        } catch (e: any) {
            dispatch(fetchVendorsRejected(e?.message))
        }
    }, [dispatch])

    const getAllVendors = useCallback((): Vendor[] => vendors, [vendors])

    const selectVendorByIdHook = useMemo(() => makeSelectVendorById, [])
    const getVendorById = useCallback((id: string): Vendor | undefined => {
        const selector = selectVendorByIdHook(id)
        return selector(store.getState())
    }, [selectVendorByIdHook])

    const selectByTechHook = useMemo(() => makeSelectVendorsByTechnology, [])
    const getVendorsByTechnology = useCallback((tech: TechnologyType): Vendor[] => {
        const selector = selectByTechHook(tech)
        return selector(store.getState())
    }, [selectByTechHook])

    const selectByTechOrderedHook = useMemo(() => makeSelectVendorsByTechnologyOrderedBySpeed, [])
    const getVendorsByTechnologyOrderedBySpeed = useCallback((tech: TechnologyType): Vendor[] => {
        const selector = selectByTechOrderedHook(tech)
        return selector(store.getState())
    }, [selectByTechOrderedHook])

    const selectVendorSpeedHook = useMemo(() => makeSelectVendorSpeedForTechnology, [])
    const getVendorSpeedForTechnology = useCallback((vendorId: string, tech: TechnologyType): number => {
        const selector = selectVendorSpeedHook(vendorId, tech)
        return selector(store.getState())
    }, [selectVendorSpeedHook])

    return {
        vendors,
        status,
        error,
        lastFetchedAt,
        fetchVendors,
        getAllVendors,
        getVendorById,
        getVendorsByTechnology,
        getVendorsByTechnologyOrderedBySpeed,
        getVendorSpeedForTechnology,
    }
}
