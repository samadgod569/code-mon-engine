export class Input{
 constructor(){
  this.k={};
  addEventListener("keydown",e=>this.k[e.key]=1);
  addEventListener("keyup",e=>this.k[e.key]=0);
 }

 x(){
  return (this.k.d||this.k.ArrowRight?1:0)-(this.k.a||this.k.ArrowLeft?1:0);
 }
 y(){
  return (this.k.s||this.k.ArrowDown?1:0)-(this.k.w||this.k.ArrowUp?1:0);
 }
}
