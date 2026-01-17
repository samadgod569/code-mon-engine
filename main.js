import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

import {world} from "./src/world.js";
import {Transform,MeshRenderer,Velocity} from "./src/components.js";
import {MovementSystem,RenderSyncSystem} from "./src/systems.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// LIGHT (this was missing or weak)
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5,5,5);
scene.add(light);

// CUBE
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
scene.add(cube);

// ECS ENTITY
const e = world.createEntity();
world.addComponent(e, new Transform(0,0,0));
world.addComponent(e, new MeshRenderer(cube));
world.addComponent(e, new Velocity(1,0,0));

// SYSTEMS
world.addSystem(new MovementSystem());
world.addSystem(new RenderSyncSystem());

let last = performance.now();
function loop(now){
  const dt = (now-last)/1000;
  last = now;

  world.update(dt);
  renderer.render(scene,camera);
  requestAnimationFrame(loop);
}
loop(last);
