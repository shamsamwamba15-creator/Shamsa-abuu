import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  interactive?: boolean;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [themeMode, setThemeMode] = useState<'sage' | 'champagne' | 'ivory'>('sage');
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const themeRef = useRef(themeMode);
  themeRef.current = themeMode;
  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect Software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Scene & Camera Setup (Luminous Warm Fog)
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfbf8f2, 0.022);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Lighting: Warm Candlelight & Soft Sage/Champagne Fill
    const ambientLight = new THREE.AmbientLight(0xfdfaf5, 0.95);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xd7c6a9, 0xdfe8df, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ea, 1.5);
    keyLight.position.set(6, 10, 8);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xbcc8bc, 0.7);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    const warmAccentLight = new THREE.PointLight(0xd7c6a9, 1.4, 24);
    warmAccentLight.position.set(0, 2, 5);
    scene.add(warmAccentLight);

    // 5. Procedural 3D Cream Hanging Drapes Backdrop (Flowing Silk/Velvet)
    const drapesGroup = new THREE.Group();
    drapesGroup.position.set(0, 0, -1);

    // Material: Lustrous Soft Cream Silk Fabric
    const creamFabricMat = new THREE.MeshStandardMaterial({
      color: 0xfcf9f2,
      roughness: 0.62,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });

    const champagneTieMat = new THREE.MeshStandardMaterial({
      color: 0xd7c6a9,
      roughness: 0.28,
      metalness: 0.75,
    });

    // Helper to generate a pleated, flowing curtain mesh
    const createCurtainGeometry = (
      width: number,
      height: number,
      segsX: number,
      segsY: number,
      side: 'left' | 'right' | 'center'
    ) => {
      const geo = new THREE.PlaneGeometry(width, height, segsX, segsY);
      const pos = geo.attributes.position;

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);

        // Normalize vertical position from top (1) to bottom (0)
        const normY = (y + height / 2) / height;

        // Rich vertical rhythmic pleating folds
        const pleatFreq = 4.5;
        let zFold = Math.sin(x * pleatFreq) * 0.45;
        zFold += Math.cos(x * 9.0) * 0.15;

        // Subtle billowing curve
        zFold += Math.sin(normY * Math.PI) * 0.35;

        // If side curtain, give subtle pull-back / cinch towards side
        let newX = x;
        if (side === 'left') {
          // gather slightly inwards at waist then sweep out
          const waistDip = Math.sin(normY * Math.PI) * 0.5;
          newX = x + waistDip * 0.4;
        } else if (side === 'right') {
          const waistDip = Math.sin(normY * Math.PI) * 0.5;
          newX = x - waistDip * 0.4;
        }

        pos.setX(i, newX);
        pos.setZ(i, zFold);
      }

      geo.computeVertexNormals();
      return geo;
    };

    // Helper to generate the top curved valance / swag
    const createSwagGeometry = (span: number, depth: number, segsX: number, segsY: number) => {
      const geo = new THREE.PlaneGeometry(span, depth, segsX, segsY);
      const pos = geo.attributes.position;

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);

        const normX = x / (span / 2); // -1 to +1
        // parabolic drape curve: drops lower in center
        const sag = (1 - normX * normX) * 1.4;

        // Folds along the swag
        const swagFolds = Math.sin(y * 8 + normX * 3) * 0.35;

        pos.setY(i, y - sag);
        pos.setZ(i, swagFolds + (1 - Math.abs(normX)) * 0.6);
      }

      geo.computeVertexNormals();
      return geo;
    };

    // 5a. Top Swag 1 (Upper central arch)
    const swag1Geo = createSwagGeometry(12, 2.2, 48, 24);
    const swag1 = new THREE.Mesh(swag1Geo, creamFabricMat);
    swag1.position.set(0, 5.2, 0);
    drapesGroup.add(swag1);

    // 5b. Top Swag 2 (Secondary lower layered tier)
    const swag2Geo = createSwagGeometry(9, 1.8, 40, 20);
    const swag2 = new THREE.Mesh(swag2Geo, creamFabricMat);
    swag2.position.set(0, 4.2, 0.25);
    drapesGroup.add(swag2);

    // 5c. Left Cascading Side Drape
    const leftDrapeGeo = createCurtainGeometry(3.8, 13.5, 36, 40, 'left');
    const leftDrape = new THREE.Mesh(leftDrapeGeo, creamFabricMat);
    leftDrape.position.set(-5.6, -0.6, -0.3);
    drapesGroup.add(leftDrape);

    // 5d. Right Cascading Side Drape
    const rightDrapeGeo = createCurtainGeometry(3.8, 13.5, 36, 40, 'right');
    const rightDrape = new THREE.Mesh(rightDrapeGeo, creamFabricMat);
    rightDrape.position.set(5.6, -0.6, -0.3);
    drapesGroup.add(rightDrape);

    // 5e. Elegant Champagne Gold Tie-Back Cords/Bands
    const tieRingGeo = new THREE.TorusGeometry(0.55, 0.08, 16, 32);

    const leftTie = new THREE.Mesh(tieRingGeo, champagneTieMat);
    leftTie.position.set(-5.4, 0.4, 0.35);
    leftTie.rotation.y = Math.PI / 6;
    drapesGroup.add(leftTie);

    const rightTie = new THREE.Mesh(tieRingGeo, champagneTieMat);
    rightTie.position.set(5.4, 0.4, 0.35);
    rightTie.rotation.y = -Math.PI / 6;
    drapesGroup.add(rightTie);

    // 5f. Hanging Tassels below the tie rings
    const tasselGeo = new THREE.ConeGeometry(0.18, 0.8, 16);
    const leftTassel = new THREE.Mesh(tasselGeo, champagneTieMat);
    leftTassel.position.set(-5.4, -0.2, 0.35);
    leftTassel.rotation.x = Math.PI;
    drapesGroup.add(leftTassel);

    const rightTassel = new THREE.Mesh(tasselGeo, champagneTieMat);
    rightTassel.position.set(5.4, -0.2, 0.35);
    rightTassel.rotation.x = Math.PI;
    drapesGroup.add(rightTassel);

    scene.add(drapesGroup);

    // 6. Floating Sage Leaves, Eucalyptus Foliage & White Garden Rose Petals
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, -0.8);
    leafShape.bezierCurveTo(0.45, -0.2, 0.45, 0.6, 0, 1.2);
    leafShape.bezierCurveTo(-0.45, 0.6, -0.45, -0.2, 0, -0.8);

    const leafGeo = new THREE.ShapeGeometry(leafShape, 12);
    leafGeo.center();

    // Procedural canvas texture: Soft Sage Green & Sage Mist gradient
    const leafCanvas = document.createElement('canvas');
    leafCanvas.width = 128;
    leafCanvas.height = 128;
    const lCtx = leafCanvas.getContext('2d');
    if (lCtx) {
      const grad = lCtx.createLinearGradient(0, 0, 128, 128);
      grad.addColorStop(0, '#f2f6f2');
      grad.addColorStop(0.3, '#c2cdc2'); // Sage mist
      grad.addColorStop(0.7, '#768e77'); // Sage green
      grad.addColorStop(1, '#566e57');
      lCtx.fillStyle = grad;
      lCtx.fillRect(0, 0, 128, 128);
    }
    const leafTexture = new THREE.CanvasTexture(leafCanvas);
    leafTexture.colorSpace = THREE.SRGBColorSpace;

    const leafMat = new THREE.MeshStandardMaterial({
      map: leafTexture,
      roughness: 0.55,
      metalness: 0.05,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.82,
    });

    const LEAF_COUNT = isSoftwareGl ? 35 : 70;
    const leafInstanced = new THREE.InstancedMesh(leafGeo, leafMat, LEAF_COUNT);

    const leafData: Array<{
      pos: THREE.Vector3;
      rot: THREE.Euler;
      rotSpeed: THREE.Vector3;
      driftSpeed: number;
      swayOffset: number;
      scale: number;
    }> = [];

    const dummy = new THREE.Object3D();

    for (let i = 0; i < LEAF_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 16 - 2
      );
      const rot = new THREE.Euler(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      const rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.016,
        (Math.random() - 0.5) * 0.01
      );
      const driftSpeed = 0.007 + Math.random() * 0.011;
      const swayOffset = Math.random() * Math.PI * 2;
      const scale = 0.5 + Math.random() * 0.6;

      leafData.push({ pos, rot, rotSpeed, driftSpeed, swayOffset, scale });

      dummy.position.copy(pos);
      dummy.rotation.copy(rot);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      leafInstanced.setMatrixAt(i, dummy.matrix);
    }

    leafInstanced.instanceMatrix.needsUpdate = true;
    scene.add(leafInstanced);

    // 7. Sparkling Champagne Gold Particles
    const PARTICLE_COUNT = isSoftwareGl ? 65 : 160;
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 30;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 64;
    particleCanvas.height = 64;
    const ptCtx = particleCanvas.getContext('2d');
    if (ptCtx) {
      const radGrad = ptCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      radGrad.addColorStop(0, 'rgba(255, 252, 245, 1)');
      radGrad.addColorStop(0.3, 'rgba(215, 198, 169, 0.7)'); // Champagne
      radGrad.addColorStop(0.7, 'rgba(188, 200, 188, 0.35)'); // Sage mist
      radGrad.addColorStop(1, 'rgba(251, 248, 242, 0)');
      ptCtx.fillStyle = radGrad;
      ptCtx.beginPath();
      ptCtx.arc(32, 32, 32, 0, Math.PI * 2);
      ptCtx.fill();
    }
    const particleTex = new THREE.CanvasTexture(particleCanvas);
    particleTex.colorSpace = THREE.SRGBColorSpace;

    const particleMat = new THREE.PointsMaterial({
      size: 0.45,
      map: particleTex,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
      color: 0xc8b593,
    });

    const particleSystem = new THREE.Points(particlesGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let frameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      if (sync) {
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 60);
      }
    }

    const tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Update Lighting based on theme
      if (themeRef.current === 'sage') {
        keyLight.color.setHex(0xfff7ea);
        hemiLight.color.setHex(0xdfe8df);
        if (scene.fog) scene.fog.color.setHex(0xfbf8f2);
      } else if (themeRef.current === 'champagne') {
        keyLight.color.setHex(0xffedd4);
        hemiLight.color.setHex(0xd7c6a9);
        if (scene.fog) scene.fog.color.setHex(0xfbf6ee);
      } else {
        // ivory
        keyLight.color.setHex(0xffffff);
        hemiLight.color.setHex(0xf5efe3);
        if (scene.fog) scene.fog.color.setHex(0xf8f4ec);
      }

      if (!isPausedRef.current) {
        // Subtle, graceful breathing sway for the cream hanging drapes
        const drapeBreeze = Math.sin(elapsed * 0.6) * 0.04;
        drapesGroup.rotation.y = drapeBreeze + mouseX * 0.08;
        drapesGroup.rotation.x = Math.cos(elapsed * 0.5) * 0.02 + mouseY * 0.04;

        // Gentle undulating wave movement across the side drapes
        leftDrape.rotation.z = Math.sin(elapsed * 0.7) * 0.015;
        rightDrape.rotation.z = -Math.sin(elapsed * 0.7 + 0.5) * 0.015;

        leftTassel.rotation.z = Math.sin(elapsed * 1.2) * 0.06;
        rightTassel.rotation.z = -Math.sin(elapsed * 1.2) * 0.06;

        for (let i = 0; i < LEAF_COUNT; i++) {
          const p = leafData[i];
          p.pos.y -= p.driftSpeed * (delta * 60);
          p.pos.x += Math.sin(elapsed * 0.7 + p.swayOffset) * 0.014;
          p.pos.z += Math.cos(elapsed * 0.5 + p.swayOffset) * 0.01;

          p.rot.x += p.rotSpeed.x;
          p.rot.y += p.rotSpeed.y;
          p.rot.z += p.rotSpeed.z;

          if (p.pos.y < -11) {
            p.pos.y = 11;
            p.pos.x = (Math.random() - 0.5) * 26;
          }

          dummy.position.copy(p.pos);
          dummy.rotation.copy(p.rot);
          dummy.scale.set(p.scale, p.scale, p.scale);
          dummy.updateMatrix();
          leafInstanced.setMatrixAt(i, dummy.matrix);
        }
        leafInstanced.instanceMatrix.needsUpdate = true;

        const posAttr = particlesGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          let y = posAttr.getY(i);
          y -= 0.008;
          if (y < -12) y = 12;
          posAttr.setY(i, y);
        }
        posAttr.needsUpdate = true;
      }

      camera.position.x = mouseX * 1.1;
      camera.position.y = -mouseY * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      renderer.dispose();
      swag1Geo.dispose();
      swag2Geo.dispose();
      leftDrapeGeo.dispose();
      rightDrapeGeo.dispose();
      tieRingGeo.dispose();
      tasselGeo.dispose();
      creamFabricMat.dispose();
      champagneTieMat.dispose();
      leafGeo.dispose();
      leafMat.dispose();
      leafTexture.dispose();
      particlesGeo.dispose();
      particleMat.dispose();
      particleTex.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      {/* Soft warm ivory vignette overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#fbf8f2]/30 to-[#fbf8f2]/90 pointer-events-none" />

      {/* Collapsible 3D Atmosphere HUD */}
      <div className="absolute bottom-4 right-4 pointer-events-auto z-10 flex flex-col items-end">
        {showControls ? (
          <div className="bg-[#ffffff]/95 backdrop-blur-md border border-[#d7c6a9] rounded-2xl p-3 shadow-xl mb-2 text-xs flex flex-col gap-2 w-52 transition-all">
            <div className="flex items-center justify-between border-b border-[#e5ece5] pb-1.5">
              <span className="font-serif text-[#768e77] font-semibold tracking-wide">Palette Atmosphere</span>
              <button
                type="button"
                onClick={() => setShowControls(false)}
                className="text-[#768e77] hover:text-[#1d2c20] cursor-pointer px-1 text-sm leading-none"
              >
                ✕
              </button>
            </div>

            <div>
              <span className="text-[#587059] block mb-1 text-[11px]">Tone Hue:</span>
              <div className="grid grid-cols-3 gap-1">
                {(['sage', 'champagne', 'ivory'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setThemeMode(mode)}
                    className={`py-1 px-1.5 rounded text-[10px] font-medium capitalize cursor-pointer transition ${
                      themeMode === mode
                        ? 'bg-[#768e77] text-white font-semibold shadow-sm'
                        : 'bg-[#f4efe3] text-[#587059] hover:bg-[#e5ece5]'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[#587059] text-[11px]">Drapes Sway:</span>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="bg-[#f0f4f0] hover:bg-[#e5ece5] text-[#1d2c20] px-2 py-0.5 rounded text-[10px] cursor-pointer border border-[#bcc8bc]"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          className="bg-[#ffffff]/90 hover:bg-[#ffffff] border border-[#d7c6a9] text-[#587059] text-[11px] font-medium px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-sm transition flex items-center gap-1.5 cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#768e77] inline-block shadow-[0_0_6px_#768e77]" />
          <span>Cream Drapes & Sage {showControls ? '▲' : '▼'}</span>
        </button>
      </div>
    </div>
  );
};
