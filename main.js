import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

import {world} from "./src/world.js";
import {Transform,MeshRenderer,Velocity} from "./src/components.js";
import {MovementSystem,RenderSyncSystem} from "./src/systems.js";

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,.1,1000);
camera.position.z=5;

const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

const cube=new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({color:0x00ff00})
);
scene.add(cube);

scene.add(new THREE.DirectionalLight(0xffffff,1));

const e=world.createEntity();
world.addComponent(e,new Transform());
world.addComponent(e,new MeshRenderer(cube));
world.addComponent(e,new Velocity(1,0,0));

world.addSystem(new MovementSystem());
world.addSystem(new RenderSyncSystem());

let last=performance.now();
function loop(now){
  const dt=(now-last)/1000;
  last=now;
  world.update(dt);
  renderer.render(scene,camera);
  requestAnimationFrame(loop);
}
loop(last);
