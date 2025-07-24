/**
 * Creates and returns the animation loop function
 * @param {Object} params - Animation parameters
 * @param {WebGLRenderer} params.renderer - Three.js renderer
 * @param {Scene} params.scene - Three.js scene
 * @param {Camera} params.camera - Three.js camera
 * @param {OrbitControls} params.controls - Orbit controls
 * @param {Object} params.meshes - Earth meshes to animate
 * @returns {Function} Animation function
 */
export const createAnimationLoop = ({
  renderer,
  scene,
  camera,
  controls,
  meshes,
}) => {
  const { earthMesh, lightsMesh, cloudsMesh, glowMesh } = meshes;

  function animate() {
    requestAnimationFrame(animate);

    // Rotate Earth meshes at different speeds for realism
    earthMesh.rotation.y += 0.001; // Earth rotation
    lightsMesh.rotation.y += 0.001; // City lights (same as Earth)
    cloudsMesh.rotation.y += 0.0015; // Clouds rotate slightly faster
    glowMesh.rotation.y += 0.001; // Atmospheric glow (same as Earth)

    // Render the scene
    renderer.render(scene, camera);
    controls.update();
  }

  return animate;
};
