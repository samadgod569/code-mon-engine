import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import {world} from "./src/world.js";
import {Transform,MeshRenderer,Velocity,PlayerControlled,AIControlled,Collider} from "./src/components.js";
import {MovementSystem,RenderSyncSystem,PlayerInputSystem,AISystem,CollisionSystem,CameraFollowSystem,TouchInputSystem} from "./src/systems.js";

// THREE.JS
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
camera.position.z = 10;
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff,2);
light.position.set(5,5,5);
scene.add(light);

// PLAYER CUBE
const playerMesh = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0x00ff00}));
scene.add(playerMesh);
const player = world.createEntity();
world.addComponent(player,new Transform(0,0,0));
world.addComponent(player,new MeshRenderer(playerMesh));
world.addComponent(player,new Velocity());
world.addComponent(player,new PlayerControlled());
world.addComponent(player,new Collider());

// AI CUBE
const aiMesh = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0xff0000}));
scene.add(aiMesh);
const ai = world.createEntity();
world.addComponent(ai,new Transform(3,0,0));
world.addComponent(ai,new MeshRenderer(aiMesh));
world.addComponent(ai,new Velocity());
world.addComponent(ai,new AIControlled(2));
world.addComponent(ai,new Collider());

// SYSTEMS
world.addSystem(new PlayerInputSystem());
world.addSystem(new TouchInputSystem());
world.addSystem(new AISystem());
world.addSystem(new MovementSystem());
world.addSystem(new CollisionSystem());
world.addSystem(new RenderSyncSystem());
world.addSystem(new CameraFollowSystem(camera));

// GAME LOOP
let last = performance.now();
function loop(now){
  const dt = (now-last)/1000;
  last = now;
  world.update(dt);
  renderer.render(scene,camera);
  requestAnimationFrame(loop);
}
loop(last);
