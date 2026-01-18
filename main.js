import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import {world} from "./src/ecs.js";
import * as C from "./src/components.js";
import * as S from "./src/systems.js";
import {Input} from "./src/input.js";
import {Renderer2D} from "./src/renderer2D.js";
import {Renderer3D} from "./src/renderer3D.js";
import {Editor} from "./src/editor.js";

// Canvas 2D
const canvas=document.createElement("canvas");
canvas.width=innerWidth;
canvas.height=innerHeight;
document.body.appendChild(canvas);
const ctx=canvas.getContext("2d");

// Three.js
const scene=new THREE.Scene();
const cam=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,0.1,1000);
cam.position.z=10;
const r3=new THREE.WebGLRenderer({alpha:true});
r3.setSize(innerWidth,innerHeight);
document.body.appendChild(r3.domElement);

// light
scene.add(new THREE.DirectionalLight(0xffffff,2));

// engine
const input=new Input();
const editor=new Editor(world);

world.addSystem(new S.MovementSystem());
world.addSystem(new S.CollisionSystem());
world.addSystem(new S.ScriptSystem());

const r2d=new Renderer2D(ctx);
const r3d=new Renderer3D(scene);

// Player
const cube=new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshStandardMaterial({color:0x00ff00}));
scene.add(cube);

const p=world.create();
world.add(p,new C.Transform(0,0,0));
world.add(p,new C.Velocity());
world.add(p,new C.Mesh3D(cube));
world.add(p,new C.Sprite2D(40,40,"lime"));
world.add(p,new C.Player());
world.add(p,new C.Script((w,e,dt)=>{
 const t=w.get(e,"Transform");
 t.x+=input.x()*5*dt;
 t.y+=input.y()*5*dt;
}));

canvas.onclick=()=>editor.show(p);

// loop
let last=performance.now();
function loop(n){
 const dt=(n-last)/1000; last=n;
 world.update(dt);
 r2d.render(world);
 r3d.render(world);
 r3.render(scene,cam);
 requestAnimationFrame(loop);
}
loop(last);
