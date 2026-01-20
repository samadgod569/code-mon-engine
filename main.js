// main.js (UPDATED FINAL ENGINE BOOTSTRAP)

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

import {world} from "./src/ecs.js";
import * as C from "./src/components.js";
import * as BaseSystems from "./src/systems.js";

import {PhysicsSystem} from "./systems/physics.js";
import {AnimationSystem} from "./systems/animation.js";
import {AISystem} from "./systems/ai.js";
import {TerrainSystem} from "./systems/terrain.js";
import {InventorySystem} from "./systems/inventory.js";
import {UISystem} from "./systems/ui.js";
import {CameraSystem} from "./systems/camera.js";
import {InputSystem} from "./systems/inputSystem.js";
import {ScriptSystem} from "./systems/scriptSystem.js";
import {RenderSyncSystem} from "./systems/renderSync.js";

import {Events} from "./core/events.js";
import {Tags} from "./core/tags.js";
import {Time} from "./core/time.js";
import {QueryCache} from "./core/queryCache.js";

import {AudioService} from "./services/audio.js";
import {SaveService} from "./services/save.js";
import {DebugService} from "./services/debug.js";
import {ModdingService} from "./services/modding.js";
import {NetworkService} from "./services/net.js";
import {StorageService} from "./services/storage.js";
import {Logger} from "./services/logger.js";
import {PerformanceService} from "./services/performance.js";

import {Input} from "./src/input.js";
import {Renderer2D} from "./src/renderer2D.js";
import {Renderer3D} from "./src/renderer3D.js";
import {Editor} from "./src/editor.js";


// ===== ENGINE CORE =====
const events=new Events();
const tags=new Tags();
const time=new Time();
const cache=new QueryCache();

const audio=new AudioService();
const saves=new SaveService();
const debug=new DebugService();
const mods=new ModdingService({world,events});
const net=new NetworkService("ws://localhost");
const storage=new StorageService();
const perf=new PerformanceService();

// ===== CANVAS 2D =====
const canvas=document.createElement("canvas");
canvas.width=innerWidth;
canvas.height=innerHeight;
document.body.appendChild(canvas);
const ctx=canvas.getContext("2d");

// ===== THREE =====
const scene=new THREE.Scene();
const cam=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,0.1,1000);
cam.position.z=10;

const r3=new THREE.WebGLRenderer({alpha:true});
r3.setSize(innerWidth,innerHeight);
document.body.appendChild(r3.domElement);

scene.add(new THREE.DirectionalLight(0xffffff,2));

// ===== RENDERERS =====
const r2d=new Renderer2D(ctx);
const r3d=new Renderer3D(scene);

// ===== INPUT / EDITOR =====
const input=new Input();
const editor=new Editor(world);

// ===== SYSTEMS =====
world.addSystem(new InputSystem(input));
world.addSystem(new PhysicsSystem());
world.addSystem(new AnimationSystem());
world.addSystem(new AISystem());
world.addSystem(new TerrainSystem());
world.addSystem(new InventorySystem());
world.addSystem(new UISystem(ctx));
world.addSystem(new CameraSystem(cam));
world.addSystem(new ScriptSystem());
world.addSystem(new RenderSyncSystem(scene));

// legacy compatibility
world.addSystem(new BaseSystems.MovementSystem());
world.addSystem(new BaseSystems.CollisionSystem());

// ===== PLAYER =====
const cube=new THREE.Mesh(
 new THREE.BoxGeometry(),
 new THREE.MeshStandardMaterial({color:0x00ff00})
);
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

tags.add(p,"player","controllable");

canvas.onclick=()=>editor.show(p);

// ===== GAME LOOP =====
let last=performance.now();
function loop(n){
 const dt=(n-last)/1000;
 last=n;

 perf.update();
 time.update(dt);

 world.update(time.dt);

 r2d.render(world);
 r3d.render(world);
 r3.render(scene,cam);

 requestAnimationFrame(loop);
}
loop(last);

// ===== GLOBAL ENGINE ACCESS =====
window.CodeMon={
 world,events,tags,time,cache,
 audio,saves,debug,mods,net,storage,perf,
 scene,cam,renderer:r3
};

Logger.info("CodeMon Engine Loaded");
