// Movement
export class MovementSystem {
  update(world,dt){
    for(const e of world.getEntitiesWith("Transform","Velocity")){
      const t = world.getComponent(e,"Transform");
      const v = world.getComponent(e,"Velocity");
      t.position.x += v.x*dt;
      t.position.y += v.y*dt;
      t.position.z += v.z*dt;
    }
  }
}

// Sync Transform -> Mesh
export class RenderSyncSystem {
  update(world){
    for(const e of world.getEntitiesWith("Transform","MeshRenderer")){
      const t = world.getComponent(e,"Transform");
      const m = world.getComponent(e,"MeshRenderer").mesh;
      m.position.set(t.position.x,t.position.y,t.position.z);
    }
  }
}

// Player input
export class PlayerInputSystem {
  constructor(){
    this.keys={};
    window.addEventListener("keydown",e=>this.keys[e.key]=true);
    window.addEventListener("keyup",e=>this.keys[e.key]=false);
  }
  update(world){
    for(const e of world.getEntitiesWith("PlayerControlled","Velocity")){
      const v = world.getComponent(e,"Velocity");
      v.x = 0; v.y = 0;
      if(this.keys["ArrowUp"]||this.keys["w"]) v.y = 3;
      if(this.keys["ArrowDown"]||this.keys["s"]) v.y = -3;
      if(this.keys["ArrowLeft"]||this.keys["a"]) v.x = -3;
      if(this.keys["ArrowRight"]||this.keys["d"]) v.x = 3;
    }
  }
}

// Touch controls for mobile
export class TouchInputSystem {
  constructor(){
    this.touch = {x:0,y:0,active:false};
    window.addEventListener("touchstart", e=>{
      this.touch.active = true;
      const t = e.touches[0];
      this.touch.x = t.clientX; this.touch.y = t.clientY;
    });
    window.addEventListener("touchmove", e=>{
      const t = e.touches[0];
      this.touch.x = t.clientX; this.touch.y = t.clientY;
    });
    window.addEventListener("touchend", e=>{ this.touch.active=false; });
  }
  update(world){
    if(!this.touch.active) return;
    for(const e of world.getEntitiesWith("PlayerControlled","Velocity")){
      const v = world.getComponent(e,"Velocity");
      v.x = (this.touch.x - window.innerWidth/2)/50;
      v.y = (window.innerHeight/2 - this.touch.y)/50;
    }
  }
}

// Simple AI
export class AISystem {
  update(world,dt){
    for(const e of world.getEntitiesWith("AIControlled","Velocity")){
      const ai = world.getComponent(e,"AIControlled");
      const v = world.getComponent(e,"Velocity");
      v.x = Math.sin(Date.now()/500)*ai.speed;
      v.y = Math.cos(Date.now()/500)*ai.speed;
    }
  }
}

// Collision
export class CollisionSystem {
  update(world){
    const entities = world.getEntitiesWith("Transform","Collider","Velocity");
    for(let i=0;i<entities.length;i++){
      for(let j=i+1;j<entities.length;j++){
        const a = world.getComponent(entities[i],"Transform");
        const b = world.getComponent(entities[j],"Transform");
        const va = world.getComponent(entities[i],"Velocity");
        const vb = world.getComponent(entities[j],"Velocity");
        const dist = Math.hypot(a.position.x-b.position.x,a.position.y-b.position.y);
        if(dist<2){ [va.x,vb.x] = [vb.x,va.x]; [va.y,vb.y] = [vb.y,va.y]; }
      }
    }
  }
}

// Camera follow player
export class CameraFollowSystem {
  constructor(camera){ this.camera = camera; }
  update(world){
    const players = world.getEntitiesWith("PlayerControlled","Transform");
    if(players.length===0) return;
    const t = world.getComponent(players[0],"Transform");
    this.camera.position.x = t.position.x;
    this.camera.position.y = t.position.y;
  }
}
