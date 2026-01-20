// components.js — CodeMon Engine PRO Components

// ================= BASIC TRANSFORM =================
export class Transform{
 constructor(x=0,y=0,z=0){
  this.x=x; this.y=y; this.z=z;
  this.rx=0; this.ry=0; this.rz=0;
  this.sx=1; this.sy=1; this.sz=1;
 }
}

// ================= VELOCITY =================
export class Velocity{
 constructor(x=0,y=0,z=0){
  this.x=x; this.y=y; this.z=z;
 }
}

// ================= ACCELERATION =================
export class Acceleration{
 constructor(x=0,y=0,z=0){
  this.x=x; this.y=y; this.z=z;
 }
}

// ================= 2D SPRITE =================
export class Sprite2D{
 constructor(w=40,h=40,color="white",image=null){
  this.w=w; this.h=h;
  this.color=color;
  this.image=image;
  this.opacity=1;
  this.visible=true;
 }
}

// ================= 3D MESH =================
export class Mesh3D{
 constructor(mesh){
  this.mesh=mesh;
  this.castShadow=true;
  this.receiveShadow=true;
  this.visible=true;
 }
}

// ================= CAMERA =================
export class Camera{
 constructor(main=false){
  this.main=main;
  this.fov=70;
  this.near=0.1;
  this.far=1000;
  this.mode="follow";
 }
}

// ================= TAG COMPONENTS =================
export class Player{}
export class Enemy{}
export class NPC{}
export class Item{}
export class Block{}

// ================= COLLIDER =================
export class Collider{
 constructor(w=1,h=1,d=1,trigger=false){
  this.w=w; this.h=h; this.d=d;
  this.trigger=trigger;
 }
}

// ================= RIGIDBODY =================
export class Rigidbody{
 constructor(mass=1,useGravity=true){
  this.mass=mass;
  this.useGravity=useGravity;
  this.drag=0.05;
  this.freezeX=false;
  this.freezeY=false;
  this.freezeZ=false;
 }
}

// ================= HEALTH =================
export class Health{
 constructor(max=100){
  this.max=max;
  this.current=max;
  this.regen=0;
 }
 damage(v){ this.current=Math.max(0,this.current-v); }
 heal(v){ this.current=Math.min(this.max,this.current+v); }
}

// ================= ANIMATION =================
export class Animation{
 constructor(frames=[],speed=0.1){
  this.frames=frames;
  this.speed=speed;
  this.time=0;
  this.current=0;
  this.playing=true;
  this.loop=true;
 }
}

// ================= UI ELEMENT =================
export class UIElement{
 constructor(text="",x=0,y=0){
  this.text=text;
  this.x=x; this.y=y;
  this.visible=true;
  this.style="default";
 }
}

// ================= AUDIO SOURCE =================
export class AudioSource{
 constructor(src=null){
  this.src=src;
  this.volume=1;
  this.loop=false;
  this.playing=false;
  this.spatial=false;
 }
}

// ================= PARTICLE EMITTER =================
export class ParticleEmitter{
 constructor(rate=10){
  this.rate=rate;
  this.life=1;
  this.speed=1;
  this.color="white";
 }
}

// ================= INVENTORY =================
export class Inventory{
 constructor(size=20){
  this.slots=new Array(size).fill(null);
 }
}

// ================= AI =================
export class AI{
 constructor(fn){
  this.update=fn;
 }
}

// ================= SCRIPT =================
export class Script{
 constructor(fn){
  this.fn=fn;
 }
}

// ================= LIGHT =================
export class Light{
 constructor(type="point",color=0xffffff,intensity=1){
  this.type=type;
  this.color=color;
  this.intensity=intensity;
 }
}

// ================= NETWORK =================
export class Network{
 constructor(id=null){
  this.id=id;
  this.sync=true;
 }
}
