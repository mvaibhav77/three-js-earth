import {
  ACESFilmicToneMapping,
  LinearSRGBColorSpace,
  WebGLRenderer,
} from "three";

/**
 * Creates and configures the Three.js WebGL renderer
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @returns {WebGLRenderer} Configured renderer
 */
export const createRenderer = (width, height) => {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.setSize(width, height);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.outputColorSpace = LinearSRGBColorSpace;
  renderer.sortObjects = true; // Improve depth precision to reduce z-fighting

  return renderer;
};
