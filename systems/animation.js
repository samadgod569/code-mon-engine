// animation.js
export class AnimationSystem{
 constructor(){
  this.states=new Map();
 }

 update(w,dt){
  for(const e of w.with("Animation")){
   const a=w.get(e,"Animation");
   if(!a.playing||a.frames.length===0) continue;

   a.time+=dt;
   if(a.time>=a.speed){
    a.time=0;
    a.current++;
    if(a.current>=a.frames.length){
     if(a.loop) a.current=0;
     else{ a.current=a.frames.length-1; a.playing=false; }
    }
   }
  }
 }

 setState(e,state){
  this.states.set(e,state);
 }

 stop(w,e){
  const a=w.get(e,"Animation");
  if(a) a.playing=false;
 }

 play(w,e){
  const a=w.get(e,"Animation");
  if(a) a.playing=true;
 }
}
