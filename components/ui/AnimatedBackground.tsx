'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform float uAspect;
  uniform float uActivity;
  uniform float uGravity;
  uniform float uScroll;
  uniform float uTheme;

  uniform vec2 uMouse;
  uniform vec2 uVelocity;
  uniform vec4 uImpulses[4];

  attribute vec3 aSeed;
  attribute float aEnd;

  varying vec3 vColor;
  varying float vAlpha;

  #define TAU 6.28318530718

  mat2 rotation(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat2(c, -s, s, c);
  }

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;

    return fract(
      p.x * p.y * p.z *
      (p.x + p.y + p.z)
    );
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(
        mix(
          hash(i + vec3(0, 0, 0)),
          hash(i + vec3(1, 0, 0)),
          f.x
        ),
        mix(
          hash(i + vec3(0, 1, 0)),
          hash(i + vec3(1, 1, 0)),
          f.x
        ),
        f.y
      ),
      mix(
        mix(
          hash(i + vec3(0, 0, 1)),
          hash(i + vec3(1, 0, 1)),
          f.x
        ),
        mix(
          hash(i + vec3(0, 1, 1)),
          hash(i + vec3(1, 1, 1)),
          f.x
        ),
        f.y
      ),
      f.z
    );
  }

  vec3 field(vec3 seed, float time) {
    float radius =
      0.25 + pow(seed.x, 0.65) * 2.8;

    float angle =
      seed.y * TAU +
      time * (0.13 + 0.15 / radius);

    float height =
      (seed.z - 0.5) * 0.85;

    float spiral =
      radius * 1.8 +
      sin(time * 0.12) * 0.5;

    angle += spiral;

    vec3 p = vec3(
      cos(angle) * radius,
      height,
      sin(angle) * radius
    );

    float distortion = noise(
      p * 1.4 + vec3(0.0, time * 0.12, 0.0)
    );

    p.y +=
      sin(angle * 2.0 + radius * 1.6) *
      0.32;

    p.y +=
      (distortion - 0.5) * 0.7;

    p.xz *=
      1.0 +
      sin(radius * 3.0 - time * 0.3) *
      0.08;

    p.yz = rotation(0.65) * p.yz;

    p.xy = rotation(
      -0.38 +
      sin(time * 0.1) * 0.08 +
      uScroll * 0.45
    ) * p.xy;

    return p;
  }

  vec2 distort(
    vec2 p,
    out float illumination
  ) {
    vec2 mouse = uMouse;

    mouse.x *= uAspect;

    vec2 offset = p - mouse;

    float distanceToMouse =
      length(offset);

    float influence = exp(
      -distanceToMouse *
      distanceToMouse *
      2.6
    ) * uActivity;

    float gravity =
      influence *
      (0.35 + uGravity * 0.8);

    float twist =
      influence *
      (1.6 + uGravity * 4.0);

    offset = rotation(twist) * offset;

    offset *=
      1.0 - gravity * 0.55;

    p = mix(
      p,
      mouse + offset,
      influence
    );

    vec2 velocity = uVelocity;

    velocity.x *= uAspect;

    p +=
      velocity *
      influence *
      0.10;

    illumination =
      influence *
      (0.5 + uGravity * 0.7);

    // Expanding energy impulses.

    for (int i = 0; i < 4; i++) {
      vec4 impulse = uImpulses[i];

      float age = uTime - impulse.z;

      if (
        impulse.w > 0.0 &&
        age >= 0.0 &&
        age < 3.0
      ) {
        vec2 origin = impulse.xy;

        origin.x *= uAspect;

        vec2 direction = p - origin;

        float d = length(direction);

        float radius = age * 0.85;

        float waveDistance =
          d - radius;

        float envelope = exp(
          -waveDistance *
          waveDistance *
          48.0
        );

        float decay =
          pow(1.0 - age / 3.0, 2.0);

        float wave =
          sin(waveDistance * 24.0) *
          envelope *
          decay;

        p +=
          normalize(direction + vec2(0.00001)) *
          wave *
          0.19;

        illumination +=
          envelope * decay * 0.9;
      }
    }

    return p;
  }

  vec3 darkPalette(
    float seed,
    float illumination,
    float pulse
  ) {
    vec3 graphite =
      vec3(0.18, 0.27, 0.40);

    vec3 cobalt =
      vec3(0.22, 0.45, 0.92);

    vec3 silver =
      vec3(0.65, 0.78, 0.96);

    vec3 white =
      vec3(0.93, 0.97, 1.0);

    vec3 color = mix(
      graphite,
      cobalt,
      smoothstep(0.0, 0.65, seed)
    );

    color = mix(
      color,
      silver,
      smoothstep(0.55, 1.0, seed)
    );

    color = mix(
      color,
      white,
      clamp(
        illumination * 0.6 + pulse * 0.35,
        0.0,
        0.9
      )
    );

    return color;
  }

  vec3 titaniumPalette(
    float seed,
    float illumination,
    float pulse
  ) {
    vec3 graphite =
      vec3(0.16, 0.21, 0.29);

    vec3 steel =
      vec3(0.31, 0.39, 0.49);

    vec3 slate =
      vec3(0.43, 0.51, 0.60);

    vec3 cobalt =
      vec3(0.12, 0.24, 0.48);

    vec3 color = mix(
      graphite,
      steel,
      smoothstep(0.0, 0.65, seed)
    );

    color = mix(
      color,
      slate,
      smoothstep(0.55, 1.0, seed)
    );

    color = mix(
      color,
      cobalt,
      clamp(
        illumination * 0.55 + pulse * 0.2,
        0.0,
        0.85
      )
    );

    return color;
  }

  void main() {
    float time = uTime * 0.45;

    float trailLength =
      0.04 + aSeed.z * 0.18;

    vec3 p = field(
      aSeed,
      time - aEnd * trailLength
    );

    float depth =
      1.0 / (1.0 + p.z * 0.17);

    vec2 projected =
      p.xy * depth * 0.72;

    // Preserve the existing asymmetrical composition.

    projected.x += uAspect * 0.20;
    projected.y -= 0.10;

    float illumination = 0.0;

    projected = distort(
      projected,
      illumination
    );

    float composition = mix(
      0.28,
      1.0,
      smoothstep(
        -uAspect * 0.8,
        uAspect * 0.55,
        projected.x
      )
    );

    float pulse = pow(
      0.5 + 0.5 * sin(
        aSeed.y * 35.0 -
        uTime * 0.65 +
        aSeed.x * 8.0
      ),
      9.0
    );

    float shimmer =
      0.65 + 0.35 * sin(
        uTime * 0.8 +
        aSeed.z * 40.0
      );

    vec3 darkColor = darkPalette(
      aSeed.z,
      illumination,
      pulse
    );

    vec3 lightColor = titaniumPalette(
      aSeed.z,
      illumination,
      pulse
    );

    float depthFade =
      clamp(depth * 0.7, 0.3, 1.0);

    float tailFade =
      mix(1.0, 0.015, aEnd);

    float darkAlpha =
      0.13 +
      pulse * 0.15 +
      illumination * 0.32;

    float lightAlpha =
      0.075 +
      pulse * 0.075 +
      illumination * 0.19;

    // Keep the text-heavy left side quieter in light mode.

    float lightComposition = mix(
      0.16,
      0.85,
      smoothstep(
        -uAspect * 0.55,
        uAspect * 0.65,
        projected.x
      )
    );

    vColor = mix(
      darkColor,
      lightColor,
      uTheme
    );

    vAlpha =
      mix(darkAlpha, lightAlpha, uTheme) *
      mix(composition, lightComposition, uTheme) *
      depthFade *
      shimmer *
      tailFade;

    gl_Position = vec4(
      projected.x / uAspect,
      projected.y,
      0.0,
      1.0
    );
  }
`;

const fragmentShader = `
  uniform float uTheme;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float maxAlpha = mix(
      0.85,
      0.42,
      uTheme
    );

    gl_FragColor = vec4(
      vColor,
      clamp(vAlpha, 0.0, maxAlpha)
    );
  }
`;

const glowVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position = vec4(
      position.xy,
      0.0,
      1.0
    );
  }
`;

const glowFragmentShader = `
  uniform float uAspect;
  uniform float uActivity;
  uniform float uGravity;
  uniform float uTheme;

  uniform vec2 uMouse;

  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;

    p.x *= uAspect;

    vec2 mouse = uMouse;

    mouse.x *= uAspect;

    float d = length(p - mouse);

    float halo = exp(
      -d * d * 9.0
    );

    float ringDistance = d - 0.25;

    float ring = exp(
      -ringDistance *
      ringDistance *
      180.0
    );

    float darkAlpha =
      halo *
      uActivity *
      (0.025 + uGravity * 0.055);

    darkAlpha +=
      ring *
      uGravity *
      0.025;

    float lightAlpha =
      halo *
      uActivity *
      (0.012 + uGravity * 0.025);

    lightAlpha +=
      ring *
      uGravity *
      0.012;

    vec3 darkColor =
      vec3(0.22, 0.42, 0.85);

    vec3 lightColor =
      vec3(0.16, 0.29, 0.49);

    gl_FragColor = vec4(
      mix(darkColor, lightColor, uTheme),
      mix(darkAlpha, lightAlpha, uTheme)
    );
  }
`;

function createGeometry(count: number) {
  const vertexCount = count * 2;

  const positions =
    new Float32Array(vertexCount * 3);

  const seeds =
    new Float32Array(vertexCount * 3);

  const ends =
    new Float32Array(vertexCount);

  for (let i = 0; i < count; i++) {
    const x = Math.random();
    const y = Math.random();
    const z = Math.random();

    const offset = i * 6;

    seeds[offset] = x;
    seeds[offset + 1] = y;
    seeds[offset + 2] = z;

    seeds[offset + 3] = x;
    seeds[offset + 4] = y;
    seeds[offset + 5] = z;

    ends[i * 2] = 0;
    ends[i * 2 + 1] = 1;
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3),
  );

  geometry.setAttribute(
    'aSeed',
    new THREE.BufferAttribute(seeds, 3),
  );

  geometry.setAttribute(
    'aEnd',
    new THREE.BufferAttribute(ends, 1),
  );

  return geometry;
}

function isLightTheme(): boolean {
  return document.documentElement.dataset.theme === 'light';
}

export default function AnimatedBackground() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const mobile = window.innerWidth < 768;

    const motion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const particleCount = mobile
      ? 10000
      : 36000;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -1,
      1,
      1,
      -1,
      0.1,
      10,
    );

    camera.position.z = 2;

    const impulses = Array.from(
      { length: 4 },
      () => new THREE.Vector4(0, 0, -100, 0),
    );

    const initialLightTheme = isLightTheme();

    const uniforms = {
      uTime: { value: 0 },
      uAspect: { value: 1 },

      uActivity: { value: 0 },
      uGravity: { value: 0 },
      uScroll: { value: 0 },

      uTheme: {
        value: initialLightTheme ? 1 : 0,
      },

      uMouse: {
        value: new THREE.Vector2(),
      },

      uVelocity: {
        value: new THREE.Vector2(),
      },

      uImpulses: {
        value: impulses,
      },
    };

    const initialBlending = initialLightTheme
      ? THREE.NormalBlending
      : THREE.AdditiveBlending;

    // Gravitational illumination.

    const glowGeometry =
      new THREE.PlaneGeometry(2, 2);

    const glowMaterial =
      new THREE.ShaderMaterial({
        uniforms,

        vertexShader: glowVertexShader,
        fragmentShader: glowFragmentShader,

        transparent: true,

        depthTest: false,
        depthWrite: false,

        blending: initialBlending,
      });

    const glow = new THREE.Mesh(
      glowGeometry,
      glowMaterial,
    );

    glow.frustumCulled = false;
    glow.renderOrder = 0;

    scene.add(glow);

    // GPU-generated spatial particle field.

    const geometry =
      createGeometry(particleCount);

    const material =
      new THREE.ShaderMaterial({
        uniforms,

        vertexShader,
        fragmentShader,

        transparent: true,

        depthTest: false,
        depthWrite: false,

        blending: initialBlending,
      });

    const field = new THREE.LineSegments(
      geometry,
      material,
    );

    field.frustumCulled = false;
    field.renderOrder = 1;

    scene.add(field);

    const pointer = new THREE.Vector2();

    const previousPointer =
      new THREE.Vector2();

    const smoothPointer =
      new THREE.Vector2();

    const velocity =
      new THREE.Vector2();

    const smoothVelocity =
      new THREE.Vector2();

    let width = 1;
    let height = 1;

    let elapsed = 0;
    let lastTime = 0;

    let frame = 0;

    let impulseIndex = 0;

    let pointerActive = false;

    let targetActivity = 0;
    let targetGravity = 0;
    let targetScroll = 0;

    let pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      mobile ? 1 : 1.5,
    );

    let slowFrames = 0;

    // Update the existing materials without recreating
    // the renderer, geometry or animation.

    function updateTheme() {
      const light = isLightTheme();

      const nextTheme = light ? 1 : 0;

      if (uniforms.uTheme.value === nextTheme) {
        return;
      }

      uniforms.uTheme.value = nextTheme;

      const blending = light
        ? THREE.NormalBlending
        : THREE.AdditiveBlending;

      material.blending = blending;
      glowMaterial.blending = blending;

      renderer.render(scene, camera);
    }

    function resize() {
      width = Math.max(
        container!.clientWidth,
        1,
      );

      height = Math.max(
        container!.clientHeight,
        1,
      );

      renderer.setPixelRatio(pixelRatio);

      renderer.setSize(
        width,
        height,
        false,
      );

      uniforms.uAspect.value =
        width / height;

      renderer.render(scene, camera);
    }

    function updatePointer(event: PointerEvent) {
      pointer.set(
        event.clientX / width * 2 - 1,
        1 - event.clientY / height * 2,
      );
    }

    function handlePointerMove(event: PointerEvent) {
      if (motion.matches) return;

      updatePointer(event);

      if (!pointerActive) {
        previousPointer.copy(pointer);
        smoothPointer.copy(pointer);

        pointerActive = true;
      }

      velocity
        .copy(pointer)
        .sub(previousPointer)
        .multiplyScalar(15)
        .clampLength(0, 2.5);

      previousPointer.copy(pointer);

      targetActivity = 1;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        motion.matches ||
        event.button !== 0
      ) {
        return;
      }

      const target = event.target;

      if (
        target instanceof Element &&
        target.closest(
          'a, button, input, textarea, select, label, [role="button"], [contenteditable="true"]',
        )
      ) {
        return;
      }

      updatePointer(event);

      smoothPointer.copy(pointer);
      previousPointer.copy(pointer);

      pointerActive = true;

      targetActivity = 1;
      targetGravity = 1;

      impulses[impulseIndex].set(
        pointer.x,
        pointer.y,
        elapsed,
        1,
      );

      impulseIndex =
        (impulseIndex + 1) % impulses.length;
    }

    function handlePointerUp(event: PointerEvent) {
      targetGravity = 0;

      if (event.pointerType === 'touch') {
        resetPointer();
      }
    }

    function resetPointer() {
      pointerActive = false;

      targetActivity = 0;
      targetGravity = 0;

      velocity.set(0, 0);
    }

    function handlePointerOut(event: PointerEvent) {
      if (!event.relatedTarget) {
        resetPointer();
      }
    }

    function handleScroll() {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight -
          window.innerHeight,
        1,
      );

      targetScroll = THREE.MathUtils.clamp(
        window.scrollY / maxScroll,
        0,
        1,
      );
    }

    function animate(now: number) {
      frame = 0;

      if (document.hidden || motion.matches) {
        return;
      }

      frame = requestAnimationFrame(animate);

      const interval = mobile
        ? 1000 / 30
        : 1000 / 60;

      if (
        lastTime &&
        now - lastTime < interval - 1
      ) {
        return;
      }

      const rawDelta = lastTime
        ? (now - lastTime) / 1000
        : 0.016;

      const delta = Math.min(rawDelta, 0.05);

      lastTime = now;

      elapsed += delta;

      // Adaptive rendering resolution.

      if (rawDelta > (mobile ? 0.05 : 0.028)) {
        slowFrames++;
      } else {
        slowFrames = Math.max(
          0,
          slowFrames - 1,
        );
      }

      if (
        slowFrames > 90 &&
        pixelRatio > 0.75
      ) {
        pixelRatio = Math.max(
          0.75,
          pixelRatio - 0.25,
        );

        slowFrames = 0;

        resize();
      }

      smoothPointer.lerp(
        pointer,
        1 - Math.exp(-delta * 8),
      );

      smoothVelocity.lerp(
        velocity,
        1 - Math.exp(-delta * 5),
      );

      velocity.multiplyScalar(
        Math.exp(-delta * 6),
      );

      uniforms.uTime.value = elapsed;

      uniforms.uMouse.value.copy(
        smoothPointer,
      );

      uniforms.uVelocity.value.copy(
        smoothVelocity,
      );

      uniforms.uActivity.value =
        THREE.MathUtils.lerp(
          uniforms.uActivity.value,
          targetActivity,
          1 - Math.exp(-delta * 3),
        );

      uniforms.uGravity.value =
        THREE.MathUtils.lerp(
          uniforms.uGravity.value,
          targetGravity,
          1 - Math.exp(-delta * 4),
        );

      uniforms.uScroll.value =
        THREE.MathUtils.lerp(
          uniforms.uScroll.value,
          targetScroll,
          1 - Math.exp(-delta * 2),
        );

      renderer.render(scene, camera);
    }

    function stopAnimation() {
      cancelAnimationFrame(frame);

      frame = 0;
      lastTime = 0;
    }

    function startAnimation() {
      if (
        frame ||
        document.hidden ||
        motion.matches
      ) {
        return;
      }

      lastTime = 0;

      frame = requestAnimationFrame(animate);
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        stopAnimation();
        resetPointer();
      } else {
        updateTheme();
        startAnimation();
      }
    }

    function handleMotionChange() {
      if (motion.matches) {
        stopAnimation();
        resetPointer();

        uniforms.uActivity.value = 0;
        uniforms.uGravity.value = 0;

        uniforms.uVelocity.value.set(0, 0);

        smoothVelocity.set(0, 0);

        for (const impulse of impulses) {
          impulse.set(0, 0, -100, 0);
        }

        renderer.render(scene, camera);
      } else {
        startAnimation();
      }
    }



    const themeObserver =
      new MutationObserver(updateTheme);

    themeObserver.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ['data-theme'],
      },
    );

    const resizeObserver =
      new ResizeObserver(resize);

    resizeObserver.observe(container);

    window.addEventListener(
      'pointermove',
      handlePointerMove,
      { passive: true },
    );

    window.addEventListener(
      'pointerdown',
      handlePointerDown,
      { passive: true },
    );

    window.addEventListener(
      'pointerup',
      handlePointerUp,
      { passive: true },
    );

    window.addEventListener(
      'pointercancel',
      resetPointer,
    );

    window.addEventListener(
      'pointerout',
      handlePointerOut,
    );

    window.addEventListener(
      'blur',
      resetPointer,
    );

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true },
    );

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange,
    );

    motion.addEventListener(
      'change',
      handleMotionChange,
    );

    resize();

    handleScroll();

    updateTheme();

    startAnimation();

    return () => {
      stopAnimation();

      themeObserver.disconnect();
      resizeObserver.disconnect();

      window.removeEventListener(
        'pointermove',
        handlePointerMove,
      );

      window.removeEventListener(
        'pointerdown',
        handlePointerDown,
      );

      window.removeEventListener(
        'pointerup',
        handlePointerUp,
      );

      window.removeEventListener(
        'pointercancel',
        resetPointer,
      );

      window.removeEventListener(
        'pointerout',
        handlePointerOut,
      );

      window.removeEventListener(
        'blur',
        resetPointer,
      );

      window.removeEventListener(
        'scroll',
        handleScroll,
      );

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange,
      );

      motion.removeEventListener(
        'change',
        handleMotionChange,
      );

      geometry.dispose();
      material.dispose();

      glowGeometry.dispose();
      glowMaterial.dispose();

      scene.clear();

      renderer.dispose();

      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed inset-0 -z-10
        overflow-hidden
      "
    >
      <div
        ref={containerRef}
        className="absolute inset-0"
      />
    </div>
  );
}
