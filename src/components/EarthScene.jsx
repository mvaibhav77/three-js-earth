import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// Custom hooks
import { useWindowResize } from "../hooks/useWindowResize.js";

// Components and utilities
import { createEarthMeshes } from "../3dComponents/createEarthMeshes.js";
import {
  createRenderer,
  createSceneAndCamera,
  createLighting,
  createAnimationLoop,
  cleanupResources,
} from "../utils/index.js";
import { useTextures } from "../utils/textureLoader.js";

// 3D Components
import getStarfield from "../3dComponents/getStartfield.js";

const w = window.innerWidth;
const h = window.innerHeight;

function EarthScene() {
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const textures = useTextures();

  // Use custom hook for window resize
  useWindowResize(cameraRef, rendererRef);

  useEffect(() => {
    const currentRef = sceneRef.current;
    if (!currentRef) return;

    // Clean up any existing canvas
    if (currentRef.firstChild) {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      currentRef.removeChild(currentRef.firstChild);
    }

    // Create renderer
    const renderer = createRenderer(w, h);
    rendererRef.current = renderer;
    currentRef.appendChild(renderer.domElement);

    // Create scene, camera, and Earth group
    const { scene, camera, earthGroup } = createSceneAndCamera(w, h);
    cameraRef.current = camera;

    // Set up orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Create Earth meshes
    const earthMeshes = createEarthMeshes(earthGroup, textures);

    // Add starfield background
    const stars = getStarfield({ numStars: 3000 });
    scene.add(stars);

    // Set up lighting
    createLighting(scene);

    // Start animation loop
    const animate = createAnimationLoop({
      renderer,
      scene,
      camera,
      controls,
      meshes: earthMeshes,
    });
    animate();

    // Cleanup function
    return () => {
      cleanupResources({
        currentRef,
        rendererRef,
        earthGeo: earthMeshes.earthGeo,
        materials: earthMeshes.materials,
      });
    };
  }, [textures]);

  return <div className="threejs-canvas" ref={sceneRef} />;
}

export default EarthScene;
