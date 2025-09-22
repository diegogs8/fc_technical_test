Herramienta/Modelo: Cursor - GPT5

Objetivo: Creación de la vista de detalle de vendor.

Prompt exacto:
Creame un prd_vendor_detail.md para completar la siguiente tarea.

Se ha de implementar la maquetación de la vista de detalle de un vendor en @VendorDetail.tsx . La información que se debe mostrar en la pantalla es la siguiente: su logo, nombre, su fecha de fundación y un listado de sus antenas, indicando la tecnología y su velocidad. El Id del vendor se debe recuperar de la ruta y posteriormente recuperar el vendor con este id usando la api. 
La tabla de antenas se debe extraer a un componenente aparte, y los elementos de esta también (al igual que @GlobalRankingRow.tsx )
Los estilos de deben añadir utilizando solo clases de tailwind y se deben seguir colores y estilos acordes a los ya implementados en @GlobalRanking.tsx y @MainLayout.tsx 

Crea un prd de forma detallada en ingles para completar esta tarea en la carpeta ai_evidence. No modifiques ni crees ningun otro archivo, solo el prd_vendor_detail.md

@Antenna.model.ts @Vendor.model.ts @Vendor.api.ts 

RESULT:

# Product Requirements Document: Vendor Detail View

## Overview
This PRD outlines the implementation of a detailed vendor view that displays comprehensive information about a specific vendor, including their logo, name, foundation date, and a list of their antennas with technology types and speeds.

## Background
The current `VendorDetail.tsx` component is a placeholder that only shows a basic "Vendor Detail" heading. We need to implement a complete vendor detail view that:
- Retrieves vendor information from the URL parameter
- Fetches vendor data using the existing API
- Displays vendor information in a structured, visually appealing layout
- Shows antenna information in a dedicated table component

## Goals
- Create a comprehensive vendor detail view with consistent styling
- Implement proper data fetching and state management
- Extract reusable components for antenna display
- Maintain design consistency with existing components

## User Stories

### Primary User Story
**As a user**, I want to view detailed information about a specific vendor so that I can understand their capabilities and technology offerings.

### Supporting User Stories
- **As a user**, I want to see the vendor's logo and basic information clearly displayed
- **As a user**, I want to view all antennas offered by the vendor with their technologies and speeds
- **As a user**, I want the page to load smoothly with proper loading states
- **As a user**, I want the design to be consistent with the rest of the application

## Technical Requirements

### 1. Vendor Detail Screen (`VendorDetail.tsx`)

#### Data Requirements
- **Vendor ID**: Retrieved from URL parameter using React Router
- **Vendor Data**: Fetched using `getVendorById` from the existing API
- **Loading State**: Implement loading indicator while fetching data
- **Error Handling**: Handle cases where vendor is not found

#### Layout Structure
```
┌─────────────────────────────────────────┐
│ Header (from MainLayout)                │
├─────────────────────────────────────────┤
│ Vendor Detail Container                 │
│ ┌─────────────────────────────────────┐ │
│ │ Vendor Header Section               │ │
│ │ - Logo (64x64)                      │ │
│ │ - Vendor Name                       │ │
│ │ - Foundation Date                   │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ Antennas Table Section              │ │
│ │ - Table Header                      │ │
│ │ - Antenna Rows                      │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

#### Styling Requirements
- **Container**: `px-4 py-8` (consistent with GlobalRanking)
- **Vendor Header**: Card-like container with shadow and rounded corners
- **Typography**: Consistent with existing components
- **Colors**: Gray palette matching GlobalRanking and MainLayout
- **Responsive**: Mobile-friendly design

### 2. Antenna Table Component (`AntennaTable.tsx`)

#### Props Interface
```typescript
interface AntennaTableProps {
  antennas: Antenna[];
}
```

#### Features
- **Table Structure**: Similar to GlobalRanking table
- **Headers**: Technology, Speed columns
- **Responsive**: Horizontal scroll on mobile
- **Styling**: Consistent with existing table styles

### 3. Antenna Row Component (`AntennaRow.tsx`)

#### Props Interface
```typescript
interface AntennaRowProps {
  antenna: Antenna;
  index: number;
}
```

#### Features
- **Technology Display**: Show technology type (2G, 3G, 4G, LTE, 5G)
- **Speed Display**: Show speed in Mbps format
- **Row Styling**: Hover effects and consistent padding
- **Index Display**: Optional row number

## Implementation Details

### 1. URL Parameter Handling
- Use `useParams` from React Router to get vendor ID
- Validate ID format before making API calls
- Handle invalid/missing IDs gracefully

### 2. Data Fetching Strategy
- Use `useVendorApi` hook for data access
- Implement loading state during data fetch
- Handle vendor not found scenarios
- Ensure data is available before rendering

### 3. Component Architecture
```
VendorDetail
├── VendorHeader (inline component)
│   ├── Vendor Logo
│   ├── Vendor Name
│   └── Foundation Date
└── AntennaTable
    └── AntennaRow (for each antenna)
```

### 4. Styling Specifications

#### Vendor Header Card
- **Container**: `bg-white shadow-lg rounded-lg p-6 mb-8`
- **Layout**: Flexbox with logo and text content
- **Logo**: `w-16 h-16 rounded-lg object-cover`
- **Title**: `text-3xl font-bold text-gray-900 mb-2`
- **Foundation Date**: `text-lg text-gray-600`

#### Antenna Table
- **Container**: `overflow-x-auto shadow-lg rounded-lg`
- **Table**: `min-w-full divide-y divide-gray-200`
- **Header**: `bg-gray-200` with consistent padding
- **Rows**: `bg-white hover:bg-gray-50` with transitions

#### Responsive Design
- **Mobile**: Stack vendor info vertically
- **Tablet+**: Side-by-side layout for vendor header
- **Table**: Horizontal scroll on small screens

### 5. Error Handling

#### Loading States
- Show loading spinner while fetching vendor data
- Use existing `LoaderRow` component for consistency

#### Error States
- **Vendor Not Found**: Display "Vendor not found" message
- **API Error**: Show error message with retry option
- **Invalid ID**: Redirect to global ranking or show error

### 6. Performance Considerations
- **Memoization**: Use `useMemo` for expensive calculations
- **Lazy Loading**: Only fetch vendor data when component mounts
- **Caching**: Leverage Redux store for data persistence

## Dependencies

### Existing Components
- `MainLayout.tsx` - For consistent page structure
- `LoaderRow.tsx` - For loading states
- `useVendorApi` hook - For data fetching

### External Dependencies
- React Router for URL parameter handling
- Redux for state management
- Tailwind CSS for styling

## Future Enhancements

### Phase 2 Features
- **Antenna Filtering**: Filter antennas by technology type
- **Speed Sorting**: Sort antennas by speed
- **Vendor Comparison**: Compare multiple vendors
- **Antenna Details**: Expandable rows with additional antenna info

### Performance Optimizations
- **Image Optimization**: Lazy loading for vendor logos
- **Virtual Scrolling**: For vendors with many antennas
- **Caching Strategy**: Implement more sophisticated caching

## Success Metrics
- **User Engagement**: Users spend more time on vendor detail pages
- **Performance**: Page load time under 2 seconds
- **Accessibility**: WCAG 2.1 AA compliance
- **Code Quality**: 100% TypeScript coverage, no linting errors

## Risk Assessment

### Technical Risks
- **Data Loading**: Vendor data might not be available immediately
- **URL Validation**: Invalid vendor IDs could cause errors
- **Performance**: Large antenna lists could impact rendering

### Mitigation Strategies
- Implement proper loading states and error boundaries
- Add URL validation and fallback handling
- Use virtualization for large datasets if needed

## Conclusion
This PRD provides a comprehensive roadmap for implementing the vendor detail view with consistent design, proper data handling, and reusable components. The implementation will enhance the user experience by providing detailed vendor information in a visually appealing and functional interface.

