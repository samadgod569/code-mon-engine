export class ECS {
  constructor(){ this.entities = new Set(); this.components = new Map(); this.systems = []; this.nextId = 1; }
  createEntity(){ const id=this.nextId++; this.entities.add(id); return id; }
  addComponent(entity,comp){
    const name = comp.constructor.name;
    if(!this.components.has(name)) this.components.set(name,new Map());
    this.components.get(name).set(entity,comp);
  }
  getComponent(entity,name){ return this.components.get(name)?.get(entity); }
  getEntitiesWith(...names){
    return [...this.entities].filter(e=>names.every(n=>this.components.get(n)?.has(e)));
  }
  addSystem(sys){ this.systems.push(sys); }
  update(dt){ for(const sys of this.systems) sys.update(this,dt); }
}
