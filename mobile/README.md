# TerraAlert Mobile 📱

React Native mobile application for landslide prediction and early warning system.

## 🎯 Cross-Platform Support

This app is **fully compatible** with both iOS and Android:
- ✅ **Android**: Supported (API 21+)
- ✅ **iOS**: Supported (iOS 13+)
- ✅ **Shared Codebase**: 95%+ code reuse

## 🚀 Getting Started

### Prerequisites

**Required for All Platforms:**
- Node.js ≥ 22.11.0
- npm or yarn
- React Native CLI

**For Android Development:**
- [Android Studio](https://developer.android.com/studio)
- Android SDK (API 34+)
- Java JDK 17

**For iOS Development (Mac only):**
- [Xcode](https://developer.apple.com/xcode/) 14+
- CocoaPods: `sudo gem install cocoapods`
- iOS Simulator or device

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **For iOS only (Mac):**
```bash
cd ios
pod install
cd ..
```

3. **Configure environment:**
Create `.env` file (or use existing `.env.development`):
```env
API_BASE_URL=http://localhost:5000/api
SUPABASE_URL=https://lwurspqlazvnaqcyzdwg.supabase.co
SUPABASE_ANON_KEY=your_key_here
```

### Running the App

**Start Metro bundler:**
```bash
npm start
```

**Run on Android:**
```bash
npm run android
```

**Run on iOS:**
```bash
npm run ios
```

## 📁 Project Structure

```
mobile/
├── src/
│   ├── screens/          # Screen components
│   ├── components/       # Reusable UI components
│   ├── navigation/       # Navigation setup
│   ├── services/         # API & Supabase clients
│   ├── hooks/            # Custom React hooks
│   ├── context/          # React context providers
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript definitions
│   ├── constants/        # App constants
│   ├── theme/            # Design tokens (colors, typography)
│   └── assets/           # Images, icons, fonts
├── android/              # Android native code
├── ios/                  # iOS native code
├── .env                  # Environment variables
├── app.json              # App configuration
└── package.json          # Dependencies
```

## 🎨 Design System

The app uses a comprehensive design system with:
- **Colors**: Earth tones + high-tech accents
- **Typography**: Responsive font scale
- **Spacing**: 4px grid system
- **Theme**: Consistent across all screens

See [`../mobile-docs/UI_DESIGN_BRIEF.md`](../mobile-docs/UI_DESIGN_BRIEF.md) for details.

## 🔗 Backend Integration

Connects to shared Flask backend:
- **API**: `http://localhost:5000/api`
- **Supabase**: For authentication & database

## 📱 Platform-Specific Notes

### Android
- **Package**: `com.terraalertmobile`
- **Min SDK**: 21 (Android 5.0)
- **Target SDK**: 34 (Android 14)

### iOS
- **Bundle ID**: `org.reactjs.native.example.TerraAlertMobile`
- **Min Version**: iOS 13.0
- **Swift**: 5.0+

## 🧪 Testing

```bash
# Run tests
npm test

# Run linter
npm run lint
```

## 📦 Building for Production

### Android APK
```bash
cd android
./gradlew assembleRelease
```
Output: `android/app/build/outputs/apk/release/app-release.apk`

### Android AAB (for Play Store)
```bash
cd android
./gradlew bundleRelease
```

### iOS Archive (Mac only)
```bash
cd ios
xcodebuild -workspace TerraAlertMobile.xcworkspace \
  -scheme TerraAlertMobile \
  -configuration Release \
  archive
```

## 🗺️ Roadmap

See [`../mobile-docs/tasks.md`](../mobile-docs/tasks.md) for complete development plan:
- **Phase 1**: Core setup & navigation (Weeks 1-2)
- **Phase 2**: Essential screens (Weeks 3-4)
- **Phase 3**: Advanced features (Weeks 5-8)
- **Phase 4**: Polish & testing (Weeks 9-10)

## 📚 Documentation

- **Planning**: `../mobile-docs/planning.md`
- **Screens**: `../mobile-docs/screens.md`
- **API Guide**: `../mobile-docs/api.md`
- **Decisions**: `../mobile-docs/decisions.md`

## 🤝 Contributing

1. Follow TypeScript strict mode
2. Use functional components with hooks
3. Match existing code style
4. Test on both platforms before PR

## 📄 License

Same as parent project

---

Built with ❤️ using React Native
