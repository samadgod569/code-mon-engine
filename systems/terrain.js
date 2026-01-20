export class TerrainSystem{
 constructor(size=16){ this.size=size; this.chunks=new Map(); }

 key(x,z){ return x+","+z; }

 load(x,z){ if(!this.chunks.has(this.key(x,z))) this.chunks.set(this.key(x,z),[]); }

 get(x,y,z){
  const cx=Math.floor(x/this.size);
  const cz=Math.floor(z/this.size);
  return this.chunks.get(this.key(cx,cz));
 }
}
