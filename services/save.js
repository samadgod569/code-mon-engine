// services/save.js
export class SaveService{
 constructor(prefix="codemon"){
  this.prefix=prefix;
 }

 save(slot,data){
  const json=JSON.stringify(data);
  const comp=btoa(json);
  localStorage.setItem(this.prefix+slot,comp);
 }

 load(slot){
  const d=localStorage.getItem(this.prefix+slot);
  if(!d) return null;
  return JSON.parse(atob(d));
 }

 delete(slot){
  localStorage.removeItem(this.prefix+slot);
 }

 list(){
  return Object.keys(localStorage).filter(k=>k.startsWith(this.prefix));
 }
}
