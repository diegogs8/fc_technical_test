Herramienta/Modelo: Cursor - GPT5

Objetivo: Maquetación de la vista vendor ranking.

Prompt exacto:
Creame un prd_vendor_ranking_layout.md para completar la siguiente tarea.

Se ha de implementar la maquetación de la vista vendor Ranking (@VendorRanking.tsx ) .  
La página debe contener  los siguientes elementos:
- Titulo: debe ser el nombre del vendor seleccionado (vendor.vendor). Se debe poder hacer click y navegar a la ruta "vendor/{vendor.id}"
- Selector desplegable: desplegable que muestre la lista de vendors para poder cambiar de cual se muestra la información.
- Tabla: la tabla debe mostrar las distintas antenas del vendor, su velocidad y su posición en el raking. Entonces la tabla tendrá 3 columnas: tecnologia, velocidad y ranking.

Se deben crear 3 nuevos componentes: 1. selector, 2. Tabla vendor ranking y 3 row de la tabla vendor ranking.

En cuanto a estilos se debe utilizar clases de tailwind, estilos sencillos y legibles, colores y formas siguiendo los ya existentes en @MainLayout.tsx y @GlobalRanking.tsx . Todo en la pantalla debe ser responsive. (no incluir versión móvil)

Esta tarea consiste solo en la maquetación, no se debe añadir lógica, importar datos de las apis o las stores ni ninguna otra funcionalidad, solo maquetación.

Crea un prd de forma detallada en ingles para completar esta tarea en la carpeta ai_evidence. No modifiques ni crees ningun otro archivo, solo el prd_vendor_ranking_layout.md

RESULT:


# Product Requirements Document: Vendor Ranking Layout Implementation

## 1. Overview

### 1.1 Purpose
This PRD outlines the requirements for implementing the layout and UI components for the Vendor Ranking page in the Future Connections technical test application. The focus is purely on frontend layout and styling, with no backend integration, data fetching logic, or API connections.

### 1.2 Scope
- Implement responsive vendor ranking page layout
- Create vendor selector dropdown component
- Create vendor ranking table component
- Create vendor ranking table row component
- Apply consistent styling following existing design patterns

## 2. Current State Analysis

### 2.1 Existing Components
- **VendorRanking.tsx**: Currently displays a simple placeholder with "Vendor Ranking" title
- **MainLayout.tsx**: Provides consistent header/footer with navigation and color scheme
- **GlobalRanking.tsx**: Reference for table styling and layout patterns
- **GlobalRankingRow.tsx**: Reference for table row component structure

### 2.2 Design Patterns
Based on existing components analysis:
- Color scheme: Gray backgrounds (`bg-gray-100`, `bg-gray-200`), blue accents (`text-blue-600`), pink hover states (`hover:!text-pink-600`)
- Typography: System fonts, responsive text sizes (`text-3xl md:text-4xl`)
- Layout: Flexbox-based, responsive design with consistent padding (`px-4 py-8`)
- Table styling: Shadow containers (`shadow-lg rounded-lg`), hover effects (`hover:bg-gray-50`)
- Navigation: Clickable vendor names with blue color and hover effects

## 3. Requirements

### 3.1 Functional Requirements

#### 3.1.1 Vendor Ranking Page Layout
- **FR-1**: Display a clickable page title showing the selected vendor name (`vendor.vendor`)
- **FR-2**: Title must navigate to route `vendor/{vendor.id}` when clicked
- **FR-3**: Include a dropdown selector to switch between different vendors
- **FR-4**: Display a table showing vendor's antennas with technology, speed, and ranking
- **FR-5**: Table must have exactly 3 columns: Technology, Speed, and Ranking

#### 3.1.2 Vendor Selector Component
- **FR-6**: Create `VendorSelector.tsx` component in `src/components/`
- **FR-7**: Component must display a dropdown/select element
- **FR-8**: Component must show list of available vendors
- **FR-9**: Component must handle vendor selection changes
- **FR-10**: Component must be reusable and accept props for vendor list and selection handler

#### 3.1.3 Vendor Ranking Table Component
- **FR-11**: Create `VendorRankingTable.tsx` component in `src/components/`
- **FR-12**: Component must display table with proper headers
- **FR-13**: Component must render vendor ranking rows
- **FR-14**: Component must handle empty states and loading states
- **FR-15**: Component must be responsive with horizontal scroll on smaller screens

#### 3.1.4 Vendor Ranking Row Component
- **FR-16**: Create `VendorRankingRow.tsx` component in `src/components/`
- **FR-17**: Component must display technology, speed, and ranking data
- **FR-18**: Component must be reusable for multiple antenna entries
- **FR-19**: Component must follow existing row styling patterns

#### 3.1.5 Responsive Design
- **FR-20**: Layout must be fully responsive across all device sizes
- **FR-21**: Text and spacing must scale appropriately for different screen sizes
- **FR-22**: Table must be horizontally scrollable on smaller screens

### 3.2 Non-Functional Requirements

#### 3.2.1 Styling Requirements
- **NFR-1**: Use only Tailwind CSS classes for styling
- **NFR-2**: Follow existing color scheme from MainLayout.tsx and GlobalRanking.tsx
- **NFR-3**: Maintain visual consistency with application theme
- **NFR-4**: Use simple, clean, and readable design patterns
- **NFR-5**: Apply consistent spacing and typography

#### 3.2.2 Performance Requirements
- **NFR-6**: Components must render efficiently
- **NFR-7**: No unnecessary re-renders or performance bottlenecks
- **NFR-8**: Smooth transitions and hover effects

#### 3.2.3 Accessibility Requirements
- **NFR-9**: Table must have proper semantic HTML structure
- **NFR-10**: Ensure sufficient color contrast for readability
- **NFR-11**: Support keyboard navigation for dropdown
- **NFR-12**: Proper ARIA labels for interactive elements

## 4. Technical Specifications

### 4.1 Component Structure

#### 4.1.1 VendorRanking.tsx Updates
```typescript
// Required changes:
- Add vendor selector component
- Add vendor ranking table component
- Add clickable vendor title with navigation
- Implement responsive layout structure
- Use mock data for layout demonstration
```

#### 4.1.2 VendorSelector.tsx (New Component)
```typescript
// Component props interface:
interface VendorSelectorProps {
  vendors: Vendor[];
  selectedVendorId: string;
  onVendorChange: (vendorId: string) => void;
}

// Component requirements:
- Functional component using React.FC
- Dropdown/select element with Tailwind styling
- Proper TypeScript typing
- Responsive design
```

#### 4.1.3 VendorRankingTable.tsx (New Component)
```typescript
// Component props interface:
interface VendorRankingTableProps {
  antennas: Antenna[];
  isLoading?: boolean;
}

// Component requirements:
- Table structure similar to GlobalRanking
- Responsive wrapper with horizontal scroll
- Loading and empty states
- Consistent styling with existing tables
```

#### 4.1.4 VendorRankingRow.tsx (New Component)
```typescript
// Component props interface:
interface VendorRankingRowProps {
  antenna: Antenna;
  ranking: number;
  index: number;
}

// Component requirements:
- Display technology, speed, and ranking
- Hover effects and transitions
- Consistent row styling
- Proper data formatting
```

### 4.2 Styling Specifications

#### 4.2.1 Color Palette
- **Primary Background**: `bg-gray-100` (page background)
- **Table Background**: `bg-white` (table container)
- **Header Background**: `bg-gray-200` (table header)
- **Text Primary**: `text-gray-900` (main text)
- **Text Secondary**: `text-gray-600` (secondary text)
- **Accent Color**: `text-blue-600` (title and links)
- **Hover States**: `hover:bg-gray-50` (row hover effects)
- **Border Colors**: `border-gray-200` (table borders)

#### 4.2.2 Typography
- **Page Title**: `text-3xl md:text-4xl font-bold text-blue-600 hover:underline`
- **Table Header**: `text-sm font-semibold text-gray-700 uppercase tracking-wide`
- **Table Content**: `text-sm text-gray-900`
- **Dropdown Text**: `text-sm text-gray-900`
- **Ranking Numbers**: `font-mono text-sm font-bold`

#### 4.2.3 Layout Specifications
- **Container**: `px-4 py-8` (consistent with GlobalRanking)
- **Title Section**: `mb-6` with clickable styling
- **Selector Section**: `mb-6` with proper spacing
- **Table Wrapper**: `overflow-x-auto shadow-lg rounded-lg`
- **Table**: `min-w-full divide-y divide-gray-200`
- **Table Header**: `bg-gray-200`
- **Table Rows**: `bg-white hover:bg-gray-50 transition-colors duration-200`

#### 4.2.4 Dropdown Styling
- **Container**: `relative mb-6`
- **Select**: `block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`
- **Options**: Standard browser select styling with Tailwind enhancements

### 4.3 Responsive Breakpoints

#### 4.3.1 Mobile (sm: 640px and below)
- Stacked layout for title and selector
- Horizontal scroll for table
- Reduced padding and font sizes
- Touch-friendly dropdown

#### 4.3.2 Tablet (md: 768px and above)
- Full table visibility
- Standard padding and spacing
- Optimized column widths
- Enhanced dropdown styling

#### 4.3.3 Desktop (lg: 1024px and above)
- Maximum table width with centered layout
- Enhanced spacing and typography
- Full feature visibility
- Hover effects and transitions

## 5. Implementation Details

### 5.1 File Structure
```
src/
├── components/
│   ├── VendorSelector.tsx (new)
│   ├── VendorRankingTable.tsx (new)
│   └── VendorRankingRow.tsx (new)
└── screens/
    └── VendorRanking.tsx (modified)
```

### 5.2 Component Dependencies
- React (existing)
- React Router (for navigation)
- TypeScript (existing)
- Tailwind CSS (existing)
- No additional dependencies required

### 5.3 Data Mocking
For layout purposes only, use static mock data:
```typescript
const mockVendor = {
  id: "24c33ad7-1cf9-4b44-9547-6057fb1500c7",
  vendor: "Nokia",
  antennas: [
    { technology: "2G", speedMbps: "60 Mbps", ranking: 1 },
    { technology: "3G", speedMbps: "150 Mbps", ranking: 2 },
    { technology: "4G", speedMbps: "350 Mbps", ranking: 1 },
    { technology: "LTE", speedMbps: "500 Mbps", ranking: 1 },
    { technology: "5G", speedMbps: "950 Mbps", ranking: 2 }
  ]
};

const mockVendors = [
  { id: "vendor1", vendor: "Nokia" },
  { id: "vendor2", vendor: "Ericsson" },
  { id: "vendor3", vendor: "Huawei" },
  // ... additional mock vendors
];
```

### 5.4 Navigation Implementation
- Use `Link` component from React Router for vendor title
- Implement `to={`/vendor/${vendor.id}`}` for navigation
- Apply hover effects and styling consistent with GlobalRankingRow

## 6. Layout Structure

### 6.1 Page Layout Hierarchy
```
VendorRanking
├── Page Container (px-4 py-8)
│   ├── Title Section
│   │   └── Clickable Vendor Name (Link to /vendor/{id})
│   ├── Selector Section
│   │   └── VendorSelector Component
│   └── Table Section
│       └── VendorRankingTable
│           └── VendorRankingRow (for each antenna)
```

### 6.2 Table Structure
```
VendorRankingTable
├── Table Wrapper (overflow-x-auto shadow-lg rounded-lg)
│   └── Table (min-w-full divide-y divide-gray-200)
│       ├── Table Header (bg-gray-200)
│       │   ├── Technology Column
│       │   ├── Speed Column
│       │   └── Ranking Column
│       └── Table Body (bg-white)
│           └── VendorRankingRow (for each antenna)
```

## 7. Constraints and Assumptions

### 7.1 Constraints
- **Layout Only**: No API integration, data fetching, or business logic
- **Tailwind Only**: No custom CSS or external styling libraries
- **Static Data**: Use mock data for layout demonstration
- **Existing Patterns**: Must follow established design patterns
- **No Mobile Version**: Focus on desktop and tablet responsive design

### 7.2 Assumptions
- Vendor data structure will remain consistent with existing models
- Ranking calculation will be implemented in future iterations
- Navigation routing is already configured
- No additional animations or complex interactions required
- Dropdown will use native HTML select element for simplicity

## 8. Future Considerations

### 8.1 Potential Enhancements
- Custom dropdown component with search functionality
- Sorting functionality for table columns
- Filtering by technology type
- Export functionality for vendor data
- Real-time data updates

### 8.2 Integration Points
- API integration for real vendor data
- State management for vendor selection
- Navigation to vendor detail pages
- Performance optimization for large datasets

## 9. Success Metrics

### 9.1 Technical Metrics
- All components render without errors
- Responsive design works across all breakpoints
- TypeScript compilation successful
- No accessibility violations
- Consistent styling with existing components

### 9.2 User Experience Metrics
- Clear visual hierarchy
- Easy to read and navigate
- Consistent with application theme
- Professional appearance
- Smooth interactions and transitions

## 10. Implementation Checklist

### 10.1 Component Creation
- [ ] Create VendorSelector.tsx component
- [ ] Create VendorRankingTable.tsx component
- [ ] Create VendorRankingRow.tsx component
- [ ] Update VendorRanking.tsx with new layout

### 10.2 Styling Implementation
- [ ] Apply consistent color scheme
- [ ] Implement responsive design
- [ ] Add hover effects and transitions
- [ ] Ensure accessibility compliance

### 10.3 Layout Structure
- [ ] Implement clickable vendor title
- [ ] Add vendor selector dropdown
- [ ] Create responsive table layout
- [ ] Test across different screen sizes

### 10.4 Mock Data Integration
- [ ] Create mock vendor data
- [ ] Create mock antenna data with rankings
- [ ] Implement static data rendering
- [ ] Test component rendering with mock data

## 11. Conclusion

This PRD provides a comprehensive roadmap for implementing the vendor ranking layout with three new components: VendorSelector, VendorRankingTable, and VendorRankingRow. The implementation will create a consistent, responsive, and visually appealing interface that follows established design patterns while providing the necessary functionality for vendor ranking display.

The focus on layout-only implementation ensures a clean separation of concerns, allowing for future integration of real data and business logic while maintaining a solid foundation for the user interface.

