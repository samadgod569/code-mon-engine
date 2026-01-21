export class CameraSystem {
  constructor(cam) {
    this.cam = cam;
    this.yaw = 0;
    this.pitch = 0;
  }

  update(w) {
    const player = w.with("Camera")[0];
    if(!player) return;
    const t = w.get(player, "Transform");

    // Position camera at player head
    this.cam.position.set(t.x, t.y + 1.6, t.z);

    // Apply yaw/pitch for mouse look
    this.cam.rotation.order = "YXZ";
    this.cam.rotation.y = this.yaw;
    this.cam.rotation.x = this.pitch;
  }

  onMouseMove(dx, dy) {
    this.yaw -= dx * 0.01;     // adjust sensitivity
    this.pitch -= dy * 0.01;
    this.pitch = Math.max(-Math.PI/2 + 0.01, Math.min(Math.PI/2 - 0.01, this.pitch));
  }
}
