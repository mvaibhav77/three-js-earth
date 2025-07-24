import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  DirectionalLight,
  Group,
  IcosahedronGeometry,
  LinearSRGBColorSpace,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import getStarfield from "./3dComponents/getStartfield.js";
import getFresnelMat from "./3dComponents/getFresnelMat.js";

// 2K Earth Textures taken from https://www.solarsystemscope.com/textures/
import DayEarth from "./assets/textures/day_earth.jpg";
import NightEarth from "./assets/textures/night_earth.jpg";
import Clouds from "./assets/textures/cloudMap.jpg";

// Bump Texture from https://www.solarsystemscope.com/textures/

import Bump from "./assets/textures/bump_earth.jpg";
import Spec from "./assets/textures/spec_earth.tif";

const w = window.innerWidth;
const h = window.innerHeight;

function App() {
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null); // Add camera ref for resize handling

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
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.outputColorSpace = LinearSRGBColorSpace;

    // Improve depth precision to reduce z-fighting
    renderer.sortObjects = true;

    // define camera and scene
    const fov = 75;
    const aspect = w / h;
    const near = 0.1;
    const far = 1000;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    cameraRef.current = camera; // Store camera reference
    const scene = new Scene();

    const earthGroup = new Group();
    earthGroup.rotation.z = -23.4 * (Math.PI / 180);
    scene.add(earthGroup);

    // Control Options
    const controls = new OrbitControls(camera, renderer.domElement);

    const loader = new TextureLoader();

    // Our main 3d object definition
    const earthGeo = new IcosahedronGeometry(1, 12);
    // const mat = new MeshStandardMaterial({
    //   map: loader.load(DayEarth),
    //   // map: loader.load(NightEarth),
    // });

    const mat = new MeshPhongMaterial({
      map: loader.load(DayEarth),
      specularMap: loader.load(Spec),
      bumpMap: loader.load(Bump),
      bumpScale: 0.04,
    });
    const earthMesh = new Mesh(earthGeo, mat);
    earthGroup.add(earthMesh);

    const lightsMat = new MeshBasicMaterial({
      map: loader.load(NightEarth),
      blending: AdditiveBlending,
    });
    const lightsMesh = new Mesh(earthGeo, lightsMat);
    earthGroup.add(lightsMesh);

    const fresnelMat = getFresnelMat();
    const glowMesh = new Mesh(earthGeo, fresnelMat);
    glowMesh.scale.setScalar(1.012); // Changed from 1.01 to 1.02 to be between clouds and earth
    earthGroup.add(glowMesh);

    const cloudsMat = new MeshBasicMaterial({
      map: loader.load(Clouds),
      transparent: true,
      opacity: 0.8,
      blending: AdditiveBlending,
      depthWrite: false, // Prevent depth buffer writes for transparent objects
    });
    const cloudsMesh = new Mesh(earthGeo, cloudsMat);
    cloudsMesh.scale.setScalar(1.015); // Increased from 1.01 to 1.03
    earthGroup.add(cloudsMesh);

    // Add Stars in the background
    const stars = getStarfield({ numStars: 3000 });
    scene.add(stars);

    // Add lighting (Sunlight Effect)
    const sunLight = new DirectionalLight(0xffffff, 2);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    function animate() {
      requestAnimationFrame(animate);

      earthMesh.rotation.y += 0.001;
      lightsMesh.rotation.y += 0.001;
      cloudsMesh.rotation.y += 0.0015;
      glowMesh.rotation.y += 0.001;

      renderer.render(scene, camera);
      controls.update();
    }
    animate();

    // Handle window resize
    const handleWindowResize = () => {
      if (cameraRef.current && rendererRef.current) {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        // Update camera aspect ratio
        cameraRef.current.aspect = newWidth / newHeight;
        cameraRef.current.updateProjectionMatrix();

        // Update renderer size
        rendererRef.current.setSize(newWidth, newHeight);
      }
    };

    // Add resize event listener
    window.addEventListener("resize", handleWindowResize, false);

    return () => {
      // Remove resize event listener
      window.removeEventListener("resize", handleWindowResize, false);

      if (currentRef && currentRef.firstChild) {
        currentRef.removeChild(currentRef.firstChild);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      earthGeo.dispose();
      mat.dispose();
    };
  }, []);

  return <div className="threejs-canvas" ref={sceneRef} />;
}

export default App;
