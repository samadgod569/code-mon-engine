export class AnimationSystem{
 update(w,dt){
  for(const e of w.with("Animation")){
   const a=w.get(e,"Animation");
   if(!a.playing) continue;
   a.time+=dt;
   if(a.time>a.speed){
    a.time=0;
    a.current=(a.current+1)%a.frames.length;
   }
  }
 }
}
