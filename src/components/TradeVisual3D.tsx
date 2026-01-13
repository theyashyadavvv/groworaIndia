import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';

// Indian Ports of Operation
const indianPorts = [
  { name: 'JNPT (Mumbai)', lat: 18.9667, lng: 72.9500, population: 15000000, region: 'India', type: 'port' },
  { name: 'Mundra Port', lat: 22.8390, lng: 69.7190, population: 12000000, region: 'India', type: 'port' },
  { name: 'Kandla Port', lat: 23.0300, lng: 70.2167, population: 11000000, region: 'India', type: 'port' },
  { name: 'Hazira Port', lat: 21.1100, lng: 72.6167, population: 10000000, region: 'India', type: 'port' },
  { name: 'Kolkata Port', lat: 22.5726, lng: 88.3639, population: 14000000, region: 'India', type: 'port' },
];

// International Markets - Africa
const africaMarkets = [
  { name: 'Lagos', lat: 6.5244, lng: 3.3792, population: 14368000, region: 'Africa', type: 'destination' },
  { name: 'Cairo', lat: 30.0444, lng: 31.2357, population: 20900000, region: 'Africa', type: 'destination' },
  { name: 'Kinshasa', lat: -4.4419, lng: 15.2663, population: 14970000, region: 'Africa', type: 'destination' },
  { name: 'Nairobi', lat: -1.2864, lng: 36.8172, population: 11000000, region: 'Africa', type: 'destination' },
  { name: 'Addis Ababa', lat: 9.0320, lng: 38.7469, population: 10000000, region: 'Africa', type: 'destination' },
  { name: 'Dar es Salaam', lat: -6.7924, lng: 39.2083, population: 9000000, region: 'Africa', type: 'destination' },
  { name: 'Khartoum', lat: 15.5007, lng: 32.5599, population: 8500000, region: 'Africa', type: 'destination' },
];

// International Markets - Middle East
const middleEastMarkets = [
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, population: 15000000, region: 'Middle East', type: 'destination' },
  { name: 'Riyadh', lat: 24.7136, lng: 46.6753, population: 13000000, region: 'Middle East', type: 'destination' },
  { name: 'Baghdad', lat: 33.3152, lng: 44.3661, population: 12000000, region: 'Middle East', type: 'destination' },
  { name: 'Tehran', lat: 35.6892, lng: 51.3890, population: 14000000, region: 'Middle East', type: 'destination' },
  { name: 'Istanbul', lat: 41.0082, lng: 28.9784, population: 15460000, region: 'Middle East', type: 'destination' },
  { name: 'Jeddah', lat: 21.5433, lng: 39.1728, population: 10000000, region: 'Middle East', type: 'destination' },
];

// International Markets - Southeast Asia
const southeastAsiaMarkets = [
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, population: 12000000, region: 'Southeast Asia', type: 'destination' },
  { name: 'Jakarta', lat: -6.2088, lng: 106.8456, population: 14000000, region: 'Southeast Asia', type: 'destination' },
  { name: 'Bangkok', lat: 13.7563, lng: 100.5018, population: 13000000, region: 'Southeast Asia', type: 'destination' },
  { name: 'Manila', lat: 14.5995, lng: 120.9842, population: 13923000, region: 'Southeast Asia', type: 'destination' },
];

// International Markets - South Asia
const southAsiaMarkets = [
  { name: 'Dhaka', lat: 23.8103, lng: 90.4125, population: 14000000, region: 'South Asia', type: 'destination' },
  { name: 'Karachi', lat: 24.8607, lng: 67.0011, population: 13000000, region: 'South Asia', type: 'destination' },
  { name: 'Colombo', lat: 6.9271, lng: 79.8612, population: 10000000, region: 'South Asia', type: 'destination' },
];

// Combine all locations
const cities = [
  ...indianPorts,
  ...africaMarkets,
  ...middleEastMarkets,
  ...southeastAsiaMarkets,
  ...southAsiaMarkets,
];

// Create trade route arcs from Indian ports to all international markets
const createTradeArcs = () => {
  const arcs: any[] = [];
  const destinations = [...africaMarkets, ...middleEastMarkets, ...southeastAsiaMarkets, ...southAsiaMarkets];
  
  // From JNPT (Mumbai) - main port for Africa and Middle East
  const jnpt = indianPorts[0];
  [...africaMarkets, ...middleEastMarkets].forEach(dest => {
    arcs.push({
      startLat: jnpt.lat,
      startLng: jnpt.lng,
      endLat: dest.lat,
      endLng: dest.lng,
      region: dest.region,
    });
  });
  
  // From Kolkata Port - main for Southeast and South Asia
  const kolkata = indianPorts[4];
  [...southeastAsiaMarkets, ...southAsiaMarkets].forEach(dest => {
    arcs.push({
      startLat: kolkata.lat,
      startLng: kolkata.lng,
      endLat: dest.lat,
      endLng: dest.lng,
      region: dest.region,
    });
  });
  
  return arcs;
};

const tradeArcs = createTradeArcs();

function TradeVisual3D() {
  const globeEl = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile breakpoint at 768px
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile || !globeEl.current) return;

    // Initialize globe with alpha transparency enabled
    const globe = Globe({ 
      rendererConfig: { 
        alpha: true, 
        antialias: true,
        preserveDrawingBuffer: true
      } 
    })
      (globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .showAtmosphere(true)
      .atmosphereColor('rgba(52, 168, 83, 0.15)')
      .atmosphereAltitude(0.15)
      .labelsData(cities)
      .labelLat((d: any) => d.lat)
      .labelLng((d: any) => d.lng)
      .labelText((d: any) => d.name)
      .labelSize((d: any) => Math.sqrt(d.population) * 4e-4)
      .labelDotRadius((d: any) => Math.sqrt(d.population) * 4e-4)
      .labelColor((d: any) => {
        if (d.type === 'port') return 'rgba(52, 168, 83, 0.95)';
        return 'rgba(52, 168, 83, 0.8)';
      })
      .labelResolution(2)
      .arcsData(tradeArcs)
      .arcColor((d: any) => {
        if (d.region === 'Africa') return 'rgba(52, 168, 83, 0.6)';
        if (d.region === 'Middle East') return 'rgba(76, 175, 80, 0.6)';
        if (d.region === 'Southeast Asia') return 'rgba(11, 58, 102, 0.6)';
        if (d.region === 'South Asia') return 'rgba(23, 74, 122, 0.6)';
        return 'rgba(52, 168, 83, 0.5)';
      })
      .arcDashLength(0.4)
      .arcDashGap(0.2)
      .arcDashAnimateTime(2000)
      .arcStroke(0.5)
      .arcAltitude(0.2)
      .arcAltitudeAutoScale(0.3)
      .width(globeEl.current.clientWidth)
      .height(globeEl.current.clientHeight);

    // Remove scene background for full transparency
    const scene = globe.scene();
    if (scene) {
      // Set to hero section blue color instead of null
      const THREE = (window as any).THREE;
      if (THREE) {
        scene.background = new THREE.Color(0x3d5a80); // Lighter blue matching hero section
      }
    }

    // Configure renderer background to match hero section
    const renderer = globe.renderer();
    if (renderer) {
      renderer.setClearColor(0x3d5a80, 1); // Lighter blue with full opacity
      const canvas = renderer.domElement;
      if (canvas) {
        canvas.style.background = '#3d5a80';
        canvas.style.backgroundColor = '#3d5a80';
      }
    }

    // Also set on the container
    if (globeEl.current) {
      const container = globeEl.current;
      container.style.background = '#3d5a80';
      container.style.backgroundColor = '#3d5a80';
      
      // Find and set canvas background
      const canvas = container.querySelector('canvas');
      if (canvas) {
        canvas.style.background = '#3d5a80';
        canvas.style.backgroundColor = '#3d5a80';
      }
    }

    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.3;

    // Set initial view focused on India and its trade routes
    globe.pointOfView({ lat: 20, lng: 60, altitude: 2.5 });

    // Handle resize
    const handleResize = () => {
      if (globeEl.current) {
        globe
          .width(globeEl.current.clientWidth)
          .height(globeEl.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  if (isMobile) {
    return null; // Do not render the globe on mobile devices
  }

  return (
    <div 
      ref={globeEl} 
      className="globe-container"
      style={{ 
        width: '100%', 
        height: '100%',
        minHeight: '500px',
        background: '#3d5a80',
        backgroundColor: '#3d5a80',
        overflow: 'visible'
      }}
    />
  );
}

export default TradeVisual3D;
