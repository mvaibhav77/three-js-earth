import { AdditiveBlending, MeshBasicMaterial, MeshPhongMaterial } from "three";

/**
 * Creates and returns all materials needed for the Earth
 * @param {Object} textures - The loaded textures
 * @returns {Object} Object containing all Earth materials
 */
export const createEarthMaterials = (textures) => {
  // Main Earth material with day texture, specular, and bump mapping
  const earthMaterial = new MeshPhongMaterial({
    map: textures.day,
    specularMap: textures.spec,
    bumpMap: textures.bump,
    bumpScale: 0.04,
  });

  // Night lights material (city lights)
  const lightsMaterial = new MeshBasicMaterial({
    map: textures.night,
    blending: AdditiveBlending,
  });

  // Clouds material with transparency
  const cloudsMaterial = new MeshBasicMaterial({
    map: textures.clouds,
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
