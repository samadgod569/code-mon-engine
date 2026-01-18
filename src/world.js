export class World{
 constructor(){
  this.entities=[];
  this.components=new Map();
  this.systems=[];
  this.id=1;
 }

 create(){
  const e=this.id++;
  this.entities.push(e);
  return e;
 }

 add(e,c){
  const n=c.constructor.name;
  if(!this.components.has(n)) this.components.set(n,new Map());
  this.components.get(n).set(e,c);
 }

 get(e,n){ return this.components.get(n)?.get(e); }

 remove(e,n){ this.components.get(n)?.delete(e); }

 with(...n){
  return this.entities.filter(e=>n.every(x=>this.components.get(x)?.has(e)));
 }

 addSystem(s){ this.systems.push(s); }

 update(dt){
  for(const s of this.systems) s.update(this,dt);
 }
}
