export class PhysicsSystem{
 constructor(gravity=-9.8){
  this.g=gravity;
 }

 update(w,dt){
  for(const e of w.with("Transform","Velocity")){
   const t=w.get(e,"Transform");
   const v=w.get(e,"Velocity");
   if(w.get(e,"Rigidbody")?.useGravity) v.y+=this.g*dt;
   t.x+=v.x*dt;
   t.y+=v.y*dt;
   t.z+=v.z*dt;
  }
 }
}
