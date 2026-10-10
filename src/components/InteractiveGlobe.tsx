import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  Globe as GlobeIcon, 
  Sparkles, 
  MapPin, 
  Info,
  Layers,
  ArrowRight,
  CalendarPlus,
  Download,
  ExternalLink,
  X,
  Eye,
  Check,
  Calendar,
  Utensils,
  MessageSquareQuote,
  Filter,
  Footprints,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Map,
  BookOpen
} from 'lucide-react';
import { Holiday } from '../types';
import { GLOBAL_HOLIDAYS_DATA } from '../data';
import { HOLIDAY_TRAILS_DATA, HolidayTrail, HolidayTrailStop } from '../data/holidayTrails';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import confetti from 'canvas-confetti';

interface InteractiveGlobeProps {
  holidays: Holiday[];
  selectedCountry: string;
  onSelectCountry: (country: string) => void;
  onSelectHoliday?: (holiday: Holiday) => void;
  onSyncGoogleCalendar?: (holiday: Holiday) => void;
}

interface CountryPoint {
  name: string;
  countryCode: string;
  lat: number;
  lng: number;
  holidays: Holiday[];
  flag: string;
}

export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  holidays,
  selectedCountry,
  onSelectCountry,
  onSelectHoliday,
  onSyncGoogleCalendar
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [hoveredPoint, setHoveredPoint] = useState<CountryPoint | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedCountryPopup, setSelectedCountryPopup] = useState<CountryPoint | null>(null);
  const [calendarToast, setCalendarToast] = useState<string | null>(null);

  // Holiday Trails State
  const [selectedTrailId, setSelectedTrailId] = useState<string | null>('silk-road-lunar');
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const [autoTourActive, setAutoTourActive] = useState<boolean>(false);

  const activeTrail = HOLIDAY_TRAILS_DATA.find(t => t.id === selectedTrailId) || null;
  const currentTrailStop = activeTrail ? activeTrail.stops[activeStopIndex] : null;

  // Combine provided holidays with full catalog
  const allHolidays = holidays && holidays.length > 0 ? holidays : GLOBAL_HOLIDAYS_DATA;

  // Predefined country coordinate registry for world cultures & celebrations
  const baseCountryPoints: Omit<CountryPoint, 'holidays'>[] = [
    { name: 'India', countryCode: 'IN', lat: 20.5937, lng: 78.9629, flag: '🇮🇳' },
    { name: 'Mexico', countryCode: 'MX', lat: 23.6345, lng: -102.5528, flag: '🇲🇽' },
    { name: 'China', countryCode: 'CN', lat: 35.8617, lng: 104.1954, flag: '🇨🇳' },
    { name: 'Germany', countryCode: 'DE', lat: 51.1657, lng: 10.4515, flag: '🇩🇪' },
    { name: 'Brazil', countryCode: 'BR', lat: -14.2350, lng: -51.9253, flag: '🇧🇷' },
    { name: 'Thailand', countryCode: 'TH', lat: 15.8700, lng: 100.9925, flag: '🇹🇭' },
    { name: 'Ireland', countryCode: 'IE', lat: 53.1424, lng: -7.6921, flag: '🇮🇪' },
    { name: 'Japan', countryCode: 'JP', lat: 36.2048, lng: 138.2529, flag: '🇯🇵' },
    { name: 'Saudi Arabia', countryCode: 'SA', lat: 23.8859, lng: 45.0792, flag: '🇸🇦' },
    { name: 'United States', countryCode: 'US', lat: 37.0902, lng: -95.7129, flag: '🇺🇸' },
    { name: 'Sweden', countryCode: 'SE', lat: 60.1282, lng: 18.6435, flag: '🇸🇪' },
    { name: 'New Zealand', countryCode: 'NZ', lat: -40.9006, lng: 174.8860, flag: '🇳🇿' },
    { name: 'Ethiopia', countryCode: 'ET', lat: 9.1450, lng: 40.4897, flag: '🇪🇹' },
    { name: 'Peru', countryCode: 'PE', lat: -9.1900, lng: -75.0152, flag: '🇵🇪' },
    { name: 'Global & UN', countryCode: 'UN', lat: 40.7128, lng: -74.0060, flag: '🌐' }
  ];

  const countryPoints: CountryPoint[] = baseCountryPoints.map(cp => {
    const matched = allHolidays.filter(h => {
      if (cp.countryCode !== 'UN' && h.countryCode === cp.countryCode) return true;
      const cLower = cp.name.toLowerCase();
      const hCountryLower = h.country.toLowerCase();
      return hCountryLower.includes(cLower) || cLower.includes(hCountryLower);
    });

    matched.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));

    return {
      ...cp,
      holidays: matched
    };
  });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const trailGroupRef = useRef<THREE.Group | null>(null);
  const pinMeshesRef = useRef<{ mesh: THREE.Mesh; point: CountryPoint }[]>([]);
  const trailCurvesRef = useRef<THREE.QuadraticBezierCurve3[]>([]);
  const photonMeshesRef = useRef<THREE.Mesh[]>([]);

  // Coordinate helper: converts Lat/Lng to 3D Sphere coordinates
  const latLngToVector3 = useCallback((lat: number, lng: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }, []);

  // Smoothly rotate globe to face coordinates
  const flyToLatLng = useCallback((lat: number, lng: number) => {
    if (!globeGroupRef.current) return;
    const targetY = -(lng + 180) * (Math.PI / 180) + Math.PI / 2;
    const targetX = (lat) * (Math.PI / 180) * 0.45;
    globeGroupRef.current.rotation.y = targetY;
    globeGroupRef.current.rotation.x = targetX;
  }, []);

  const handleSelectCountryPoint = (point: CountryPoint) => {
    setSelectedCountryPopup(point);
    setAutoRotate(false);
    setAutoTourActive(false);
    flyToLatLng(point.lat, point.lng);
    try {
      confetti({
        particleCount: 22,
        spread: 45,
        origin: { y: 0.55 }
      });
    } catch {}
  };

  const triggerCalendarFeedback = (holidayName: string, service: string) => {
    setCalendarToast(`Added "${holidayName}" to ${service}!`);
    setTimeout(() => setCalendarToast(null), 3500);
  };

  // Switch Trail
  const handleSelectTrail = (trailId: string | null) => {
    setSelectedTrailId(trailId);
    setActiveStopIndex(0);
    setSelectedCountryPopup(null);
    if (trailId) {
      const trail = HOLIDAY_TRAILS_DATA.find(t => t.id === trailId);
      if (trail && trail.stops[0]) {
        flyToLatLng(trail.stops[0].lat, trail.stops[0].lng);
        try {
          confetti({ particleCount: 25, spread: 50 });
        } catch {}
      }
    }
  };

  // Next / Prev Stop on Trail
  const handleNavigateStop = (direction: 'next' | 'prev') => {
    if (!activeTrail) return;
    const total = activeTrail.stops.length;
    let nextIdx = activeStopIndex;
    if (direction === 'next') {
      nextIdx = (activeStopIndex + 1) % total;
    } else {
      nextIdx = (activeStopIndex - 1 + total) % total;
    }
    setActiveStopIndex(nextIdx);
    const targetStop = activeTrail.stops[nextIdx];
    flyToLatLng(targetStop.lat, targetStop.lng);
  };

  // Auto-tour timer
  useEffect(() => {
    if (!autoTourActive || !activeTrail) return;
    const interval = setInterval(() => {
      setActiveStopIndex(prev => {
        const next = (prev + 1) % activeTrail.stops.length;
        const targetStop = activeTrail.stops[next];
        flyToLatLng(targetStop.lat, targetStop.lng);
        return next;
      });
    }, 5500);
    return () => clearInterval(interval);
  }, [autoTourActive, activeTrail, flyToLatLng]);

  // Three.js Scene Setup & Render Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 215);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.outline = 'none';
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight1.position.set(150, 100, 150);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf43f5e, 0.7);
    dirLight2.position.set(-150, -80, -100);
    scene.add(dirLight2);

    // 5. Globe Group
    const globeRadius = 60;
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    // Dynamic Starfield background particles
    const starGeo = new THREE.BufferGeometry();
    const starCount = 350;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 500;
      starPositions[i + 1] = (Math.random() - 0.5) * 500;
      starPositions[i + 2] = -120 + (Math.random() - 0.5) * 150;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.4,
      transparent: true,
      opacity: 0.6
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Canvas procedural map texture
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, 1024);
      grad.addColorStop(0, '#090d16');
      grad.addColorStop(0.5, '#0f172a');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 2048, 1024);

      // Lat/Long subtle coordinates grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= 2048; x += 128) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
      }
      for (let y = 0; y <= 1024; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(2048, y);
        ctx.stroke();
      }

      // Stylized glowing continental dots
      ctx.fillStyle = 'rgba(244, 63, 94, 0.35)';
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 2048;
        const y = Math.random() * 1024;
        if (Math.sin(x / 100) * Math.cos(y / 100) > -0.2) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const sphereTexture = new THREE.CanvasTexture(canvas);
    const sphereGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      map: sphereTexture,
      roughness: 0.7,
      metalness: 0.1
    });
    const globeSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeGroup.add(globeSphere);

    // Glowing Atmosphere Layer
    const atmosphereGeometry = new THREE.SphereGeometry(globeRadius * 1.04, 48, 48);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphere);

    // Outer Equator Ring
    const ringGeo = new THREE.RingGeometry(globeRadius * 1.25, globeRadius * 1.26, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe11d48,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    globeGroup.add(ringMesh);

    // 6. Country Marker Pins
    pinMeshesRef.current = [];
    countryPoints.forEach(point => {
      const pos = latLngToVector3(point.lat, point.lng, globeRadius);

      const pinGeo = new THREE.SphereGeometry(2.6, 16, 16);
      const isSelected = selectedCountry === point.name || selectedCountryPopup?.name === point.name;
      const pinMat = new THREE.MeshBasicMaterial({
        color: isSelected ? 0xfacc15 : 0xf43f5e
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      globeGroup.add(pinMesh);

      // Pulsing halo
      const pulseGeo = new THREE.RingGeometry(3.0, 4.2, 24);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: isSelected ? 0xfacc15 : 0xf43f5e,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.position.copy(pos);
      pulseMesh.lookAt(0, 0, 0);
      globeGroup.add(pulseMesh);

      pinMeshesRef.current.push({ mesh: pinMesh, point });
    });

    // 7. HOLIDAY TRAIL VISUAL PATH RENDERING (3D CURVED ARCS & TRAVELING PHOTONS)
    const trailGroup = new THREE.Group();
    trailGroupRef.current = trailGroup;
    globeGroup.add(trailGroup);

    trailCurvesRef.current = [];
    photonMeshesRef.current = [];

    if (activeTrail && activeTrail.stops.length > 1) {
      const stops = activeTrail.stops;
      const trailColor = activeTrail.colorHex;

      for (let i = 0; i < stops.length - 1; i++) {
        const stopA = stops[i];
        const stopB = stops[i + 1];

        const vA = latLngToVector3(stopA.lat, stopA.lng, globeRadius);
        const vB = latLngToVector3(stopB.lat, stopB.lng, globeRadius);

        // Compute elevated midpoint arc
        const vMid = vA.clone().add(vB).multiplyScalar(0.5);
        const dist = vA.distanceTo(vB);
        const arcElevation = Math.min(22, Math.max(7, dist * 0.18));
        vMid.normalize().multiplyScalar(globeRadius + arcElevation);

        const curve = new THREE.QuadraticBezierCurve3(vA, vMid, vB);
        trailCurvesRef.current.push(curve);

        // 3D Path Tube
        const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.75, 8, false);
        const tubeMat = new THREE.MeshBasicMaterial({
          color: trailColor,
          transparent: true,
          opacity: 0.85
        });
        const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
        trailGroup.add(tubeMesh);

        // Outer glow halo line
        const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.4
        });
        const lineMesh = new THREE.Line(lineGeo, lineMat);
        trailGroup.add(lineMesh);

        // Animated light photon running along arc
        const photonGeo = new THREE.SphereGeometry(1.6, 12, 12);
        const photonMat = new THREE.MeshBasicMaterial({
          color: 0xffffff
        });
        const photonMesh = new THREE.Mesh(photonGeo, photonMat);
        trailGroup.add(photonMesh);
        photonMeshesRef.current.push(photonMesh);
      }

      // Waypoint milestone beacons at each stop
      stops.forEach((stop, sIdx) => {
        const stopPos = latLngToVector3(stop.lat, stop.lng, globeRadius);
        const isCurrentStop = sIdx === activeStopIndex;

        const beaconGeo = new THREE.SphereGeometry(isCurrentStop ? 3.6 : 2.8, 16, 16);
        const beaconMat = new THREE.MeshBasicMaterial({
          color: isCurrentStop ? 0xffffff : trailColor
        });
        const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
        beaconMesh.position.copy(stopPos);
        trailGroup.add(beaconMesh);

        // Numbered halo ring
        const haloGeo = new THREE.RingGeometry(isCurrentStop ? 4.2 : 3.4, isCurrentStop ? 6.2 : 4.8, 24);
        const haloMat = new THREE.MeshBasicMaterial({
          color: isCurrentStop ? 0xfacc15 : trailColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9
        });
        const haloMesh = new THREE.Mesh(haloGeo, haloMat);
        haloMesh.position.copy(stopPos);
        haloMesh.lookAt(0, 0, 0);
        trailGroup.add(haloMesh);
      });
    }

    // 8. Interactive Orbit/Drag handlers
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragTotalDistance = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragTotalDistance = 0;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      if (isDragging && globeGroupRef.current) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        dragTotalDistance += Math.hypot(deltaX, deltaY);

        globeGroupRef.current.rotation.y += deltaX * 0.006;
        globeGroupRef.current.rotation.x += deltaY * 0.006;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }

      // Raycaster for hover
      if (cameraRef.current && sceneRef.current) {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);
        const meshesToTest = pinMeshesRef.current.map(p => p.mesh);
        const intersects = raycaster.intersectObjects(meshesToTest);

        if (intersects.length > 0) {
          const hitMesh = intersects[0].object;
          const hitItem = pinMeshesRef.current.find(p => p.mesh === hitMesh);
          if (hitItem) {
            setHoveredPoint(hitItem.point);
            setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            container.style.cursor = 'pointer';
            return;
          }
        }
      }

      setHoveredPoint(null);
      container.style.cursor = isDragging ? 'grabbing' : 'grab';
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onClick = (e: MouseEvent) => {
      if (dragTotalDistance > 6) return;

      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      if (cameraRef.current && sceneRef.current) {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);
        const meshesToTest = pinMeshesRef.current.map(p => p.mesh);
        const intersects = raycaster.intersectObjects(meshesToTest);

        if (intersects.length > 0) {
          const hitMesh = intersects[0].object;
          const hitItem = pinMeshesRef.current.find(p => p.mesh === hitMesh);
          if (hitItem) {
            handleSelectCountryPoint(hitItem.point);
          }
        }
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('click', onClick);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle planetary auto-rotation when idle and no popup
      if (autoRotate && globeGroupRef.current && !isDragging && !selectedCountryPopup && !autoTourActive) {
        globeGroupRef.current.rotation.y += 0.0025;
      }

      // Update light photon positions along curves
      if (trailCurvesRef.current.length > 0 && photonMeshesRef.current.length > 0) {
        trailCurvesRef.current.forEach((curve, idx) => {
          const photon = photonMeshesRef.current[idx];
          if (photon) {
            const t = (elapsedTime * 0.45 + idx * 0.22) % 1;
            const pt = curve.getPointAt(t);
            photon.position.copy(pt);
          }
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    // 10. Resize Observer
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newWidth / newHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('click', onClick);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedCountry, selectedCountryPopup, activeTrail, activeStopIndex, autoRotate, autoTourActive, latLngToVector3]);

  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const currentZ = cameraRef.current.position.z;
    const targetZ = direction === 'in' ? Math.max(130, currentZ - 25) : Math.min(350, currentZ + 25);
    cameraRef.current.position.z = targetZ;
  };

  const handleInspectHolidayFromStop = (stop: HolidayTrailStop) => {
    const matched = allHolidays.find(h => 
      h.name.toLowerCase().includes(stop.holidayName.toLowerCase()) || 
      stop.holidayName.toLowerCase().includes(h.name.toLowerCase())
    );

    if (matched && onSelectHoliday) {
      onSelectHoliday(matched);
    } else if (onSelectHoliday) {
      // Fallback holiday object
      onSelectHoliday({
        id: stop.id,
        name: stop.holidayName,
        date: stop.date,
        month: parseInt(stop.date.split('-')[1], 10),
        day: parseInt(stop.date.split('-')[2], 10),
        country: stop.countryName,
        countryCode: stop.countryCode,
        category: 'cultural',
        description: stop.lore,
        traditions: [stop.lore, stop.traditionalBlessing],
        greeting: stop.traditionalBlessing,
        foodDelicacies: ['Traditional Feast', 'Festive Delicacy'],
        bannerUrl: stop.bannerUrl,
        tags: ['Cultural Heritage', 'Holiday Trail', stop.countryName],
        facts: [stop.lore],
        popularityScore: 98
      });
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-stone-900 via-slate-950 to-stone-950 border border-stone-800 shadow-2xl p-4 sm:p-6 text-white min-h-[580px] flex flex-col justify-between">
      {/* Globe Overlay Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-rose-500/30">
              <GlobeIcon className="w-3 h-3 text-rose-400" />
              Interactive 3D Celebrations Globe
            </span>
            <span className="text-xs text-stone-400">Visual Cultural Paths & Connected Traditions</span>
          </div>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-white mt-1">
            Global Culture & Holiday Trails Hemisphere
          </h2>
          <p className="text-xs text-stone-300 max-w-xl mt-0.5">
            Follow interconnected holiday trails highlighting shared cultural histories across continents, or click any country beacon for top holidays and calendar sync.
          </p>
        </div>

        {/* Globe Controls */}
        <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-stone-700/60 shadow-lg">
          <button
            onClick={() => { setAutoRotate(!autoRotate); setAutoTourActive(false); }}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              autoRotate ? 'bg-rose-600 text-white' : 'text-stone-400 hover:text-white'
            }`}
            title="Toggle Auto Spin"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">{autoRotate ? 'Spinning' : 'Paused'}</span>
          </button>

          <button
            onClick={() => handleZoom('in')}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleZoom('out')}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {selectedCountry && selectedCountry !== 'all' && (
            <button
              onClick={() => onSelectCountry('all')}
              className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 transition"
            >
              Reset Country
            </button>
          )}
        </div>
      </div>

      {/* HOLIDAY TRAILS SELECTOR PILLS */}
      <div className="relative z-10 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
          <Footprints className="w-3.5 h-3.5 text-amber-400" />
          Holiday Trails:
        </span>

        <button
          onClick={() => handleSelectTrail(null)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 flex items-center gap-1.5 ${
            selectedTrailId === null
              ? 'bg-white text-stone-900 shadow-md font-bold'
              : 'bg-stone-800/80 hover:bg-stone-700 text-stone-300'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>All Country Beacons</span>
        </button>

        {HOLIDAY_TRAILS_DATA.map(trail => {
          const isSelected = selectedTrailId === trail.id;
          return (
            <button
              key={trail.id}
              onClick={() => handleSelectTrail(trail.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-md font-bold'
                  : 'bg-stone-800/80 hover:bg-stone-700 text-stone-300 border-transparent'
              }`}
            >
              <span>{trail.icon}</span>
              <span>{trail.shortTitle}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 font-mono">
                {trail.stops.length} stops
              </span>
            </button>
          );
        })}
      </div>

      {/* 3D Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full flex-1 min-h-[380px] relative flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Floating Tooltip when hovering over a Country Beacon */}
        {hoveredPoint && !selectedCountryPopup && (
          <div
            className="absolute z-20 pointer-events-none bg-stone-900/95 backdrop-blur-md border border-stone-700 p-3 rounded-2xl shadow-2xl text-xs space-y-1 transform -translate-x-1/2 -translate-y-full mb-3 min-w-[200px]"
            style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{hoveredPoint.flag}</span>
              <span className="font-bold text-white text-xs">{hoveredPoint.name}</span>
            </div>
            <div className="text-[11px] text-stone-300">
              {hoveredPoint.holidays.length} Celebrations in Archive
            </div>
            {hoveredPoint.holidays[0] && (
              <div className="text-[10px] text-rose-400 font-semibold truncate pt-0.5">
                🎉 Featured: {hoveredPoint.holidays[0].name}
              </div>
            )}
            <div className="text-[9px] uppercase tracking-wider text-amber-400 font-bold pt-1">
              Click to view Top 3 Holidays + Add to Calendar →
            </div>
          </div>
        )}
      </div>

      {/* Toast Feedback for Calendar Actions */}
      {calendarToast && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 bg-emerald-600/95 text-white px-4 py-2 rounded-2xl shadow-2xl border border-emerald-400/40 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-white" />
          <span>{calendarToast}</span>
        </div>
      )}

      {/* ACTIVE HOLIDAY TRAIL FLIGHT HUD OVERLAY */}
      {activeTrail && currentTrailStop && (
        <div className="relative z-20 mt-3 p-4 sm:p-5 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-amber-500/30 shadow-2xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                {activeTrail.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    Trail Stop {activeStopIndex + 1} of {activeTrail.stops.length}
                  </span>
                  <span className="text-[11px] text-stone-400">•</span>
                  <span className="text-xs text-stone-300 font-bold">
                    {currentTrailStop.countryName}
                  </span>
                </div>
                <h4 className="font-serif font-black text-base sm:text-lg text-white">
                  {currentTrailStop.holidayName}
                </h4>
              </div>
            </div>

            {/* Navigation & Auto-tour controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoTourActive(!autoTourActive)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                  autoTourActive
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                }`}
                title="Auto glide from stop to stop"
              >
                {autoTourActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{autoTourActive ? 'Auto Tour: ON' : 'Auto Tour'}</span>
              </button>

              <button
                onClick={() => handleNavigateStop('prev')}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white transition"
                title="Previous Trail Stop"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavigateStop('next')}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white transition"
                title="Next Trail Stop"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedTrailId(null)}
                className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white transition"
                title="Close Trail View"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cultural Lore narrative & Actions */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <p className="text-xs text-stone-300 leading-relaxed">
                <span className="font-bold text-amber-300">Shared History & Cultural Link: </span>
                {currentTrailStop.lore}
              </p>
              <p className="text-[11px] text-stone-400 italic">
                "{currentTrailStop.traditionalBlessing}"
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
              <button
                onClick={() => handleInspectHolidayFromStop(currentTrailStop)}
                className="flex-1 md:flex-none py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-md"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explore Details & Gift Guide</span>
              </button>

              <button
                onClick={() => {
                  const fakeH: Holiday = {
                    id: currentTrailStop.id,
                    name: currentTrailStop.holidayName,
                    date: currentTrailStop.date,
                    month: 1,
                    day: 1,
                    country: currentTrailStop.countryName,
                    countryCode: currentTrailStop.countryCode,
                    category: 'cultural',
                    description: currentTrailStop.lore,
                    traditions: [currentTrailStop.lore],
                    greeting: currentTrailStop.traditionalBlessing,
                    bannerUrl: currentTrailStop.bannerUrl,
                    foodDelicacies: [],
                    tags: ['Cultural Heritage', 'Holiday Trail'],
                    facts: [currentTrailStop.lore],
                    popularityScore: 95
                  };
                  if (onSyncGoogleCalendar) onSyncGoogleCalendar(fakeH);
                  triggerCalendarFeedback(currentTrailStop.holidayName, 'Google Calendar');
                }}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
                title="Add to Google Calendar"
              >
                <CalendarPlus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COUNTRY CELEBRATION SUMMARY POPUP (TOP 3 HOLIDAYS + CALENDAR QUICK-LINKS) */}
      {selectedCountryPopup && (
        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-stone-900/95 border border-stone-700/80 rounded-3xl shadow-2xl p-5 sm:p-6 max-w-2xl w-full max-h-[90%] flex flex-col space-y-4 overflow-hidden ring-1 ring-white/10">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-stone-800/80 border border-stone-700/80 flex items-center justify-center text-3xl shadow-inner">
                  {selectedCountryPopup.flag}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                      {selectedCountryPopup.name}
                    </h3>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {selectedCountryPopup.countryCode}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Top Cultural & Sacred Celebrations ({selectedCountryPopup.holidays.length} Total Observances Recorded)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCountryPopup(null)}
                className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TOP 3 HOLIDAYS CARDS LIST */}
            <div className="overflow-y-auto space-y-3 pr-1 py-1 no-scrollbar">
              {selectedCountryPopup.holidays.slice(0, 3).map((holiday, idx) => (
                <div
                  key={holiday.id}
                  className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/90 hover:border-rose-500/40 transition space-y-2.5 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {holiday.bannerUrl && (
                        <img
                          src={holiday.bannerUrl}
                          alt={holiday.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-700"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-serif font-bold text-white group-hover:text-rose-400 transition">
                            {idx + 1}. {holiday.name}
                          </span>
                          {holiday.localName && (
                            <span className="text-[11px] text-stone-400 italic">
                              ({holiday.localName})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-stone-400">
                          <span className="font-mono text-amber-300 font-semibold flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {holiday.date}
                          </span>
                          <span>•</span>
                          <span className="capitalize px-1.5 py-0.2 rounded bg-stone-800 text-stone-300 text-[10px]">
                            {holiday.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Add to Calendar Links */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => {
                          if (onSyncGoogleCalendar) {
                            onSyncGoogleCalendar(holiday);
                          }
                          triggerCalendarFeedback(holiday.name, 'Google Calendar');
                        }}
                        className="py-1.5 px-3 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
                        title="Add directly to Google Calendar"
                      >
                        <CalendarPlus className="w-3.5 h-3.5 text-indigo-300" />
                        <span>Google Calendar</span>
                      </button>

                      <button
                        onClick={() => {
                          downloadIcsFile(holiday, 1);
                          triggerCalendarFeedback(holiday.name, '.ICS file');
                        }}
                        className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 hover:text-white transition"
                        title="Download standard iCal / Outlook (.ics)"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      {onSelectHoliday && (
                        <button
                          onClick={() => {
                            setSelectedCountryPopup(null);
                            onSelectHoliday(holiday);
                          }}
                          className="p-1.5 rounded-xl bg-rose-600/30 hover:bg-rose-600 border border-rose-500/40 text-rose-200 hover:text-white transition"
                          title="View Full Details & Traditions"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Summary snippet */}
                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                    {holiday.description}
                  </p>

                  {/* Traditions snippet */}
                  {holiday.traditions && holiday.traditions.length > 0 && (
                    <div className="flex items-center gap-2 text-[11px] text-stone-400">
                      <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">
                        Key ritual: {holiday.traditions[0]}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400">
                Filter feed to only display celebrations from {selectedCountryPopup.name}?
              </span>
              <button
                onClick={() => {
                  onSelectCountry(selectedCountryPopup.name);
                  setSelectedCountryPopup(null);
                }}
                className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold transition flex items-center gap-1.5"
              >
                <span>Filter Dashboard by {selectedCountryPopup.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
