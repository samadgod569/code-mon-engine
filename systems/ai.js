export class AISystem{
 update(w,dt){
  for(const e of w.with("AI")){
   const ai=w.get(e,"AI");
   ai.update(w,e,dt);
  }
 }
}
