# Mobile Starter Files

## 📂 What's in This Folder?

This folder contains **starter code files** that you'll need once the React Native project is initialized. These files are ready to copy into your mobile app.

## 📋 Setup Instructions

### Step 1: Initialize React Native Project

Follow the instructions in `../SETUP_MOBILE.md` to create the React Native project.

### Step 2: Copy Files to Mobile Project

After the project is initialized, copy these files to the appropriate locations:

#### Environment Files
```bash
copy .env.development  →  mobile/.env.development
```

#### Service Files
```bash
copy src-services-api.ts         →  mobile/src/services/api.ts
copy src-services-supabase.ts    →  mobile/src/services/supabase.ts
copy src-services-apiService.ts  →  mobile/src/services/apiService.ts
```

### Step 3: Install Dependencies

The `package-additions.json` file lists all additional dependencies to install.

Run in `mobile/` folder:
```bash
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

### Step 4: Configure Environment Variables

1. Open `mobile/babel.config.js`
2. Add the `react-native-dotenv` plugin:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env.development',
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
```

3. Create a `react-native-config.d.ts` file in `mobile/` folder:

```typescript
declare module '@env' {
  export const API_BASE_URL: string;
  export const SUPABASE_URL: string;
  export const SUPABASE_ANON_KEY: string;
  export const GOOGLE_MAPS_API_KEY: string;
  export const APP_NAME: string;
  export const DEBUG_MODE: string;
}
```

### Step 5: Update TypeScript Paths

Already included in the setup guide, but ensure `tsconfig.json` has path aliases.

### Step 6: Test the Services

Create a test screen to verify API connectivity:

```typescript
import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import apiService from './services/apiService';

const TestScreen = () => {
  const [health, setHealth] = useState<any>(null);

  const testAPI = async () => {
    try {
      const data = await apiService.checkHealth();
      setHealth(data);
      console.log('API Health:', data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>API Test</Text>
      <Button title="Test API" onPress={testAPI} />
      {health && <Text>{JSON.stringify(health)}</Text>}
    </View>
  );
};

export default TestScreen;
```

## 📁 File Descriptions

### `.env.development`
Environment variables for development (backend URL, Supabase keys, etc.)

### `src-services-api.ts`
Axios client with interceptors for auth and error handling.

### `src-services-supabase.ts`
Supabase client for authentication and database access.

### `src-services-apiService.ts`
Complete API service layer with all backend endpoints:
- `checkHealth()` - Health check
- `getPrediction()` - Get landslide prediction
- `get7DayForecast()` - Get 7-day forecast
- `getRecentPredictions()` - Get prediction history
- `getDashboardStats()` - Get dashboard data
- `getHimachalDistricts()` - Get district data
- `getAlerts()` - Get alerts

### `package-additions.json`
List of npm packages to install (reference only).

## ✅ Verification

After copying files and installing dependencies:

1. ✅ Environment variables accessible via `@env`
2. ✅ API client configured and working
3. ✅ Supabase client initialized
4. ✅ All API methods available
5. ✅ TypeScript types working

## 🔜 Next Steps

After setup:
1. Create navigation structure
2. Build authentication screens
3. Implement main app screens
4. Add state management (Context)
5. Style with React Native Paper

Follow `mobile-docs/tasks.md` for the development roadmap.

## 📞 Need Help?

- Check `../SETUP_MOBILE.md` for detailed setup
- Review `../mobile-docs/` for planning documents
- Check React Native docs for troubleshooting

---

**These files give you a solid foundation to start building the mobile app!**
