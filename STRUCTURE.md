# Project Structure

This project has been refactored into a modular structure for better maintainability and readability.

## 📁 Directory Structure

```
.
├── public/
│   └── ... # Public assets
├── src/
│   ├── 3dComponents/
│   │   ├── createEarthMeshes.js
│   │   ├── getFresnelMat.js
│   │   └── getStartfield.js
│   ├── assets/
│   │   ├── star.png
│   │   └── textures/
│   │       ├── bump_earth.jpg
│   │       ├── cloudMap.jpg
│   │       ├── day_earth.jpg
│   │       ├── night_earth.jpg
│   │       ├── spec_earth.jpg
│   │       ├── spec_earth.tif
│   │       └── stars.jpg
│   ├── components/
│   │   ├── EarthScene.jsx
│   │   └── LoadingScreen.jsx
│   ├── hooks/
│   │   └── useWindowResize.js
│   ├── utils/
│   │   ├── cleanupResources.js
│   │   ├── createAnimationLoop.js
│   │   ├── createEarthMaterials.js
│   │   ├── createLighting.js
│   │   ├── createRenderer.js
│   │   ├── createSceneAndCamera.js
│   │   ├── index.js
│   │   └── textureLoader.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── STRUCTURE.md
```

## 🧩 Component Breakdown

### **App.jsx** (Main Component)

- **Suspense Boundary**: Uses React Suspense to handle texture loading
- **Clean Architecture**: Shows LoadingScreen while EarthScene loads
- **Simple and Focused**: Just handles the loading state management

### **Components**

- **`EarthScene.jsx`** - Main Three.js scene component that gets suspended until textures load
- **`LoadingScreen.jsx`** - Simple loading screen shown during texture loading

### **Hooks**

- **`useWindowResize.js`** - Handles window resizing for responsive Three.js scenes

### **Utils**

- **`createRenderer.js`** - Sets up WebGL renderer with optimized settings
- **`createSceneAndCamera.js`** - Creates scene, camera, and Earth group
- **`createEarthMaterials.js`** - Creates all materials using preloaded textures (earth, lights, clouds)
- **`createLighting.js`** - Sets up directional lighting (sun)
- **`createAnimationLoop.js`** - Handles animation and rotation logic
- **`cleanupResources.js`** - Properly disposes of Three.js resources
- **`textureLoader.js`** - Suspense-compatible texture loading with caching

### **3D Components**

- **`createEarthMeshes.js`** - Creates all Earth-related meshes using preloaded textures
- **`getFresnelMat.js`** - Creates atmospheric glow material
- **`getStartfield.js`** - Generates starfield background

## 🎯 Benefits of This Structure

### **1. React Suspense Integration**

- **Automatic Loading States**: No manual loading state management needed
- **Smooth UX**: Shows loading screen until all textures are ready
- **Error Boundaries**: Can easily add error handling for failed loads

### **2. Modularity**

- Each function has a single responsibility
- Easy to test individual components
- Reusable across different projects

### **3. Maintainability**

- Clear separation of concerns
- Easy to find and modify specific functionality
- Well-documented with JSDoc comments

### **4. Scalability**

- Easy to add new features
- Can easily extend with new mesh types or effects
- Prepared for future enhancements

## 🚀 Usage

The refactored code with Suspense provides a clean loading experience:

```jsx
// App.jsx - Simple Suspense boundary
function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <EarthScene />
    </Suspense>
  );
}

// EarthScene.jsx - Gets suspended until textures load
function EarthScene() {
  const textures = useTextures(); // Suspends until ready
  // ... rest of Three.js setup
}

// textureLoader.js - Suspense-compatible loading
export const useTextures = () => {
  if (cache) return cache;
  throw load(); // React Suspense catches this
};
```

## 🔧 Customization

Want to modify something? Now it's easy:

- **Change Earth textures**: Edit `createEarthMaterials.js` or update texture imports in `textureLoader.js`
- **Adjust lighting**: Modify `createLighting.js`
- **Change rotation speeds**: Update `createAnimationLoop.js`
- **Customize loading screen**: Edit `LoadingScreen.jsx`
- **Add error handling**: Wrap Suspense with an Error Boundary

## 📚 Next Steps

This structure makes it easy to:

- **Add new planets or celestial bodies**
- **Implement different lighting scenarios**
- **Create multiple scenes or views**
- **Add GUI controls for real-time adjustments**
- **Implement advanced shaders or effects**
- **Add progress indicators during loading**
- **Handle texture loading errors gracefully**
