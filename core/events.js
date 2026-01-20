export class Events {
  constructor(){
    this.queue=[];
    this.listeners=new Map();
  }

  emit(name,data=null,priority=0){
    this.queue.push({name,data,priority});
    this.queue.sort((a,b)=>b.priority-a.priority);
  }

  subscribe(name,cb){
    if(!this.listeners.has(name)) this.listeners.set(name,[]);
    this.listeners.get(name).push(cb);
  }

  unsubscribe(name,cb){
    const l=this.listeners.get(name);
    if(!l) return;
    this.listeners.set(name,l.filter(x=>x!==cb));
  }

  dispatch(){
    while(this.queue.length){
      const e=this.queue.shift();
      const l=this.listeners.get(e.name);
      if(l) for(const cb of l) cb(e.data);
    }
  }

  clear(){ this.queue.length=0; }
}
