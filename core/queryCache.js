export class QueryCache{
  constructor(){
    this.map=new Map();
    this.hits=0;
    this.miss=0;
  }

  get(key,fn){
    if(this.map.has(key)){
      this.hits++;
      return this.map.get(key);
    }
    this.miss++;
    const v=fn();
    this.map.set(key,v);
    return v;
  }

  clear(){
    this.map.clear();
  }

  stats(){
    return {hits:this.hits,miss:this.miss};
  }
}
