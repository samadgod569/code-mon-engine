export class Renderer2D{
 constructor(ctx){ this.ctx=ctx; }

 render(w){
  const c=this.ctx;
  c.clearRect(0,0,innerWidth,innerHeight);
  for(const e of w.with("Transform","Sprite2D")){
   const t=w.get(e,"Transform");
   const s=w.get(e,"Sprite2D");
   c.fillStyle=s.color;
   c.fillRect(t.x,t.y,s.w,s.h);
  }
 }
}
