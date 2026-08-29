# GeoSafe Mobile - Setup Instructions

## 🚀 Step-by-Step Setup Guide

### Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 16+ installed
- ✅ npm or yarn installed
- ✅ React Native CLI installed globally
- ✅ Android Studio (for Android development)
- ✅ Xcode (for iOS development, Mac only)

### Step 1: Initialize React Native Project

Open a **Command Prompt** (NOT PowerShell) and run:

```cmd
cd "d:\VS-Code projects\GeoSafe"
npx react-native@latest init GeoSafeMobile --template react-native-template-typescript
```

**Note:** This will take 5-10 minutes to download and set up.

When asked "Do you want to install CocoaPods now?", answer:
- **Yes** if on Mac
- **No** if on Windows (we'll handle iOS later)

---

### Step 2: Rename to 'mobile' Folder

After initialization completes:

```cmd
cd "d:\VS-Code projects\GeoSafe"
move GeoSafeMobile mobile
```

---

### Step 3: Install Additional Dependencies

```cmd
cd mobile
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-paper react-native-vector-icons
npm install axios @supabase/supabase-js
npm install @react-native-async-storage/async-storage
npm install react-native-maps
npm install react-native-geolocation-service
npm install react-native-permissions
npm install @react-native-community/netinfo
npm install react-native-dotenv
npm install --save-dev @types/react-native-vector-icons
```

---

### Step 4: Link Native Dependencies (Android)

```cmd
cd android
gradlew clean
cd ..
```

---

### Step 5: Create Folder Structure

```cmd
cd src
mkdir screens components navigation services hooks context utils types assets constants theme
cd screens
mkdir auth main details
cd ..\..\..
```

Full structure:
```
mobile/
├── src/
│   ├── screens/
│   │   ├── auth/
│   │   ├── main/
│   │   └── details/
│   ├── components/
│   ├── navigation/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   ├── utils/
│   ├── types/
│   ├── assets/
│   ├── constants/
│   └── theme/
├── android/
├── ios/
├── App.tsx
└── package.json
```

---

### Step 6: Create Environment Files

Create `.env.development` in `mobile/` folder:

```env
# Backend API
API_BASE_URL=http://localhost:5000/api

# Supabase
SUPABASE_URL=https://lwurspqlazvnaqcyzdwg.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3dXJzcHFsYXp2bmFxY3l6ZHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NjgzMjUsImV4cCI6MjA5MjE0NDMyNX0.q1iubZPUFhSTpPFd64TWav8Elmp7wIor7sSs7s88G2Q

# Google Maps (get your own key)
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_KEY
```

Create `.env.production`:

```env
# Backend API (Update when deployed)
API_BASE_URL=https://api.geosafe.com/api

# Supabase (same as dev for now)
SUPABASE_URL=https://lwurspqlazvnaqcyzdwg.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3dXJzcHFsYXp2bmFxY3l6ZHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NjgzMjUsImV4cCI6MjA5MjE0NDMyNX0.q1iubZPUFhSTpPFd64TWav8Elmp7wIor7sSs7s88G2Q

# Google Maps
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_KEY
```

---

### Step 7: Update .gitignore

Add to `mobile/.gitignore`:

```
# Environment files
.env
.env.development
.env.production
.env.local

# Custom
.vscode/
*.log
```

---

### Step 8: Configure TypeScript

Update `mobile/tsconfig.json`:

```json
{
  "extends": "@tsconfig/react-native/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@screens/*": ["src/screens/*"],
      "@components/*": ["src/components/*"],
      "@navigation/*": ["src/navigation/*"],
      "@services/*": ["src/services/*"],
      "@hooks/*": ["src/hooks/*"],
      "@context/*": ["src/context/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"],
      "@assets/*": ["src/assets/*"],
      "@constants/*": ["src/constants/*"],
      "@theme/*": ["src/theme/*"]
    }
  }
}
```

---

### Step 9: Test the Setup

Try running the app:

**For Android:**
```cmd
cd mobile
npm run android
```

**For iOS (Mac only):**
```cmd
cd mobile
cd ios
pod install
cd ..
npm run ios
```

You should see the default React Native welcome screen.

---

## 🔧 Troubleshooting

### Issue: "Unable to load script"
**Fix:** 
```cmd
npm start -- --reset-cache
```

### Issue: "Could not connect to development server"
**Fix:**
1. Make sure Metro bundler is running
2. Check firewall settings
3. Try: `adb reverse tcp:8081 tcp:8081` (Android)

### Issue: Android build fails
**Fix:**
```cmd
cd android
gradlew clean
cd ..
npm run android
```

### Issue: CocoaPods issues (iOS)
**Fix:**
```cmd
cd ios
pod deintegrate
pod install
cd ..
```

---

## ✅ Next Steps

After successful setup:

1. ✅ Project initialized
2. ✅ Dependencies installed
3. ✅ Folder structure created
4. ✅ Environment configured

**Now ready to start development!**

Follow the tasks in `mobile-docs/tasks.md` to continue with:
- Navigation setup
- API service layer
- Authentication
- UI screens

---

## 📞 Need Help?

If you encounter issues:
1. Check React Native documentation
2. Review error messages carefully
3. Search for specific errors online
4. Check `mobile-docs/` for guidance

---

**Time to build:** Follow this guide step by step, then we'll start coding the actual app!
