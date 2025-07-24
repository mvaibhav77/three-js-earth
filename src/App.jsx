import { useEffect } from "react";
import {
  HemisphereLight,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";


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
  useEffect(() => {
    // clear evrything before rerender
    document.body.innerHTML = "";

    // Set Renderer
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    document.body.appendChild(renderer.domElement);

    // define camera and scene
    const fov = 75; // Field of view
    const aspect = w / h; // Aspect ratio
    const near = 0.1; // Near clipping plane
    const far = 1000; // Far clipping plane
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2; // Position the camera
    const scene = new Scene();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    // work on real object
    const geo = new IcosahedronGeometry(1.0, 2); // Create an icosahedron geometry
    const mat = new MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
    }); // Use a normal material for shading
    const mesh = new Mesh(geo, mat); // Create a mesh with the geometry and material

    scene.add(mesh); // Add the mesh to the scene

    const wireMat = new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    const wireMesh = new Mesh(geo, wireMat);
    wireMesh.scale.setScalar(1.001);
    mesh.add(wireMesh);

    const hemilight = new HemisphereLight(0x0099ff, 0xaa5588); // Create a hemisphere light

    scene.add(hemilight); // Add the light to the scene

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    }
    animate();
  }, []);

  return <></>;
}

export default App;
