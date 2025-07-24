import { useEffect, useRef } from "react";
import {
  DirectionalLight,
  Group,
  IcosahedronGeometry,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// 2K Textures taken from https://www.solarsystemscope.com/textures/
// Note: Update these paths to match your actual texture locations
import DayEarth from "../../src/assets/textures/day_earth.jpg";
import NightEarth from "../../src/assets/textures/night_earth.jpg";
import getStarfield from "../../src/3dComponents/getStartfield.js";

// Import shader files
import earthVertexShader from "./shaders/earthVertex.glsl?raw";
import earthFragmentShader from "./shaders/earthFragment.glsl?raw";

const w = window.innerWidth;
const h = window.innerHeight;

function App() {
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const currentRef = sceneRef.current;

    if (!currentRef) return;

    // Check if a canvas already exists
    if (currentRef.firstChild) {
      // Clean up previous instance (optional, but good practice)
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      currentRef.removeChild(currentRef.firstChild);
    }

    // Set Renderer
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    rendererRef.current = renderer;

    currentRef.appendChild(renderer.domElement);

    // define camera and scene
    const fov = 75;
    const aspect = w / h;
    const near = 0.1;
    const far = 1000;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    const scene = new Scene();

    const earthGroup = new Group();
    earthGroup.rotation.z = -23.4 * (Math.PI / 180);
    scene.add(earthGroup);

    // Control Options
    const controls = new OrbitControls(camera, renderer.domElement);

    const loader = new TextureLoader();

    // Load both day and night textures
    const dayTexture = loader.load(DayEarth);
    const nightTexture = loader.load(NightEarth);

    // Our main 3d object definition
    const earthGeo = new IcosahedronGeometry(1, 12);

    // Create custom shader material for day/night transition
    const mat = new ShaderMaterial({
      uniforms: {
        dayTexture: { value: dayTexture },
        nightTexture: { value: nightTexture },
        sunDirection: { value: new Vector3(-2, 0.5, 1.5).normalize() },
      },
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
    });

    const earthMesh = new Mesh(earthGeo, mat);
    earthGroup.add(earthMesh);

    // Add Stars in the background
    const stars = getStarfield();
    scene.add(stars);

    // Add lighting (Sunlight Effect)
    const sunLight = new DirectionalLight(0xffffff, 1.0);
    const sunPosition = new Vector3(-2, 0.5, 1.5);
    sunLight.position.copy(sunPosition);
    scene.add(sunLight);

    function animate() {
      requestAnimationFrame(animate);

      earthMesh.rotation.y += 0.001;

      // Update sun direction in shader uniform
      mat.uniforms.sunDirection.value.copy(sunPosition).normalize();

      renderer.render(scene, camera);
      controls.update();
    }
    animate();

    return () => {
      if (currentRef && currentRef.firstChild) {
        currentRef.removeChild(currentRef.firstChild);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      earthGeo.dispose();
      mat.dispose();
      dayTexture.dispose();
      nightTexture.dispose();
    };
  }, []);

  return <div className="threejs-canvas" ref={sceneRef} />;
}

export default App;
