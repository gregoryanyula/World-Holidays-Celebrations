import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { 
  X, 
  Camera, 
  RotateCw, 
  Sparkles as SparklesIcon, 
  Download, 
  Volume2, 
  VolumeX, 
  Check, 
  Compass, 
  Sliders, 
  SwitchCamera,
  Maximize2
} from 'lucide-react';
import { Holiday } from '../types';
import confetti from 'canvas-confetti';

interface ReactThreeFiberWebARProps {
  holiday: Holiday;
  isOpen: boolean;
  onClose: () => void;
}

// -------------------------------------------------------------
// 3D MODELS BUILT WITH REACT-THREE-FIBER
// -------------------------------------------------------------

// 1. Traditional Brass Diya Oil Lamp (Diwali)
const DiyaModel: React.FC<{ scale: number }> = ({ scale }) => {
  const flameRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(t * 8) * 0.15;
      flameRef.current.scale.x = 1 + Math.cos(t * 7) * 0.1;
      flameRef.current.position.y = 0.55 + Math.sin(t * 10) * 0.02;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.0 + Math.sin(t * 12) * 0.5;
    }
  });

  return (
    <group scale={scale}>
      {/* Brass Lamp Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.4, 0.25, 32]} />
        <meshStandardMaterial color="#d97706" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Bowl Rim */}
      <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.12, 16, 32]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Spout Lip */}
      <mesh position={[0.7, 0.15, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <coneGeometry args={[0.2, 0.45, 16]} />
        <meshStandardMaterial color="#d97706" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Ghee Pool inside */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.3} roughness={0.1} transparent opacity={0.8} />
      </mesh>
      {/* Cotton Wick */}
      <mesh position={[0.45, 0.25, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.04, 0.04, 0.35, 8]} />
        <meshStandardMaterial color="#44403c" roughness={0.9} />
      </mesh>
      {/* Flickering Sacred Flame */}
      <mesh ref={flameRef} position={[0.6, 0.48, 0]}>
        <coneGeometry args={[0.16, 0.45, 16]} />
        <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={2.5} roughness={0.1} />
      </mesh>
      {/* Inner Golden Flame Core */}
      <mesh position={[0.6, 0.42, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#fef08a" emissive="#facc15" emissiveIntensity={3} />
      </mesh>
      {/* Dynamic Warm Radial Light */}
      <pointLight ref={lightRef} position={[0.6, 0.55, 0]} color="#f59e0b" distance={5} />
    </group>
  );
};

// 2. Traditional Hanukkah Menorah
const MenorahModel: React.FC<{ scale: number }> = ({ scale }) => {
  const flamesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (flamesRef.current) {
      flamesRef.current.children.forEach((flame, idx) => {
        flame.scale.y = 1 + Math.sin(t * 7 + idx) * 0.15;
      });
    }
  });

  return (
    <group scale={scale}>
      {/* Menorah Solid Base */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.2, 32]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Central Stem */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 1.4, 16]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* 4 Symmetrical Curved Branch Pairs */}
      {[-0.8, -0.55, -0.3, 0.3, 0.55, 0.8].map((xOffset, i) => (
        <group key={i}>
          <mesh position={[xOffset / 2, 0.2, 0]} rotation={[0, 0, xOffset > 0 ? -Math.PI / 4 : Math.PI / 4]}>
            <cylinderGeometry args={[0.04, 0.04, Math.abs(xOffset) * 0.8, 12]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[xOffset, 0.5, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 12]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[xOffset, 0.72, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.1, 16]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Candle Body */}
          <mesh position={[xOffset, 0.95, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.38, 12]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.3} />
          </mesh>
        </group>
      ))}
      {/* Central Shamash Candle (Elevated) */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.42, 12]} />
        <meshStandardMaterial color="#60a5fa" roughness={0.3} />
      </mesh>
      {/* Flames Group */}
      <group ref={flamesRef}>
        {[-0.8, -0.55, -0.3, 0, 0.3, 0.55, 0.8].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, xPos === 0 ? 1.48 : 1.22, 0]}>
            <coneGeometry args={[0.08, 0.22, 12]} />
            <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={2.5} />
          </mesh>
        ))}
      </group>
      <pointLight position={[0, 1.3, 0.3]} color="#38bdf8" intensity={2} distance={4} />
      <pointLight position={[0, 1.3, -0.3]} color="#fbbf24" intensity={2.5} distance={4} />
    </group>
  );
};

// 3. Day of the Dead Decorative Sugar Skull Altar (Día de los Muertos)
const SugarSkullModel: React.FC<{ scale: number }> = ({ scale }) => {
  return (
    <group scale={scale}>
      {/* Skull Cranium */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial color="#fdfbf7" roughness={0.4} />
      </mesh>
      {/* Skull Jaw */}
      <mesh position={[0, -0.2, 0.15]}>
        <boxGeometry args={[0.55, 0.45, 0.45]} />
        <meshStandardMaterial color="#fdfbf7" roughness={0.4} />
      </mesh>
      {/* Eye Sockets (Teal Floral Inset) */}
      <mesh position={[-0.22, 0.25, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.08, 16]} />
        <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.22, 0.25, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.08, 16]} />
        <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.8} />
      </mesh>
      {/* Forehead Rose Flower Motif */}
      <mesh position={[0, 0.65, 0.42]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#e11d48" emissive="#be123c" emissiveIntensity={1.2} />
      </mesh>
      {/* Cempasúchil Marigold Petal Bed */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.9, 1.0, 0.2, 32]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.6} />
      </mesh>
      <pointLight position={[0, 0.5, 0.8]} color="#f97316" intensity={2} distance={3} />
    </group>
  );
};

// 4. Eid Crescent & Star Filigree Fanoos Lantern
const FanoosLanternModel: React.FC<{ scale: number }> = ({ scale }) => {
  const lanternRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lanternRef.current) {
      lanternRef.current.rotation.y = t * 0.4;
      lanternRef.current.position.y = Math.sin(t * 1.5) * 0.06;
    }
  });

  return (
    <group ref={lanternRef} scale={scale}>
      {/* Base Pedestal */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.5, 0.65, 0.2, 8]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Glass Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 1.3, 8]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.1} transparent opacity={0.6} />
      </mesh>
      {/* Filigree Dome Top */}
      <mesh position={[0, 0.85, 0]}>
        <coneGeometry args={[0.52, 0.6, 8]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Hanging Ring */}
      <mesh position={[0, 1.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.15, 0.03, 12, 24]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Internal Luminous Candle */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
        <meshStandardMaterial color="#fef08a" emissive="#eab308" emissiveIntensity={2} />
      </mesh>
      <pointLight position={[0, 0, 0]} color="#fde047" intensity={3} distance={5} />
    </group>
  );
};

// 5. Songkran Terracotta Water Bowl & Floating Lotus
const SongkranBowlModel: React.FC<{ scale: number }> = ({ scale }) => {
  const lotusRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lotusRef.current) {
      lotusRef.current.rotation.y = t * 0.3;
      lotusRef.current.position.y = 0.25 + Math.sin(t * 2) * 0.03;
    }
  });

  return (
    <group scale={scale}>
      {/* Carved Terracotta Bowl */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.85, 0.55, 0.55, 32]} />
        <meshStandardMaterial color="#b45309" roughness={0.7} />
      </mesh>
      {/* Water Surface */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.04, 32]} />
        <meshStandardMaterial color="#06b6d4" roughness={0.05} metalness={0.1} transparent opacity={0.85} />
      </mesh>
      {/* Floating Pink Lotus Bloom */}
      <group ref={lotusRef} position={[0, 0.25, 0]}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.2, 0.06, Math.sin(angle) * 0.2]} rotation={[0.4, -angle, 0]}>
              <coneGeometry args={[0.12, 0.3, 12]} />
              <meshStandardMaterial color="#f43f5e" roughness={0.3} />
            </mesh>
          );
        })}
        {/* Lotus Seed Pod Core */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.1, 0.08, 0.1, 16]} />
          <meshStandardMaterial color="#fef08a" emissive="#eab308" emissiveIntensity={0.8} />
        </mesh>
      </group>
      <pointLight position={[0, 0.6, 0]} color="#38bdf8" intensity={1.8} distance={4} />
    </group>
  );
};

// 6. Mid-Autumn Luminous Rabbit Moon Lantern
const RabbitLanternModel: React.FC<{ scale: number }> = ({ scale }) => {
  const rabbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (rabbitRef.current) {
      rabbitRef.current.position.y = Math.sin(t * 2) * 0.05;
      rabbitRef.current.rotation.y = Math.sin(t * 0.8) * 0.2;
    }
  });

  return (
    <group ref={rabbitRef} scale={scale}>
      {/* Glowing Jade Rabbit Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ecfdf5" emissive="#10b981" emissiveIntensity={0.6} roughness={0.2} />
      </mesh>
      {/* Rabbit Head */}
      <mesh position={[0.35, 0.25, 0]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial color="#ecfdf5" emissive="#10b981" emissiveIntensity={0.6} roughness={0.2} />
      </mesh>
      {/* Bunny Ears */}
      <mesh position={[0.35, 0.65, 0.1]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.06, 0.08, 0.5, 16]} />
        <meshStandardMaterial color="#fbcfe8" roughness={0.3} />
      </mesh>
      <mesh position={[0.35, 0.65, -0.1]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.06, 0.08, 0.5, 16]} />
        <meshStandardMaterial color="#fbcfe8" roughness={0.3} />
      </mesh>
      {/* Golden Moon Disk Behind */}
      <mesh position={[-0.4, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.05, 32]} />
        <meshStandardMaterial color="#fef08a" emissive="#facc15" emissiveIntensity={1.2} />
      </mesh>
      <pointLight position={[0, 0.4, 0]} color="#a7f3d0" intensity={2.5} distance={4} />
    </group>
  );
};

// 7. General Festive Sparkler & Crystal Sphere
const FestiveSparklerModel: React.FC<{ scale: number }> = ({ scale }) => {
  const crystalRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (crystalRef.current) {
      crystalRef.current.rotation.x = t * 0.6;
      crystalRef.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group scale={scale}>
      <mesh ref={crystalRef} position={[0, 0.2, 0]}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.9} wireframe />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#f43f5e" emissive="#e11d48" emissiveIntensity={2} />
      </mesh>
      <pointLight position={[0, 0.2, 0]} color="#f43f5e" intensity={3} distance={5} />
    </group>
  );
};

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------

export const ReactThreeFiberWebAR: React.FC<ReactThreeFiberWebARProps> = ({
  holiday,
  isOpen,
  onClose
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [hasCamera, setHasCamera] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [cameraLoading, setCameraLoading] = useState<boolean>(true);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const [scaleFactor, setScaleFactor] = useState<number>(1.0);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [snapshotTaken, setSnapshotTaken] = useState<boolean>(false);
  const [selectedDecorType, setSelectedDecorType] = useState<string>(
    holiday.arDecorItem?.modelType || 'diya_lamp'
  );

  // Determine initial model type based on holiday category/id
  useEffect(() => {
    if (holiday.id.includes('diwali') || holiday.id.includes('lights') || holiday.id.includes('deepavali')) {
      setSelectedDecorType('diya_lamp');
    } else if (holiday.id.includes('hanukkah') || holiday.id.includes('menorah')) {
      setSelectedDecorType('menorah');
    } else if (holiday.id.includes('muertos') || holiday.id.includes('dead') || holiday.id.includes('all-souls')) {
      setSelectedDecorType('sugar_skull');
    } else if (holiday.id.includes('eid') || holiday.id.includes('ramadan') || holiday.id.includes('fanoos')) {
      setSelectedDecorType('crescent_lantern');
    } else if (holiday.id.includes('songkran') || holiday.id.includes('water')) {
      setSelectedDecorType('songkran_water_bowl');
    } else if (holiday.id.includes('autumn') || holiday.id.includes('moon') || holiday.id.includes('chuseok')) {
      setSelectedDecorType('mid_autumn_rabbit');
    } else {
      setSelectedDecorType(holiday.arDecorItem?.modelType || 'diya_lamp');
    }
  }, [holiday]);

  // Camera Stream Lifecycle
  useEffect(() => {
    if (!isOpen) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      return;
    }

    let isMounted = true;
    setCameraLoading(true);
    setCameraError(null);

    async function initCamera() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera device access is not supported on this browser.');
        }

        const constraints: MediaStreamConstraints = {
          video: {
            facingMode: cameraFacing,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (!isMounted) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            setHasCamera(true);
            setCameraLoading(false);
          };
        }
      } catch (err: any) {
        console.warn('WebAR camera initialization notice:', err.message);
        if (isMounted) {
          setHasCamera(false);
          setCameraLoading(false);
          setCameraError(
            err.name === 'NotAllowedError'
              ? 'Camera permission denied. Rendering in Celebratory Spatial Studio mode.'
              : 'Camera unavailable in this environment. Enjoying in 3D Festive Studio mode.'
          );
        }
      }
    }

    initCamera();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [isOpen, cameraFacing]);

  // Audio effect on placement / rotate
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // AudioContext unavailable
    }
  };

  // High-Res Photo Snapshot
  const handleCaptureSnapshot = () => {
    playChime();
    confetti({ particleCount: 35, spread: 60 });
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 2500);

    const canvas = document.querySelector('.webar-r3f-canvas canvas') as HTMLCanvasElement;
    if (!canvas) return;

    // Composite camera video + canvas onto snapshot
    const captureCanvas = document.createElement('canvas');
    captureCanvas.width = canvas.width || 1280;
    captureCanvas.height = canvas.height || 720;
    const ctx = captureCanvas.getContext('2d');
    if (!ctx) return;

    if (hasCamera && videoRef.current) {
      ctx.drawImage(videoRef.current, 0, 0, captureCanvas.width, captureCanvas.height);
    } else {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, captureCanvas.width, captureCanvas.height);
    }

    ctx.drawImage(canvas, 0, 0, captureCanvas.width, captureCanvas.height);

    // Cultural Festive Watermark
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(20, captureCanvas.height - 70, 480, 50);
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 20px serif';
    ctx.fillText(`✨ ${holiday.name} — ${holiday.country}`, 35, captureCanvas.height - 38);

    const link = document.createElement('a');
    link.download = `WebAR_${holiday.name.replace(/\s+/g, '_')}_3D.png`;
    link.href = captureCanvas.toDataURL('image/png');
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Main Fullscreen AR Container */}
      <div className="relative w-full h-full flex flex-col overflow-hidden bg-black select-none">
        {/* Background Real-World Camera Stream */}
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            hasCamera ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Fallback Ambient Backdrop if Camera is Disabled or Denied */}
        {!hasCamera && (
          <div className="absolute inset-0 bg-radial from-stone-900 via-stone-950 to-black flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute top-20 text-center px-4">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                Spatial 3D Studio Mode
              </span>
              {cameraError && (
                <p className="text-xs text-stone-400 mt-2 max-w-sm mx-auto">
                  {cameraError}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Top Floating Control Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10 text-white">
            <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <div>
              <div className="text-xs font-bold leading-none">{holiday.name}</div>
              <div className="text-[10px] text-stone-400 font-mono mt-0.5">React Three Fiber WebAR</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Camera Switch (Front/Back) */}
            <button
              onClick={() => setCameraFacing(prev => prev === 'environment' ? 'user' : 'environment')}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md transition cursor-pointer"
              title="Switch Camera (Front/Rear)"
            >
              <SwitchCamera className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md transition cursor-pointer"
              title="Toggle Festive Chimes"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 backdrop-blur-md transition cursor-pointer"
              title="Exit WebAR"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D React-Three-Fiber Canvas Layer (Rendered over the camera feed) */}
        <div className="absolute inset-0 z-10 webar-r3f-canvas pointer-events-auto">
          <Canvas
            camera={{ position: [0, 0, 3], fov: 50 }}
            gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
          >
            {/* Ambient Lighting & Shadows */}
            <ambientLight intensity={0.9} />
            <directionalLight position={[3, 5, 2]} intensity={1.5} />
            <pointLight position={[-3, -2, -2]} intensity={0.5} color="#38bdf8" />

            {/* Floating Sparkles around Festive Center */}
            <Sparkles count={40} scale={4} size={2.5} speed={0.4} color="#f59e0b" opacity={0.6} />

            {/* Centered Festive 3D Artifact */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
              <group rotation={[0, rotationAngle, 0]}>
                {selectedDecorType === 'diya_lamp' && <DiyaModel scale={scaleFactor} />}
                {selectedDecorType === 'menorah' && <MenorahModel scale={scaleFactor} />}
                {selectedDecorType === 'sugar_skull' && <SugarSkullModel scale={scaleFactor} />}
                {selectedDecorType === 'crescent_lantern' && <FanoosLanternModel scale={scaleFactor} />}
                {selectedDecorType === 'songkran_water_bowl' && <SongkranBowlModel scale={scaleFactor} />}
                {selectedDecorType === 'mid_autumn_rabbit' && <RabbitLanternModel scale={scaleFactor} />}
                {selectedDecorType === 'fireworks_sparkler' && <FestiveSparklerModel scale={scaleFactor} />}
              </group>
            </Float>

            {/* Freeform Touch Rotation & Panning */}
            <OrbitControls enableZoom={false} enablePan={true} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
          </Canvas>
        </div>

        {/* Bottom Interactive HUD: Decor Selectors, Sliders & Camera Snapshot */}
        <div className="absolute bottom-6 left-4 right-4 z-20 flex flex-col items-center gap-3 pointer-events-auto">
          {/* Traditional Symbol Selector Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 overflow-x-auto max-w-full">
            {[
              { id: 'diya_lamp', label: 'Diya Lamp' },
              { id: 'menorah', label: 'Menorah' },
              { id: 'sugar_skull', label: 'Sugar Skull' },
              { id: 'crescent_lantern', label: 'Fanoos' },
              { id: 'songkran_water_bowl', label: 'Lotus Bowl' },
              { id: 'mid_autumn_rabbit', label: 'Moon Rabbit' },
              { id: 'fireworks_sparkler', label: 'Crystal Orb' }
            ].map(decor => (
              <button
                key={decor.id}
                onClick={() => {
                  setSelectedDecorType(decor.id);
                  playChime();
                }}
                className={`py-1.5 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedDecorType === decor.id
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {decor.label}
              </button>
            ))}
          </div>

          {/* Quick Adjustment Controls & Capture Trigger */}
          <div className="flex items-center justify-between w-full max-w-md bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-white">
            {/* Scale Slider */}
            <div className="flex items-center gap-2">
              <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={scaleFactor}
                onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
                className="w-20 sm:w-24 accent-amber-500 cursor-pointer"
                title="Scale 3D Artifact"
              />
              <span className="text-[10px] font-mono text-stone-400">{scaleFactor.toFixed(1)}x</span>
            </div>

            {/* Quick 90deg Spin */}
            <button
              onClick={() => {
                setRotationAngle(prev => prev + Math.PI / 4);
                playChime();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer"
              title="Rotate 45°"
            >
              <RotateCw className="w-4 h-4 text-cyan-400" />
            </button>

            {/* High-Resolution Capture Photo Button */}
            <button
              onClick={handleCaptureSnapshot}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-500/20 active:scale-95 transition cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>{snapshotTaken ? 'Saved!' : 'Snap Photo'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
