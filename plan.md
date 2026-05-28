# Add Settings Page Plan

Add a comprehensive settings page to the DriverHub Pro application to allow users to manage their preferences.

## Implementation Steps

### 1. Create Settings Page Component
- File: `src/pages/Settings.tsx`
- Features:
  - App preferences (Dark mode toggle, Notifications).
  - Driver preferences (Auto-accept, Navigation app).
  - Safety and Account sections.
  - Professional UI using shadcn/ui components.

### 2. Update Navigation
- File: `src/components/Navigation.tsx`
- Action: Add "Settings" link to the sidebar/bottom nav.

### 3. Update Routing
- File: `src/App.tsx`
- Action: Register the `/settings` route and link it to the new `Settings` component.

### 4. Verification
- Run `validate_build` to ensure no regressions or type errors.
