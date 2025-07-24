import { IcosahedronGeometry, Mesh } from "three";
import { createEarthMaterials } from "../utils/createEarthMaterials.js";
import getFresnelMat from "./getFresnelMat.js";

/**
 * Creates all Earth-related meshes (earth, lights, clouds, glow)
 * @param {Group} earthGroup - The Three.js group to add meshes to
 * @param {Object} textures - The loaded textures
 * @returns {Object} Object containing all Earth meshes
 */
export const createEarthMeshes = (earthGroup, textures) => {
  // Create geometry (shared by all meshes)
  const earthGeo = new IcosahedronGeometry(1, 12);

  // Get all materials
  const { earthMaterial, lightsMaterial, cloudsMaterial } =
    createEarthMaterials(textures);

  // Main Earth mesh
  const earthMesh = new Mesh(earthGeo, earthMaterial);
  earthGroup.add(earthMesh);

  // City lights mesh
  const lightsMesh = new Mesh(earthGeo, lightsMaterial);
  earthGroup.add(lightsMesh);

  // Atmospheric glow mesh
  const fresnelMat = getFresnelMat();
  const glowMesh = new Mesh(earthGeo, fresnelMat);
  glowMesh.scale.setScalar(1.012);
  earthGroup.add(glowMesh);

  // Clouds mesh
  const cloudsMesh = new Mesh(earthGeo, cloudsMaterial);
  cloudsMesh.scale.setScalar(1.015);
  earthGroup.add(cloudsMesh);

  return {
    earthGeo,
    earthMesh,
    lightsMesh,
    glowMesh,
    cloudsMesh,
    materials: {
      earthMaterial,
      lightsMaterial,
      cloudsMaterial,
      fresnelMat,
    },
  };
};
