export class TerrainSystem{
 constructor(size=16,height=64){
  this.size=size;
  this.height=height;
  this.chunks=new Map();
  this.materials=new Map();
 }

 key(x,z){ return x+","+z; }

 registerMaterial(id,data){
  this.materials.set(id,data);
 }

 loadChunk(x,z){
  const k=this.key(x,z);
  if(this.chunks.has(k)) return;
  const blocks=[];
  for(let i=0;i<this.size;i++){
   blocks[i]=[];
   for(let j=0;j<this.size;j++){
    blocks[i][j]=Math.random()>0.5?1:0;
   }
  }
  this.chunks.set(k,blocks);
 }

 getBlock(x,y,z){
  const cx=Math.floor(x/this.size);
  const cz=Math.floor(z/this.size);
  const c=this.chunks.get(this.key(cx,cz));
  if(!c) return 0;
  return c[Math.abs(x%this.size)][Math.abs(z%this.size)];
 }

 setBlock(x,y,z,t){
  const cx=Math.floor(x/this.size);
  const cz=Math.floor(z/this.size);
  const c=this.chunks.get(this.key(cx,cz));
  if(!c) return;
  c[Math.abs(x%this.size)][Math.abs(z%this.size)]=t;
 }

 update(w,dt){
  const p=w.with("Player","Transform")[0];
  if(!p) return;
  const t=w.get(p,"Transform");
  const cx=Math.floor(t.x/this.size);
  const cz=Math.floor(t.z/this.size);

  for(let x=-2;x<=2;x++)
   for(let z=-2;z<=2;z++)
    this.loadChunk(cx+x,cz+z);
 }
}
