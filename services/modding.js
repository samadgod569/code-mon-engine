// services/modding.js
export class ModdingService{
 constructor(engine){
  this.engine=engine;
  this.mods=new Map();
 }

 async load(url){
  const meta=await fetch(url+"/mod.json").then(r=>r.json());
  const mod=await import(url+"/"+meta.entry);
  mod.init(this.engine);
  this.mods.set(meta.name,mod);
 }

 unload(name){
  this.mods.delete(name);
 }

 list(){ return [...this.mods.keys()]; }
}
