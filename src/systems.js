export class MovementSystem {
  update(world,dt){
    for(const e of world.getEntitiesWith("Transform","Velocity")){
      const t=world.getComponent(e,"Transform");
      const v=world.getComponent(e,"Velocity");
      t.position.x+=v.x*dt;
      t.position.y+=v.y*dt;
      t.position.z+=v.z*dt;
    }
  }
}

export class RenderSyncSystem {
  update(world){
    for(const e of world.getEntitiesWith("Transform","MeshRenderer")){
      const t=world.getComponent(e,"Transform");
      const m=world.getComponent(e,"MeshRenderer").mesh;
      m.position.set(t.position.x,t.position.y,t.position.z);
    }
  }
}
