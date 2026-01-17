export class ECS {
  constructor(){
    this.entities = new Set();
    this.components = new Map();
    this.systems = [];
    this.nextId = 1;
  }

  createEntity(){
    const id = this.nextId++;
    this.entities.add(id);
    return id;
  }

  addComponent(entity, component){
    const type = component.constructor.name;
    if(!this.components.has(type))
      this.components.set(type,new Map());
    this.components.get(type).set(entity,component);
  }

  getComponent(entity,type){
    return this.components.get(type)?.get(entity);
  }

  getEntitiesWith(...types){
    return [...this.entities].filter(e =>
      types.every(t=>this.components.get(t)?.has(e))
    );
  }

  addSystem(system){
    this.systems.push(system);
  }

  update(dt){
    for(const s of this.systems) s.update(this,dt);
  }
}
