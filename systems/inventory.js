export class InventorySystem{
 constructor(){
  this.items=new Map();
  this.recipes=new Map();
 }

 registerItem(id,data){
  this.items.set(id,data);
 }

 registerRecipe(id,recipe){
  this.recipes.set(id,recipe);
 }

 create(size=20){
  return {slots:new Array(size).fill(null)};
 }

 add(inv,id,q=1){
  for(let i=0;i<inv.slots.length;i++){
   const s=inv.slots[i];
   if(!s){ inv.slots[i]={id,qty:q}; return true; }
   if(s.id===id){ s.qty+=q; return true; }
  }
  return false;
 }

 remove(inv,id,q=1){
  for(const s of inv.slots){
   if(s&&s.id===id){
    s.qty-=q;
    if(s.qty<=0) s.id=null;
    return true;
   }
  }
  return false;
 }

 has(inv,id,q=1){
  let c=0;
  for(const s of inv.slots) if(s?.id===id) c+=s.qty;
  return c>=q;
 }

 canCraft(inv,recipeId){
  const r=this.recipes.get(recipeId);
  return r.require.every(i=>this.has(inv,i.id,i.qty));
 }

 craft(inv,recipeId){
  if(!this.canCraft(inv,recipeId)) return false;
  const r=this.recipes.get(recipeId);
  for(const i of r.require) this.remove(inv,i.id,i.qty);
  this.add(inv,r.result.id,r.result.qty);
  return true;
 }

 update(){}
}
