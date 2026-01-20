export class ScriptSystem{
 update(w,dt){
  for(const e of w.with("Script")){
   w.get(e,"Script").fn(w,e,dt);
  }
 }
}
