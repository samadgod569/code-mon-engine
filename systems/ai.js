export class AI{
 constructor(tree){ this.tree=tree; }
 update(w,e,dt){ this.tree.run(w,e,dt); }
}

export class Node{
 run(){ return true; }
}

export class Sequence extends Node{
 constructor(...c){ super(); this.c=c; }
 run(w,e,dt){
  for(const n of this.c) if(!n.run(w,e,dt)) return false;
  return true;
 }
}

export class Selector extends Node{
 constructor(...c){ super(); this.c=c; }
 run(w,e,dt){
  for(const n of this.c) if(n.run(w,e,dt)) return true;
  return false;
 }
}

export class Action extends Node{
 constructor(fn){ super(); this.fn=fn; }
 run(w,e,dt){ return this.fn(w,e,dt); }
}

export class AISystem{
 update(w,dt){
  for(const e of w.with("AI")){
   w.get(e,"AI").update(w,e,dt);
  }
 }
}
