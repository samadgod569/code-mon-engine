export class Scene{
 constructor(name){
  this.name=name;
  this.entities=[];
 }

 add(e){ this.entities.push(e); }

 save(world){
  return JSON.stringify(this.entities.map(e=>{
   const o={};
   for(const [k,m] of world.components){
    if(m.has(e)) o[k]=m.get(e);
   }
   return o;
  }));
 }

 load(json,world){
  const arr=JSON.parse(json);
  for(const d of arr){
   const e=world.create();
   for(const k in d) world.add(e,Object.assign({},d[k]));
  }
 }
}
