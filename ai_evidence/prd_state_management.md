## PRD: State Management Audit and Improvements

### Document purpose
Define concrete improvements to the application state management to increase correctness, performance, maintainability, and developer ergonomics. This PRD documents the current state, issues, and a step-by-step implementation plan with file-by-file edits and acceptance criteria.

### In scope
- Files: `src/screens/GlobalRanking.tsx`, `src/screens/VendorRanking.tsx`, `src/screens/VendorDetail.tsx`, `domain/store/Vendor.store.ts`, `domain/api/Vendor.api.ts`.
- Redux state shape, selectors, and React-Redux usage.
- Loading/error state handling for vendor data.
- Derived data and memoization strategy.

### Out of scope
- UI/visual redesign unrelated to state.
- Data source changes beyond the current mock provider.

---

## Current architecture (as-is)
- Redux slice `vendors` holds `vendors: Vendor[]` only.
- `useVendorApi` exposes `vendors` via `useSelector(selectVendors)` and helper methods that internally call selectors with `store.getState()`.
- Screens:
  - `GlobalRanking` reads vendors via `useVendorApi()`, manages `isLoading` locally, and computes technology-filtered ranking via API helpers.
  - `VendorRanking` fetches vendors and manages both `selectedVendorId` and `isLoading` locally.
  - `VendorDetail` loads by URL param, fetches vendors, then derives a single vendor via API helper.
- Selectors provide basic filtering and derived metrics (e.g., speed per technology, sorted vendors) in `Vendor.store.ts`.

---

## Findings and issues

1) Mixed state access patterns cause staleness and break React-Redux
- Problem: `useVendorApi` calls selectors with `store.getState()` inside callbacks instead of `useSelector`, bypassing subscription updates and memoization. This risks stale reads and unnecessary rerenders.
- Files: `domain/api/Vendor.api.ts`.

2) Loading state and errors are local, inconsistent, and sometimes incorrect
- Problem: Each screen manages `isLoading` locally, with inconsistent initial values (`vendors.length > 0` used as a proxy). There is no error handling; failed fetches can leave the UI in an inconsistent state.
- Files: all three screens.

3) Derived data is recomputed without memoization guarantees at the React layer
- Problem: While selectors exist, many are non-memoized (recompute on each call). Sorting and averaging happen frequently and can be costly as data grows.
- Files: `Vendor.store.ts`, consumers in screens.

4) Imperative fetch flow without idempotence or caching strategy
- Problem: Each screen calls `fetchVendors()` in `useEffect`, potentially duplicating requests and flickering loading states. No guard to prevent repeated fetches, no timestamp/cached flag.
- Files: all three screens, `Vendor.api.ts`.

5) Component state derives from store but may drift (selected vendor)
- Problem: `VendorRanking` initializes `selectedVendorId` from the vendors array before fetch completes, and then resets after fetch using `vendors[0].id` without dependency synchronization, risking undefined access and transient mis-selections.
- Files: `VendorRanking.tsx`.

6) Selector ergonomics and typing can be improved
- Problem: Repeated inline filtering logic could be encapsulated with parameterized, memoized selectors. Types for root state are implicit in selectors (`state: { vendors: VendorsState }`).
- Files: `Vendor.store.ts`.

7) Data normalization is absent
- Problem: The slice stores a raw array; per-id lookups and updates are O(n). Scaling and partial updates would benefit from normalization.
- Files: `Vendor.store.ts`.

8) Error handling is missing throughout
- Problem: `fetchVendorsFromApi` cannot emit an error state; screens swallow errors and only toggle loading.
- Files: `Vendor.api.ts`, screens.

---

## Objectives
- Ensure React components subscribe to state via `useSelector`-based hooks only (no `store.getState()` in React land).
- Centralize loading and error states in the Redux slice for vendors.
- Provide memoized selectors for derived data (per-technology averages, ordered lists).
- Introduce idempotent fetch with caching semantics.
- Improve ergonomics and types for selectors and hooks.

---

## Proposed improvements and implementation plan

### Improvement A: Replace `store.getState()` calls with `useSelector`-based hooks
- Rationale: Prevent stale reads and align with React-Redux subscription model.
- Changes:
  - In `useVendorApi`, convert `getVendorById`, `getVendorsByTechnology`, `getVendorsByTechnologyOrderedBySpeed`, and `getVendorSpeedForTechnology` to use `useSelector` with memoized, parameterized selectors (see Improvement C).
  - Remove direct `store` reads from React hooks.
- Files and edits:
  - `domain/api/Vendor.api.ts`: Replace callbacks using `store.getState()` with `useSelector` calls; expose typed hook variants like `useVendors()`, `useVendorById(id)`, `useVendorsByTechnology(tech)`, `useVendorSpeedForTechnology(vendorId, tech)`.
- Acceptance criteria:
  - No direct `store.getState()` access in React hooks.
  - Components re-render on relevant store updates.

### Improvement B: Centralize loading and error state in Redux slice
- Rationale: Single source of truth for data status; consistent UI behavior across screens.
- Changes:
  - Extend `VendorsState` with `status: 'idle' | 'loading' | 'succeeded' | 'failed'`, `error?: string | null`, and `lastFetchedAt?: number`.
  - Add actions: `fetchVendorsPending`, `fetchVendorsFulfilled`, `fetchVendorsRejected`.
  - Update `fetchVendors` thunk/async to dispatch these actions and set `vendors`.
- Files and edits:
  - `domain/store/Vendor.store.ts`: Add fields and reducers.
  - `domain/api/Vendor.api.ts`: Dispatch pending/fulfilled/rejected around `fetchVendorsFromApi`.
  - Screens: Replace local `isLoading` with `status === 'loading'` and show errors when `status === 'failed'`.
- Acceptance criteria:
  - Single fetch in-flight represented in store.
  - All screens derive loading and error states from store; no local loading booleans.

### Improvement C: Introduce memoized, parameterized selectors with Reselect
- Rationale: Avoid redundant computations and enable stable references for `useSelector` equality.
- Changes:
  - Use `createSelector` to build selectors:
    - `selectVendors` (base).
    - `selectVendorEntities` (if normalized; see Improvement D).
    - `makeSelectVendorById(id)`.
    - `makeSelectVendorsByTechnology(tech)`.
    - `makeSelectVendorsByTechnologyOrderedBySpeed(tech)`.
    - `makeSelectVendorSpeedForTechnology(vendorId, tech)`.
  - Reuse `extractSpeedValue` for numeric comparisons.
- Files and edits:
  - `domain/store/Vendor.store.ts`: Add reselect selectors; export selector factories.
  - `domain/api/Vendor.api.ts`: Use selector factories inside hook functions to avoid cross-component memoization collisions.
- Acceptance criteria:
  - Derived lists and values recompute only when inputs change.

### Improvement D: Normalize vendor state with entity adapter
- Rationale: O(1) lookups, simpler updates, and built-in memoized selectors.
- Changes:
  - Use `createEntityAdapter<Vendor>()` to store vendors as `{ids: [], entities: {}}`.
  - Store technology-specific derived data via selectors, not state.
- Files and edits:
  - `domain/store/Vendor.store.ts`: Replace array state with entity adapter, export adapter selectors.
  - Update all selectors to use adapter selectors.
- Acceptance criteria:
  - `vendors` state uses entity adapter; per-id lookups are O(1).

### Improvement E: Idempotent fetch with caching
- Rationale: Avoid redundant network calls and flicker.
- Changes:
  - In `fetchVendors`, if `status === 'succeeded'` and `lastFetchedAt` is within a freshness window (e.g., 5 minutes), return early.
  - Provide `force` option to bypass cache when needed.
- Files and edits:
  - `domain/api/Vendor.api.ts`: Read status via `useSelector`, pass to thunk or guard within thunk using `getState` (inside thunk, not React hook).
  - `Vendor.store.ts`: Maintain `lastFetchedAt` on fulfilled.
- Acceptance criteria:
  - Subsequent navigations do not re-fetch within freshness window unless forced.

### Improvement F: Screen-level state cleanup and resilience
- Rationale: Remove race conditions and undefined accesses.
- Changes:
  - `GlobalRanking.tsx`: Remove local `isLoading`; use store `status`. Ensure `activeTab` toggling reads from memoized selectors.
  - `VendorRanking.tsx`: Initialize `selectedVendorId` after data is available; if the current `selectedVendorId` is not found, default to first vendor id in memoized list. Avoid setting state in `finally` based on potentially stale `vendors[0]`.
  - `VendorDetail.tsx`: Use `useSelector(makeSelectVendorById(vendorId))`; show not-found state when missing; rely on store `status` for loading.
- Files and edits:
  - Update all three screens accordingly.
- Acceptance criteria:
  - No usage of `vendors[0]` without guarding availability.
  - No local loading booleans for vendor fetching.

### Improvement G: Add error surfaces in UI
- Rationale: Make failures visible and actionable.
- Changes:
  - When `status === 'failed'`, render a simple error message with a retry button that triggers `fetchVendors({ force: true })`.
- Files and edits:
  - All three screens: show error row/section.
- Acceptance criteria:
  - Error is visible and recoverable via retry without page refresh.

### Improvement H: Strengthen typing and root state usage
- Rationale: Safer selectors and better IDE support.
- Changes:
  - Define `RootState` type in `domain/store/store.ts` and use it across selectors.
  - Replace ad-hoc `{ vendors: VendorsState }` annotations.
- Files and edits:
  - `Vendor.store.ts`, `Vendor.api.ts`, selectors in screens.
- Acceptance criteria:
  - All selectors and hooks use `RootState`.

---

## Detailed file-by-file edits

Note: The following describes what to change; exact code will follow these constraints.

- `domain/store/Vendor.store.ts`
  - Extend `VendorsState` with `status`, `error`, `lastFetchedAt`.
  - Option A (recommended): Switch to `createEntityAdapter` for `Vendor`.
    - Export adapter selectors: `selectAllVendors`, `selectVendorById`, etc.
  - Add actions: `fetchVendorsPending`, `fetchVendorsFulfilled`, `fetchVendorsRejected`.
  - Implement memoized selectors using `createSelector` for:
    - Vendors by technology.
    - Vendors by technology ordered by avg speed.
    - Vendor speed by technology.

- `domain/api/Vendor.api.ts`
  - Convert to a cohesive hook suite:
    - `useVendors()` returns `{ vendors, status, error }`.
    - `useVendorById(vendorId)`.
    - `useVendorsByTechnology(tech)`.
    - `useVendorSpeedForTechnology(vendorId, tech)`.
  - Implement `fetchVendors(force?: boolean)` as a thunk-like action or controlled async that dispatches pending/fulfilled/rejected and honors caching via `lastFetchedAt`.
  - Remove `store.getState()` calls from React-level APIs.

- `src/screens/GlobalRanking.tsx`
  - Use `useVendors()` for `status` and list.
  - Use `useVendorsByTechnologyOrderedBySpeed(activeTab)` and `useVendorSpeedForTechnology`.
  - Trigger `fetchVendors()` on mount only when needed (idle/stale and not loading).
  - Render loading, error (with retry), and data states.

- `src/screens/VendorRanking.tsx`
  - Use `useVendors()` for `status` and list.
  - Initialize `selectedVendorId` after data load using an effect that reacts to vendor list changes.
  - Remove local `isLoading`. Guard rendering when vendors length is 0.

- `src/screens/VendorDetail.tsx`
  - Use `useVendorById(vendorId)` and store `status` instead of local vendor fetching state.
  - Render not-found state if vendor is missing after load succeeded.

---

## Non-functional requirements
- No regressions in current UI behavior.
- All selectors and hooks are unit-testable; derived-selector tests added for speed sorting and averaging.
- TypeScript passes without `any` casts.

---

## Acceptance criteria checklist
- No `store.getState()` in React hooks; components subscribe via `useSelector`.
- Centralized vendor `status`/`error`/`lastFetchedAt` in Redux.
- Idempotent vendor fetching with freshness window and force override.
- Memoized selectors for all derived data, with tests.
- Screens show consistent loading and error states; no local `isLoading`.
- `VendorRanking` does not access `vendors[0]` unsafely; selection is resilient.

---

## Risks and mitigations
- Refactor complexity: Stage changes per screen; keep API layer facade stable while migrating internals.
- Memoization pitfalls: Use selector factories per component instance when parameters vary.
- Adapter migration: Provide adapter selectors to minimize churn in consumers.

---

## Rollout plan
1. Implement slice enhancements (status/error/lastFetchedAt) and memoized selectors.
2. Update `useVendorApi` to eliminate `store.getState()` and expose hook-based selectors.
3. Migrate `GlobalRanking` to store-driven loading/error.
4. Migrate `VendorRanking` selection flow.
5. Migrate `VendorDetail` to not-found-aware selector usage.
6. Add tests for selectors and hook behavior.

---

## Appendix: Performance notes
- Sorting vendors by computed average speed can be expensive; memoized selectors ensure recomputation only on relevant changes (vendors list or technology filter).
- Normalization reduces lookup complexity and avoids creating new array identities unnecessarily, reducing rerenders.

