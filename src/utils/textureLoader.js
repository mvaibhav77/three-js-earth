import { TextureLoader } from "three";
// 2K Earth Textures taken from https://www.solarsystemscope.com/textures/
import DayEarth from "../assets/textures/day_earth.jpg";
import NightEarth from "../assets/textures/night_earth.jpg";
import Clouds from "../assets/textures/cloudMap.jpg";

// Bump Texture from https://www.solarsystemscope.com/textures/
import Bump from "../assets/textures/bump_earth.jpg";
import Spec from "../assets/textures/spec_earth.jpg";

const loader = new TextureLoader();
let cache = null;
let promise = null;

function load() {
  if (promise) return promise;

  promise = (async () => {
    try {
      const [day, night, clouds, bump, spec] = await Promise.all([
        loader.loadAsync(DayEarth),
        loader.loadAsync(NightEarth),
        loader.loadAsync(Clouds),
        loader.loadAsync(Bump),
        loader.loadAsync(Spec),
      ]);
      cache = { day, night, clouds, bump, spec };
      return cache;
    } catch (error) {
      console.error("Failed to load textures:", error);
      throw error;
    }
  })();

  return promise;
}

export const useTextures = () => {
  if (cache) return cache;
  throw load();
};
