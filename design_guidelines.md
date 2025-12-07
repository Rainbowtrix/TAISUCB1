# Design Guidelines: Logistics & Freight Management System

## Design Approach

**Design System**: shadcn/ui component library with enterprise data-focused patterns
**Rationale**: Utility-focused enterprise application requiring consistency, clarity, and efficiency for data-heavy interfaces. Standard UI patterns with professional polish.

## Core Design Principles

1. **Data First**: Prioritize readability and scannability of tabular information
2. **Clear Hierarchy**: Distinct visual separation between sections (Ride Data, Cargo, Operations, Documents)
3. **Task Efficiency**: Minimal clicks for common operations (view, download, delete documents)
4. **Professional Trust**: Clean, organized layouts that inspire confidence in critical logistics data

## Typography

**Font Family**: Inter (via Google Fonts CDN)
- **Headings (H2 section titles)**: 20px, font-semibold (600)
- **Table headers**: 14px, font-medium (500), uppercase tracking
- **Body/table data**: 14px, font-normal (400)
- **Labels**: 13px, font-medium (500)
- **Metadata (file sizes, dates)**: 13px, font-normal (400)

## Layout System

**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16
- Section padding: p-8
- Card/container padding: p-6
- Row gaps: gap-4
- Section spacing: mb-8 between major sections
- Field spacing: space-y-2 for form fields

**Container**: max-w-7xl mx-auto (accommodates wide data tables)

## Component Library

### Data Tables
- Full-width responsive tables with horizontal scroll on mobile
- Sticky headers for long scrolls
- Row hover states for clarity
- Alternating row treatment for scannability
- Cell padding: px-4 py-3
- Border: 1px solid border treatment

### Forms & Inputs
- Stacked label-above-input pattern
- Input height: h-10
- Border radius: rounded-md
- Focus rings with visible keyboard navigation states
- Readonly fields with subtle differentiation

### Buttons & Actions
- Primary action: Medium size (h-10), rounded-md
- Text links for secondary actions (Download, Delete, View)
- Icon + text pattern for clarity
- Group related actions with separator pipes (|)

### Modals (Dialog component)
- Centered overlay with backdrop blur
- Max width: max-w-lg for confirmation dialogs, max-w-2xl for document preview
- Header with title + close button
- Body with clear messaging
- Footer with Cancel (secondary) + Confirm (primary) alignment

### Document List
- Table layout with fixed columns: Type, File, Date/Time, Size, User, Actions
- Clickable file names that trigger preview
- Action links grouped in final column
- File type indicators (icons) for quick identification

### Top Navigation
- Subtle link placement for "Client View" (top-right alignment)
- Minimal chrome to maximize data viewport

### Cards/Sections
- Section headers (H2) with bottom border separator
- Grouped data in bordered containers with rounded-lg
- Consistent internal padding (p-6)

## Interactions & Animations

**Minimal Animation**: 
- Hover states: subtle opacity/underline changes (no elaborate transitions)
- Modal: Simple fade-in (duration-200)
- Focus states: ring-2 ring-offset-2

**No animations for**:
- Table row interactions
- Page loads
- Data updates

## Responsive Behavior

**Desktop (lg+)**: 
- Full table layouts
- Multi-column form rows (2-3 columns via grid)
- Side-by-side data presentation

**Tablet (md)**:
- 2-column form layouts
- Horizontal scroll for tables

**Mobile (base)**:
- Single column forms
- Stacked cards for table data (transform tables into vertical cards)
- Full-width buttons

## Data Density

**High-density zones**: Tables with compact padding for maximum data visibility
**Low-density zones**: Forms with generous spacing for input accuracy
**Balance**: Use whitespace in section headers and between major blocks, but keep data tables tight

## Professional Polish

- Consistent alignment across all sections
- Proper text truncation with tooltips for long values (company names, file names)
- Loading states for async operations
- Empty states with helpful messaging
- Error states with clear recovery paths

## Icons

**Library**: Heroicons (via CDN)
- Document types: DocumentTextIcon, PhotoIcon, ArchiveBoxIcon
- Actions: DownloadIcon, TrashIcon, EyeIcon, PlusIcon
- Size: w-5 h-5 for inline icons, w-6 h-6 for prominent actions

## Images

**No hero images** - This is a data application, not a marketing site
**Document previews**: Embedded PDF viewer or image preview in modal dialogs
**Icons only**: File type indicators and action icons