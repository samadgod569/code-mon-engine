// ===== CORE ECS =====
export { World } from "./src/world.js";
export { world } from "./src/ecs.js";

// ===== COMPONENTS =====
export * from "./src/components.js";

// ===== SYSTEMS =====
export * from "./src/systems.js";

// ===== RENDERERS =====
export { Renderer2D } from "./src/renderer2D.js";
export { Renderer3D } from "./src/renderer3D.js";

// ===== ENGINE TOOLS =====
export { Input } from "./src/input.js";
export { Editor } from "./src/editor.js";
export { Prefab } from "./src/prefab.js";
export { Scene } from "./src/scene.js";

// ===== CORE EXTENSIONS =====
export * from "./core/events.js";
export * from "./core/tags.js";
export * from "./core/time.js";
export * from "./core/queryCache.js";

// ===== ADVANCED SYSTEMS =====
export * from "./systems/physics.js";
export * from "./systems/animation.js";
export * from "./systems/ai.js";
export * from "./systems/terrain.js";
export * from "./systems/inventory.js";
export * from "./systems/ui.js";
export * from "./systems/camera.js";
export * from "./systems/inputSystem.js";
export * from "./systems/scriptSystem.js";
export * from "./systems/renderSync.js";

// ===== SERVICES =====
export * from "./services/audio.js";
export * from "./services/save.js";
export * from "./services/debug.js";
export * from "./services/modding.js";
export * from "./net.js";
export * from "./storage.js";
export * from "./logger.js";
export * from "./performance.js";
