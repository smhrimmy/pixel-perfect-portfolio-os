import * as THREE from "three";

interface PhysicsBody {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  mass: number;
  damping: number;
  gravity: number;
  isStatic: boolean;
  onGround: boolean;
}

export class SimplePhysicsManager implements PhysicsManager {
  private bodies: Map<string, PhysicsBody> = new Map();
  private gravity = -9.81;
  private groundY = 0;
  private enabled = true;

  init(): void {
    // Simple physics - no external library needed for basic interactions
  }

  addBody(
    id: string,
    position: THREE.Vector3,
    options?: {
      mass?: number;
      damping?: number;
      gravity?: number;
      isStatic?: boolean;
    }
  ): PhysicsBody {
    const body: PhysicsBody = {
      id,
      position: position.clone(),
      velocity: new THREE.Vector3(0, 0, 0),
      mass: options?.mass ?? 1,
      damping: options?.damping ?? 0.98,
      gravity: options?.gravity ?? this.gravity,
      isStatic: options?.isStatic ?? false,
      onGround: false,
    };
    this.bodies.set(id, body);
    return body;
  }

  removeBody(id: string): void {
    this.bodies.delete(id);
  }

  getBody(id: string): PhysicsBody | undefined {
    return this.bodies.get(id);
  }

  applyForce(id: string, force: THREE.Vector3): void {
    const body = this.bodies.get(id);
    if (body && !body.isStatic) {
      body.velocity.add(force.divideScalar(body.mass));
    }
  }

  update(delta: number): void {
    if (!this.enabled) return;

    const dt = Math.min(delta, 0.05); // Cap delta to prevent tunneling

    this.bodies.forEach((body) => {
      if (body.isStatic) return;

      // Apply gravity
      body.velocity.y += body.gravity * dt;

      // Apply damping
      body.velocity.multiplyScalar(body.damping);

      // Update position
      body.position.add(body.velocity.clone().multiplyScalar(dt));

      // Ground collision
      if (body.position.y <= this.groundY) {
        body.position.y = this.groundY;
        body.velocity.y = 0;
        body.onGround = true;
      } else {
        body.onGround = false;
      }
    });
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  destroy(): void {
    this.bodies.clear();
  }
}

interface PhysicsManager {
  init(): void;
  addBody(
    id: string,
    position: THREE.Vector3,
    options?: {
      mass?: number;
      damping?: number;
      gravity?: number;
      isStatic?: boolean;
    }
  ): PhysicsBody;
  removeBody(id: string): void;
  getBody(id: string): PhysicsBody | undefined;
  applyForce(id: string, force: THREE.Vector3): void;
  update(delta: number): void;
  setEnabled(enabled: boolean): void;
  destroy(): void;
}
