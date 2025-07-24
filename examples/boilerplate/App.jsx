import { useEffect, useRef } from "react";
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// Three.js Boilerplate
// This is a minimal setup to get started with Three.js
// Replace the cube with your own geometry and materials

// // Theory for Three.js
// Three.js is a JavaScript library that makes it easy to create 3D graphics in the browser using WebGL.

// Camera
// The camera defines the viewpoint from which the scene is observed. It determines what is visible and how it is projected onto the screen.

// Scene
// The scene is the container for all 3D objects, lights, and cameras. It represents the 3D space where the objects are placed.

// Renderer
// The renderer is responsible for taking the scene and camera and rendering the final image to the screen.

// Material
// Materials define the appearance of 3D objects. They determine how the surface interacts with light and can create various visual effects.

// Mesh
// A mesh is a 3D object composed of geometry (shape) and material (appearance). It is the basic building block of 3D scenes.

const w = window.innerWidth;
const h = window.innerHeight;

function App() {
  const sceneRef = useRef(null);
  const rendererRef = useRef(null); // Ref to store the renderer

  useEffect(() => {
    const currentRef = sceneRef.current; // Capture the current ref

    if (!currentRef) return; // Exit if the ref is not yet attached

    // Check if a canvas already exists
    if (currentRef.firstChild) {
      // Clean up previous instance (optional, but good practice)
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      currentRef.removeChild(currentRef.firstChild); // Remove the existing canvas
    }

    // Set up Renderer
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    rendererRef.current = renderer; // Store the renderer in the ref

    currentRef.appendChild(renderer.domElement);

    // Set up Camera
    const fov = 75; // Field of view
    const aspect = w / h; // Aspect ratio
    const near = 0.1; // Near clipping plane
    const far = 1000; // Far clipping plane
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5; // Position the camera

    // Create Scene
    const scene = new Scene();

    // Set up Controls (optional - remove if not needed)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    // Create a simple cube (replace with your own geometry)
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);

    const wireMat = new MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const wireMesh = new Mesh(geometry, wireMat);
    wireMesh.scale.setScalar(1.001);
    cube.add(wireMesh);

    scene.add(cube);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Add your animations here
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Update controls if using OrbitControls
      controls.update();

      // Render the scene
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      if (currentRef && currentRef.firstChild) {
        currentRef.removeChild(currentRef.firstChild);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      geometry.dispose();
      material.dispose();
      wireMat.dispose();
    };
  }, []);

  return <div className="threejs-canvas" ref={sceneRef} />;
}

export default App;
