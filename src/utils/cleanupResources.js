/**
 * Handles cleanup of Three.js resources to prevent memory leaks
 * @param {Object} resources - Resources to clean up
 */
export const cleanupResources = (resources) => {
  const { currentRef, rendererRef, earthGeo, materials } = resources;

  // Remove canvas from DOM
  if (currentRef && currentRef.firstChild) {
    currentRef.removeChild(currentRef.firstChild);
  }

  // Dispose renderer
  if (rendererRef.current) {
    rendererRef.current.dispose();
  }

  // Dispose geometry
  if (earthGeo) {
    earthGeo.dispose();
  }

  // Dispose all materials
  if (materials) {
    Object.values(materials).forEach((material) => {
      if (material && typeof material.dispose === "function") {
        material.dispose();
      }
    });
  }
};
