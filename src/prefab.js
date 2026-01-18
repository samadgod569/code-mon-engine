export function Prefab(world,list){
 return ()=>{
  const e=world.create();
  for(const c of list) world.add(e,c);
  return e;
 }
}
