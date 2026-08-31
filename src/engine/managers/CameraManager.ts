import * as THREE from "three";
import gsap from "gsap";
import type { CameraConfig, CameraKeyframe } from "../types";

export class ThreeCameraManager implements CameraManager {
  private camera: THREE.PerspectiveCamera | null = null;
  private config: CameraConfig | null = null;
  private targetPosition = new THREE.Vector3();
  private targetLookAt = new THREE.Vector3();
  private currentLookAt = new THREE.Vector3();
  private isAnimating = false;
  private autoRotateTimeline: gsap.core.Timeline | null = null;

  init(config: CameraConfig, camera: THREE.PerspectiveCamera): void {
    this.config = config;
    this.camera = camera;

    // Set initial position
    camera.position.set(...config.initialPosition);
    this.targetLookAt.set(...config.initialTarget);
    this.currentLookAt.copy(this.targetLookAt);
    camera.lookAt(this.targetLookAt);

    // Set FOV
    camera.fov = config.fov;
    camera.near = config.near;
    camera.far = config.far;
    camera.updateProjectionMatrix();
  }

  flyTo(
    position: [number, number, number],
    target: [number, number, number],
    duration?: number
  ): Promise<void> {
    if (!this.camera || !this.config) return Promise.resolve();

    const dur = duration ?? this.config.transitions.duration;
    const easing = this.config.transitions.easing;

    return new Promise((resolve) => {
      this.isAnimating = true;
      const cam = this.camera!;

      // Animate camera position
      gsap.to(cam.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: dur,
        ease: easing,
        onUpdate: () => {
          cam.lookAt(this.currentLookAt);
        },
      });

      // Animate look-at target
      gsap.to(this.targetLookAt, {
        x: target[0],
        y: target[1],
        z: target[2],
        duration: dur,
        ease: easing,
        onUpdate: () => {
          this.currentLookAt.copy(this.targetLookAt);
          this.camera?.lookAt(this.currentLookAt);
        },
        onComplete: () => {
          this.isAnimating = false;
          resolve();
        },
      });
    });
  }

  flyToKeyframe(keyframe: CameraKeyframe): Promise<void> {
    return this.flyTo(keyframe.position, keyframe.target, keyframe.duration);
  }

  reset(): void {
    if (!this.config) return;
    this.flyTo(this.config.initialPosition, this.config.initialTarget, 1);
  }

  startAutoRotate(keyframes: CameraKeyframe[]): void {
    if (keyframes.length === 0) return;

    this.stopAutoRotate();

    const tl = gsap.timeline({ repeat: -1 });

    keyframes.forEach((kf) => {
      tl.to(this.camera!.position, {
        x: kf.position[0],
        y: kf.position[1],
        z: kf.position[2],
        duration: kf.duration,
        ease: kf.easing ?? "power2.inOut",
      });
      tl.to(
        this.targetLookAt,
        {
          x: kf.target[0],
          y: kf.target[1],
          z: kf.target[2],
          duration: kf.duration,
          ease: kf.easing ?? "power2.inOut",
        },
        "<"
      );
    });

    this.autoRotateTimeline = tl;
  }

  stopAutoRotate(): void {
    this.autoRotateTimeline?.kill();
    this.autoRotateTimeline = null;
  }

  update(): void {
    if (this.camera && !this.isAnimating) {
      this.camera.lookAt(this.currentLookAt);
    }
  }

  destroy(): void {
    this.stopAutoRotate();
    this.camera = null;
    this.config = null;
  }
}

interface CameraManager {
  init(config: CameraConfig, camera: THREE.PerspectiveCamera): void;
  flyTo(
    position: [number, number, number],
    target: [number, number, number],
    duration?: number
  ): Promise<void>;
  flyToKeyframe(keyframe: CameraKeyframe): Promise<void>;
  reset(): void;
  startAutoRotate(keyframes: CameraKeyframe[]): void;
  stopAutoRotate(): void;
  update(): void;
  destroy(): void;
}
