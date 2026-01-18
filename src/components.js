export class Transform{
 constructor(x=0,y=0,z=0){
  this.x=x; this.y=y; this.z=z;
  this.rx=0; this.ry=0; this.rz=0;
  this.s=1;
 }
}

export class Velocity{
 constructor(x=0,y=0,z=0){
  this.x=x; this.y=y; this.z=z;
 }
}

export class Sprite2D{
 constructor(w=40,h=40,color="white"){
  this.w=w; this.h=h; this.color=color;
 }
}

export class Mesh3D{
 constructor(mesh){ this.mesh=mesh; }
}

export class Player{}
export class Enemy{}

export class Collider{
 constructor(w=1,h=1,d=1){
  this.w=w; this.h=h; this.d=d;
 }
}

export class Script{
 constructor(fn){ this.fn=fn; }
}
