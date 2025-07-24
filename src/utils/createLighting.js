import { DirectionalLight } from "three";

/**
 * Creates and configures lighting for the Earth scene
 * @param {Scene} scene - The Three.js scene to add lights to
 * @returns {Object} Object containing the created lights
 */
export const createLighting = (scene) => {
  // Main sun light (directional light simulating the sun)
  const sunLight = new DirectionalLight(0xffffff, 2);
  sunLight.position.set(-2, 0.5, 1.5);
  scene.add(sunLight);

  return {
    sunLight,
  };
};
