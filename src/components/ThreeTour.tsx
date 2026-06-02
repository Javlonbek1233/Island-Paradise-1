/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Compass, Maximize2, ShieldAlert } from 'lucide-react';

interface ThreeTourProps {
  castleId: string;
}

interface Hotspot {
  id: string;
  name: string;
  description: string;
  cameraPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  fact: string;
}

export default function ThreeTour({ castleId }: ThreeTourProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string>('gate');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Define Hotspots with coordinates that will glide the camera around our 3D castle
  const hotspots: Hotspot[] = [
    {
      id: 'gate',
      name: 'The Barbican Gatehouse',
      description: 'The primary gate guarded by iron portcullises, murder-holes, and reinforced oak panels.',
      cameraPos: new THREE.Vector3(0, 8, 22),
      targetPos: new THREE.Vector3(0, 2, 0),
      fact: 'Constructed with double-curved stone to deflect battering rams and project archer crossfire.'
    },
    {
      id: 'keep',
      name: 'The Great keep',
      description: 'The heart of the castle. A multi-story indestructible stone sanctuary housing the King’s Throne.',
      cameraPos: new THREE.Vector3(4, 15, 6),
      targetPos: new THREE.Vector3(0, 5, -2),
      fact: 'Fitted with walls up to 15 feet thick, designed to withstand deep underground trebuchet bombardments.'
    },
    {
      id: 'sentinel',
      name: 'The Sentinel Tower',
      description: 'Peering over the mountain pass, watchers monitored all incoming flags or smoke signals.',
      cameraPos: new THREE.Vector3(-10, 12, 10),
      targetPos: new THREE.Vector3(-7, 7, -7),
      fact: 'Equipped with beacon bonfires that could request medieval reinforcement armies within 10 minutes.'
    },
    {
      id: 'courtyard',
      name: 'The Grotto Courtyard',
      description: 'An inner courtyard housing the deep wishing well and weapon-smith fires.',
      cameraPos: new THREE.Vector3(12, 6, -10),
      targetPos: new THREE.Vector3(2, 1, -2),
      fact: 'The wishing well was dug down 120 feet directly into solid granite to reach fresh water.'
    }
  ];

  const currentHotspot = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  // Ref trackers for camera glide animation in render loop
  const targetCamPos = useRef<THREE.Vector3>(hotspots[0].cameraPos.clone());
  const targetLookAt = useRef<THREE.Vector3>(hotspots[0].targetPos.clone());
  const actualLookAt = useRef<THREE.Vector3>(hotspots[0].targetPos.clone());

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#09090b'); // Matches body background
    scene.fog = new THREE.FogExp2('#09090b', 0.02);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.copy(hotspots[0].cameraPos);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Clear out old canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- PROCEDURAL 3D MEDIEVAL CASTLE BUILD --
    const castleGroup = new THREE.Group();

    // Stone Material
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x52525b,
      roughness: 0.85,
      metalness: 0.1,
    });

    // Dark Accent Stone
    const accentStoneMat = new THREE.MeshStandardMaterial({
      color: 0x3f3f46,
      roughness: 0.9,
    });

    // Roof Material (Red clay cones)
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      roughness: 0.6,
    });

    // Gold core
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xd97706,
      emissiveIntensity: 0.4
    });

    // Wood Material
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.7,
    });

    // Iron gate
    const gateMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.8,
      roughness: 0.4,
    });

    // 1. Keep (Main Fort)
    const keepGeo = new THREE.BoxGeometry(6, 10, 6);
    const keepMesh = new THREE.Mesh(keepGeo, stoneMat);
    keepMesh.position.set(0, 5, -2);
    keepMesh.castShadow = true;
    keepMesh.receiveShadow = true;
    castleGroup.add(keepMesh);

    // Keep battlements (Crenellations on top of Keep)
    for (let x = -3; x <= 3; x += 1.5) {
      for (let z = -3; z <= 3; z += 1.5) {
        if (Math.abs(x) === 3 || Math.abs(z) === 3) {
          const crenGeo = new THREE.BoxGeometry(0.8, 1, 0.8);
          const cren = new THREE.Mesh(crenGeo, accentStoneMat);
          cren.position.set(x, 10.5, z - 2);
          cren.castShadow = true;
          castleGroup.add(cren);
        }
      }
    }

    // 2. Towers (4 cylindrical corners)
    const towerCoords = [
      { x: -7, z: -7 },
      { x: 7, z: -7 },
      { x: -7, z: 5 },
      { x: 7, z: 5 }
    ];

    towerCoords.forEach((coord, index) => {
      // Cylinder tower height 12
      const towerGeo = new THREE.CylinderGeometry(1.6, 2, 12, 12);
      const tower = new THREE.Mesh(towerGeo, stoneMat);
      tower.position.set(coord.x, 6, coord.z);
      tower.castShadow = true;
      tower.receiveShadow = true;
      castleGroup.add(tower);

      // Tower roofs (Cones)
      const roofGeo = new THREE.ConeGeometry(2, 4, 12);
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.set(coord.x, 14, coord.z);
      roof.castShadow = true;
      castleGroup.add(roof);

      // Flag banners
      const flagPoleGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 4);
      const flagPole = new THREE.Mesh(flagPoleGeo, gateMat);
      flagPole.position.set(coord.x, 16.5, coord.z);
      castleGroup.add(flagPole);

      // Small waving flag
      const flagGeo = new THREE.BoxGeometry(0.8, 0.5, 0.05);
      const flag = new THREE.Mesh(flagGeo, goldMat);
      flag.position.set(coord.x + 0.4, 17.5, coord.z);
      castleGroup.add(flag);
    });

    // 3. Walls (Boxes connecting towers)
    const walls = [
      { w: 12.4, h: 7, d: 1, x: 0, y: 3.5, z: -7 }, // Back wall
      { w: 1, h: 7, d: 10, x: -7, y: 3.5, z: -1 }, // Left wall
      { w: 1, h: 7, d: 10, x: 7, y: 3.5, z: -1 }, // Right wall
      { w: 5, h: 7, d: 1.2, x: -4.5, y: 3.5, z: 5 }, // Left Front wall
      { w: 5, h: 7, d: 1.2, x: 4.5, y: 3.5, z: 5 } // Right Front wall
    ];

    walls.forEach(wConf => {
      const wallGeo = new THREE.BoxGeometry(wConf.w, wConf.h, wConf.d);
      const wall = new THREE.Mesh(wallGeo, stoneMat);
      wall.position.set(wConf.x, wConf.y, wConf.z);
      wall.castShadow = true;
      wall.receiveShadow = true;
      castleGroup.add(wall);

      // Crenellations on top of walls
      const wallLen = wConf.w > wConf.d ? wConf.w : wConf.d;
      const step = 2.0;
      for (let s = -wallLen / 2 + 0.5; s < wallLen / 2; s += step) {
        const crenGeo = new THREE.BoxGeometry(0.7, 0.8, 0.7);
        const cren = new THREE.Mesh(crenGeo, accentStoneMat);
        if (wConf.w > wConf.d) {
          cren.position.set(wConf.x + s, wConf.y + wConf.h / 2 + 0.4, wConf.z);
        } else {
          cren.position.set(wConf.x, wConf.y + wConf.h / 2 + 0.4, wConf.z + s);
        }
        castleGroup.add(cren);
      }
    });

    // 4. Drawbridge & Arch Gate (Gatehouse)
    const archGeo = new THREE.BoxGeometry(4, 8, 2);
    const arch = new THREE.Mesh(archGeo, accentStoneMat);
    arch.position.set(0, 4, 5);
    castleGroup.add(arch);

    // Gate opening (dark box)
    const portalGeo = new THREE.BoxGeometry(2.4, 4.5, 2.2);
    const portal = new THREE.Mesh(portalGeo, gateMat);
    portal.position.set(0, 2.25, 5);
    castleGroup.add(portal);

    // Drawbridge deck (laid down)
    const bridgeGeo = new THREE.BoxGeometry(2.2, 0.4, 6);
    const bridge = new THREE.Mesh(bridgeGeo, woodMat);
    bridge.position.set(0, 0.2, 8);
    bridge.castShadow = true;
    castleGroup.add(bridge);

    // Bridge chains
    const chainL = new THREE.LineCurve3(new THREE.Vector3(-1.1, 4.2, 5.1), new THREE.Vector3(-1.1, 0.4, 10.5));
    const chainLineL = new THREE.Line(new THREE.BufferGeometry().setFromPoints(chainL.getPoints(10)), new THREE.LineBasicMaterial({ color: 0x4b5563 }));
    const chainR = new THREE.LineCurve3(new THREE.Vector3(1.1, 4.2, 5.1), new THREE.Vector3(1.1, 0.4, 10.5));
    const chainLineR = new THREE.Line(new THREE.BufferGeometry().setFromPoints(chainR.getPoints(10)), new THREE.LineBasicMaterial({ color: 0x4b5563 }));
    castleGroup.add(chainLineL);
    castleGroup.add(chainLineR);

    // 5. Courtyard details
    // Wishing Well
    const wellGeo = new THREE.CylinderGeometry(1.2, 1.2, 1.5, 12);
    const well = new THREE.Mesh(wellGeo, accentStoneMat);
    well.position.set(3, 0.75, -2);
    well.castShadow = true;
    castleGroup.add(well);

    // Glowy source inside courtyard
    const glowGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const glowBox = new THREE.Mesh(glowGeo, goldMat);
    glowBox.position.set(3, 1.2, -2);
    castleGroup.add(glowBox);

    // 6. Ground Base
    const baseGeo = new THREE.CylinderGeometry(13, 14, 2, 8);
    const baseMesh = new THREE.Mesh(baseGeo, accentStoneMat);
    baseMesh.position.set(0, -1, 0);
    baseMesh.receiveShadow = true;
    castleGroup.add(baseMesh);

    scene.add(castleGroup);

    // --- GOLDEN DUST PARTICLE SYSTEM ---
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Scatter in a cylinder around the castle
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 12;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.random() * 14;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      speeds.push(0.01 + Math.random() * 0.02);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.18,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const dustParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(dustParticles);

    // --- LIGHTING ---
    // Warm Sun Light
    const sunLight = new THREE.DirectionalLight(0xf2bf25, 2.2);
    sunLight.position.set(20, 25, 15);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    // Cool ambient moon glow
    const ambientLight = new THREE.AmbientLight(0x1e1b4b, 1.4);
    scene.add(ambientLight);

    // Point Light emphasizing gold keep treasure glow
    const pointLight = new THREE.PointLight(0xd97706, 3, 8);
    pointLight.position.set(3, 2, -2);
    scene.add(pointLight);

    setLoading(false);

    // --- RENDER LOOP & INTERPOLATION ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Slow idle orbit if auto-rotate is toggled on OR hover is inactive
      if (autoRotate && !isHovered) {
        castleGroup.rotation.y = elapsed * 0.06;
      }

      // Animate Particles
      const posArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // float upward
        posArr[i * 3 + 1] += speeds[i];
        // Swerve slightly
        posArr[i * 3] += Math.sin(elapsed + i) * 0.003;
        
        // Reset if floats too high
        if (posArr[i * 3 + 1] > 15) {
          posArr[i * 3 + 1] = 0;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // GLIDE THE CAMERA & LOOK-AT target smoothly (Lerp)
      camera.position.lerp(targetCamPos.current, 0.04);
      actualLookAt.current.lerp(targetLookAt.current, 0.04);
      camera.lookAt(actualLookAt.current);

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLE ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      // Dispose materials and geometries to prevent memory leaks
      keepGeo.dispose();
      stoneMat.dispose();
      accentStoneMat.dispose();
      roofMat.dispose();
      goldMat.dispose();
      woodMat.dispose();
      gateMat.dispose();
      wellGeo.dispose();
      glowGeo.dispose();
      baseGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [isHovered]);

  // Synchronize target coordinates with State selection
  const handleHotspotClick = (id: string) => {
    setActiveHotspot(id);
    setAutoRotate(false); // Stop auto-rotating when analyzing a specific segment
    const spot = hotspots.find(h => h.id === id);
    if (spot) {
      targetCamPos.current.copy(spot.cameraPos);
      targetLookAt.current.copy(spot.targetPos);
    }
  };

  return (
    <div className="relative w-full h-[600px] rounded-2xl border border-amber-500/20 overflow-hidden bg-zinc-950/80 backdrop-blur-md shadow-2xl flex flex-col md:flex-row id_three_tour_container">
      {/* 3D Canvas stage */}
      <div 
        className="relative flex-1 h-[340px] md:h-full cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={mountRef}
        id="3d-canvas-mount"
      >
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 z-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
            <p className="mt-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">Forging 3D stone keep...</p>
          </div>
        )}
      </div>

      {/* Floating UI HUD elements over Canvas */}
      <div className="absolute top-4 left-4 flex gap-2 z-10 pointer-events-none">
        <span className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-md border border-amber-500/30 text-[10px] font-mono text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
          Sunset Lighting Mode
        </span>
      </div>

      <button
        onClick={() => setAutoRotate(!autoRotate)}
        className={`absolute top-4 right-4 z-10 px-3 py-1.5 rounded-md border text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
          autoRotate 
            ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
            : 'bg-black/60 border-zinc-800 text-zinc-400'
        }`}
        id="btn_auto_orbit"
      >
        🛰️ Orbit {autoRotate ? 'Active' : 'Paused'}
      </button>

      {/* Cinema Documentary Narrative Panel */}
      <div className="w-full md:w-[320px] bg-zinc-950/95 border-t md:border-t-0 md:border-l border-zinc-800 p-5 flex flex-col justify-between z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Tactical 3D Render</span>
          </div>

          <h3 className="font-serif text-lg text-amber-100 font-bold tracking-wide mb-1 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-500" />
            {currentHotspot.name}
          </h3>

          <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-4 min-h-[50px]">
            {currentHotspot.description}
          </p>

          {/* Quick interactive Fact panel */}
          <div className="p-3 bg-amber-950/20 border border-amber-500/10 rounded-lg mb-6">
            <h4 className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              Documentary Insight
            </h4>
            <p className="text-[12px] italic text-zinc-300 leading-snug">
              &ldquo;{currentHotspot.fact}&rdquo;
            </p>
          </div>
        </div>

        {/* Hotspot Toggle selection */}
        <div>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Hotspots</p>
          <div className="grid grid-cols-2 gap-2" id="hotspots-grid">
            {hotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => handleHotspotClick(spot.id)}
                className={`py-2 px-3 text-[11px] rounded-md font-serif text-left border transition-all duration-300 ${
                  activeHotspot === spot.id
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300 gold-glow'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
                id={`hotspot-${spot.id}`}
              >
                {spot.name.replace('The ', '')}
              </button>
            ))}
          </div>
          <p className="text-[9px] font-mono text-zinc-600 mt-4 text-center">
            DRAG to view from custom perspectives.
          </p>
        </div>
      </div>
    </div>
  );
}
