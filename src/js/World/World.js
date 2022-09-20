import { Group, PlaneGeometry, Mesh } from "three";
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
import { cylinder } from "./components/meshes/cylinder";
import { tickedGroup } from "./components/meshes/tickedGroup";
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
    // this.physics.debug.enable(true);
    this.loop.setPhysics(this.physics);
    const room = roomComposition(this.physics, this.floorSize, false);
    this.buildScene();
  }

  buildScene() {
    console.log('buildScene.b0');
    const envmap = { texture: null };
    this.walls = createWalls(this.scene, this.floorSize, envmap);
    // this.handsPhysicsController = createHandsPhysicsController(this.scene, this.physics, this.vrControls, envmap);
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

    // ---------
    // cylinder
    // ---------

    const tipLength = 0.2;
    const tipRadius = 0.01;

    const baseLength = 0.3;
    const baseRadius = 0.3;
    
    const tailLength = 0.8;
    const tailRadius = 0.05;

    // const tipY = -(tipLength + baseLength/2);
    const tipY = 1;
    const baseY = tipY + tipLength/2 + baseLength/2;
    const tailY = baseY + baseLength/2 + tailLength/2;

    const gigBounciness = 0.8;

    // tip

    const gigBlueMaterial = defaultColorMattPlastic(
      createColor(0.66, 1, 0.5),
      envmap
    );

    const gigTip = cylinder(gigBlueMaterial, tipLength, tipRadius, tipRadius);
    gigTip.castShadow = true;
    gigTip.position.x = 0;
    gigTip.position.y = tipY;
    gigTip.position.z = 0;
    // gigTip.rotation.x = Math.random();
    // gigTip.rotation.y = Math.random();
    // gigTip.rotation.z = Math.random();
    this.scene.add(gigTip);
    this.physics.add.existing(gigTip);
    gigTip.body.setBounciness(gigBounciness);

    // base

    const gigBlackMaterial = defaultColorMattPlastic(
      createColor(0, 0, 0.0),
      envmap
    );
    const gigDynamicMaterial = scaleTest(0x000000, envmap, 0.84);

    const gigBase = cylinder(gigDynamicMaterial, baseLength, baseRadius, baseRadius);
    gigBase.castShadow = true;
    gigBase.position.x = 0;
    gigBase.position.y = baseY;
    gigBase.position.z = 0;
    // gigBase.rotation.x = Math.random();
    // gigBase.rotation.y = Math.random();
    // gigBase.rotation.z = Math.random();
    this.scene.add(gigBase);
    this.physics.add.existing(gigBase);
    gigBase.body.setBounciness(gigBounciness);

    // tail

    const gigWhiteMaterial = defaultColorMattPlastic(
      createColor(0.1, 1, 0.5),
      envmap
    );

    const gigTail = cylinder(gigWhiteMaterial, tailLength, tailRadius, tailRadius);
    gigTail.castShadow = true;
    gigTail.position.x = 0;
    gigTail.position.y = tailY;
    gigTail.position.z = 0;
    // gigTail.rotation.x = Math.random();
    // gigTail.rotation.y = Math.random();
    // gigTail.rotation.z = Math.random();
    this.scene.add(gigTail);
    this.physics.add.existing(gigTail);
    gigTail.body.setBounciness(gigBounciness);

    gigBase.body.setAngularVelocityY(120);
    // gigBase.body.applyForceX(Math.random()*4);
    // gigBase.body.applyForceZ(Math.random()*4);
    gigBase.body.needUpdate = true;

    // const gig = tickedGroup();
    // gig.position.y = 1;
    // gig.add(gigTip);
    // gig.add(gigBase);
    // gig.add(gigTail);
    // this.scene.add(gig);
    // this.physics.add.existing(gig);
    // this.loop.updatables.push(gig);
    // gig.body.setBounciness(gigBounciness);
    
    // const torqueRange = 100;
    // const velocity = 60;
    // const torque = Math.random() * torqueRange + 1;
    // gig.body.setAngularVelocityY(velocity);
    // gig.body.needUpdate = true;

    this.physics.add.constraints.lock(gigTip.body, gigBase.body, true);
    this.physics.add.constraints.lock(gigBase.body, gigTail.body, true);

    // ---------
    // spheres
    // ---------

    const colorMaterial = defaultColorShinyPlastic(
      createColor(0.66, 1, 0.5),
      envmap
    );

    for (let i = 0; i < 20; i++) {
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

    for (let i = 0; i < 20; i++) {
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

    for (let i = 0; i < 20; i++) {
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

    for (let i = 0; i < 20; i++) {
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