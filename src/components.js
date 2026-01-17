export class Transform {
  constructor(x=0,y=0,z=0){
    this.position={x,y,z};
  }
}

export class MeshRenderer {
  constructor(mesh){
    this.mesh=mesh;
  }
}

export class Velocity {
  constructor(x=0,y=0,z=0){
    this.x=x;this.y=y;this.z=z;
  }
}
