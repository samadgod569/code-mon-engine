export class Time{
  constructor(){
    this.dt=0;
    this.time=0;
    this.scale=1;
  }

  update(dt){
    this.dt=Math.min(dt,0.05)*this.scale;
    this.time+=this.dt;
  }

  setTimeScale(s){
    this.scale=s;
  }
}
