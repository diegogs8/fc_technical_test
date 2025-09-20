Herramienta/Modelo: Cursor - GPT5

Objetivo: Maquetación de la vista Global Ranking, su tabla correspondiente y el componente GlobalRankingRow.

Prompt exacto:
Creame un prd_global_ranking_layout.md para completar la siguiente tarea.

Se ha de implementar la maquetación de la vista global ranking @GlobalRanking.tsx) .  La página debe contener un título y el ranking, es decir, una tabla. La tabla debe tener 3 columnas en este order: posicion en el ranking, vendor name y average speed. Cada fila de la tabla debe representar un vendor y mostrar la información correspondiente en cada columan. 
Para el elemento de la fila quiero quiero que se haga un componente aparte globalRankingRow.component.tsx, al que se le pase el objeto vendor para que de forma interna utilice los atributos propios como vendor.vendor o vendor.avgSpeed. El nombre (vendor.vendor) se debe poder hacer click y navegar a la ruta "vendor/{vendor.id}"
En cuanto a estilos se debe utilizar clases de tailwind, estilos sencillos y legibles, colores y formas siguiendo los ya existentes en @MainLayout.tsx . Todo en la pantalla debe ser responsive.

Esta tarea consiste solo en la maquetación, no se debe añadir lógica, importar datos de las apis o las stores ni ninguna otra funcionalidad, solo maquetación.

Crea un prd de forma detallada en ingles para completar esta tarea en la carpeta ai_evidence. No modifiques ni crees ningun otro archivo, solo el prd_global_ranking_layout.md

RESULT:

# Product Requirements Document: Global Ranking Layout Implementation

## 1. Overview

### 1.1 Purpose
This PRD outlines the requirements for implementing the layout and UI components for the Global Ranking page in the Future Connections technical test application. The focus is purely on frontend layout and styling, with no backend integration or data fetching logic.

### 1.2 Scope
- Implement responsive table layout for vendor ranking display
- Create reusable table row component
- Apply consistent styling following existing design patterns

## 2. Current State Analysis

### 2.1 Existing Components
- **GlobalRanking.tsx**: Currently displays a simple title with vendor count
- **MainLayout.tsx**: Provides consistent header/footer with navigation
- **Vendor Model**: Contains vendor data structure with antennas and speed information

### 2.2 Design Patterns
Based on MainLayout.tsx analysis:
- Color scheme: Gray backgrounds (`bg-gray-100`, `bg-gray-200`), blue accents (`text-blue-600`), pink hover states (`hover:!text-pink-600`)
- Typography: System fonts, responsive text sizes
- Layout: Flexbox-based, responsive design with mobile considerations
- Spacing: Consistent padding (`p-4`, `px-4`, `py-2`)

## 3. Requirements

### 3.1 Functional Requirements

#### 3.1.1 Global Ranking Page Layout
- **FR-1**: Display a page title "Global Ranking" prominently at the top
- **FR-2**: Render a responsive table below the title
- **FR-3**: Table must contain exactly 3 columns in this order:
  1. Position in ranking (numeric)
  2. Vendor name (text)
  3. Average speed (formatted text with "Mbps" suffix)

#### 3.1.2 Table Row Component
- **FR-4**: Create `GlobalRankingRow.tsx` component in `src/components/`
- **FR-5**: Component must accept vendor data via props
- **FR-6**: Component must render all three required columns
- **FR-7**: Component must be reusable for multiple vendors

#### 3.1.3 Responsive Design
- **FR-8**: Layout must be fully responsive across all device sizes
- **FR-9**: Text and spacing must scale appropriately for different screen sizes

### 3.2 Non-Functional Requirements

#### 3.2.1 Styling Requirements
- **NFR-1**: Use only Tailwind CSS classes for styling
- **NFR-2**: Follow existing color scheme from MainLayout.tsx
- **NFR-3**: Maintain visual consistency with application theme
- **NFR-4**: Use simple, clean, and readable design patterns

#### 3.2.2 Performance Requirements
- **NFR-5**: Component must render efficiently with multiple vendors
- **NFR-6**: No unnecessary re-renders or performance bottlenecks

#### 3.2.3 Accessibility Requirements
- **NFR-7**: Table must have proper semantic HTML structure
- **NFR-8**: Ensure sufficient color contrast for readability
- **NFR-9**: Support keyboard navigation

## 4. Technical Specifications

### 4.1 Component Structure

#### 4.1.1 GlobalRanking.tsx Updates
```typescript
// Required changes:
- Add table container with responsive wrapper
- Import and use GlobalRankingRow component
- Add proper page title styling
- Implement responsive table layout
```

#### 4.1.2 GlobalRankingRow.tsx (New Component)
```typescript
// Component props interface:
interface GlobalRankingRowProps {
  position: number;
  vendorName: string;
  averageSpeed: string;
}

// Component requirements:
- Functional component using React.FC
- Props destructuring for clean code
- Proper TypeScript typing
- Tailwind CSS styling
```

### 4.2 Styling Specifications

#### 4.2.1 Color Palette
- **Primary Background**: `bg-gray-100` (page background)
- **Table Background**: `bg-white` (table container)
- **Header Background**: `bg-gray-200` (table header)
- **Text Primary**: `text-gray-900` (main text)
- **Text Secondary**: `text-gray-600` (secondary text)
- **Accent Color**: `text-blue-600` (title and highlights)
- **Hover States**: `hover:bg-gray-50` (row hover effects)

#### 4.2.2 Typography
- **Page Title**: `text-3xl md:text-4xl font-bold text-blue-600`
- **Table Header**: `text-sm font-semibold text-gray-700 uppercase tracking-wide`
- **Table Content**: `text-sm text-gray-900`
- **Position Numbers**: `font-mono text-lg font-bold`

#### 4.2.3 Layout Specifications
- **Container**: `max-w-6xl mx-auto px-4 py-8`
- **Table Wrapper**: `overflow-x-auto shadow-lg rounded-lg`
- **Table**: `min-w-full divide-y divide-gray-200`
- **Table Header**: `bg-gray-50`
- **Table Rows**: `bg-white hover:bg-gray-50 transition-colors duration-200`

### 4.3 Responsive Breakpoints

#### 4.3.2 Tablet (md: 768px and above)
- Full table visibility
- Standard padding and spacing
- Optimized column widths

#### 4.3.3 Desktop (lg: 1024px and above)
- Maximum table width with centered layout
- Enhanced spacing and typography
- Full feature visibility

## 5. Implementation Details

### 5.1 File Structure
```
src/
├── components/
│   └── GlobalRankingRow.tsx (new)
└── screens/
    └── GlobalRanking.tsx (modified)
```

### 5.2 Component Dependencies
- React (existing)
- TypeScript (existing)
- Tailwind CSS (existing)
- No additional dependencies required

### 5.3 Data Mocking
For layout purposes only, use static mock data:
```typescript
const mockVendors = [
  { position: 1, vendorName: "Cisco", averageSpeed: "540 Mbps" },
  { position: 2, vendorName: "ZTE", averageSpeed: "530 Mbps" },
  { position: 3, vendorName: "Qualcomm", averageSpeed: "535 Mbps" },
  // ... additional mock data
];
```

## 7. Constraints and Assumptions

### 7.1 Constraints
- **Layout Only**: No API integration, data fetching, or business logic
- **Tailwind Only**: No custom CSS or external styling libraries
- **Static Data**: Use mock data for layout demonstration
- **Existing Patterns**: Must follow established design patterns

### 7.2 Assumptions
- Average speed calculation will be implemented in future iterations
- Vendor data structure will remain consistent
- Responsive design requirements are standard across all devices
- No additional animations or interactions required

## 8. Future Considerations

### 8.1 Potential Enhancements
- Sorting functionality for table columns
- Pagination for large vendor lists
- Search/filter capabilities
- Export functionality
- Real-time data updates

### 8.2 Integration Points
- API integration for real vendor data
- State management for dynamic updates
- Navigation to vendor detail pages
- Performance optimization for large datasets

## 9. Success Metrics

### 9.1 Technical Metrics
- Component renders without errors
- Responsive design works across all breakpoints
- TypeScript compilation successful
- No accessibility violations

### 9.2 User Experience Metrics
- Clear visual hierarchy
- Easy to read and navigate
- Consistent with application theme
- Professional appearance
