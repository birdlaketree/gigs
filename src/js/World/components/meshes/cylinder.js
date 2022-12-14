import { CylinderGeometry, Mesh, Math } from 'three';

const cylinder = (material, length, radiusTop, radiusBottom) => {
  const geometry = new CylinderGeometry(radiusTop, radiusBottom, length, 32, 32);
  // geometry.rotation.x = Math.degToRad(270);
  const mesh = new Mesh( geometry, material );
  // const speed = Math.random() + 0.4;

  mesh.tick = (delta) => {
    // mesh.rotation.x += delta * speed;
    // mesh.rotation.y += delta * speed;
  };

  return mesh;
}

export { cylinder };