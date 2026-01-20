export class Tags{
  constructor(){
    this.map=new Map();
  }

  add(e,...tags){
    if(!this.map.has(e)) this.map.set(e,new Set());
    tags.forEach(t=>this.map.get(e).add(t));
  }

  remove(e,t){
    this.map.get(e)?.delete(t);
  }

  has(e,t){
    return this.map.get(e)?.has(t);
  }

  query(t){
    const res=[];
    for(const [e,s] of this.map){
      if(s.has(t)) res.push(e);
    }
    return res;
  }
}
