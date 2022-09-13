import { PlaneGeometry, Mesh } from "three";
import { Math as TMath } from "three";
import { createColor } from "./utils/createColor.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/stage/scene.js';
import { createCamera, createDolly } from './components/stage/camera.js';
import { createLights } from './components/stage/lights.js';
import { VrControls } from './system/VrControls.js';
import { createHandsPhysicsController } from "./system/handsPhysicsController.js";
import { sphere } from './components/meshes/sphere.js';
import { cube } from "./components/meshes/cube";
import { AmmoPhysics, PhysicsLoader } from '@enable3d/ammo-physics';
import { roomComposition } from './components/compositions/roomComposition.js';
import { createWalls } from './components/meshes/walls.js'

import { defaultColorMattPlastic } from "./components/materials/defaultColorMattPlastic.js";
import { defaultColorShinyPlastic } from "./components/materials/defaultColorShinyPlastic.js";
import { scaleTest } from "./components/materials/scaleTest.js";

class World {
  constructor() {
    console.log('');
    console.log('fxhash:', fxhash);
    console.log('fxrand:', fxrand());
    console.log('');

    window.$fxhashFeatures = {
      "Background": "Black",
      "Number of lines": 10,
      "Inverted": true
    }
    console.log(window.$fxhashFeatures);

    this.renderer = createRenderer();
    this.scene = createScene(this.renderer);
    this.camera = createCamera();
    this.lights = createLights(this.scene);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    const dolly = createDolly(this.camera, this.scene);
    dolly.position.set(0, 0, 0);
    this.vrControls = new VrControls(this.renderer, dolly, this.camera);
    this.loop.updatables.push(this.vrControls);
    this.floorSize = 12;
    PhysicsLoader('static/ammo', () => this.ammoStart());
  }

  ammoStart() {
    console.log('ammoStart.a0');
    this.physics = new AmmoPhysics(this.scene);
    // physics.debug.enable(true);
    this.loop.setPhysics(this.physics);
    const room = roomComposition(this.physics, this.floorSize, false);
    this.buildScene();
  }

  buildScene() {
    console.log('buildScene.b0');
    const envmap = { texture: null };
    this.walls = createWalls(this.scene, this.floorSize, envmap);
    this.handsPhysicsController = createHandsPhysicsController(this.scene, this.physics, this.vrControls, envmap);
    const spreadWidth = 10;

    // plane

    // const planeMaterial = scaleTest(0x000000, envmap, 0.84);
    // const planeGeom = new PlaneGeometry(2, 2, 4, 4);
    // const plane = new Mesh( planeGeom, planeMaterial );
    // plane.rotation.y = TMath.degToRad(45);
    // plane.rotation.x = TMath.degToRad(-30);
    // plane.position.x = -2;
    // plane.position.y = 2;
    // plane.position.z = -2;
    // this.scene.add(plane);

    // spheres

    const colorMaterial = defaultColorShinyPlastic(
      createColor(0.66, 1, 0.5),
      envmap
    );

    for (let i = 0; i < 8; i++) {
      const sphereItem = sphere(colorMaterial, Math.random()/10 + 0.01);
      sphereItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
      sphereItem.position.y = Math.random() + 2;
      sphereItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
      this.scene.add(sphereItem); 
      this.physics.add.existing(sphereItem);
      sphereItem.body.setBounciness(1);
    }

    // white cubes

    const whiteMaterial = defaultColorMattPlastic(
      createColor(0, 1, 1),
      envmap
    );

    for (let i = 0; i < 10; i++) {
      const cubeItem = cube(whiteMaterial, Math.random()/5 + 0.01, Math.random()/5 + 0.01, Math.random()/15 + 0.01);
      cubeItem.castShadow = true;
      cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.position.y = Math.random() + 2;
      cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.rotation.x = Math.random();
      cubeItem.rotation.y = Math.random();
      cubeItem.rotation.z = Math.random();
      this.scene.add(cubeItem);
      this.physics.add.existing(cubeItem);
      cubeItem.body.setBounciness(0.96);
    }

    // black cubes

    const blackMaterial = defaultColorMattPlastic(
      createColor(0, 0, 0.06),
      envmap
    );

    for (let i = 0; i < 6; i++) {
      const cubeItem = cube(blackMaterial, Math.random()/5 + 0.01, Math.random()/5 + 0.01, Math.random()/15 + 0.01);
      cubeItem.castShadow = true;
      cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.position.y = Math.random() + 2;
      cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.rotation.x = Math.random();
      cubeItem.rotation.y = Math.random();
      cubeItem.rotation.z = Math.random();
      this.scene.add(cubeItem);
      this.physics.add.existing(cubeItem);
      cubeItem.body.setBounciness(0.96);
    }

    // blue cubes

    const blueMaterial = defaultColorMattPlastic(
      createColor(0.60, 1, 0.5),
      envmap
    );

    for (let i = 0; i < 2; i++) {
      const cubeItem = cube(blueMaterial, Math.random()/5 + 0.01, Math.random()/5 + 0.01, Math.random()/15 + 0.01);
      cubeItem.castShadow = true;
      cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.position.y = Math.random() + 2;
      cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.rotation.x = Math.random();
      cubeItem.rotation.y = Math.random();
      cubeItem.rotation.z = Math.random();
      this.scene.add(cubeItem);
      this.physics.add.existing(cubeItem);
    }

  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };