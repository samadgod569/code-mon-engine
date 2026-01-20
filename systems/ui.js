export class UISystem{
 constructor(ctx){ this.ctx=ctx; }

 drawButton(x,y,w,h,text){
  const c=this.ctx;
  c.fillStyle="#222"; c.fillRect(x,y,w,h);
  c.fillStyle="white"; c.fillText(text,x+10,y+25);
 }
}
