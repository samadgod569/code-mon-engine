export class InventorySystem{
 add(inv,id,q=1){
  const s=inv.slots.find(x=>x&&x.id==id);
  if(s) s.q+=q;
  else inv.slots[inv.slots.indexOf(null)]={id,q};
 }

 remove(inv,id,q){
  const s=inv.slots.find(x=>x&&x.id==id);
  if(s) s.q-=q;
 }
}
