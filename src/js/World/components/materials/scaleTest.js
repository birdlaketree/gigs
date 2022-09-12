import { Vector2, MeshPhysicalMaterial, CanvasTexture } from 'three';
import { textureHandler } from '../../system/textureHandler';
import { RandomDots } from '../textures/RandomDots';

const colorMapUrl            = new URL('/assets/public/textures/uv_grid_opengl.jpg', import.meta.url);
const normalMapUrl           = new URL('/assets/public/textures/bent-plane/deform-plane_2_normal.png', import.meta.url);
const roughnessMapUrl        = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const metalnessMapUrl     = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const aoMapUrl            = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const alphaMapUrl         = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const bumpMapUrl          = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const emissiveMapUrl      = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const displacementMapUrl  = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const clearcoatMapUrl     = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);
// const transmissionMapUrl  = new URL('/assets/public/textures/bent-plane/uniform-noise_color_3.png', import.meta.url);

const scaleTest = (color, envmap, envMapIntensity) => {
  const repeatX = 1;
  const repeatY = 1;

  // const colorMap = textureHandler(colorMapUrl, repeatX, repeatY);
  // const normalMap = textureHandler(normalMapUrl, repeatX, repeatY);
  // const roughnessMap = textureHandler(roughnessMapUrl, repeatX, repeatY);
  // const metalnessMap = textureHandler(metalnessMapUrl, repeat);
  // const aoMap = textureHandler(aoMapUrl, repeat);
  // const alphaMap = textureHandler(alphaMapUrl, repeat);
  // const bumpMap = textureHandler(bumpMapUrl, repeat);
  // const emissiveMap = textureHandler(emissiveMapUrl, repeat);
  // const displacementMap = textureHandler(displacementMapUrl, repeat);
  // const clearcoatMap = textureHandler(clearcoatMapUrl, repeat);
  // const transmissionMap = textureHandler(transmissionMapUrl, repeat);

  // const colorMap = new CanvasTexture(new RandomDots());
  // const metalnessMap = new CanvasTexture(new RandomDots());
  // const roughnessMap = new CanvasTexture(new RandomDots());
  const maps = new RandomDots();
  const colorMap = new CanvasTexture(maps.colorMap);
  const roughnessMap = new CanvasTexture(maps.roughnessMap);
  const metalnessMap = new CanvasTexture(maps.metalnessMap);

  const parameters = {
    // STANDARD

    envMap: envmap.texture,
    envMapIntensity: envMapIntensity,

    // color: color,
    map: colorMap,

    roughness: 1,
    roughnessMap: roughnessMap,

    // normalMap: normalMap,
		// normalScale: new Vector2(1, 1),

    // aoMap: aoMap,
    // aoMapIntensity:

    // bumpMap: bumpMap,
    // bumpScale:

    // emissive:
    // emissiveMap: emissiveMap,

    // displacementMap
    // displacementScale
    // displacementBias

    metalness: 1,
    metalnessMap: metalnessMap,

    // alphaMap: alphaMap,

    // PHYSICAL

    // clearcoat:
    // clearcoatMap: clearcoatMap,
    // clearcoatRoughness:
    // clearcoatRoughnessMap:
    // clearcoatNormalScale: 
    // clearcoatNormalMap:

    // reflectivity:
    // ior:

    // sheen:
    // sheenColor:
    // sheenRoughness:

    // transmission:
    // transmissionMap: transmissionMap,
    // attenuationDistance:
    // attenuationColor:

    // specularIntensity:
    // specularColor:
    // specularIntensityMap:
    // specularColorMap:
  } 

  const material = new MeshPhysicalMaterial(parameters);
  return material;
}

export {
  scaleTest
};