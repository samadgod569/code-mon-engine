export class CameraSystem {
  constructor(cam, config = {}) {
    this.cam = cam;
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    
    // Configuration with defaults
    this.config = {
      sensitivity: 0.01,
      pitchLimit: {
        min: -Math.PI / 2 + 0.01,
        max: Math.PI / 2 - 0.01
      },
      smoothing: {
        enabled: false,
        factor: 0.1
      },
      bobIntensity: 0.05,
      bobSpeed: 10,
      ...config
    };
    
    // State tracking
    this.targetPosition = new THREE.Vector3();
    this.currentPosition = new THREE.Vector3();
    this.targetRotation = { yaw: 0, pitch: 0 };
    this.offset = new THREE.Vector3(0, 1.6, 0); // Default head height
    this.bobTimer = 0;
    this.isBobbing = false;
    this.lastFrameTime = performance.now();
    
    // Camera shake properties
    this.shakeIntensity = 0;
    this.shakeDecay = 0.95;
    this.shakeDuration = 0;
    
    // Input smoothing
    this.mouseSmoothingBuffer = [];
    this.smoothingBufferSize = 5;
    
    // Reference frame for relative rotations
    this.rotationOrder = 'YXZ';
    this.cam.rotation.order = this.rotationOrder;
  }
  
  update(w) {
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;
    
    const player = w.with("Camera")[0];
    if (!player) return;
    
    const t = w.get(player, "Transform");
    const playerVelocity = w.get(player, "Velocity") || { x: 0, y: 0, z: 0 };
    
    // Calculate base position at player head
    this.targetPosition.set(t.x, t.y, t.z).add(this.offset);
    
    // Apply head bobbing if moving
    this.applyHeadBobbing(deltaTime, playerVelocity);
    
    // Apply camera shake if active
    this.applyCameraShake(deltaTime);
    
    // Smooth camera movement if enabled
    if (this.config.smoothing.enabled) {
      this.currentPosition.lerp(this.targetPosition, this.config.smoothing.factor);
      this.cam.position.copy(this.currentPosition);
      
      // Smooth rotation
      this.targetRotation.yaw = this.yaw;
      this.targetRotation.pitch = this.pitch;
      
      const lerpFactor = this.config.smoothing.factor;
      const currentYaw = this.cam.rotation.y;
      const currentPitch = this.cam.rotation.x;
      
      // Handle yaw wrapping for smooth interpolation
      let yawDiff = this.targetRotation.yaw - currentYaw;
      if (Math.abs(yawDiff) > Math.PI) {
        yawDiff = yawDiff > 0 ? yawDiff - Math.PI * 2 : yawDiff + Math.PI * 2;
      }
      
      this.cam.rotation.y = currentYaw + yawDiff * lerpFactor;
      this.cam.rotation.x = currentPitch + (this.targetRotation.pitch - currentPitch) * lerpFactor;
    } else {
      // Direct camera positioning
      this.cam.position.copy(this.targetPosition);
      this.cam.rotation.y = this.yaw;
      this.cam.rotation.x = this.pitch;
    }
    
    // Apply roll if needed (for tilt effects)
    this.cam.rotation.z = this.roll;
    
    // Update camera matrix for accurate world space
    this.cam.updateMatrixWorld();
  }
  
  onMouseMove(dx, dy, smooth = true) {
    let processedDx = dx;
    let processedDy = dy;
    
    // Apply input smoothing if enabled
    if (smooth && this.config.smoothing.enabled) {
      this.mouseSmoothingBuffer.push({ dx, dy });
      if (this.mouseSmoothingBuffer.length > this.smoothingBufferSize) {
        this.mouseSmoothingBuffer.shift();
      }
      
      // Calculate average of buffer
      const avg = this.mouseSmoothingBuffer.reduce(
        (acc, val) => ({ dx: acc.dx + val.dx, dy: acc.dy + val.dy }),
        { dx: 0, dy: 0 }
      );
      processedDx = avg.dx / this.mouseSmoothingBuffer.length;
      processedDy = avg.dy / this.mouseSmoothingBuffer.length;
    }
    
    // Apply yaw and pitch with sensitivity
    this.yaw -= processedDx * this.config.sensitivity;
    this.pitch -= processedDy * this.config.sensitivity;
    
    // Normalize yaw to prevent floating point overflow
    this.yaw = this.normalizeAngle(this.yaw);
    
    // Clamp pitch to configured limits
    this.pitch = Math.max(
      this.config.pitchLimit.min,
      Math.min(this.config.pitchLimit.max, this.pitch)
    );
  }
  
  normalizeAngle(angle) {
    // Keep angle between -π and π
    while (angle > Math.PI) angle -= Math.PI * 2;
    while (angle < -Math.PI) angle += Math.PI * 2;
    return angle;
  }
  
  applyHeadBobbing(deltaTime, velocity) {
    const speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2);
    this.isBobbing = speed > 0.1;
    
    if (this.isBobbing) {
      this.bobTimer += deltaTime * this.config.bobSpeed;
      
      // Calculate bobbing offset using sine waves
      const horizontalBob = Math.sin(this.bobTimer * 2) * this.config.bobIntensity * 0.1;
      const verticalBob = Math.abs(Math.sin(this.bobTimer)) * this.config.bobIntensity;
      
      // Apply bobbing to camera offset
      this.offset.y = 1.6 + verticalBob;
      this.offset.x = horizontalBob;
    } else {
      // Reset to default position smoothly
      this.offset.y = 1.6;
      this.offset.x = 0;
      this.offset.z = 0;
    }
  }
  
  applyCameraShake(deltaTime) {
    if (this.shakeDuration > 0) {
      // Generate random shake offsets
      const shakeX = (Math.random() - 0.5) * this.shakeIntensity;
      const shakeY = (Math.random() - 0.5) * this.shakeIntensity;
      const shakeZ = (Math.random() - 0.5) * this.shakeIntensity;
      
      // Apply shake to camera position
      this.cam.position.x += shakeX;
      this.cam.position.y += shakeY;
      this.cam.position.z += shakeZ;
      
      // Decay shake over time
      this.shakeIntensity *= this.shakeDecay;
      this.shakeDuration -= deltaTime;
      
      if (this.shakeDuration <= 0) {
        this.shakeIntensity = 0;
      }
    }
  }
  
  triggerCameraShake(intensity = 0.1, duration = 0.5) {
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
  }
  
  setCameraOffset(x = 0, y = 1.6, z = 0) {
    this.offset.set(x, y, z);
  }
  
  lookAtTarget(x, y, z, instant = false) {
    const target = new THREE.Vector3(x, y, z);
    const direction = target.sub(this.cam.position).normalize();
    
    // Calculate target yaw and pitch from direction vector
    const targetYaw = Math.atan2(direction.x, direction.z);
    const targetPitch = Math.asin(Math.max(-1, Math.min(1, direction.y)));
    
    if (instant) {
      this.yaw = targetYaw;
      this.pitch = targetPitch;
    } else {
      // Smoothly interpolate to target (could be enhanced with easing)
      this.yaw = this.normalizeAngle(this.yaw);
      const yawDiff = this.normalizeAngle(targetYaw - this.yaw);
      this.yaw += yawDiff * 0.1;
      this.pitch += (targetPitch - this.pitch) * 0.1;
    }
  }
  
  setSensitivity(sensitivity) {
    this.config.sensitivity = sensitivity;
  }
  
  setSmoothing(enabled, factor = 0.1) {
    this.config.smoothing.enabled = enabled;
    this.config.smoothing.factor = factor;
  }
  
  getForwardVector() {
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyEuler(this.cam.rotation);
    return forward;
  }
  
  getRightVector() {
    const right = new THREE.Vector3(1, 0, 0);
    right.applyEuler(this.cam.rotation);
    return right;
  }
  
  resetCamera() {
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    this.offset.set(0, 1.6, 0);
    this.mouseSmoothingBuffer = [];
  }
  
  // For debugging or cinematic purposes
  setManualRotation(yaw, pitch, roll = 0) {
    this.yaw = yaw;
    this.pitch = pitch;
    this.roll = roll;
  }
  
  // Get current camera state for saving/loading
  getCameraState() {
    return {
      position: this.cam.position.clone(),
      rotation: {
        yaw: this.yaw,
        pitch: this.pitch,
        roll: this.roll
      },
      offset: this.offset.clone(),
      config: { ...this.config }
    };
  }
  
  // Restore camera state
  setCameraState(state) {
    if (state.position) this.cam.position.copy(state.position);
    if (state.rotation) {
      this.yaw = state.rotation.yaw;
      this.pitch = state.rotation.pitch;
      this.roll = state.rotation.roll || 0;
    }
    if (state.offset) this.offset.copy(state.offset);
    if (state.config) this.config = { ...this.config, ...state.config };
  }
        }
