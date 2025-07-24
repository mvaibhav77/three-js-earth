# Project Structure

This project has been refactored into a modular structure for better maintainability and readability.

## 📁 Directory Structure

```
src/
|
├── hooks/               # Custom React hooks
│   └── useWindowResize.js
├── utils/               # Utility functions
│   ├── index.js
│   ├── createRenderer.js
│   ├── createSceneAndCamera.js
│   ├── createEarthMaterials.js
│   ├── createLighting.js
│   ├── createAnimationLoop.js
│   └── cleanupResources.js
├── 3dComponents/        # Three.js specific components
│   ├── getStartfield.js
│   └── getFresnelMat.js
├── assets/              # Textures and static assets
│   └── textures/
└── App.jsx              # Main application component
```

## 🧩 Component Breakdown

### **App.jsx** (Main Component)

- Clean, minimal main component
- Uses custom hooks and utilities
- Easy to understand and modify

### **Hooks**

- **`useWindowResize.js`** - Handles window resizing for responsive Three.js scenes

### **Utils**

- **`createRenderer.js`** - Sets up WebGL renderer with optimized settings
- **`createSceneAndCamera.js`** - Creates scene, camera, and Earth group
- **`createEarthMaterials.js`** - Creates all materials (earth, lights, clouds)
- **`createLighting.js`** - Sets up directional lighting (sun)
- **`createAnimationLoop.js`** - Handles animation and rotation logic
- **`cleanupResources.js`** - Properly disposes of Three.js resources

### **Components**

- **`createEarthMeshes.js`** - Creates all Earth-related meshes and adds them to the scene

## 🎯 Benefits of This Structure

### **1. Modularity**

- Each function has a single responsibility
- Easy to test individual components
- Reusable across different projects

### **2. Maintainability**

- Clear separation of concerns
- Easy to find and modify specific functionality
- Well-documented with JSDoc comments

### **3. Readability**

- Main App.jsx is now clean and easy to understand
- Logical grouping of related functions
- Consistent naming conventions

### **4. Scalability**

- Easy to add new features
- Can easily extend with new mesh types or effects
- Prepared for future enhancements

## 🚀 Usage

The refactored code maintains the same functionality while being much more organized:

```jsx
// Instead of 200+ lines in App.jsx, now it's clean:
import { createEarthMeshes } from "./components/createEarthMeshes.js";
import { createRenderer, createSceneAndCamera } from "./utils/index.js";

// Clear, readable setup
const renderer = createRenderer(w, h);
const { scene, camera, earthGroup } = createSceneAndCamera(w, h);
const earthMeshes = createEarthMeshes(earthGroup);
```

## 🔧 Customization

Want to modify something? Now it's easy:

- **Change Earth textures**: Edit `createEarthMaterials.js`
- **Adjust lighting**: Modify `createLighting.js`
- **Change rotation speeds**: Update `createAnimationLoop.js`
- **Add new meshes**: Extend `createEarthMeshes.js`

## 📚 Next Steps

This structure makes it easy to:

- Add new planets or celestial bodies
- Implement different lighting scenarios
- Create multiple scenes or views
- Add GUI controls for real-time adjustments
- Implement advanced shaders or effects

Perfect for making the repo public and easy for others to understand and contribute to! 🌍✨
