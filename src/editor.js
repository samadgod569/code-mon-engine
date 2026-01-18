export class Editor{
 constructor(world){
  this.w=world;
  this.ui=document.getElementById("ui");
 }

 show(e){
  this.ui.innerHTML="<h3>Entity "+e+"</h3>";
  for(const [k,m] of this.w.components){
   if(m.has(e)){
    this.ui.innerHTML+=`<pre>${k}:\n${JSON.stringify(m.get(e),null,2)}</pre>`;
   }
  }
 }
}
