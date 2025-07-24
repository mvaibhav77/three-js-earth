# Day/Night Transition Earth Example

This example demonstrates how to create a realistic Earth with day/night transition using custom shaders in Three.js.

## Features

- **Dynamic Day/Night Transition**: Smoothly blends between day and night textures based on directional lighting
- **Custom Shader Material**: Uses GLSL shaders for realistic lighting calculations
- **Axial Tilt**: Earth has a 23.4-degree axial tilt like the real Earth
- **Starfield Background**: Beautiful star background
- **Orbit Controls**: Interactive camera controls

## How It Works

### Shader System

- **Vertex Shader** (`earthVertex.glsl`): Calculates surface normals and positions
- **Fragment Shader** (`earthFragment.glsl`): Blends day/night textures based on sun direction

### Key Algorithm

```glsl
// Calculate lighting direction
float sunDot = dot(vNormal, normalize(sunDirection));

// Create smooth transition zone (twilight)
float dayNightMix = smoothstep(-0.1, 0.1, sunDot);

// Blend textures
vec4 color = mix(nightTexture, dayColor, dayNightMix);
```

## Required Assets

Make sure you have these texture files:

- `day_earth.jpg` - Daytime Earth texture
- `night_earth.jpg` - Nighttime Earth texture with city lights

## Usage

1. Copy this entire folder to your project
2. Update the import paths in `App.jsx` to match your texture locations:
   ```jsx
   import DayEarth from "../../src/assets/textures/day_earth.jpg";
   import NightEarth from "../../src/assets/textures/night_earth.jpg";
   ```
3. Replace your main App.jsx with this example
4. Run your project

## Customization

### Adjust Transition Zone

Modify the smoothstep values in `earthFragment.glsl`:

```glsl
// Sharper transition
float dayNightMix = smoothstep(-0.05, 0.05, sunDot);

// Softer transition
float dayNightMix = smoothstep(-0.2, 0.2, sunDot);
```

### Change Sun Position

Update the sun direction in `App.jsx`:

```jsx
const sunPosition = new Vector3(-2, 0.5, 1.5); // Modify these values
```

### Adjust Ambient Lighting

Modify ambient light in `earthFragment.glsl`:

```glsl
vec3 ambientLight = vec3(0.1, 0.1, 0.15); // RGB values
```

## Technical Notes

- Uses `ShaderMaterial` instead of `MeshStandardMaterial`
- Requires both vertex and fragment shaders
- Shader files are imported with `?raw` suffix for Vite
- Textures are properly disposed in cleanup function
- Sun direction is normalized for accurate lighting calculations

## Dependencies

- Three.js
- React (with useRef and useEffect)
- Vite (for shader file imports)
