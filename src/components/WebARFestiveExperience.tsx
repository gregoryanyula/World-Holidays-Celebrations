import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  X, 
  Camera, 
  RefreshCw, 
  Maximize2, 
  RotateCw, 
  Sparkles, 
  Download, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Check, 
  Compass, 
  Layers, 
  Sliders, 
  Move,
  Eye,
  SwitchCamera
} from 'lucide-react';
import { Holiday, WebARDecorItem } from '../types';
import confetti from 'canvas-confetti';

interface WebARFestiveExperienceProps {
  holiday: Holiday;
  isOpen: boolean;
  onClose: () => void;
}

export const WebARFestiveExperience: React.FC<WebARFestiveExperienceProps> = ({
  holiday,
  isOpen,
  onClose
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [hasCamera, setHasCamera] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [cameraLoading, setCameraLoading] = useState<boolean>(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isPlaced, setIsPlaced] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedDecorType, setSelectedDecorType] = useState<string>(
    holiday.arDecorItem?.modelType || 'diya_lamp'
  );
  const [scaleFactor, setScaleFactor] = useState<number>(1.0);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [lightIntensity, setLightIntensity] = useState<number>(1.5);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [snapshotTaken, setSnapshotTaken] = useState<boolean>(false);
  const [activePlacementPosition, setActivePlacementPosition] = useState<{ x: number; y: number; z: number }>({
    x: 0,
    y: -0.6,
    z: -2.2
  });

  // Three.js instances ref
  const threeRefs = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    decorGroup?: THREE.Group;
    particlesGroup?: THREE.Points;
    reticleMesh?: THREE.Mesh;
    ambientLight?: THREE.AmbientLight;
    pointLight?: THREE.PointLight;
    animationFrameId?: number;
    clock?: THREE.Clock;
  }>({});

  // Audio synthesizer for festive chimes using Web Audio API
  const playFestiveChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 major arpeggio
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.15, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.7);
      });
    } catch {
      // AudioContext unavailable
    }
  };

  // Start Camera Stream
  const startCamera = async (facing: 'environment' | 'user') => {
    setCameraLoading(true);
    setCameraError(null);

    // Stop existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera device access not supported in this browser.');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setHasCamera(true);
      setCameraLoading(false);
    } catch {
      // If environment camera fails, attempt fallback to default camera or studio room mode
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        streamRef.current = fallbackStream;
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          await videoRef.current.play();
        }
        setHasCamera(true);
        setCameraLoading(false);
      } catch {
        setHasCamera(false);
        setCameraLoading(false);
        setCameraError('Camera access unavailable. Interactive 3D Spatial AR Room activated!');
      }
    }
  };

  // Switch between front & back camera
  const toggleCameraFacing = () => {
    const nextFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(nextFacing);
    startCamera(nextFacing);
  };

  // Initialize Three.js WebAR scene
  useEffect(() => {
    if (!isOpen) return;

    startCamera(cameraFacing);

    const container = canvasContainerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffedd5, 2.5, 10);
    pointLight.position.set(0, 1.5, -1.5);
    scene.add(pointLight);

    // Subtle ground floor grid/shadow receiver for realism
    const floorGeometry = new THREE.PlaneGeometry(12, 12);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.25 });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // AR Reticle (shows placement target)
    const reticleGeometry = new THREE.RingGeometry(0.18, 0.22, 32);
    reticleGeometry.rotateX(-Math.PI / 2);
    const reticleMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const reticleMesh = new THREE.Mesh(reticleGeometry, reticleMaterial);
    reticleMesh.position.set(0, -1.18, -2.2);
    scene.add(reticleMesh);

    // Sparkling festive floating particle aura
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 3;
      particlePositions[i + 1] = Math.random() * 2 - 0.8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 3 - 2;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const decorGroup = new THREE.Group();
    decorGroup.position.set(activePlacementPosition.x, activePlacementPosition.y, activePlacementPosition.z);
    scene.add(decorGroup);

    const clock = new THREE.Clock();

    threeRefs.current = {
      scene,
      camera,
      renderer,
      decorGroup,
      particlesGroup: particles,
      reticleMesh,
      ambientLight,
      pointLight,
      clock
    };

    // Render loop
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Rotate particles slowly
      if (particles) {
        particles.rotation.y = elapsed * 0.15;
      }

      // Animate reticle pulse if not placed
      if (reticleMesh) {
        const pulse = 1 + Math.sin(elapsed * 4) * 0.08;
        reticleMesh.scale.set(pulse, pulse, pulse);
      }

      // Animate 3D festive decor floating / flickering
      if (decorGroup && decorGroup.children.length > 0) {
        decorGroup.position.y = activePlacementPosition.y + Math.sin(elapsed * 2) * 0.04;
        
        // Gentle flame flicker on lights
        if (pointLight) {
          pointLight.intensity = lightIntensity + Math.sin(elapsed * 12) * 0.25;
        }
      }

      renderer.render(scene, camera);
      threeRefs.current.animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeRefs.current.animationFrameId) {
        cancelAnimationFrame(threeRefs.current.animationFrameId);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      renderer.dispose();
    };
  }, [isOpen]);

  // Build Procedural 3D Festive Models
  const buildFestiveModel = (type: string) => {
    const { decorGroup } = threeRefs.current;
    if (!decorGroup) return;

    // Clear existing children
    while (decorGroup.children.length > 0) {
      const child = decorGroup.children[0];
      decorGroup.remove(child);
    }

    const festiveItem = new THREE.Group();

    switch (type) {
      case 'diya_lamp': {
        // Indian Diya Brass / Terracotta Lamp
        const baseGeom = new THREE.CylinderGeometry(0.35, 0.2, 0.15, 32);
        const baseMat = new THREE.MeshStandardMaterial({
          color: 0xd97706,
          metalness: 0.8,
          roughness: 0.3
        });
        const base = new THREE.Mesh(baseGeom, baseMat);
        base.castShadow = true;
        festiveItem.add(base);

        // Fluted Lotus petal ring around base
        const petalCount = 8;
        for (let i = 0; i < petalCount; i++) {
          const angle = (i / petalCount) * Math.PI * 2;
          const petalGeom = new THREE.SphereGeometry(0.12, 16, 16);
          petalGeom.scale(1, 0.4, 2);
          const petalMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.7, roughness: 0.4 });
          const petal = new THREE.Mesh(petalGeom, petalMat);
          petal.position.set(Math.cos(angle) * 0.35, -0.02, Math.sin(angle) * 0.35);
          petal.rotation.y = -angle;
          petal.rotation.x = 0.2;
          festiveItem.add(petal);
        }

        // Inner oil cavity
        const oilGeom = new THREE.CylinderGeometry(0.28, 0.25, 0.05, 32);
        const oilMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.1 });
        const oil = new THREE.Mesh(oilGeom, oilMat);
        oil.position.y = 0.06;
        festiveItem.add(oil);

        // Wick
        const wickGeom = new THREE.CylinderGeometry(0.015, 0.02, 0.08, 12);
        const wickMat = new THREE.MeshStandardMaterial({ color: 0x1c1917 });
        const wick = new THREE.Mesh(wickGeom, wickMat);
        wick.position.set(0, 0.1, 0);
        festiveItem.add(wick);

        // Glowing flame cone
        const flameGeom = new THREE.ConeGeometry(0.07, 0.22, 16);
        const flameMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
        const flame = new THREE.Mesh(flameGeom, flameMat);
        flame.position.set(0, 0.22, 0);
        festiveItem.add(flame);

        // Flame inner white core
        const coreGeom = new THREE.ConeGeometry(0.035, 0.12, 16);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
        const core = new THREE.Mesh(coreGeom, coreMat);
        core.position.set(0, 0.18, 0);
        festiveItem.add(core);

        break;
      }

      case 'sugar_skull': {
        // Mexican Día de los Muertos Calavera
        const skullGroup = new THREE.Group();
        const headGeom = new THREE.SphereGeometry(0.35, 32, 32);
        headGeom.scale(1, 1.15, 0.95);
        const headMat = new THREE.MeshStandardMaterial({ color: 0xfafaf9, roughness: 0.3 });
        const head = new THREE.Mesh(headGeom, headMat);
        skullGroup.add(head);

        const jawGeom = new THREE.BoxGeometry(0.36, 0.22, 0.32);
        const jaw = new THREE.Mesh(jawGeom, headMat);
        jaw.position.set(0, -0.3, 0.1);
        skullGroup.add(jaw);

        // Flower eye sockets
        const eyeColor = 0xec4899; // Magenta
        [-0.14, 0.14].forEach(x => {
          const eyeGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.05, 16);
          const eyeMat = new THREE.MeshBasicMaterial({ color: 0x18181b });
          const eye = new THREE.Mesh(eyeGeom, eyeMat);
          eye.rotation.x = Math.PI / 2;
          eye.position.set(x, 0.05, 0.32);
          skullGroup.add(eye);

          // Floral petals around eye
          for (let p = 0; p < 8; p++) {
            const pAngle = (p / 8) * Math.PI * 2;
            const pGeom = new THREE.SphereGeometry(0.025, 8, 8);
            const pMat = new THREE.MeshBasicMaterial({ color: eyeColor });
            const pMesh = new THREE.Mesh(pGeom, pMat);
            pMesh.position.set(x + Math.cos(pAngle) * 0.12, 0.05 + Math.sin(pAngle) * 0.12, 0.32);
            skullGroup.add(pMesh);
          }
        });

        // Marigold crown on top
        for (let m = -2; m <= 2; m++) {
          const marigoldGeom = new THREE.DodecahedronGeometry(0.08, 1);
          const marigoldMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.6 });
          const marigold = new THREE.Mesh(marigoldGeom, marigoldMat);
          marigold.position.set(m * 0.14, 0.42, 0.05);
          skullGroup.add(marigold);
        }

        festiveItem.add(skullGroup);
        break;
      }

      case 'lantern': {
        // Chinese / East Asian Glowing Red Silk Lantern
        const lanternBodyGeom = new THREE.SphereGeometry(0.38, 32, 24);
        lanternBodyGeom.scale(1, 1.25, 1);
        const lanternMat = new THREE.MeshStandardMaterial({
          color: 0xdc2626,
          roughness: 0.4,
          emissive: 0x991b1b,
          emissiveIntensity: 0.6
        });
        const lanternBody = new THREE.Mesh(lanternBodyGeom, lanternMat);
        festiveItem.add(lanternBody);

        // Gold top and bottom caps
        const capGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.06, 32);
        const capMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });
        const topCap = new THREE.Mesh(capGeom, capMat);
        topCap.position.y = 0.48;
        const bottomCap = new THREE.Mesh(capGeom, capMat);
        bottomCap.position.y = -0.48;
        festiveItem.add(topCap);
        festiveItem.add(bottomCap);

        // Gold tassel hanging below
        const tasselGeom = new THREE.CylinderGeometry(0.02, 0.07, 0.35, 16);
        const tasselMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.5 });
        const tassel = new THREE.Mesh(tasselGeom, tasselMat);
        tassel.position.y = -0.7;
        festiveItem.add(tassel);

        // Gold hanging ring on top
        const ringGeom = new THREE.TorusGeometry(0.08, 0.015, 16, 32);
        const ring = new THREE.Mesh(ringGeom, capMat);
        ring.position.y = 0.58;
        festiveItem.add(ring);
        break;
      }

      case 'crescent_lantern': {
        // Islamic Ramadan / Eid Fanous Brass Lantern & Crescent
        const baseGeom = new THREE.CylinderGeometry(0.25, 0.3, 0.1, 8);
        const brassMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85, roughness: 0.25 });
        const base = new THREE.Mesh(baseGeom, brassMat);
        festiveItem.add(base);

        // Octagonal glass chamber
        const glassGeom = new THREE.CylinderGeometry(0.28, 0.22, 0.45, 8);
        const glassMat = new THREE.MeshStandardMaterial({
          color: 0xfef08a,
          transparent: true,
          opacity: 0.85,
          emissive: 0xf59e0b,
          emissiveIntensity: 0.8
        });
        const glass = new THREE.Mesh(glassGeom, glassMat);
        glass.position.y = 0.25;
        festiveItem.add(glass);

        // Dome top
        const domeGeom = new THREE.ConeGeometry(0.28, 0.3, 8);
        const dome = new THREE.Mesh(domeGeom, brassMat);
        dome.position.y = 0.6;
        festiveItem.add(dome);

        // Crescent moon on top
        const crescentGeom = new THREE.TorusGeometry(0.1, 0.02, 16, 32, Math.PI * 1.5);
        const crescent = new THREE.Mesh(crescentGeom, brassMat);
        crescent.position.y = 0.85;
        crescent.rotation.z = Math.PI / 4;
        festiveItem.add(crescent);
        break;
      }

      case 'christmas_tree': {
        // Evergreen Christmas Tree with Twinkling Baubles & Radiant Star
        const treeMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
        
        // 3 Tiers of pine boughs
        [
          { r: 0.45, h: 0.45, y: -0.1 },
          { r: 0.35, h: 0.4, y: 0.2 },
          { r: 0.25, h: 0.35, y: 0.45 }
        ].forEach(tier => {
          const coneGeom = new THREE.ConeGeometry(tier.r, tier.h, 16);
          const cone = new THREE.Mesh(coneGeom, treeMat);
          cone.position.y = tier.y;
          festiveItem.add(cone);
        });

        // Trunk
        const trunkGeom = new THREE.CylinderGeometry(0.08, 0.1, 0.25, 16);
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
        const trunk = new THREE.Mesh(trunkGeom, trunkMat);
        trunk.position.y = -0.4;
        festiveItem.add(trunk);

        // Colorful glossy baubles
        const baubleColors = [0xef4444, 0xf59e0b, 0x3b82f6, 0xec4899];
        for (let b = 0; b < 16; b++) {
          const angle = (b / 16) * Math.PI * 4;
          const heightNorm = (b / 16) * 0.6 - 0.2;
          const radius = (1 - b / 16) * 0.35 + 0.08;
          const baubleGeom = new THREE.SphereGeometry(0.04, 16, 16);
          const bMat = new THREE.MeshStandardMaterial({
            color: baubleColors[b % baubleColors.length],
            metalness: 0.85,
            roughness: 0.15
          });
          const bauble = new THREE.Mesh(baubleGeom, bMat);
          bauble.position.set(Math.cos(angle) * radius, heightNorm, Math.sin(angle) * radius);
          festiveItem.add(bauble);
        }

        // Golden radiant star topper
        const starGeom = new THREE.OctahedronGeometry(0.1, 0);
        const starMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
        const star = new THREE.Mesh(starGeom, starMat);
        star.position.y = 0.7;
        festiveItem.add(star);
        break;
      }

      case 'feathered_mask': {
        // Venetian / Rio Carnival Plumage Mask
        const maskGroup = new THREE.Group();
        const maskGeom = new THREE.TorusGeometry(0.28, 0.08, 16, 32, Math.PI);
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85, roughness: 0.25 });
        const maskRim = new THREE.Mesh(maskGeom, goldMat);
        maskRim.rotation.x = Math.PI / 2;
        maskGroup.add(maskRim);

        // Feather plumes fanning out
        const plumeColors = [0xec4899, 0xa855f7, 0x06b6d4, 0xeab308];
        for (let f = -3; f <= 3; f++) {
          const fAngle = (f / 3) * 0.6;
          const featherGeom = new THREE.ConeGeometry(0.08, 0.45, 12);
          featherGeom.scale(1, 1, 0.2);
          const fMat = new THREE.MeshStandardMaterial({
            color: plumeColors[Math.abs(f) % plumeColors.length],
            roughness: 0.6
          });
          const feather = new THREE.Mesh(featherGeom, fMat);
          feather.position.set(Math.sin(fAngle) * 0.3, 0.28 + Math.cos(fAngle) * 0.15, -0.05);
          feather.rotation.z = -fAngle;
          maskGroup.add(feather);
        }
        festiveItem.add(maskGroup);
        break;
      }

      default: {
        // Golden Sacred Lotus / Sparkler Centerpiece
        const lotusGroup = new THREE.Group();
        const centerGeom = new THREE.SphereGeometry(0.18, 32, 32);
        const centerMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          metalness: 0.7,
          emissive: 0xd97706,
          emissiveIntensity: 0.5
        });
        const center = new THREE.Mesh(centerGeom, centerMat);
        lotusGroup.add(center);

        // Outer petals
        for (let l = 0; l < 12; l++) {
          const lAngle = (l / 12) * Math.PI * 2;
          const lGeom = new THREE.SphereGeometry(0.14, 16, 16);
          lGeom.scale(1, 0.3, 2.2);
          const lMat = new THREE.MeshStandardMaterial({
            color: 0xf43f5e,
            roughness: 0.4,
            metalness: 0.3
          });
          const petal = new THREE.Mesh(lGeom, lMat);
          petal.position.set(Math.cos(lAngle) * 0.28, -0.04, Math.sin(lAngle) * 0.28);
          petal.rotation.y = -lAngle;
          petal.rotation.x = 0.3;
          lotusGroup.add(petal);
        }
        festiveItem.add(lotusGroup);
        break;
      }
    }

    festiveItem.scale.set(scaleFactor, scaleFactor, scaleFactor);
    festiveItem.rotation.y = rotationAngle;
    decorGroup.add(festiveItem);
  };

  // Rebuild model when decor type, scale, or rotation changes
  useEffect(() => {
    buildFestiveModel(selectedDecorType);
  }, [selectedDecorType, scaleFactor, rotationAngle]);

  // Handle tap / placement on floor
  const handlePlaceDecor = () => {
    setIsPlaced(true);
    playFestiveChime();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Take high-res snapshot of camera + 3D scene combined
  const handleCaptureSnapshot = () => {
    const video = videoRef.current;
    const { renderer } = threeRefs.current;
    if (!renderer) return;

    const snapCanvas = document.createElement('canvas');
    const width = renderer.domElement.width;
    const height = renderer.domElement.height;
    snapCanvas.width = width;
    snapCanvas.height = height;
    const ctx = snapCanvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw camera video background if available
    if (video && hasCamera && video.readyState >= 2) {
      ctx.drawImage(video, 0, 0, width, height);
    } else {
      // Draw atmospheric gradient backdrop
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Draw WebGL 3D scene
    ctx.drawImage(renderer.domElement, 0, 0);

    // 3. Watermark festive branding
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(20, height - 70, width - 40, 50);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(`${holiday.name} — WebAR Celebration`, 35, height - 38);

    ctx.fillStyle = '#f59e0b';
    ctx.font = '13px sans-serif';
    ctx.fillText(`WorldFest Heritage AR · ${new Date().toLocaleDateString()}`, 35, height - 20);

    // Download image
    const dataUrl = snapCanvas.toDataURL('image/jpeg', 0.95);
    const link = document.createElement('a');
    link.download = `${holiday.id}-web-ar-moment.jpg`;
    link.href = dataUrl;
    link.click();

    setSnapshotTaken(true);
    confetti({ particleCount: 30, spread: 45 });
    setTimeout(() => setSnapshotTaken(false), 2500);
  };

  // Drag / move interaction across viewport
  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isPlaced) return;
    const container = canvasContainerRef.current;
    if (!container) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const rect = container.getBoundingClientRect();
    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -(((clientY - rect.top) / rect.height) * 2 - 1);

    // Reposition decor in 3D space
    const targetX = ndcX * 1.5;
    const targetY = ndcY * 1.2 - 0.4;
    setActivePlacementPosition(prev => ({ ...prev, x: targetX, y: targetY }));

    if (threeRefs.current.decorGroup) {
      threeRefs.current.decorGroup.position.x = targetX;
      threeRefs.current.decorGroup.position.y = targetY;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black text-white select-none overflow-hidden animate-in fade-in duration-200">
      {/* Real-World Environment Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hasCamera ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 3D Fallback Spatial Room Atmosphere if camera denied */}
      {!hasCamera && (
        <div className="absolute inset-0 bg-radial from-stone-900 via-stone-950 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,119,6,0.15),transparent_60%)]" />
        </div>
      )}

      {/* Three.js 3D WebGL Canvas Layer */}
      <div
        ref={canvasContainerRef}
        onMouseMove={handleTouchMove}
        onTouchMove={handleTouchMove}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-md">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                WebAR Spatial View
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 text-stone-200 backdrop-blur-xs font-mono">
                {hasCamera ? 'Live Camera' : 'Spatial Room'}
              </span>
            </div>
            <h3 className="text-base font-serif font-bold text-white drop-shadow-sm">
              {holiday.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Camera flip toggle */}
          {hasCamera && (
            <button
              onClick={toggleCameraFacing}
              title="Flip Camera (Front/Rear)"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition"
            >
              <SwitchCamera className="w-4 h-4" />
            </button>
          )}

          {/* Sound toggle */}
          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            title={soundEnabled ? 'Mute Chimes' : 'Enable Chimes'}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {/* Toggle controls tray */}
          <button
            onClick={() => setShowControls(prev => !prev)}
            title="Toggle Controls"
            className={`p-2.5 rounded-full backdrop-blur-md border border-white/10 transition ${
              showControls ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-white/10 text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Exit / Close */}
          <button
            onClick={onClose}
            title="Exit WebAR"
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Floating Center Notification / Placement Instruction */}
      {!isPlaced && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-sm pointer-events-none text-center">
          <div className="p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 shadow-2xl text-xs space-y-1 animate-pulse">
            <p className="font-semibold text-white flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Point your camera at a flat table or floor
            </p>
            <p className="text-[11px] text-stone-300">
              Tap the button below to place 3D traditional festive decor in your room!
            </p>
          </div>
        </div>
      )}

      {/* Camera loading / error status banner */}
      {cameraError && (
        <div className="absolute top-24 left-4 right-4 z-10 mx-auto max-w-md p-3 rounded-2xl bg-amber-950/80 backdrop-blur-md border border-amber-600/40 text-xs text-amber-200 text-center">
          {cameraError}
        </div>
      )}

      {/* Bottom AR Action Bar & Controls */}
      <div className="relative z-10 mt-auto p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent space-y-3">
        {/* Controls Drawer (Expandable) */}
        {showControls && (
          <div className="p-3.5 rounded-2xl bg-stone-900/85 backdrop-blur-md border border-white/15 space-y-3 max-w-lg mx-auto animate-in slide-in-from-bottom duration-200">
            {/* Decor Type Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-stone-400 shrink-0 mr-1 flex items-center gap-1">
                <Layers className="w-3 h-3 text-amber-400" /> 3D Decor:
              </span>
              {[
                { type: 'diya_lamp', label: 'Diya Lamp' },
                { type: 'sugar_skull', label: 'Calavera Skull' },
                { type: 'lantern', label: 'Silk Lantern' },
                { type: 'crescent_lantern', label: 'Fanous Lantern' },
                { type: 'christmas_tree', label: 'Festive Pine' },
                { type: 'feathered_mask', label: 'Carnival Mask' },
                { type: 'golden_lotus', label: 'Sacred Lotus' }
              ].map(item => (
                <button
                  key={item.type}
                  onClick={() => setSelectedDecorType(item.type)}
                  className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition ${
                    selectedDecorType === item.type
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-stone-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Scale & Rotate Sliders */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-stone-300">
                  <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3" /> Size:</span>
                  <span className="font-mono">{scaleFactor.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="2.5"
                  step="0.1"
                  value={scaleFactor}
                  onChange={e => setScaleFactor(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-stone-300">
                  <span className="flex items-center gap-1"><RotateCw className="w-3 h-3" /> Spin:</span>
                  <span className="font-mono">{Math.round((rotationAngle * 180) / Math.PI)}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.PI * 2}
                  step="0.1"
                  value={rotationAngle}
                  onChange={e => setRotationAngle(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Primary Interactive Action Buttons */}
        <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
          {!isPlaced ? (
            <button
              onClick={handlePlaceDecor}
              className="flex-1 py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Tap to Place 3D Decor</span>
            </button>
          ) : (
            <>
              {/* Reposition / Reset placement */}
              <button
                onClick={() => {
                  setIsPlaced(false);
                  setActivePlacementPosition({ x: 0, y: -0.6, z: -2.2 });
                  if (threeRefs.current.decorGroup) {
                    threeRefs.current.decorGroup.position.set(0, -0.6, -2.2);
                  }
                }}
                className="py-3 px-4 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-white font-semibold text-xs flex items-center gap-1.5 backdrop-blur-md border border-white/20 transition"
              >
                <Move className="w-4 h-4" />
                <span>Move</span>
              </button>

              {/* Snapshot Photo Button */}
              <button
                onClick={handleCaptureSnapshot}
                className="flex-1 py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                <Camera className="w-5 h-5" />
                <span>{snapshotTaken ? 'Saved Snapshot! ✨' : 'Capture AR Photo'}</span>
              </button>

              {/* Sound chime trigger */}
              <button
                onClick={playFestiveChime}
                title="Play Festive Chimes"
                className="p-3 rounded-2xl bg-white/15 hover:bg-white/25 text-amber-300 backdrop-blur-md border border-white/20 transition"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
