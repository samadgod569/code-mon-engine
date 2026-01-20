// ai.js
export class AISystem{
 constructor(){
  this.states=new Map();
 }

 update(w,dt){
  for(const e of w.with("AI")){
   const ai=w.get(e,"AI");
   if(ai.update) ai.update(w,e,dt);
  }
 }

 wander(w,e,dt){
  const v=w.get(e,"Velocity");
  if(!v) return;
  v.x+=(Math.random()-0.5)*dt*5;
  v.z+=(Math.random()-0.5)*dt*5;
 }

 follow(w,e,target,dt){
  const t=w.get(e,"Transform");
  const tt=w.get(target,"Transform");
  const v=w.get(e,"Velocity");
  if(!t||!tt||!v) return;
  v.x=(tt.x-t.x)*dt*2;
  v.z=(tt.z-t.z)*dt*2;
 }
}
