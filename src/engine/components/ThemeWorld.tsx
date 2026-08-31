import { Suspense, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import type { PortfolioTheme, EnvironmentObject, ParticleConfig } from "../types";
import type { PortfolioData } from "../../domain/portfolio";
import { ThemeRuntime } from "../ThemeRuntime";

// ============================================================
// SCENE CONTENT
// ============================================================

function SceneContent({
  theme,
  runtime,
  onObjectClick,
  onObjectHover,
}: {
  theme: PortfolioTheme;
  runtime: ThemeRuntime;
  onObjectClick?: (id: string) => void;
  onObjectHover?: (id: string | null) => void;
}) {
  const { scene, camera, gl } = useThree();
  const managers = runtime.getManagers();
  const controlsRef = useRef<any>(null);

  // Initialize managers
  useEffect(() => {
    if (managers.camera && camera instanceof THREE.PerspectiveCamera) {
      managers.camera.init(theme.camera, camera);
    }
    if (managers.interaction && gl.domElement) {
      managers.interaction.init(gl.domElement, camera as THREE.PerspectiveCamera, scene);
      if (onObjectClick) managers.interaction.onClick(onObjectClick);
      if (onObjectHover) managers.interaction.onHover(onObjectHover);
    }
  }, [theme, runtime]);

  // Performance monitoring
  useFrame(() => {
    managers.performance?.recordFrameTime?.();
    managers.camera?.update();
  });

  return (
    <>
      {/* Ambient Light */}
      <ambientLight
        color={theme.environment.ambientLight.color}
        intensity={theme.environment.ambientLight.intensity}
      />

      {/* Directional Lights */}
      {theme.environment.directionalLight.map((light, i) => (
        <directionalLight
          key={i}
          color={light.color}
          intensity={light.intensity}
          position={light.position}
          castShadow={light.castShadow}
        />
      ))}

      {/* Point Lights */}
      {theme.environment.pointLights?.map((light, i) => (
        <pointLight
          key={i}
          color={light.color}
          intensity={light.intensity}
          position={light.position}
          distance={light.distance}
          decay={light.decay}
        />
      ))}

      {/* Environment Objects */}
      {theme.environment.objects.map((obj, i) => (
        <EnvironmentObject key={i} config={obj} />
      ))}

      {/* Floor */}
      <Floor config={theme.environment.floor} />

      {/* Contact Shadows */}
      {managers.performance?.shouldRenderShadows() && (
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4}
        />
      )}

      {/* Particles */}
      {theme.environment.particles && (
        <ParticleSystem config={theme.environment.particles} />
      )}

      {/* Orbit Controls */}
      {theme.camera.orbit?.enabled && (
        <OrbitControls
          ref={controlsRef}
          enableDamping={theme.camera.orbit.enableDamping}
          dampingFactor={theme.camera.orbit.dampingFactor}
          minDistance={theme.camera.orbit.minDistance}
          maxDistance={theme.camera.orbit.maxDistance}
          minPolarAngle={theme.camera.orbit.minPolarAngle}
          maxPolarAngle={theme.camera.orbit.maxPolarAngle}
          autoRotate={theme.camera.orbit.autoRotate}
          autoRotateSpeed={theme.camera.orbit.autoRotateSpeed}
        />
      )}

      {/* Fog */}
      {theme.environment.fog && (
        <fog
          attach="fog"
          args={[theme.environment.fog.color, theme.environment.fog.near, theme.environment.fog.far]}
        />
      )}
    </>
  );
}

// ============================================================
// ENVIRONMENT OBJECT
// ============================================================

function EnvironmentObject({ config }: { config: EnvironmentObject }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    switch (config.type) {
      case "box":
        return new THREE.BoxGeometry(1, 1, 1);
      case "sphere":
        return new THREE.SphereGeometry(0.5, 32, 32);
      case "cylinder":
        return new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
      case "cone":
        return new THREE.ConeGeometry(0.5, 1, 32);
      case "plane":
        return new THREE.PlaneGeometry(1, 1);
      case "torus":
        return new THREE.TorusGeometry(0.5, 0.2, 16, 32);
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [config.type]);

  return (
    <mesh
      ref={meshRef}
      position={config.position}
      rotation={config.rotation}
      scale={config.scale}
      castShadow={config.castShadow}
      receiveShadow={config.receiveShadow}
      userData={{ id: `env-${config.type}-${Math.random().toString(36).slice(2)}` }}
    >
      {geometry && <primitive object={geometry} attach="geometry" />}
      <meshStandardMaterial
        color={config.color}
        metalness={config.metalness ?? 0.5}
        roughness={config.roughness ?? 0.5}
        transparent={config.opacity !== undefined}
        opacity={config.opacity}
        emissive={config.emissive}
        emissiveIntensity={config.emissiveIntensity}
      />
    </mesh>
  );
}

// ============================================================
// FLOOR
// ============================================================

function Floor({ config }: { config: any }) {
  if (config.type === "grid") {
    return (
      <gridHelper
        args={[config.size ?? 20, 20, config.color, config.color]}
        position={[0, 0, 0]}
      />
    );
  }

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[config.size ?? 50, config.size ?? 50]} />
      <meshStandardMaterial
        color={config.color}
        transparent={config.opacity !== undefined}
        opacity={config.opacity}
      />
    </mesh>
  );
}

// ============================================================
// PARTICLE SYSTEM
// ============================================================

function ParticleSystem({ config }: { config: ParticleConfig }) {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const count = config.count;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * config.spread;
      pos[i3 + 1] = Math.random() * config.spread * 0.5;
      pos[i3 + 2] = (Math.random() - 0.5) * config.spread;
      vel[i3] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 1] = Math.random() * 0.01 * config.speed;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    return { positions: pos, velocities: vel };
  }, [config]);

  useFrame(() => {
    if (!particlesRef.current) return;
    const posAttr = particlesRef.current.geometry.attributes.position;
    if (!posAttr) return;

    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += velocities[i];
      arr[i + 1] += velocities[i + 1];
      arr[i + 2] += velocities[i + 2];

      // Reset particle if too high
      if (arr[i + 1] > config.spread * 0.5) {
        arr[i + 1] = 0;
        arr[i] = (Math.random() - 0.5) * config.spread;
        arr[i + 2] = (Math.random() - 0.5) * config.spread;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={config.color}
        size={config.size}
        transparent
        opacity={config.opacity}
        sizeAttenuation
      />
    </points>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function ThemeWorld({
  theme,
  data,
  onObjectClick,
  onObjectHover,
  children,
}: {
  theme: PortfolioTheme;
  data: PortfolioData;
  onObjectClick?: (id: string) => void;
  onObjectHover?: (id: string | null) => void;
  children?: React.ReactNode;
}) {
  const runtimeRef = useRef<ThemeRuntime | null>(null);

  // Create runtime once
  if (!runtimeRef.current) {
    runtimeRef.current = new ThemeRuntime(data);
  }

  useEffect(() => {
    const runtime = runtimeRef.current;
    if (runtime) {
      runtime.loadTheme(theme);
    }
    return () => {
      runtime?.destroy();
      runtimeRef.current = null;
    };
  }, [theme.id]);

  const bgColor = useMemo(() => {
    return new THREE.Color(theme.environment.backgroundColor);
  }, [theme.environment.backgroundColor]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Canvas
        shadows={runtimeRef.current?.getManagers().performance?.shouldRenderShadows()}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
        camera={{
          fov: theme.camera.fov,
          near: theme.camera.near,
          far: theme.camera.far,
          position: theme.camera.initialPosition,
        }}
        style={{ background: bgColor.getStyle() }}
      >
        <Suspense fallback={null}>
          <SceneContent
            theme={theme}
            runtime={runtimeRef.current!}
            onObjectClick={onObjectClick}
            onObjectHover={onObjectHover}
          />
        </Suspense>
      </Canvas>
      {children}
    </div>
  );
}
