# GeoSafe Mobile App - Planning Document

## 📱 Project Overview

**Project Name:** GeoSafe Mobile  
**Platform:** React Native (iOS & Android)  
**Backend:** Shared with Web App (Flask API at `backend/`)  
**Purpose:** Mobile landslide prediction and risk monitoring app

## 🎯 Project Goals

### Primary Goals
1. Provide mobile access to landslide prediction features
2. Enable on-the-go risk monitoring and alerts
3. Offer offline capabilities for remote areas
4. Deliver push notifications for critical alerts
5. Utilize device GPS for location-based predictions

### Target Users
- Field workers in landslide-prone areas
- Emergency response teams
- Local authorities and disaster management
- Researchers and surveyors
- General public in high-risk regions

## 📁 Project Structure

```
GeoSafe/
├── backend/              # Shared Flask API (existing)
├── frontend/             # Web app (existing, React + Vite)
├── mobile/               # NEW: React Native mobile app
│   ├── android/          # Android native code
│   ├── ios/              # iOS native code
│   ├── src/
│   │   ├── screens/      # App screens
│   │   ├── components/   # Reusable components
│   │   ├── navigation/   # Navigation configuration
│   │   ├── services/     # API calls
│   │   ├── utils/        # Utilities
│   │   ├── hooks/        # Custom hooks
│   │   ├── context/      # Context providers
│   │   ├── assets/       # Images, fonts, etc.
│   │   └── constants/    # Constants & config
│   ├── App.tsx           # Root component
│   ├── package.json
│   └── tsconfig.json
├── ai-module/            # ML training (existing)
└── docs/                 # Documentation (existing)
```

## 🔄 Integration Strategy

### Backend Integration
- **Same API:** Mobile app uses existing Flask backend
- **API Base URL:** Configurable per environment (dev/prod)
- **Authentication:** Same Supabase auth as web
- **Endpoints:** All existing `/api/*` endpoints

### Code Sharing
- **Services:** API service logic can be adapted from web
- **Constants:** Share API URLs, validation rules
- **Types:** TypeScript types for API responses
- **Utilities:** Date formatting, validation functions

### Coexistence Strategy
```
✅ Web and Mobile are SEPARATE codebases
✅ Both consume SAME backend API
✅ Shared backend runs on one server
✅ Different deployment pipelines
✅ Independent versioning
```

## 🛠️ Technology Stack

### Core
- **Framework:** React Native 0.73+
- **Language:** TypeScript
- **Navigation:** React Navigation 6
- **State Management:** React Context + Hooks

### UI/UX
- **UI Library:** React Native Paper
- **Icons:** React Native Vector Icons
- **Maps:** React Native Maps
- **Charts:** React Native Chart Kit

### Networking
- **HTTP Client:** Axios
- **API Base:** Same Flask backend
- **Real-time:** (Future) WebSockets for alerts

### Storage
- **Async Storage:** Local data persistence
- **Supabase:** Same database as web
- **Secure Storage:** Encrypted credentials

### Device Features
- **Location:** React Native Geolocation
- **Permissions:** React Native Permissions
- **Notifications:** React Native Push Notifications
- **Camera:** (Future) React Native Camera

### Development Tools
- **Build:** Metro bundler
- **Debugging:** Flipper / React Native Debugger
- **Testing:** Jest + React Native Testing Library
- **Linting:** ESLint + Prettier

## 📊 Features Priority

### Phase 1: MVP (Essential)
1. ✅ User authentication (Supabase)
2. ✅ Location-based prediction
3. ✅ Risk dashboard
4. ✅ Recent predictions list
5. ✅ Basic map integration

### Phase 2: Enhanced (Important)
1. ⭐ Push notifications for alerts
2. ⭐ Offline data caching
3. ⭐ 7-day forecast view
4. ⭐ District-wise risk map
5. ⭐ Historical data charts

### Phase 3: Advanced (Nice-to-have)
1. 🔮 Camera for field reports
2. 🔮 Offline ML predictions
3. 🔮 Community reports
4. 🔮 Multi-language support
5. 🔮 Weather integration

## 🔐 Security Considerations

### API Security
- HTTPS only for production
- Same authentication as web (Supabase JWT)
- API key management via environment variables
- Secure storage for tokens

### Data Privacy
- No sensitive data in plain storage
- Encrypted credentials
- Location data handled carefully
- GDPR/privacy policy compliance

## 📱 Platform Requirements

### Minimum Versions
- **iOS:** 13.0+
- **Android:** 6.0+ (API 23)

### Device Requirements
- GPS/Location services
- Internet connectivity (online features)
- 100MB storage minimum
- Camera (optional, for future features)

## 🚀 Development Phases

### Phase 1: Setup & Foundation (Week 1-2)
- Initialize React Native project
- Setup navigation structure
- Configure API services
- Implement authentication

### Phase 2: Core Features (Week 3-4)
- Build main screens
- Implement prediction flow
- Add map integration
- Create dashboard

### Phase 3: Polish & Testing (Week 5)
- UI/UX refinement
- Error handling
- Performance optimization
- Testing on devices

### Phase 4: Deployment Prep (Week 6)
- App store assets
- Build configuration
- CI/CD setup
- Beta testing

## 🔗 API Endpoints (Existing Backend)

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration
- POST `/api/auth/logout` - User logout

### Predictions
- POST `/api/predict` - Get landslide prediction
- GET `/api/predictions?limit=N` - Recent predictions
- POST `/api/forecast/predict` - 7-day forecast

### Analytics
- GET `/api/stats` - Dashboard statistics
- GET `/api/districts/himachal` - District data

### Alerts
- GET `/api/alerts?limit=N&level=X` - Get alerts

## 📈 Success Metrics

### Technical Metrics
- App load time < 2 seconds
- API response time < 3 seconds
- Crash-free rate > 99%
- App size < 50MB

### User Metrics
- Daily active users
- Prediction requests per day
- Alert engagement rate
- User retention rate

## 🎨 Design Principles

1. **Mobile-First:** Optimized for small screens
2. **Offline-Ready:** Core features work offline
3. **Fast:** Quick load times, instant feedback
4. **Intuitive:** Easy navigation, clear CTAs
5. **Accessible:** High contrast, readable fonts

## 🔮 Future Enhancements

1. **Offline ML:** Run predictions without internet
2. **AR Visualization:** AR view of risk areas
3. **Social Features:** Community risk reports
4. **Wearable Support:** Apple Watch, Android Wear
5. **Voice Commands:** Hands-free operation

## 📝 Notes

- Web app remains primary interface for detailed analysis
- Mobile app focuses on quick checks and alerts
- Shared backend means feature parity with web
- Consider Progressive Web App (PWA) as alternative

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-27  
**Status:** Planning Phase
