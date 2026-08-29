# GeoSafe Mobile - Screens Specification

## 📱 Screen Architecture

### Navigation Structure
```
Root
├── Auth Stack (Not logged in)
│   ├── Welcome Screen
│   ├── Login Screen
│   └── Register Screen
│
└── Main Stack (Logged in)
    ├── Tab Navigator (Bottom tabs)
    │   ├── Home Tab → Home Screen
    │   ├── Map Tab → Map Screen
    │   ├── Predict Tab → Prediction Screen
    │   ├── Reports Tab → Reports Screen
    │   └── Profile Tab → Profile Screen
    │
    └── Modal Screens (Full screen modals)
        ├── Prediction Result Screen
        ├── Forecast Details Screen
        ├── Alert Details Screen
        └── Settings Screen
```

---

## 🔐 Auth Stack Screens

### 1. Welcome Screen
**Route:** `/welcome`  
**Access:** Unauthenticated users only

**Purpose:** First screen, app introduction

**Components:**
- App logo and name
- Tagline: "Predict landslides, save lives"
- Brief feature highlights (3-4 cards)
- "Get Started" button → Register
- "Already have account" link → Login
- Skip option (limited features)

**Design Notes:**
- Swipeable introduction cards
- Animated background (subtle)
- Bottom sheet for auth options

---

### 2. Login Screen
**Route:** `/login`  
**Access:** Unauthenticated users

**Purpose:** User authentication

**Form Fields:**
- Email/Phone (input)
- Password (secure input)
- "Remember me" checkbox
- "Forgot password?" link

**Actions:**
- Login button (primary)
- Social login options (Google, optional)
- "Sign up" link → Register

**Validation:**
- Real-time email validation
- Password visibility toggle
- Error messages below fields

**Design Notes:**
- Clean, minimal design
- Logo at top
- Keyboard-aware scroll

---

### 3. Register Screen
**Route:** `/register`  
**Access:** Unauthenticated users

**Purpose:** New user registration

**Form Fields:**
- Full Name
- Email
- Phone (optional)
- Password
- Confirm Password
- Terms & conditions checkbox

**Actions:**
- Register button
- "Already have account" → Login

**Validation:**
- Password strength indicator
- Real-time validation
- Terms must be accepted

---

## 🏠 Main App Screens

### 4. Home Screen (Dashboard)
**Route:** `/home`  
**Tab:** Home (🏠)  
**Access:** Authenticated users

**Purpose:** Overview of current risk status and quick actions

**Sections:**

#### Header
- Location display (current or selected)
- Notification bell icon (badge if new)
- Date/time

#### Quick Stats Cards
1. **Current Risk Level**
   - Score (large number)
   - Level badge (Critical/High/Moderate/Low)
   - Last updated time
   - "Check Now" button

2. **Active Alerts**
   - Count of active alerts
   - Highest severity shown
   - "View All" link

3. **Recent Predictions**
   - Last 3 predictions
   - Location, risk score, date
   - "See All" link

#### Quick Actions
- 🎯 Quick Predict (FAB - Floating Action Button)
- 📍 Use Current Location
- 📊 View Forecast
- 🗺️ Explore Map

#### News/Updates Section
- Latest alerts
- System updates
- Tips for safety

**Design Notes:**
- Pull-to-refresh enabled
- Scrollable content
- Card-based layout
- Bottom tab navigation visible

---

### 5. Map Screen
**Route:** `/map`  
**Tab:** Map (🗺️)  
**Access:** Authenticated users

**Purpose:** Geographic visualization of risk areas

**Components:**

#### Map View
- Interactive map (Google/Mapbox)
- User location marker (blue dot)
- Risk area overlays (color-coded)
- District boundaries
- Prediction markers (pins)

#### Map Controls
- Zoom in/out buttons
- Current location button
- Map type selector (Standard/Satellite/Terrain)
- Search bar (location search)

#### Bottom Sheet (Swipeable)
- **Collapsed:** Shows selected location name
- **Expanded:** Location details, risk score, "Predict" button

#### Features:**
- Tap on map → Show risk for that location
- Heat map overlay for risk zones
- Filter by risk level
- Recent predictions as markers

**Design Notes:**
- Full-screen map
- Floating controls
- Smooth animations
- Cluster markers when zoomed out

---

### 6. Prediction Screen
**Route:** `/predict`  
**Tab:** Predict (🎯) - CENTER TAB  
**Access:** Authenticated users

**Purpose:** Make new landslide predictions

**Sections:**

#### Location Input
- **Option 1:** Use current location (GPS button)
- **Option 2:** Search location (autocomplete)
- **Option 3:** Select on map (map icon)
- Selected location displayed with coordinates

#### Additional Options (Collapsible)
- Date range selector (last 7/14/30 days)
- Buffer radius slider (1-5 km)
- Advanced settings (optional)

#### Prediction Button
- Large, prominent "Predict Risk" button
- Shows loading spinner when processing

#### Recent Predictions List
- Last 5 predictions
- Quick access to results
- Swipe to delete

**Design Notes:**
- Center screen focus
- Clear CTAs
- Loading states
- Error handling

---

### 7. Reports Screen (History)
**Route:** `/reports`  
**Tab:** Reports (📊)  
**Access:** Authenticated users

**Purpose:** View prediction history and analytics

**Sections:**

#### Filters Bar
- Date range picker
- Risk level filter
- Location filter
- Sort options (newest/highest risk)

#### Predictions List
- **List Item:**
  - Location name
  - Risk score (colored badge)
  - Date & time
  - Thumbnail map preview
  - Tap → Full details

#### Analytics Section
- Total predictions count
- Average risk score
- Risk distribution chart (pie/bar)
- Trend over time (line chart)

#### Export Options
- Download as PDF
- Share report
- Export CSV

**Design Notes:**
- Infinite scroll / pagination
- Pull to refresh
- Empty state illustration
- Skeleton loaders

---

### 8. Profile Screen
**Route:** `/profile`  
**Tab:** Profile (👤)  
**Access:** Authenticated users

**Purpose:** User account and app settings

**Sections:**

#### User Info Card
- Profile picture
- Name
- Email
- Edit button

#### Settings List

**Notifications**
- Push notifications toggle
- Email alerts toggle
- Alert thresholds

**Preferences**
- Default location
- Map type preference
- Units (metric/imperial)
- Language (future)

**Data & Privacy**
- View saved data
- Clear cache
- Privacy policy
- Terms of service

**Support**
- Help & FAQ
- Report a bug
- Contact support
- Rate app

**Account**
- Change password
- Delete account
- Logout (red text)

**Design Notes:**
- Section headers
- List with right chevrons
- Confirmation modals for critical actions

---

## 📄 Modal/Detail Screens

### 9. Prediction Result Screen
**Route:** `/prediction-result/:id`  
**Type:** Modal/Push

**Purpose:** Show detailed prediction results

**Sections:**

#### Header
- Location name
- Coordinates
- Date & time

#### Risk Assessment Card
- **Main Score:** Large number (0-100)
- **Level:** Badge (Critical/High/Moderate/Low)
- **Confidence:** Percentage
- **Description:** What this means

#### Feature Breakdown
- Rainfall (3d, 7d, 14d, 30d) - Bar chart
- Elevation & Slope - Values
- Soil Type - Icon + text
- Vegetation (NDVI/NDWI) - Values

#### 7-Day Forecast
- Day-by-day predictions
- Risk trend chart
- Weather indicators

#### Map View
- Small map showing location
- "View on full map" button

#### Actions
- Share result
- Save for later
- View forecast
- Report issue

**Design Notes:**
- Scrollable content
- Color-coded risk levels
- Interactive charts
- Back/close button

---

### 10. Forecast Details Screen
**Route:** `/forecast/:locationId`  
**Type:** Modal/Push

**Purpose:** 7-day detailed forecast

**Sections:**

#### Location Header
- Name, coordinates
- Current date

#### Daily Forecast Cards
**Each Day:**
- Date
- Risk score & level
- Confidence percentage
- Key factors (rainfall, etc.)
- Weather icon (if available)
- Expand button → Details

#### Trend Chart
- Line chart showing risk over 7 days
- Color zones for risk levels

#### Recommendations
- Safety tips based on forecast
- Evacuation recommendations (if critical)
- Stay updated reminder

**Design Notes:**
- Horizontal scroll for days
- Expandable cards
- Visual indicators

---

### 11. Alert Details Screen
**Route:** `/alert/:id`  
**Type:** Modal/Push

**Purpose:** Show alert details and actions

**Sections:**

#### Alert Header
- Severity badge (Critical/High/Medium/Low)
- Title
- Date & time issued

#### Content
- Description
- Affected area (map)
- Risk factors
- Expected conditions

#### Recommendations
- What to do now
- Emergency contacts
- Evacuation routes (if applicable)

#### Actions
- Mark as read
- Share with others
- View on map
- Dismiss

---

### 12. Settings Screen
**Route:** `/settings`  
**Type:** Modal/Push

**Purpose:** App configuration

**Sections:**

#### Notification Settings
- Enable/disable push
- Alert thresholds
- Quiet hours

#### Location Settings
- Default location
- Auto-detect location
- Location history

#### Display Settings
- Theme (Light/Dark/Auto)
- Map style
- Units preference

#### Data Settings
- Sync frequency
- Offline mode
- Cache management

#### About
- App version
- Build number
- Licenses
- Privacy policy

---

## 🎨 Design System

### Color Scheme
```
Risk Levels:
- Critical: #DC2626 (Red)
- High: #F97316 (Orange)
- Moderate: #EAB308 (Yellow)
- Low: #10B981 (Green)

Primary: #6366F1 (Indigo)
Background: #F9FAFB (Light Gray)
Text: #111827 (Dark Gray)
```

### Typography
- Headers: Poppins Bold
- Body: Inter Regular
- Numbers: Roboto Mono

### Components
- Cards: 12px border radius, shadow
- Buttons: 8px border radius, 48px height
- Inputs: 8px border radius, 44px height

---

## 📏 Screen Sizes

### Breakpoints
- Small: < 375px (iPhone SE)
- Medium: 375-430px (iPhone 12/13/14)
- Large: > 430px (iPhone Pro Max, tablets)

### Responsive Behavior
- Single column layout
- Bottom tabs always visible
- Collapsible sections on small screens
- Adaptive font sizes

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-27  
**Total Screens:** 12 screens
