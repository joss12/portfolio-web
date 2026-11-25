'use client';

import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import { useLocale } from 'next-intl';
import * as THREE from 'three';

import {
  Code2,
  Server,
  Monitor,
  Database,
  Cloud,
  Terminal,
  type LucideIcon,
} from 'lucide-react';

type Technology = {
  name: string;
  color: string;
  lightColor: string;
  occasional?: boolean;
};

type Category = {
  id:
    | 'languages'
    | 'backend'
    | 'frontend'
    | 'databases'
    | 'cloud'
    | 'tools';

  icon: LucideIcon;
  color: string;
  lightColor: string;
  technologies: Technology[];
};

const categories: Category[] = [
  {
    id: 'languages',
    icon: Code2,
    color: '#60A5FA',
    lightColor: '#254B9B',

    technologies: [
      {
        name: 'JavaScript',
        color: '#F7DF1E',
        lightColor: '#806000',
      },
      {
        name: 'TypeScript',
        color: '#3178C6',
        lightColor: '#245A96',
      },
      {
        name: 'Go',
        color: '#00ADD8',
        lightColor: '#006C89',
      },
      {
        name: 'Java',
        color: '#F89820',
        lightColor: '#9A500B',
      },
      {
        name: 'C/C++',
        color: '#659AD2',
        lightColor: '#315F91',
        occasional: true,
      },
    ],
  },

  {
    id: 'backend',
    icon: Server,
    color: '#34D399',
    lightColor: '#17634E',

    technologies: [
      {
        name: 'Node.js',
        color: '#83CD29',
        lightColor: '#426B19',
      },
      {
        name: 'Express',
        color: '#E2E8F0',
        lightColor: '#334155',
      },
      {
        name: 'NestJS',
        color: '#E0234E',
        lightColor: '#B31D42',
      },
      {
        name: 'Spring Boot',
        color: '#6DB33F',
        lightColor: '#426E24',
      },
      {
        name: 'Chi',
        color: '#00ADD8',
        lightColor: '#006C89',
      },
      {
        name: 'Fiber',
        color: '#00ACD7',
        lightColor: '#006C89',
      },
      {
        name: 'REST API',
        color: '#A78BFA',
        lightColor: '#6941B5',
      },
      {
        name: 'WebSockets',
        color: '#FBBF24',
        lightColor: '#85530B',
      },
    ],
  },

  {
    id: 'frontend',
    icon: Monitor,
    color: '#A78BFA',
    lightColor: '#6941B5',

    technologies: [
      {
        name: 'HTML',
        color: '#E34F26',
        lightColor: '#A9381D',
      },
      {
        name: 'CSS',
        color: '#60A5FA',
        lightColor: '#254B9B',
      },
      {
        name: 'JavaScript',
        color: '#F7DF1E',
        lightColor: '#806000',
      },
      {
        name: 'React',
        color: '#61DAFB',
        lightColor: '#036B91',
      },
      {
        name: 'Next.js',
        color: '#FFFFFF',
        lightColor: '#18212F',
      },
      {
        name: 'Tailwind CSS',
        color: '#38BDF8',
        lightColor: '#036B91',
      },
    ],
  },

  {
    id: 'databases',
    icon: Database,
    color: '#FBBF24',
    lightColor: '#85530B',

    technologies: [
      {
        name: 'MySQL',
        color: '#60A5FA',
        lightColor: '#254B9B',
      },
      {
        name: 'PostgreSQL',
        color: '#699ECA',
        lightColor: '#315F91',
      },
      {
        name: 'Redis',
        color: '#EF4444',
        lightColor: '#A62E35',
      },
      {
        name: 'SQLite',
        color: '#38BDF8',
        lightColor: '#036B91',
      },
    ],
  },

  {
    id: 'cloud',
    icon: Cloud,
    color: '#38BDF8',
    lightColor: '#285B80',

    technologies: [
      {
        name: 'Render',
        color: '#46E3B7',
        lightColor: '#17634E',
      },
      {
        name: 'AWS',
        color: '#FF9900',
        lightColor: '#92500A',
      },
      {
        name: 'Docker',
        color: '#2496ED',
        lightColor: '#1D5E99',
      },
      {
        name: 'Vercel',
        color: '#FFFFFF',
        lightColor: '#18212F',
      },
      {
        name: 'Nginx',
        color: '#00B140',
        lightColor: '#176B37',
      },
    ],
  },

  {
    id: 'tools',
    icon: Terminal,
    color: '#FB923C',
    lightColor: '#98501C',

    technologies: [
      {
        name: 'Linux',
        color: '#FCC624',
        lightColor: '#806000',
      },
      {
        name: 'Git',
        color: '#F05032',
        lightColor: '#AA3824',
      },
      {
        name: 'NeoVim',
        color: '#57A143',
        lightColor: '#356C2A',
      },
      {
        name: 'Postman',
        color: '#FF6C37',
        lightColor: '#A3411C',
      },
    ],
  },
];

const relationships: Record<string, string[]> = {
  JavaScript: [
    'TypeScript',
    'Node.js',
    'React',
    'Express',
    'Next.js',
  ],

  TypeScript: [
    'JavaScript',
    'Node.js',
    'NestJS',
    'React',
    'Next.js',
  ],

  Go: [
    'Chi',
    'Fiber',
    'REST API',
    'WebSockets',
  ],

  Java: [
    'Spring Boot',
    'REST API',
  ],

  'C/C++': [
    'Linux',
    'NeoVim',
  ],

  'Node.js': [
    'JavaScript',
    'TypeScript',
    'Express',
    'NestJS',
  ],

  Express: [
    'Node.js',
    'JavaScript',
    'REST API',
  ],

  NestJS: [
    'TypeScript',
    'Node.js',
    'REST API',
    'WebSockets',
  ],

  'Spring Boot': [
    'Java',
    'REST API',
    'MySQL',
    'PostgreSQL',
  ],

  Chi: [
    'Go',
    'REST API',
  ],

  Fiber: [
    'Go',
    'REST API',
  ],

  'REST API': [
    'Express',
    'NestJS',
    'Spring Boot',
    'Chi',
    'Fiber',
    'Postman',
  ],

  WebSockets: [
    'Node.js',
    'NestJS',
    'Go',
  ],

  HTML: [
    'CSS',
    'JavaScript',
    'React',
  ],

  CSS: [
    'HTML',
    'Tailwind CSS',
  ],

  React: [
    'JavaScript',
    'TypeScript',
    'Next.js',
    'Tailwind CSS',
  ],

  'Next.js': [
    'React',
    'TypeScript',
    'Vercel',
  ],

  'Tailwind CSS': [
    'CSS',
    'React',
    'Next.js',
  ],

  MySQL: [
    'Spring Boot',
    'Node.js',
    'Go',
  ],

  PostgreSQL: [
    'Spring Boot',
    'Node.js',
    'Go',
  ],

  Redis: [
    'Node.js',
    'Go',
    'Spring Boot',
  ],

  SQLite: [
    'Go',
    'Node.js',
  ],

  Render: [
    'Docker',
    'Node.js',
    'Go',
    'Spring Boot',
  ],

  AWS: [
    'Docker',
    'Linux',
    'Nginx',
  ],

  Docker: [
    'Linux',
    'Nginx',
    'AWS',
    'Render',
  ],

  Vercel: [
    'Next.js',
    'React',
  ],

  Nginx: [
    'Linux',
    'Docker',
    'AWS',
  ],

  Linux: [
    'Docker',
    'Nginx',
    'NeoVim',
    'C/C++',
  ],

  Git: [
    'NeoVim',
    'Render',
    'Vercel',
  ],

  NeoVim: [
    'Linux',
    'Git',
    'Go',
    'C/C++',
  ],

  Postman: [
    'REST API',
    'Express',
    'NestJS',
    'Spring Boot',
  ],
};

const content = {
  en: {
    languages: 'Languages',
    backend: 'Backend',
    frontend: 'Frontend',
    databases: 'Databases',
    cloud: 'Cloud & DevOps',
    tools: 'Developer Tools',
    occasional: 'Occasional use',
  },

  ko: {
    languages: '프로그래밍 언어',
    backend: '백엔드',
    frontend: '프론트엔드',
    databases: '데이터베이스',
    cloud: '클라우드 및 DevOps',
    tools: '개발 도구',
    occasional: '가끔 사용',
  },

  fr: {
    languages: 'Langages',
    backend: 'Backend',
    frontend: 'Frontend',
    databases: 'Bases de données',
    cloud: 'Cloud et DevOps',
    tools: 'Outils de développement',
    occasional: 'Usage occasionnel',
  },
} as const;

type Connection = {
  curve: THREE.CubicBezierCurve3;
  line: THREE.Line;
  packet: THREE.Points;
  speed: number;
  offset: number;
};

function isLightTheme() {
  return document.documentElement.dataset.theme === 'light';
}

function TechnologyConnections() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    const root = container?.parentElement;

    if (!container || !root) return;

    const motion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    if (motion.matches) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.5),
    );

    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      0,
      1,
      1,
      0,
      -10,
      10,
    );

    camera.position.z = 5;

    const connections: Connection[] = [];

    let width = 1;
    let height = 1;

    let frame = 0;
    let visible = false;

    let activeElement: HTMLElement | null = null;
    let lightTheme = isLightTheme();

    let activeDarkColor = '#60A5FA';
    let activeLightColor = '#254B9B';

    let opacity = 0;
    let targetOpacity = 0;
    let previousTime = 0;

    function getActiveColor() {
      return lightTheme
        ? activeLightColor
        : activeDarkColor;
    }

    function clearConnections() {
      for (const connection of connections) {
        scene.remove(connection.line);
        scene.remove(connection.packet);

        connection.line.geometry.dispose();

        (
          connection.line.material as
            THREE.LineBasicMaterial
        ).dispose();

        connection.packet.geometry.dispose();

        (
          connection.packet.material as
            THREE.PointsMaterial
        ).dispose();
      }

      connections.length = 0;
    }

    function updateTheme() {
      const nextTheme = isLightTheme();

      if (nextTheme === lightTheme) return;

      lightTheme = nextTheme;

      const color = getActiveColor();

      for (const connection of connections) {
        const lineMaterial =
          connection.line.material as
            THREE.LineBasicMaterial;

        const packetMaterial =
          connection.packet.material as
            THREE.PointsMaterial;

        lineMaterial.color.set(color);
        packetMaterial.color.set(color);

        packetMaterial.blending = lightTheme
          ? THREE.NormalBlending
          : THREE.AdditiveBlending;

        lineMaterial.opacity =
          opacity * (lightTheme ? 0.20 : 0.25);

        packetMaterial.opacity =
          opacity * (lightTheme ? 0.80 : 0.95);
      }

      renderer.render(scene, camera);
    }

    function getCenter(element: HTMLElement) {
      const bounds = element.getBoundingClientRect();

      const containerBounds =
        container!.getBoundingClientRect();

      return new THREE.Vector3(
        bounds.left -
          containerBounds.left +
          bounds.width / 2,

        height -
          (
            bounds.top -
            containerBounds.top +
            bounds.height / 2
          ),

        0,
      );
    }

    function createConnection(
      source: HTMLElement,
      target: HTMLElement,
      color: string,
      index: number,
    ) {
      const start = getCenter(source);
      const end = getCenter(target);

      const distance = start.distanceTo(end);

      const curvature = Math.min(
        Math.max(distance * 0.16, 18),
        65,
      );

      const direction =
        index % 2 === 0 ? 1 : -1;

      const control1 = new THREE.Vector3(
        start.x + (end.x - start.x) * 0.3,
        start.y + curvature * direction,
        0,
      );

      const control2 = new THREE.Vector3(
        start.x + (end.x - start.x) * 0.7,
        end.y + curvature * direction,
        0,
      );

      const curve = new THREE.CubicBezierCurve3(
        start,
        control1,
        control2,
        end,
      );

      const geometry =
        new THREE.BufferGeometry().setFromPoints(
          curve.getPoints(64),
        );

      const material =
        new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });

      const line = new THREE.Line(
        geometry,
        material,
      );

      line.frustumCulled = false;

      scene.add(line);

      const packetGeometry =
        new THREE.BufferGeometry();

      packetGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(
          [start.x, start.y, 0.1],
          3,
        ),
      );

      const packetMaterial =
        new THREE.PointsMaterial({
          color,
          size: 3,
          transparent: true,
          opacity: 0,
          sizeAttenuation: false,
          depthWrite: false,

          blending: lightTheme
            ? THREE.NormalBlending
            : THREE.AdditiveBlending,
        });

      const packet = new THREE.Points(
        packetGeometry,
        packetMaterial,
      );

      packet.frustumCulled = false;

      scene.add(packet);

      connections.push({
        curve,
        line,
        packet,
        speed: 0.35 + index * 0.035,
        offset: index * 0.17,
      });
    }

    function resetHighlights() {
      root!
        .querySelectorAll<HTMLElement>(
          '[data-technology]',
        )
        .forEach((element) => {
          element.classList.remove(
            'technology-active',
            'technology-related',
            'technology-dimmed',
          );
        });
    }

    function buildConnections(
      source: HTMLElement,
    ) {
      clearConnections();
      resetHighlights();

      const name =
        source.dataset.technology ?? '';

      const related = relationships[name] ?? [];

      activeDarkColor =
        source.dataset.color ?? '#60A5FA';

      activeLightColor =
        source.dataset.lightColor ?? '#254B9B';

      const activeColor = getActiveColor();

      source.classList.add('technology-active');

      const elements = Array.from(
        root!.querySelectorAll<HTMLElement>(
          '[data-technology]',
        ),
      );

      let index = 0;

      for (const element of elements) {
        if (element === source) continue;

        const technology =
          element.dataset.technology ?? '';

        if (
          related.includes(technology) ||
          technology === name
        ) {
          element.classList.add(
            'technology-related',
          );

          createConnection(
            source,
            element,
            activeColor,
            index++,
          );
        } else {
          element.classList.add(
            'technology-dimmed',
          );
        }
      }

      targetOpacity = 1;
    }

    function resize() {
      const bounds =
        container!.getBoundingClientRect();

      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);

      renderer.setSize(width, height, false);

      camera.left = 0;
      camera.right = width;
      camera.top = height;
      camera.bottom = 0;

      camera.updateProjectionMatrix();

      if (activeElement) {
        buildConnections(activeElement);
      }

      renderer.render(scene, camera);
    }

    function animate(time: number) {
      frame = 0;

      if (
        !visible ||
        document.hidden ||
        motion.matches
      ) {
        return;
      }

      const delta = previousTime
        ? Math.min(
            (time - previousTime) / 1000,
            0.05,
          )
        : 0.016;

      previousTime = time;

      opacity = THREE.MathUtils.lerp(
        opacity,
        targetOpacity,
        1 - Math.exp(-delta * 12),
      );

      for (const connection of connections) {
        const lineMaterial =
          connection.line.material as
            THREE.LineBasicMaterial;

        const packetMaterial =
          connection.packet.material as
            THREE.PointsMaterial;

        lineMaterial.opacity =
          opacity * (lightTheme ? 0.20 : 0.25);

        packetMaterial.opacity =
          opacity * (lightTheme ? 0.80 : 0.95);

        const progress =
          (
            time * 0.001 * connection.speed +
            connection.offset
          ) % 1;

        const point =
          connection.curve.getPoint(progress);

        const position =
          connection.packet.geometry.getAttribute(
            'position',
          ) as THREE.BufferAttribute;

        position.setXYZ(
          0,
          point.x,
          point.y,
          0.1,
        );

        position.needsUpdate = true;
      }

      if (
        targetOpacity === 0 &&
        opacity < 0.005
      ) {
        opacity = 0;

        clearConnections();

        renderer.clear();

        previousTime = 0;

        return;
      }

      renderer.render(scene, camera);

      frame = requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (
        frame ||
        !visible ||
        document.hidden ||
        motion.matches
      ) {
        return;
      }

      previousTime = 0;

      frame = requestAnimationFrame(animate);
    }

    function stopAnimation() {
      cancelAnimationFrame(frame);

      frame = 0;
      previousTime = 0;
    }

    function activate(element: HTMLElement) {
      if (
        activeElement === element ||
        motion.matches
      ) {
        return;
      }

      activeElement = element;

      buildConnections(element);

      startAnimation();
    }

    function deactivate() {
      activeElement = null;
      targetOpacity = 0;

      resetHighlights();

      startAnimation();
    }

    function handlePointerOver(
      event: PointerEvent,
    ) {
      if (event.pointerType === 'touch') return;

      if (!(event.target instanceof Element)) {
        return;
      }

      const element =
        event.target.closest<HTMLElement>(
          '[data-technology]',
        );

      if (element) {
        activate(element);
      }
    }

    function handlePointerOut(
      event: PointerEvent,
    ) {
      if (!(event.target instanceof Element)) {
        return;
      }

      const source =
        event.target.closest<HTMLElement>(
          '[data-technology]',
        );

      if (!source) return;

      const next =
        event.relatedTarget instanceof Element
          ? event.relatedTarget.closest<HTMLElement>(
              '[data-technology]',
            )
          : null;

      if (next === source) return;

      if (next && root!.contains(next)) {
        activate(next);
      } else {
        deactivate();
      }
    }

    function handleFocusIn(event: FocusEvent) {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }

      const element =
        event.target.closest<HTMLElement>(
          '[data-technology]',
        );

      if (element) {
        activate(element);
      }
    }

    function handleFocusOut(event: FocusEvent) {
      const next =
        event.relatedTarget instanceof HTMLElement
          ? event.relatedTarget.closest<HTMLElement>(
              '[data-technology]',
            )
          : null;

      if (next && root!.contains(next)) {
        activate(next);
      } else {
        deactivate();
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        stopAnimation();
      } else {
        updateTheme();

        if (connections.length > 0) {
          startAnimation();
        }
      }
    }

    function handleMotionChange() {
      if (motion.matches) {
        stopAnimation();

        activeElement = null;
        opacity = 0;
        targetOpacity = 0;

        resetHighlights();
        clearConnections();

        renderer.clear();
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

    const intersectionObserver =
      new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;

          if (!visible) {
            stopAnimation();
          } else if (connections.length > 0) {
            startAnimation();
          }
        },
        {
          threshold: 0,
        },
      );

    intersectionObserver.observe(root);

    root.addEventListener(
      'pointerover',
      handlePointerOver,
    );

    root.addEventListener(
      'pointerout',
      handlePointerOut,
    );

    root.addEventListener(
      'pointerleave',
      deactivate,
    );

    root.addEventListener(
      'focusin',
      handleFocusIn,
    );

    root.addEventListener(
      'focusout',
      handleFocusOut,
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

    return () => {
      stopAnimation();

      themeObserver.disconnect();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      root.removeEventListener(
        'pointerover',
        handlePointerOver,
      );

      root.removeEventListener(
        'pointerout',
        handlePointerOut,
      );

      root.removeEventListener(
        'pointerleave',
        deactivate,
      );

      root.removeEventListener(
        'focusin',
        handleFocusIn,
      );

      root.removeEventListener(
        'focusout',
        handleFocusOut,
      );

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange,
      );

      motion.removeEventListener(
        'change',
        handleMotionChange,
      );

      resetHighlights();
      clearConnections();

      scene.clear();

      renderer.dispose();

      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      aria-hidden="true"
      className="
        pointer-events-none absolute
        -inset-4 -z-10 overflow-hidden
      "
    />
  );
}

function TechnologyItem({
  technology,
  occasionalLabel,
}: {
  technology: Technology;
  occasionalLabel: string;
}) {
  function handlePointerMove(
    event: ReactPointerEvent<HTMLLIElement>,
  ) {
    if (event.pointerType === 'touch') return;

    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
    ) {
      return;
    }

    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();

    const x =
      event.clientX -
      bounds.left -
      bounds.width / 2;

    const y =
      event.clientY -
      bounds.top -
      bounds.height / 2;

    element.style.setProperty(
      '--magnetic-x',
      `${Math.max(-3, Math.min(3, x * 0.08))}px`,
    );

    element.style.setProperty(
      '--magnetic-y',
      `${Math.max(-3, Math.min(3, y * 0.12))}px`,
    );
  }

  function resetMagnetic(
    event: ReactPointerEvent<HTMLLIElement>,
  ) {
    event.currentTarget.style.setProperty(
      '--magnetic-x',
      '0px',
    );

    event.currentTarget.style.setProperty(
      '--magnetic-y',
      '0px',
    );
  }

  return (
    <li
      data-technology={technology.name}
      data-color={technology.color}
      data-light-color={technology.lightColor}
      tabIndex={0}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetMagnetic}
      title={
        technology.occasional
          ? `${technology.name} — ${occasionalLabel}`
          : technology.name
      }
      className="
        expertise-technology
        relative inline-flex
        cursor-default items-center gap-2
        whitespace-nowrap text-[13px]
        font-medium leading-5
      "
      style={
        {
          '--technology-dark':
            technology.color,

          '--technology-light':
            technology.lightColor,
        } as CSSProperties
      }
    >
      <span
        className="
          expertise-dot h-[5px] w-[5px]
          shrink-0 rounded-full
        "
        aria-hidden="true"
      />

      <span>
        {technology.name}

        {technology.occasional && (
          <sup
            aria-label={occasionalLabel}
            className="
              ml-0.5 text-[11px]
              font-semibold text-warning
            "
          >
            *
          </sup>
        )}
      </span>
    </li>
  );
}

export default function TechnologySphere() {
  const locale = useLocale();

  const rootRef = useRef<HTMLDivElement>(null);

  const language =
    locale === 'ko' || locale === 'fr'
      ? locale
      : 'en';

  const copy = content[language];

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const motion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    if (motion.matches) return;

    const groups =
      root.querySelectorAll<HTMLElement>(
        '.expertise-group',
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            entry.target.classList.add(
              'expertise-visible',
            );

            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 0.1,
        },
      );

    groups.forEach((group) => {
      const bounds = group.getBoundingClientRect();

      if (bounds.top >= window.innerHeight) {
        group.classList.add(
          'expertise-reveal-pending',
        );
      }

      observer.observe(group);
    });

    return () => {
      observer.disconnect();

      groups.forEach((group) => {
        group.classList.remove(
          'expertise-reveal-pending',
          'expertise-visible',
        );
      });
    };
  }, []);

  return (
    <div className="relative isolate pb-8">
      <style>{`
        .expertise-group {
          position: relative;
          min-width: 0;

          --category-color:
            var(--category-dark);

          --category-glow:
            color-mix(
              in srgb,
              var(--category-color) 3.5%,
              transparent
            );
        }

        :root[data-theme='light'] .expertise-group {
          --category-color:
            var(--category-light);

          --category-glow:
            color-mix(
              in srgb,
              var(--category-color) 4%,
              transparent
            );
        }

        .expertise-category-icon {
          color: var(--category-color);
        }

        .expertise-group::before {
          content: '';
          position: absolute;
          inset: -14px;
          z-index: -1;
          pointer-events: none;

          background: radial-gradient(
            ellipse at top left,
            var(--category-glow),
            transparent 75%
          );

          opacity: 0;
          transition: opacity 350ms ease;
        }

        .expertise-group:hover::before {
          opacity: 1;
        }

        .expertise-line {
          position: relative;
          overflow: hidden;
        }

        .expertise-line::before {
          content: '';
          position: absolute;
          inset: 0;

          background: linear-gradient(
            90deg,
            var(--category-color),
            transparent 90%
          );

          opacity: 0.25;
        }

        .expertise-line::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 35%;
          left: -35%;

          background: linear-gradient(
            90deg,
            transparent,
            var(--category-color),
            transparent
          );

          opacity: 0;
        }

        .expertise-group:hover
        .expertise-line::after,
        .expertise-group:focus-within
        .expertise-line::after {
          opacity: 1;

          animation:
            expertise-line-flow
            1.8s ease-in-out infinite;
        }

        @keyframes expertise-line-flow {
          from {
            left: -35%;
          }

          to {
            left: 100%;
          }
        }

        .expertise-technology {
          --magnetic-x: 0px;
          --magnetic-y: 0px;

          --technology-color:
            var(--technology-dark);

          --technology-glow:
            color-mix(
              in srgb,
              var(--technology-color) 27%,
              transparent
            );

          color: var(--text-secondary);

          transform: translate3d(
            var(--magnetic-x),
            var(--magnetic-y),
            0
          );

          transition:
            color 200ms ease,
            opacity 250ms ease,
            transform 250ms ease,
            text-shadow 200ms ease;
        }

        :root[data-theme='light']
        .expertise-technology {
          --technology-color:
            var(--technology-light);

          --technology-glow:
            color-mix(
              in srgb,
              var(--technology-color) 8%,
              transparent
            );
        }

        .expertise-technology:hover,
        .expertise-technology:focus-visible,
        .technology-active,
        .technology-related {
          color: var(--technology-color);

          text-shadow:
            0 0 18px var(--technology-glow);
        }

        .technology-dimmed {
          opacity: 0.55;
        }

        :root[data-theme='light']
        .technology-dimmed {
          opacity: 0.82;
        }

        .expertise-dot {
          background-color:
            var(--technology-color);

          opacity: 0.8;

          transition:
            opacity 200ms ease,
            box-shadow 200ms ease,
            transform 200ms ease;
        }

        .expertise-technology:hover
        .expertise-dot,
        .technology-active
        .expertise-dot,
        .technology-related
        .expertise-dot {
          opacity: 1;

          transform: scale(1.3);

          box-shadow:
            0 0 10px var(--technology-color);
        }

        :root[data-theme='light']
        .expertise-technology:hover
        .expertise-dot,

        :root[data-theme='light']
        .technology-active
        .expertise-dot,

        :root[data-theme='light']
        .technology-related
        .expertise-dot {
          box-shadow:
            0 0 5px var(--technology-glow);
        }

        .expertise-technology:focus-visible {
          outline:
            1px solid var(--technology-color);

          outline-offset: 5px;
          border-radius: 3px;
        }

        .expertise-reveal-pending {
          opacity: 0;
          transform: translateY(12px);
        }

        .expertise-visible {
          animation:
            expertise-reveal
            550ms cubic-bezier(
              0.22, 1, 0.36, 1
            ) both;

          animation-delay:
            var(--reveal-delay);
        }

        @keyframes expertise-reveal {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .expertise-group,
          .expertise-group::before,
          .expertise-line::after,
          .expertise-technology,
          .expertise-dot {
            animation: none !important;
            transition: none !important;
          }

          .expertise-reveal-pending,
          .expertise-visible {
            opacity: 1;
            transform: none;
          }

          .expertise-technology {
            transform: none;
          }

          .technology-dimmed,
          :root[data-theme='light']
          .technology-dimmed {
            opacity: 1;
          }
        }
      `}</style>

      <div
        ref={rootRef}
        className="relative isolate"
      >
        <TechnologyConnections />

        <div
          className="
            grid grid-cols-1
            gap-x-10 gap-y-9
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-12 lg:gap-y-10
          "
        >
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <section
                key={category.id}
                className="expertise-group"
                style={
                  {
                    '--category-dark':
                      category.color,

                    '--category-light':
                      category.lightColor,

                    '--reveal-delay':
                      `${index * 65}ms`,
                  } as CSSProperties
                }
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <Icon
                    size={17}
                    strokeWidth={1.7}
                    className="expertise-category-icon"
                    aria-hidden="true"
                  />

                  <h3
                    className="
                      text-sm font-semibold
                      tracking-tight text-foreground
                    "
                  >
                    {copy[category.id]}
                  </h3>
                </div>

                <div
                  aria-hidden="true"
                  className="
                    expertise-line mb-4
                    h-px w-full bg-border
                  "
                />

                <ul
                  className="
                    flex flex-wrap items-center
                    gap-x-4 gap-y-3
                  "
                >
                  {category.technologies.map(
                    (technology) => (
                      <TechnologyItem
                        key={technology.name}
                        technology={technology}
                        occasionalLabel={
                          copy.occasional
                        }
                      />
                    ),
                  )}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
