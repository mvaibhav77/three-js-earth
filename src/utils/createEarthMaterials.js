import {
  AdditiveBlending,
  MeshBasicMaterial,
  MeshPhongMaterial,
  TextureLoader,
} from "three";

// Import textures
import DayEarth from "../assets/textures/day_earth.jpg";
import NightEarth from "../assets/textures/night_earth.jpg";
import Clouds from "../assets/textures/cloudMap.jpg";
import Bump from "../assets/textures/bump_earth.jpg";
import Spec from "../assets/textures/spec_earth.tif";

/**
 * Creates and returns all materials needed for the Earth
 * @returns {Object} Object containing all Earth materials
 */
export const createEarthMaterials = () => {
  const loader = new TextureLoader();

  // Main Earth material with day texture, specular, and bump mapping
  const earthMaterial = new MeshPhongMaterial({
    map: loader.load(DayEarth),
    specularMap: loader.load(Spec),
    bumpMap: loader.load(Bump),
    bumpScale: 0.04,
  });

  // Night lights material (city lights)
  const lightsMaterial = new MeshBasicMaterial({
    map: loader.load(NightEarth),
    blending: AdditiveBlending,
  });

  // Clouds material with transparency
  const cloudsMaterial = new MeshBasicMaterial({
    map: loader.load(Clouds),
    transparent: true,
    opacity: 0.8,
    blending: AdditiveBlending,
    depthWrite: false, // Prevent depth buffer writes for transparent objects
  });

  return {
    earthMaterial,
    lightsMaterial,
    cloudsMaterial,
  };
};
