// services/performance.js
export class PerformanceService{
 constructor(){ this.fps=0; this.last=performance.now(); }

 update(){
  const n=performance.now();
  this.fps=1000/(n-this.last);
  this.last=n;
 }
}
