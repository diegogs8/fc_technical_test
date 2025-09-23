import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import type { RootState } from './store'
import { Vendor } from "../model/Vendor.model"
import { TechnologyType } from "../model/Antenna.model"

export type VendorsStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

const vendorsAdapter = createEntityAdapter<Vendor>()

type VendorsEntityState = ReturnType<typeof vendorsAdapter.getInitialState>

export interface VendorsState extends VendorsEntityState {
    status: VendorsStatus
    error: string | null
    lastFetchedAt: number | null
}

const initialState: VendorsState = vendorsAdapter.getInitialState({
    status: 'idle',
    error: null,
    lastFetchedAt: null,
})

const vendorsStore = createSlice({
    name: "vendors",
    initialState,
    reducers: {
        fetchVendorsPending(state) {
            state.status = 'loading'
            state.error = null
        },
        fetchVendorsFulfilled(state, action: PayloadAction<Vendor[]>) {
            vendorsAdapter.setAll(state, action.payload)
            state.status = 'succeeded'
            state.lastFetchedAt = Date.now()
        },
        fetchVendorsRejected(state, action: PayloadAction<string | undefined>) {
            state.status = 'failed'
            state.error = action.payload ?? 'Unknown error fetching vendors'
        },
        setVendors(state, action: PayloadAction<Vendor[]>) {
            vendorsAdapter.setAll(state, action.payload)
            state.status = 'succeeded'
            state.lastFetchedAt = Date.now()
        },
    },
})

export const { fetchVendorsPending, fetchVendorsFulfilled, fetchVendorsRejected, setVendors } = vendorsStore.actions

const selectVendorsState = (state: RootState) => state.vendors

export const {
    selectAll: selectAllVendors,
    selectById: selectVendorEntityById,
    selectIds: selectVendorIds,
} = vendorsAdapter.getSelectors<RootState>((state) => state.vendors)

export const selectStatus = createSelector(selectVendorsState, (s) => s.status)
export const selectError = createSelector(selectVendorsState, (s) => s.error)
export const selectLastFetchedAt = createSelector(selectVendorsState, (s) => s.lastFetchedAt)

const extractSpeedValue = (speedMbps: string): number => {
    const match = speedMbps.match(/(\d+(?:\.\d+)?)/)
    return match ? parseFloat(match[1]) : 0
}

const calculateVendorSpeedForTechnology = (vendor: Vendor, tech: TechnologyType): number => {
    const techAntennas = vendor.antennas.filter(antenna => antenna.technology === tech)
    if (techAntennas.length === 0) return 0

    const totalSpeed = techAntennas.reduce((sum, antenna) => {
        const speed = extractSpeedValue(antenna.speedMbps)
        return sum + (isNaN(speed) ? 0 : speed)
    }, 0)

    return totalSpeed / techAntennas.length
}

export const makeSelectVendorById = (id: string) => createSelector(
    (state: RootState) => selectVendorEntityById(state, id),
    (vendor) => vendor
)

export const makeSelectVendorsByTechnology = (tech: TechnologyType) => createSelector(
    selectAllVendors,
    (vendors) => vendors.filter(vendor => vendor.antennas.some(a => a.technology === tech))
)

export const makeSelectVendorsByTechnologyOrderedBySpeed = (tech: TechnologyType) => createSelector(
    makeSelectVendorsByTechnology(tech),
    (vendors) => [...vendors].sort((a, b) => calculateVendorSpeedForTechnology(b, tech) - calculateVendorSpeedForTechnology(a, tech))
)

export const makeSelectVendorSpeedForTechnology = (vendorId: string, tech: TechnologyType) => createSelector(
    (state: RootState) => selectVendorEntityById(state, vendorId),
    (vendor) => vendor ? calculateVendorSpeedForTechnology(vendor, tech) : 0
)

export const selectVendors = (state: RootState) => selectAllVendors(state)
export const selectVendorById = (state: RootState, id: string) => selectVendorEntityById(state, id)
export const selectVendorsByTechnology = (state: RootState, tech: TechnologyType) => makeSelectVendorsByTechnology(tech)(state)
export const selectVendorsByTechnologyOrderedBySpeed = (state: RootState, tech: TechnologyType) => makeSelectVendorsByTechnologyOrderedBySpeed(tech)(state)
export const selectVendorSpeedForTechnology = (state: RootState, vendorId: string, tech: TechnologyType) => makeSelectVendorSpeedForTechnology(vendorId, tech)(state)

export default vendorsStore.reducer