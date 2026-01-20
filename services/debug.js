// services/debug.js
export class DebugService{
 constructor(){
  this.logs=[];
  this.watchers=new Map();
  this.marks=new Map();
 }

 log(type,msg,data){
  this.logs.push({type,msg,data,time:performance.now()});
  console[type](msg,data||"");
 }

 watch(name,fn){ this.watchers.set(name,fn); }
 unwatch(name){ this.watchers.delete(name); }

 dump(){
  const o={};
  for(const [k,f] of this.watchers) o[k]=f();
  return o;
 }

 timeStart(label){ this.marks.set(label,performance.now()); }
 timeEnd(label){
  const t=performance.now()-this.marks.get(label);
  console.log(label+" "+t.toFixed(2)+"ms");
 }
}
