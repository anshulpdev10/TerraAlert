# 📚 React Native Learning Guide for TerraAlert

Welcome! This guide will help you understand React Native concepts as we build TerraAlert Mobile.

---

## 🎯 **What is React Native?**

**Simple Answer:** Write JavaScript/TypeScript once, run on iOS AND Android!

```
     Your Code (TypeScript)
            ↓
      React Native
       /         \
    iOS App   Android App
```

**Key Difference from React Web:**
- React Web: Renders to HTML `<div>`, `<span>`, etc.
- React Native: Renders to native components `<View>`, `<Text>`, etc.

---

## 📁 **Project Structure Explained**

```
mobile/
├── android/              ← Android native code (Java/Kotlin)
│   └── app/              ← Your Android app
├── ios/                  ← iOS native code (Swift/Objective-C)
│   └── TerraAlertMobile/ ← Your iOS app
├── src/                  ← YOUR CODE GOES HERE! (95% of work)
│   ├── screens/          ← Full-screen views (Home, Login, Map)
│   ├── components/       ← Reusable UI pieces (Button, Card)
│   ├── services/         ← Backend API calls
│   ├── navigation/       ← How to move between screens
│   ├── theme/            ← Colors, fonts, spacing
│   └── types/            ← TypeScript type definitions
├── App.tsx               ← Entry point (like index.html)
├── package.json          ← Dependencies list
└── tsconfig.json         ← TypeScript configuration
```

**90% of your time will be in `src/`!**

---

## 🧩 **Core React Native Components**

### **1. View** - Like `<div>` in HTML
```typescript
import {View} from 'react-native';

<View style={{flex: 1, backgroundColor: 'blue'}}>
  {/* Content here */}
</View>
```
**Use for:** Containers, layout, grouping

### **2. Text** - Like `<p>` or `<span>` in HTML
```typescript
import {Text} from 'react-native';

<Text style={{fontSize: 20, color: 'white'}}>
  Hello TerraAlert!
</Text>
```
**Note:** ALL text MUST be in `<Text>` (not like web where you can put text anywhere)

### **3. TouchableOpacity** - Clickable element
```typescript
import {TouchableOpacity, Text} from 'react-native';

<TouchableOpacity onPress={() => console.log('Clicked!')}>
  <Text>Click Me</Text>
</TouchableOpacity>
```
**Use for:** Buttons, clickable cards

### **4. ScrollView** - Scrollable container
```typescript
import {ScrollView, Text} from 'react-native';

<ScrollView>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  {/* ... many items ... */}
</ScrollView>
```

### **5. FlatList** - Efficient scrolling list
```typescript
import {FlatList, Text} from 'react-native';

<FlatList
  data={[{id: '1', name: 'Item 1'}, {id: '2', name: 'Item 2'}]}
  renderItem={({item}) => <Text>{item.name}</Text>}
  keyExtractor={item => item.id}
/>
```
**Use for:** Long lists (better performance than ScrollView)

---

## 🎨 **Styling in React Native**

### **No CSS Files!** - Use StyleSheet API

```typescript
import {View, Text, StyleSheet} from 'react-native';

function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                // Take full height
    backgroundColor: 'blue',
    padding: 16,            // Spacing
    justifyContent: 'center', // Center vertically
    alignItems: 'center',   // Center horizontally
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
```

### **Flexbox** - Layout system (similar to web)
```typescript
<View style={{
  flex: 1,              // Take available space
  flexDirection: 'row', // Horizontal layout (default: 'column')
  justifyContent: 'space-between', // Spacing
  alignItems: 'center', // Align items
}}>
  <Text>Left</Text>
  <Text>Right</Text>
</View>
```

---

## 🧭 **Navigation** (Moving Between Screens)

### **React Navigation** - The standard way

```typescript
// Setup (we'll do this together)
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// In your screen, navigate:
function HomeScreen({navigation}) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details')}>
      <Text>Go to Details</Text>
    </TouchableOpacity>
  );
}
```

---

## 🔌 **API Calls** (Connecting to Backend)

### **Using Axios** (we already set this up!)

```typescript
// In src/services/apiService.ts (already created!)
import apiService from '@/services/apiService';

// In your component:
async function getPrediction() {
  try {
    const response = await apiService.getPrediction({
      lat: 31.1048,
      lon: 77.1734,
    });
    console.log('Prediction:', response);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 📱 **Important React Native Concepts**

### **1. No Browser APIs**
```typescript
// ❌ These don't work:
localStorage    // Use AsyncStorage instead
document       // No DOM!
window         // Limited window object
alert()        // Use Alert from react-native
```

### **2. Platform-Specific Code**
```typescript
import {Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'ios' ? 20 : 10,
  },
});

// Or use Platform-specific files:
// Button.ios.tsx  ← Only on iOS
// Button.android.tsx  ← Only on Android
```

### **3. Hot Reload** - See changes instantly!
- Save file → App updates automatically
- No need to rebuild!
- Press `R` twice to reload manually

---

## 🎯 **Your Learning Path**

### **Phase 1: Basics** (Week 1)
- [ ] Understand View, Text, TouchableOpacity
- [ ] Learn StyleSheet and Flexbox
- [ ] Build simple screens

### **Phase 2: Navigation** (Week 2)
- [ ] Set up React Navigation
- [ ] Navigate between screens
- [ ] Pass data between screens

### **Phase 3: State & Data** (Week 3)
- [ ] useState hook
- [ ] useEffect hook
- [ ] API calls with our apiService

### **Phase 4: Advanced** (Week 4+)
- [ ] Context API (global state)
- [ ] Maps integration
- [ ] Animations
- [ ] Push notifications

---

## 📖 **Key Files to Study**

### **Start with these:**
1. `App.tsx` - Entry point, understand the structure
2. `src/theme/colors.ts` - See how theme works
3. `src/screens/SplashScreen.tsx` - Simple screen example
4. `src/services/apiService.ts` - How to call backend

### **TypeScript Tips:**
```typescript
// Define types for your data
interface User {
  id: string;
  name: string;
  email: string;
}

// Use types in functions
function greetUser(user: User): string {
  return `Hello, ${user.name}!`;
}

// TypeScript catches errors:
greetUser({name: 'John'});  // ❌ Error: missing 'id' and 'email'
```

---

## 🐛 **Common Mistakes & Solutions**

### **1. Text outside <Text>**
```typescript
// ❌ Wrong
<View>
  Hello World
</View>

// ✅ Correct
<View>
  <Text>Hello World</Text>
</View>
```

### **2. Forgetting 'style' prop**
```typescript
// ❌ Wrong
<View className="container">  // No className in RN!

// ✅ Correct
<View style={styles.container}>
```

### **3. Not importing components**
```typescript
// ❌ Wrong - undefined
<View>...</View>

// ✅ Correct
import {View} from 'react-native';
<View>...</View>
```

---

## 🚀 **Next Steps**

1. **Run the app**: `npm run android`
2. **Understand the code**: Read App.tsx and SplashScreen.tsx
3. **Make a change**: Edit SplashScreen text and see it update!
4. **Ask questions**: I'll explain anything unclear

---

## 📚 **Resources**

- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Ready to start building?** Let me know when you want to continue! 🎯
