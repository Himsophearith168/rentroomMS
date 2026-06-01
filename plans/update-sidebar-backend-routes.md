# Update Sidebar and Router to match Backend Routes

The objective is to align the frontend navigation (sidebar) and routing with the backend's route structure.

## Proposed Changes

### 1. Views
Create placeholder views for the new sections to ensure the router has valid components to render.
- `rentroom-ms/src/views/dashboard/UsersView.vue`
- `rentroom-ms/src/views/dashboard/RoomAssignView.vue`
- `rentroom-ms/src/views/dashboard/UtilityView.vue`
- `rentroom-ms/src/views/dashboard/UtilityMeterView.vue`
- `rentroom-ms/src/views/dashboard/UtilityTypeView.vue`

### 2. Router Configuration
Update `rentroom-ms/src/router/index.js` to include the new routes under the `UserDashboardLayout` children:
- `/dashboard/users` (Users)
- `/dashboard/room-assign` (Room Assignment)
- `/dashboard/utility` (Utility)
- `/dashboard/utility-meter` (Utility Meter)
- `/dashboard/utility-type` (Utility Type)

### 3. Sidebar Component
Update `rentroom-ms/src/components/userdashboard/Sidebar.vue` to include the full list of routes grouped logically:
- **ផ្ទាំងគ្រប់គ្រងគោល** (Main Dashboard)
  - Dashboard
  - Users
- **ការគ្រប់គ្រងបន្ទប់ និងអ្នកជួល** (Room & Tenant Management)
  - Rooms
  - Tenants
  - Room Assignment
- **សេវាកម្ម និងឧបករណ៍** (Utilities & Meters)
  - Utility
  - Utility Meter
  - Utility Type
- **ហិរញ្ញវត្ថុ និងវិក្កយបត្រ** (Finance & Invoices)
  - Bills
  - Payments
  - Invoices

## Verification Plan

### Automated Tests
- Check if all routes are accessible in the router.
- Verify that `Sidebar.vue` renders all the new `router-link` elements.

### Manual Verification
- Run the application and check the sidebar for the new links.
- Click each link to ensure it navigates to the correct view (even if it's a placeholder).
- Check the grouping and icons in the sidebar for consistency and aesthetic alignment.
