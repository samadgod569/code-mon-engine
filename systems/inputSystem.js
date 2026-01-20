export class InputSystem{
 constructor(input){ this.i=input; }

 update(w){
  for(const e of w.with("Player","Velocity")){
   const v=w.get(e,"Velocity");
   v.x=this.i.x()*5;
   v.y=this.i.y()*5;
  }
 }
}
