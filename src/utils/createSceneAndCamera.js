import { Group, PerspectiveCamera, Scene } from "three";

/**
 * Creates and configures the Three.js scene and camera
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @returns {Object} Object containing scene, camera, and earthGroup
 */
export const createSceneAndCamera = (width, height) => {
  // Create camera
  const fov = 75;
  const aspect = width / height;
  const near = 0.1;
  const far = 1000;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  // Create scene
  const scene = new Scene();

  // Create Earth group with axial tilt (23.4 degrees like real Earth)
  const earthGroup = new Group();
  earthGroup.rotation.z = -23.4 * (Math.PI / 180);
  scene.add(earthGroup);

  return {
    scene,
    camera,
    earthGroup,
  };
};
