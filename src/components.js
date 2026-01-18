export class Transform { constructor(x=0,y=0,z=0){ this.position={x,y,z}; } }
export class MeshRenderer { constructor(mesh){ this.mesh = mesh; } }
export class Velocity { constructor(x=0,y=0,z=0){ this.x=x; this.y=y; this.z=z; } }
export class PlayerControlled { constructor(){ this.input={up:0,down:0,left:0,right:0}; } }
export class AIControlled { constructor(speed=1){ this.speed=speed; } }
export class Collider { constructor(size=1){ this.size=size; } }
