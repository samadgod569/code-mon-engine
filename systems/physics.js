// physics.js
export class PhysicsSystem{
 constructor(gravity=-9.8){
  this.g=gravity;
  this.airDrag=0.98;
  this.groundDrag=0.85;
 }

 update(w,dt){
  for(const e of w.with("Transform","Velocity")){
   const t=w.get(e,"Transform");
   const v=w.get(e,"Velocity");
   const rb=w.get(e,"Rigidbody");

   if(rb?.useGravity) v.y+=this.g*dt;

   v.x*=this.airDrag;
   v.y*=this.airDrag;
   v.z*=this.airDrag;

   if(rb){
    if(rb.freezeX) v.x=0;
    if(rb.freezeY) v.y=0;
    if(rb.freezeZ) v.z=0;
   }

   t.x+=v.x*dt;
   t.y+=v.y*dt;
   t.z+=v.z*dt;
  }
 }

 raycast(w,origin,dir,dist){
  for(const e of w.with("Transform","Collider")){
   const t=w.get(e,"Transform");
   if(Math.abs(t.x-origin.x)<dist &&
      Math.abs(t.y-origin.y)<dist &&
      Math.abs(t.z-origin.z)<dist){
      return e;
   }
  }
  return null;
 }
}
