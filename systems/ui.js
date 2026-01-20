export class UISystem{
 constructor(ctx){
  this.ctx=ctx;
  this.state={};
  this.styles={};
 }

 registerStyle(name,s){ this.styles[name]=s; }

 begin(){ this.y=10; }

 label(text){
  this.ctx.fillStyle="white";
  this.ctx.fillText(text,10,this.y);
  this.y+=20;
 }

 button(text,id){
  const y=this.y;
  this.ctx.fillStyle="gray";
  this.ctx.fillRect(10,y,120,25);
  this.ctx.fillStyle="white";
  this.ctx.fillText(text,20,y+17);
  this.y+=35;

  if(this.state[id]) return true;
  return false;
 }

 slider(val,min,max,id){
  const y=this.y;
  const w=120;
  this.ctx.strokeRect(10,y,w,20);
  const p=(val-min)/(max-min);
  this.ctx.fillRect(10,y,w*p,20);
  this.y+=30;
  return val;
 }

 update(w,dt){
  this.ctx.clearRect(0,0,innerWidth,innerHeight);
  this.begin();
 }
}
