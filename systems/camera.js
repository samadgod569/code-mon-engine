export class CameraSystem{
 constructor(cam){ this.cam=cam; }

 update(w){
  const p=w.with("Camera")[0];
  if(!p) return;
  const t=w.get(p,"Transform");
  this.cam.position.set(t.x,t.y+5,t.z+10);
  this.cam.lookAt(t.x,t.y,t.z);
 }
}
