import { useEffect } from "react";

/**
 * Custom hook to handle window resize for Three.js scenes
 * @param {React.RefObject} cameraRef - Reference to the Three.js camera
 * @param {React.RefObject} rendererRef - Reference to the Three.js renderer
 */
export const useWindowResize = (cameraRef, rendererRef) => {
  useEffect(() => {
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

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleWindowResize, false);
    };
  }, [cameraRef, rendererRef]);
};
