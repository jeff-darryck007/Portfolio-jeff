import React, { useEffect, useRef, useMemo } from 'react';
import {
  Scene, PerspectiveCamera, WebGLRenderer, Color,
  Points, BufferGeometry, Float32BufferAttribute, PointsMaterial,
  SphereGeometry, MeshBasicMaterial, InstancedMesh,
  Matrix4, Group, Vector3, AdditiveBlending,
} from 'three';
import gsap from 'gsap';
import './ParticleSphere.css';

/* ─── Config (identique aux défauts Framer) ──────────────── */
const CONFIG = {
  particlesCount : 5000,
  speed          : 0.4,          // [0.1 – 1]
  smoothing      : 0.85,         // [0 – 1]
  scale          : 0.72,         // [0 – 1]  → taille de la sphère
  rotationDir    : 'clockwise',
  drag           : true,
  dragSpeed      : 0.5,
  stopOnHover    : false,
  particleShape  : 'sphere',     // 'sphere' | 'cube'
  particleSize   : 0.32,         // [0.1 – 1]
  cursor: {
    enabled    : true,
    radius     : 110,            // px
    strength   : 0.85,           // [0 – 1]
    clickForce : 6,
  },
  sphereColor: '#444444',        // monochrome accent
};

/* ─── Helpers (portés depuis le source Framer) ───────────── */
function mapLinear(v, inMin, inMax, outMin, outMax) {
  if (inMax === inMin) return outMin;
  return outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin);
}
const mapSpeedToInternal   = ui => mapLinear(ui, 0.1, 1, 0.01, 0.05);
const mapScaleToMultiplier = ui => mapLinear(Math.max(0, Math.min(1, ui)), 0, 1, 0.25, 1.25);
const mapParticleSizeToInt = ui => mapLinear(Math.max(0.1, Math.min(1, ui)), 0.1, 1, 0.01, 0.1);
const mapCursorStrength    = ui => mapLinear(Math.max(0, Math.min(1, ui)), 0, 1, 0, 15);

const CURSOR_PHYSICS = { RETURN_FORCE: 0.015, FRICTION: 0.94 };

/* ═══════════════════════════════════════════════════════════ */
const ParticleSphere = () => {
  const containerRef = useRef(null);

  /* Dérivés des config (identique aux useMemo Framer) */
  const rotationSpeed   = useMemo(() => {
    const base = mapSpeedToInternal(CONFIG.speed);
    return CONFIG.rotationDir === 'anticlockwise' ? -base : base;
  }, []);
  const scaleMultiplier = useMemo(() => mapScaleToMultiplier(CONFIG.scale),       []);
  const particleSize    = useMemo(() => mapParticleSizeToInt(CONFIG.particleSize), []);
  const cursorRadius    = useMemo(() => Math.max(0, Math.min(600, CONFIG.cursor.radius)), []);
  const cursorStrength  = useMemo(() => mapCursorStrength(CONFIG.cursor.strength), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerW = container.clientWidth  || 400;
    const containerH = container.clientHeight || 400;

    /* Canvas 2.5× pour éviter le clipping (technique Framer) */
    const OVF = 2.5;
    const canvasW = containerW * OVF;
    const canvasH = containerH * OVF;
    const offsetX = (canvasW - containerW) / 2;
    const offsetY = (canvasH - containerH) / 2;

    /* ── Scene ── */
    const scene = new Scene();

    /* FOV ajusté pour que la sphère garde la même taille visuelle
       malgré le canvas agrandi (technique Framer) */
    const baseFOV = 50;
    const adjFOV  = 2 * Math.atan(Math.tan(baseFOV * Math.PI / 180 / 2) * OVF) * (180 / Math.PI);
    const camera  = new PerspectiveCamera(adjFOV, canvasW / canvasH, 0.1, 1000);
    const sphereWorldRadius = 1 * scaleMultiplier;
    camera.position.z = Math.max(3, sphereWorldRadius + 1);

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasW, canvasH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = 'srgb';

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.left     = `-${offsetX}px`;
    canvas.style.top      = `-${offsetY}px`;
    canvas.style.width    = `${canvasW}px`;
    canvas.style.height   = `${canvasH}px`;
    canvas.style.display  = 'block';
    container.appendChild(canvas);

    /* ── Particules (distribution Fibonacci) ── */
    const goldenAngle   = Math.PI * (3 - Math.sqrt(5));
    const sphereRadius  = 1 * scaleMultiplier;

    const basePositions    = [];
    const displacements    = [];
    const scatterVelocities = [];
    const vertices         = [];

    const baseColor = new Color(CONFIG.sphereColor);

    for (let i = 0; i < CONFIG.particlesCount; i++) {
      const y      = 1 - (i / (CONFIG.particlesCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta  = goldenAngle * i;
      const x      = Math.cos(theta) * radius;
      const z      = Math.sin(theta) * radius;

      const px = x * sphereRadius;
      const py = y * sphereRadius;
      const pz = z * sphereRadius;

      vertices.push(px, py, pz);
      basePositions.push(new Vector3(px, py, pz));
      displacements.push(new Vector3(0, 0, 0));
      scatterVelocities.push(new Vector3(0, 0, 0));
    }

    /* ── Mesh de particules ── */
    let particles;
    if (CONFIG.particleShape === 'sphere') {
      const sGeo = new SphereGeometry(particleSize * 0.15, 8, 8);
      const sMat = new MeshBasicMaterial({
        color: 0xffffff,
        blending: AdditiveBlending,
        transparent: true,
        opacity: 0.9,
      });
      particles = new InstancedMesh(sGeo, sMat, CONFIG.particlesCount);
      const mat4 = new Matrix4();
      /* Couleur instance : gradient gris foncé -> blanc selon Y */
      const instColors = new Float32Array(CONFIG.particlesCount * 3);
      const cB = new Color('#ffffff');
      for (let i = 0; i < CONFIG.particlesCount; i++) {
        const t = (basePositions[i].y + sphereRadius) / (2 * sphereRadius);
        const c = baseColor.clone().lerp(cB, t);
        instColors[i*3] = c.r; instColors[i*3+1] = c.g; instColors[i*3+2] = c.b;
        mat4.setPosition(vertices[i*3], vertices[i*3+1], vertices[i*3+2]);
        particles.setMatrixAt(i, mat4);
      }
      particles.instanceMatrix.needsUpdate = true;
      particles.instanceColor = new Float32BufferAttribute(instColors, 3);
      particles.instanceColor.needsUpdate = true;
    } else {
      const pGeo = new BufferGeometry();
      pGeo.setAttribute('position', new Float32BufferAttribute(vertices, 3));
      const colors = new Float32Array(CONFIG.particlesCount * 3);
      const cB = new Color('#ffffff');
      for (let i = 0; i < CONFIG.particlesCount; i++) {
        const t = (basePositions[i].y + sphereRadius) / (2 * sphereRadius);
        const c = baseColor.clone().lerp(cB, t);
        colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
      }
      pGeo.setAttribute('color', new Float32BufferAttribute(colors, 3));
      const pMat = new PointsMaterial({
        size: particleSize,
        blending: AdditiveBlending,
        depthTest: false,
        transparent: true,
        opacity: 0.9,
        vertexColors: true,
      });
      particles = new Points(pGeo, pMat);
    }

    const group = new Group();
    group.add(particles);
    scene.add(group);

    /* ── Entrée GSAP ── */
    group.scale.setScalar(0);
    gsap.to(group.scale, {
      x: 1, y: 1, z: 1,
      duration: 2.2,
      ease: 'elastic.out(1, 0.42)',
      delay: 0.3,
    });

    /* ── État rotation (identique Framer) ── */
    const rotation       = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const velocity       = { x: 0, y: 0 };
    let isDragging = false;
    let isHovering = false;
    let lastMouseX = 0, lastMouseY = 0, lastDragTime = 0;

    const TARGET_DT = 1000 / 60;
    let lastFrameTime = performance.now();

    /* lerpFactor identique Framer */
    const lerpFactor   = CONFIG.smoothing === 0 ? 1 : mapLinear(CONFIG.smoothing, 0, 1, 0.4, 0.03);
    const velocityDecay = mapLinear(CONFIG.smoothing, 0, 1, 0.7, 0.96);

    /* Curseur (coordonnées canvas) */
    let mouseCanvas = null; // { x, y } en espace canvas

    /* ── Boucle d'animation ── */
    let rafId = null;
    const mat4u = new Matrix4(); // réutilisé

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const now = performance.now();
      const dt  = now - lastFrameTime;
      lastFrameTime = now;
      const dF = dt / TARGET_DT;   // delta factor

      const THRESH = 0.01;

      /* Auto-rotation */
      if (!isDragging && rotationSpeed !== 0 && (!CONFIG.stopOnHover || !isHovering)) {
        targetRotation.x += rotationSpeed * 0.1 * dF;
      }

      /* Throw velocity */
      if (!isDragging && CONFIG.smoothing > 0) {
        if (Math.abs(velocity.x) > THRESH || Math.abs(velocity.y) > THRESH) {
          targetRotation.x += velocity.x * dF;
          targetRotation.y += velocity.y * dF;
          targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y));
          const decay = Math.pow(velocityDecay, dF);
          velocity.x *= decay;
          velocity.y *= decay;
        } else { velocity.x = 0; velocity.y = 0; }
      }

      /* Lerp rotation */
      const dx = targetRotation.x - rotation.x;
      const dy = targetRotation.y - rotation.y;
      const tLerp = 1 - Math.pow(1 - lerpFactor, dF);
      rotation.x += dx * tLerp;
      rotation.y += dy * tLerp;
      rotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.y));

      group.rotation.y = rotation.x;
      group.rotation.x = rotation.y;
      group.updateMatrixWorld(true);

      /* Dimensions courantes (pour la projection écran) */
      const cW = (container.clientWidth  || 400) * OVF;
      const cH = (container.clientHeight || 400) * OVF;
      const cursorR2 = cursorRadius * cursorRadius;

      /* ── Répulsion curseur (identique Framer) ── */
      if (CONFIG.cursor.enabled) {
        for (let i = 0; i < basePositions.length; i++) {
          const disp = displacements[i];

          if (mouseCanvas) {
            /* Position courante en world space */
            const localPos = new Vector3().copy(basePositions[i]).add(disp);
            const worldPos = localPos.clone().applyMatrix4(group.matrixWorld);

            /* Projection 2D sur le canvas agrandi */
            const proj   = worldPos.clone().project(camera);
            const sx     = (proj.x *  0.5 + 0.5) * cW;
            const sy     = (proj.y * -0.5 + 0.5) * cH;

            const mdx = mouseCanvas.x - sx;
            const mdy = mouseCanvas.y - sy;
            const distSq = mdx * mdx + mdy * mdy;

            if (distSq < cursorR2 && distSq > 0) {
              const dist  = Math.sqrt(distSq);
              const force = (cursorRadius - dist) / cursorRadius;
              const angle = Math.atan2(mdy, mdx);

              /* Vecteurs right/up de la caméra */
              const camRight = new Vector3().setFromMatrixColumn(camera.matrixWorld, 0).normalize();
              const camUp    = new Vector3().setFromMatrixColumn(camera.matrixWorld, 1).normalize();

              const rep2D = force * cursorStrength * CONFIG.speed * dF;
              const repX  = -Math.cos(angle) * rep2D * 0.01;
              const repY  =  Math.sin(angle) * rep2D * 0.01;

              const worldRep = new Vector3()
                .addScaledVector(camRight, repX)
                .addScaledVector(camUp,    repY);

              const invGroup = new Matrix4().copy(group.matrixWorld).invert();
              const localRep = worldRep.clone().applyMatrix4(invGroup);
              disp.add(localRep);
            }
          }

          /* Friction + rappel (toujours actif) */
          const friction    = Math.pow(CURSOR_PHYSICS.FRICTION, dF);
          const returnForce = CURSOR_PHYSICS.RETURN_FORCE * CONFIG.speed * dF;
          disp.multiplyScalar(friction * (1 - returnForce));
        }

        /* Scatter velocities */
        for (let i = 0; i < scatterVelocities.length; i++) {
          const sv   = scatterVelocities[i];
          const disp = displacements[i];
          disp.addScaledVector(sv, dF * 0.1);
          const scatterFriction = Math.pow(0.95, dF);
          const scatterReturn   = CURSOR_PHYSICS.RETURN_FORCE * CONFIG.speed * dF;
          sv.multiplyScalar(scatterFriction * (1 - scatterReturn));
        }

        /* Mise à jour des positions */
        if (CONFIG.particleShape === 'sphere') {
          for (let i = 0; i < basePositions.length; i++) {
            const final = new Vector3().copy(basePositions[i]).add(displacements[i]);
            mat4u.setPosition(final.x, final.y, final.z);
            particles.setMatrixAt(i, mat4u);
          }
          particles.instanceMatrix.needsUpdate = true;
        } else {
          const pos = particles.geometry.attributes.position;
          for (let i = 0; i < basePositions.length; i++) {
            const final = new Vector3().copy(basePositions[i]).add(displacements[i]);
            pos.setXYZ(i, final.x, final.y, final.z);
          }
          pos.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    /* ── Drag ── */
    const onMouseDown = (e) => {
      if (!CONFIG.drag) return;
      isDragging = true;
      velocity.x = velocity.y = 0;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      lastDragTime = performance.now();

      const onMove = (me) => {
        const now2   = performance.now();
        const timeSince = now2 - lastDragTime;
        const sens   = mapLinear(CONFIG.dragSpeed, 0, 1, 0.001, 0.02);
        const ddx    = me.clientX - lastMouseX;
        const ddy    = me.clientY - lastMouseY;
        targetRotation.x += ddx * sens;
        targetRotation.y += ddy * sens;
        targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y));
        if (timeSince > 0) {
          const tn = TARGET_DT / timeSince;
          velocity.x = ddx * sens * 0.3 * tn;
          velocity.y = ddy * sens * 0.3 * tn;
        }
        lastMouseX = me.clientX;
        lastMouseY = me.clientY;
        lastDragTime = now2;
      };
      const onUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup',   onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup',   onUp);
    };
    if (CONFIG.drag) canvas.addEventListener('mousedown', onMouseDown);

    /* ── Curseur → coordonnées canvas ── */
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const lx   = e.clientX - rect.left;
      const ly   = e.clientY - rect.top;
      if (lx >= 0 && lx <= rect.width && ly >= 0 && ly <= rect.height) {
        mouseCanvas = { x: lx + offsetX, y: ly + offsetY };
      } else { mouseCanvas = null; }
      if (CONFIG.stopOnHover) {
        isHovering = lx >= 0 && lx <= rect.width && ly >= 0 && ly <= rect.height;
      }
    };
    const onMouseLeave = () => { mouseCanvas = null; isHovering = false; };

    /* ── Touch ── */
    const onTouchMove = (e) => {
      e.preventDefault();
      const t    = e.touches[0];
      const rect = container.getBoundingClientRect();
      const lx   = t.clientX - rect.left;
      const ly   = t.clientY - rect.top;
      if (lx >= 0 && lx <= rect.width && ly >= 0 && ly <= rect.height) {
        mouseCanvas = { x: lx + offsetX, y: ly + offsetY };
      } else { mouseCanvas = null; }
    };
    const onTouchEnd = () => { mouseCanvas = null; };

    /* ── Click scatter ── */
    const onClick = (e) => {
      if (!CONFIG.cursor.enabled || !CONFIG.cursor.clickForce) return;
      group.updateMatrixWorld(true);
      const rect = container.getBoundingClientRect();
      const cx   = e.clientX - rect.left + offsetX;
      const cy   = e.clientY - rect.top  + offsetY;
      const cW2  = (container.clientWidth  || 400) * OVF;
      const cH2  = (container.clientHeight || 400) * OVF;

      const ndcX = cx / cW2 * 2 - 1;
      const ndcY = 1 - cy / cH2 * 2;

      const ray3 = new Vector3(ndcX, ndcY, 0.5).unproject(camera);
      const camW = new Vector3().setFromMatrixPosition(camera.matrixWorld);
      const dir  = ray3.sub(camW).normalize();
      const sph  = new Vector3(0, 0, 0);
      const dist = camW.clone().negate().dot(sph.clone().sub(camW).add(dir)) / dir.dot(dir);
      const clickWorld = camW.clone().addScaledVector(dir, dist < 0 ? camera.position.z : dist);

      const cursorR2 = cursorRadius * cursorRadius;
      for (let i = 0; i < basePositions.length; i++) {
        const lPos    = new Vector3().copy(basePositions[i]).add(displacements[i]);
        const wPos    = lPos.clone().applyMatrix4(group.matrixWorld);
        const proj    = wPos.clone().project(camera);
        const sx      = (proj.x *  0.5 + 0.5) * cW2;
        const sy      = (proj.y * -0.5 + 0.5) * cH2;
        const ddx     = cx - sx;
        const ddy     = cy - sy;
        const distSq  = ddx * ddx + ddy * ddy;
        if (distSq < cursorR2 && distSq > 0) {
          const screenDist = Math.sqrt(distSq);
          const force = (cursorRadius - screenDist) / cursorRadius * CONFIG.cursor.clickForce;
          const radDir = wPos.clone().sub(clickWorld);
          const rLen   = radDir.length();
          if (rLen > 0.001) {
            radDir.normalize();
            const worldScat = radDir.multiplyScalar(force * 0.5);
            const inv       = new Matrix4().copy(group.matrixWorld).invert();
            const localScat = worldScat.clone().applyMatrix4(inv);
            scatterVelocities[i].add(localScat);
          }
        }
      }
    };

    if (CONFIG.cursor.enabled) {
      canvas.addEventListener('mousemove',  onMouseMove);
      canvas.addEventListener('mouseleave', onMouseLeave);
      canvas.addEventListener('click',      onClick);
      canvas.addEventListener('touchmove',  onTouchMove,  { passive: false });
      canvas.addEventListener('touchstart', (e) => { e.preventDefault(); }, { passive: false });
      canvas.addEventListener('touchend',   onTouchEnd);
      canvas.addEventListener('touchcancel',onTouchEnd);
    }

    /* ── Resize ── */
    const onResize = () => {
      const nW = container.clientWidth  || 400;
      const nH = container.clientHeight || 400;
      const ncW = nW * OVF;
      const ncH = nH * OVF;
      const nOX = (ncW - nW) / 2;
      const nOY = (ncH - nH) / 2;
      camera.aspect = ncW / ncH;
      camera.updateProjectionMatrix();
      renderer.setSize(ncW, ncH);
      canvas.style.left   = `-${nOX}px`;
      canvas.style.top    = `-${nOY}px`;
      canvas.style.width  = `${ncW}px`;
      canvas.style.height = `${ncH}px`;
      renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    window.addEventListener('resize', onResize);

    /* ── Cleanup ── */
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', onResize);
      if (CONFIG.drag)   canvas.removeEventListener('mousedown',  onMouseDown);
      if (CONFIG.cursor.enabled) {
        canvas.removeEventListener('mousemove',  onMouseMove);
        canvas.removeEventListener('mouseleave', onMouseLeave);
        canvas.removeEventListener('click',      onClick);
        canvas.removeEventListener('touchmove',  onTouchMove);
        canvas.removeEventListener('touchend',   onTouchEnd);
        canvas.removeEventListener('touchcancel',onTouchEnd);
      }
      if (container.contains(canvas)) container.removeChild(canvas);
      renderer.dispose();
      if (particles.geometry) particles.geometry.dispose();
      if (particles.material) {
        Array.isArray(particles.material)
          ? particles.material.forEach(m => m.dispose())
          : particles.material.dispose();
      }
    };
  }, [rotationSpeed, scaleMultiplier, particleSize, cursorRadius, cursorStrength]);

  return (
    <div
      ref={containerRef}
      className="particle-sphere"
      style={{ position: 'relative', overflow: 'visible' }}
    />
  );
};

export default ParticleSphere;
