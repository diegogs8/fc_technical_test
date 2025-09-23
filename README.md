## Future Connections – Technical Test

A React + TypeScript application with a small Python FastAPI backend. The app displays telecom vendors, their antennas and speeds, and provides a global ranking and vendor-focused views. This repository includes both the frontend (Vite) and a simple REST API used locally for data.

## Technologies Used
- **Frontend**: React 19, TypeScript, Vite 7
- **UI/Styling**: Tailwind CSS 4
- **Routing**: React Router 7
- **State Management**: Redux Toolkit + React Redux
- **Backend API**: FastAPI (served with Uvicorn)
- **Tooling**: ESLint, TypeScript ESLint, PostCSS, Autoprefixer

## Project Structure
```
c:\Users\Diego\Projects\fc_technical_test\
  ai_evidence\                # Prompts, PRDs, and AI-related artifacts
  api\                        # Python FastAPI backend
    main.py                   # FastAPI app exposing /vendors endpoint
    requirements.txt          # Backend dependencies
    vendors_data.json         # Local data source for vendors
  domain\                     # Application domain layer (framework-agnostic)
    api\                      # API hooks/services used by UI
      Vendor.api.ts
    model\                    # Domain models
      Antenna.model.ts
      Vendor.model.ts
    store\                    # Redux store and slices
      store.ts
      Vendor.store.ts
  src\                        # UI layer (React components, screens, layouts)
    assets\
    components\               # Presentational components
    layouts\                  # App layout and navigation
    screens\                  # Route-level screens
    index.css                 # Imports Tailwind
    main.tsx                  # App bootstrap
    App.tsx                   # Routes and composition
  README.md
  package.json
  vite.config.ts
  tsconfig*.json
  eslint.config.js
```

## Installation & Run (Frontend)
1. Clone the repository
```
git clone https://github.com/diegogs8/fc_technical_test.git
cd fc_technical_test
```
2. Install dependencies
```
npm install
```
3. Start the development server
```
npm run dev
```
- The app will be available (by default) at `http://localhost:5173`.
- Ensure the API is running on port `8000` (see next section) for data fetching.

## Installation & Run (API – Python)
1. Navigate to the `api` directory
```
cd api
```
2. Create and activate a virtual environment
```
python -m venv .venv
# macOS/Linux
source .venv/bin/activate
# Windows (PowerShell)
.venv\Scripts\activate
```
3. Install dependencies
```
pip install -r requirements.txt
```
4. Run the API with Uvicorn
```
uvicorn main:app --reload --port 8000
```
- The API will be available at `http://localhost:8000`.
- Endpoint exposed:
  - `GET /vendors` → Returns the vendors dataset from `vendors_data.json`.

## App Usage: Screens and Navigation
- **Global Ranking (`/`)**
  - Shows a ranked list of vendors by average speed.
  - Includes technology tabs (G2/G3/G4/G5 via `TechnologyTabs`) to filter the ranking by technology type.
  - Each row (`GlobalRankingRow`) displays position, vendor name, and average speed for the selected technology.

- **Vendor Ranking (`/vendor-ranking`)**
  - Lets you select a vendor (`VendorSelector`) and see their antennas’ speeds in a dedicated table (`VendorRankingTable`).
  - The vendor name acts as a link to its detail page.

- **Vendor Detail (`/vendor/:vendorId`)**
  - Displays vendor identity (logo, name, foundation date) and an `AntennaTable` with the vendor’s antennas.

- **Navigation**
  - The header in `MainLayout` provides links to “Global Ranking” and “Vendor Ranking”.
  - From the Vendor Ranking screen, clicking the vendor name navigates to its detailed page.

## Technical Decisions
- **Why Tailwind instead of plain CSS**
  - Speed and consistency: utility-first classes enable rapid prototyping with consistent spacing, colors, and typography.
  - Reduced CSS drift: avoids large, hard-to-maintain custom stylesheets and leverages Tailwind’s design tokens.
  - Excellent DX: JIT utilities and class-based composition keep styles co-located with components while remaining scalable.

- **Why separate `domain` and `ui` folders**
  - Clear layering: `domain` holds models, store, and API services that are framework-agnostic; `src` contains React UI.
  - Testability and reuse: domain logic can be tested and evolved independently from the UI layer.
  - Maintainability: encourages a clean architecture, easing future refactors or alternative frontends.

- **Modeling criteria**
  - Domain-first: `Vendor` and `Antenna` mirror core business entities used across multiple screens.
  - Explicit types: TypeScript models encode field types (ids, dates, numeric speeds) to prevent runtime errors.
  - UI independence: models avoid UI-specific concerns, remaining stable even if UI components change.

## AI Usage
- Prompts and Product Requirement Documents (PRDs) generated/used during development are stored under `ai_evidence/`:
  - `header_prd.md`
  - `prd_global_ranking_layout.md`
  - `prd_state_management.md`
  - `prd_vendor_detail.md`
  - `prd_vendor_ranking_layout.md`
- These files document the guidance and outcomes of AI-assisted planning and iteration.

## Notes
- CORS is enabled permissively in the local API for ease of development.
- Ensure the frontend and API ports (`5173` and `8000`) are not in use by other services.
