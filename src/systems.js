export class MovementSystem{
 update(w,dt){
  for(const e of w.with("Transform","Velocity")){
   const t=w.get(e,"Transform");
   const v=w.get(e,"Velocity");
   t.x+=v.x*dt;
   t.y+=v.y*dt;
   t.z+=v.z*dt;
  }
 }
}

export class CollisionSystem{
 update(w){
  const list=w.with("Transform","Collider");
  for(let i=0;i<list.length;i++){
   for(let j=i+1;j<list.length;j++){
    const a=list[i],b=list[j];
    const ta=w.get(a,"Transform");
    const tb=w.get(b,"Transform");
    const ca=w.get(a,"Collider");
    const cb=w.get(b,"Collider");

    if(Math.abs(ta.x-tb.x)<(ca.w+cb.w)/2 &&
       Math.abs(ta.y-tb.y)<(ca.h+cb.h)/2){
       console.log("Collision",a,b);
    }
   }
  }
 }
}

export class ScriptSystem{
 update(w,dt){
  for(const e of w.with("Script")){
   w.get(e,"Script").fn(w,e,dt);
  }
 }
}
