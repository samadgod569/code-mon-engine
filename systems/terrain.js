// terrain.js
export class TerrainSystem{
 constructor(size=16,height=64){
  this.size=size;
  this.height=height;
  this.chunks=new Map();
  this.generators=new Map();
 }

 key(x,z){ return x+","+z; }

 registerGenerator(name,fn){
  this.generators.set(name,fn);
 }

 load(x,z){
  const k=this.key(x,z);
  if(this.chunks.has(k)) return;
  const data=[];
  const gen=this.generators.get("default");
  for(let i=0;i<this.size;i++){
   for(let j=0;j<this.size;j++){
    const h=gen?gen(x*this.size+i,z*this.size+j):1;
    data.push({x:i,y:h,z:j,type:1});
   }
  }
  this.chunks.set(k,data);
 }

 unload(x,z){
  this.chunks.delete(this.key(x,z));
 }

 getBlock(x,y,z){
  const cx=Math.floor(x/this.size);
  const cz=Math.floor(z/this.size);
  const c=this.chunks.get(this.key(cx,cz));
  if(!c) return null;
  return c.find(b=>b.x===x%this.size && b.y===y && b.z===z%this.size);
 }

 setBlock(x,y,z,type){
  const cx=Math.floor(x/this.size);
  const cz=Math.floor(z/this.size);
  const k=this.key(cx,cz);
  if(!this.chunks.has(k)) this.load(cx,cz);
  this.chunks.get(k).push({x:x%this.size,y,z:z%this.size,type});
 }
 }
