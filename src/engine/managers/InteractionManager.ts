import * as THREE from "three";

export class ThreeInteractionManager implements InteractionManager {
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private canvas: HTMLCanvasElement | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private scene: THREE.Scene | null = null;
  private interactables: THREE.Object3D[] = [];

  private hoverCallback: ((objectId: string | null) => void) | null = null;
  private clickCallback: ((objectId: string) => void) | null = null;
  private dragCallback:
    | ((objectId: string, delta: { x: number; y: number }) => void)
    | null = null;

  private isDragging = false;
  private lastMouse = { x: 0, y: 0 };
  private hoveredObjectId: string | null = null;
  private boundHandlers: Record<string, EventListener> = {};

  init(
    canvas: HTMLCanvasElement,
    camera: THREE.PerspectiveCamera,
    scene: THREE.Scene
  ): void {
    this.canvas = canvas;
    this.camera = camera;
    this.scene = scene;

    this.boundHandlers.mousemove = this.onMouseMove.bind(this) as EventListener;
    this.boundHandlers.mousedown = this.onMouseDown.bind(this) as EventListener;
    this.boundHandlers.mouseup = this.onMouseUp.bind(this) as EventListener;
    this.boundHandlers.touchstart = this.onTouchStart.bind(this) as EventListener;
    this.boundHandlers.touchmove = this.onTouchMove.bind(this) as EventListener;
    this.boundHandlers.touchend = this.onTouchEnd.bind(this) as EventListener;
    this.boundHandlers.keydown = this.onKeyDown.bind(this) as EventListener;

    canvas.addEventListener("mousemove", this.boundHandlers.mousemove);
    canvas.addEventListener("mousedown", this.boundHandlers.mousedown);
    canvas.addEventListener("mouseup", this.boundHandlers.mouseup);
    canvas.addEventListener("touchstart", this.boundHandlers.touchstart, {
      passive: false,
    });
    canvas.addEventListener("touchmove", this.boundHandlers.touchmove, {
      passive: false,
    });
    canvas.addEventListener("touchend", this.boundHandlers.touchend);
    window.addEventListener("keydown", this.boundHandlers.keydown);
  }

  addInteractable(object: THREE.Object3D): void {
    this.interactables.push(object);
  }

  removeInteractable(object: THREE.Object3D): void {
    const idx = this.interactables.indexOf(object);
    if (idx > -1) this.interactables.splice(idx, 1);
  }

  clearInteractables(): void {
    this.interactables = [];
  }

  onHover(callback: (objectId: string | null) => void): void {
    this.hoverCallback = callback;
  }

  onClick(callback: (objectId: string) => void): void {
    this.clickCallback = callback;
  }

  onDrag(callback: (objectId: string, delta: { x: number; y: number }) => void): void {
    this.dragCallback = callback;
  }

  private updateMouse(x: number, y: number): void {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = ((x - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((y - rect.top) / rect.height) * 2 + 1;
  }

  private raycast(): THREE.Object3D | null {
    if (!this.camera || !this.scene) return null;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactables, true);
    return intersects.length > 0 ? intersects[0].object : null;
  }

  private findInteractableId(obj: THREE.Object3D): string | null {
    let current: THREE.Object3D | null = obj;
    while (current) {
      if (current.userData?.id) return current.userData.id as string;
      current = current.parent;
    }
    return null;
  }

  private onMouseMove(e: MouseEvent): void {
    this.updateMouse(e.clientX, e.clientY);

    const hit = this.raycast();
    const id = hit ? this.findInteractableId(hit) : null;

    if (id !== this.hoveredObjectId) {
      this.hoveredObjectId = id;
      this.hoverCallback?.(id);
    }

    if (this.isDragging && this.dragCallback && this.hoveredObjectId) {
      const delta = {
        x: e.clientX - this.lastMouse.x,
        y: e.clientY - this.lastMouse.y,
      };
      this.dragCallback(this.hoveredObjectId, delta);
    }

    this.lastMouse.x = e.clientX;
    this.lastMouse.y = e.clientY;
  }

  private onMouseDown(e: MouseEvent): void {
    this.isDragging = true;
    this.lastMouse.x = e.clientX;
    this.lastMouse.y = e.clientY;
  }

  private onMouseUp(): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    if (this.hoveredObjectId) {
      this.clickCallback?.(this.hoveredObjectId);
    }
  }

  private onTouchStart(e: TouchEvent): void {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      this.updateMouse(t.clientX, t.clientY);
      this.isDragging = true;
      this.lastMouse.x = t.clientX;
      this.lastMouse.y = t.clientY;
    }
  }

  private onTouchMove(e: TouchEvent): void {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      this.updateMouse(t.clientX, t.clientY);

      const hit = this.raycast();
      const id = hit ? this.findInteractableId(hit) : null;

      if (id !== this.hoveredObjectId) {
        this.hoveredObjectId = id;
        this.hoverCallback?.(id);
      }

      if (this.dragCallback && this.hoveredObjectId) {
        const delta = {
          x: t.clientX - this.lastMouse.x,
          y: t.clientY - this.lastMouse.y,
        };
        this.dragCallback(this.hoveredObjectId, delta);
      }

      this.lastMouse.x = t.clientX;
      this.lastMouse.y = t.clientY;
    }
  }

  private onTouchEnd(): void {
    if (this.hoveredObjectId) {
      this.clickCallback?.(this.hoveredObjectId);
    }
    this.isDragging = false;
  }

  private onKeyDown(e: KeyboardEvent): void {
    // Keyboard navigation support
    if (e.key === "Tab") {
      // Cycle through interactables
      e.preventDefault();
      const currentIdx = this.hoveredObjectId
        ? this.interactables.findIndex(
            (obj) => this.findInteractableId(obj) === this.hoveredObjectId
          )
        : -1;
      const nextIdx = e.shiftKey
        ? (currentIdx - 1 + this.interactables.length) % this.interactables.length
        : (currentIdx + 1) % this.interactables.length;
      const nextObj = this.interactables[nextIdx];
      if (nextObj) {
        this.hoveredObjectId = this.findInteractableId(nextObj);
        this.hoverCallback?.(this.hoveredObjectId);
      }
    } else if (e.key === "Enter" || e.key === " ") {
      if (this.hoveredObjectId) {
        e.preventDefault();
        this.clickCallback?.(this.hoveredObjectId);
      }
    }
  }

  destroy(): void {
    if (this.canvas) {
      Object.entries(this.boundHandlers).forEach(([event, handler]) => {
        this.canvas?.removeEventListener(event, handler);
      });
    }
    window.removeEventListener("keydown", this.boundHandlers.keydown);
    this.interactables = [];
    this.canvas = null;
    this.camera = null;
    this.scene = null;
  }
}

interface InteractionManager {
  init(
    canvas: HTMLCanvasElement,
    camera: THREE.PerspectiveCamera,
    scene: THREE.Scene
  ): void;
  addInteractable(object: THREE.Object3D): void;
  removeInteractable(object: THREE.Object3D): void;
  clearInteractables(): void;
  onHover(callback: (objectId: string | null) => void): void;
  onClick(callback: (objectId: string) => void): void;
  onDrag(
    callback: (objectId: string, delta: { x: number; y: number }) => void
  ): void;
  destroy(): void;
}
