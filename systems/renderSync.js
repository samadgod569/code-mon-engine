export class RenderSyncSystem{
 update(w){
  for(const e of w.with("Transform","Mesh3D")){
   const t=w.get(e,"Transform");
   const m=w.get(e,"Mesh3D").mesh;
   m.position.set(t.x,t.y,t.z);
   m.rotation.set(t.rx,t.ry,t.rz);
  }
 }
}
