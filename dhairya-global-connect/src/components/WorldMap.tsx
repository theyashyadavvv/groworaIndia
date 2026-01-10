import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Market locations with coordinates
const markets = [
  // Africa
  { name: 'Nigeria', coordinates: [8.6753, 9.082], region: 'Africa' },
  { name: 'Kenya', coordinates: [37.9062, -1.2921], region: 'Africa' },
  { name: 'Tanzania', coordinates: [34.8888, -6.369], region: 'Africa' },
  { name: 'Ghana', coordinates: [-1.0232, 7.9465], region: 'Africa' },
  { name: 'South Africa', coordinates: [22.9375, -30.5595], region: 'Africa' },
  { name: 'Ethiopia', coordinates: [40.4897, 9.145], region: 'Africa' },
  
  // Middle East
  { name: 'UAE', coordinates: [53.8478, 23.4241], region: 'Middle East' },
  { name: 'Saudi Arabia', coordinates: [45.0792, 23.8859], region: 'Middle East' },
  { name: 'Iraq', coordinates: [43.6793, 33.2232], region: 'Middle East' },
  { name: 'Yemen', coordinates: [48.5164, 15.5527], region: 'Middle East' },
  { name: 'Oman', coordinates: [55.9754, 21.4735], region: 'Middle East' },
  { name: 'Qatar', coordinates: [51.1839, 25.3548], region: 'Middle East' },
  
  // Southeast Asia
  { name: 'Malaysia', coordinates: [101.9758, 4.2105], region: 'Southeast Asia' },
  { name: 'Indonesia', coordinates: [113.9213, -0.7893], region: 'Southeast Asia' },
  { name: 'Philippines', coordinates: [121.7740, 12.8797], region: 'Southeast Asia' },
  { name: 'Vietnam', coordinates: [108.2772, 14.0583], region: 'Southeast Asia' },
  { name: 'Thailand', coordinates: [100.9925, 15.870], region: 'Southeast Asia' },
  { name: 'Singapore', coordinates: [103.8198, 1.3521], region: 'Southeast Asia' },
  
  // South Asia
  { name: 'Bangladesh', coordinates: [90.3563, 23.685], region: 'South Asia' },
  { name: 'Sri Lanka', coordinates: [80.7718, 7.8731], region: 'South Asia' },
  { name: 'Nepal', coordinates: [84.124, 28.3949], region: 'South Asia' },
  { name: 'Maldives', coordinates: [73.2207, 3.2028], region: 'South Asia' },
];

// India origin point
const indiaOrigin: [number, number] = [78.9629, 20.5937];

// Region colors
const regionColors: Record<string, string> = {
  'Africa': '#FF6A00',
  'Middle East': '#FFB35C',
  'Southeast Asia': '#0B3A66',
  'South Asia': '#174A7A',
};

function WorldMap() {
  const [hoveredMarket, setHoveredMarket] = useState<string | null>(null);

  return (
    <div className="relative w-full aspect-[2/1] bg-gradient-to-b from-muted/30 to-background rounded-2xl overflow-hidden border border-border/50">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140,
          center: [60, 15],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* World map countries */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isIndia = geo.properties.name === 'India';
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isIndia ? '#FF6A00' : 'hsl(var(--muted))'}
                  stroke="hsl(var(--border))"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      outline: 'none',
                    },
                    hover: {
                      fill: isIndia ? '#FF6A00' : 'hsl(var(--muted-foreground) / 0.3)',
                      outline: 'none',
                    },
                    pressed: {
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Trade route lines from India */}
        {markets.map((market, i) => (
          <Line
            key={`line-${i}`}
            from={indiaOrigin}
            to={market.coordinates as [number, number]}
            stroke={regionColors[market.region]}
            strokeWidth={1}
            strokeOpacity={0.4}
            strokeDasharray="4 2"
            strokeLinecap="round"
          />
        ))}

        {/* India origin marker */}
        <Marker coordinates={indiaOrigin}>
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <circle r={12} fill="#FF6A00" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={4}
              style={{ fontFamily: 'system-ui', fill: '#fff', fontSize: '8px', fontWeight: 'bold' }}
            >
              IN
            </text>
          </motion.g>
          <motion.circle
            r={20}
            fill="none"
            stroke="#FF6A00"
            strokeWidth={2}
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Marker>

        {/* Market markers */}
        {markets.map((market, i) => (
          <Marker
            key={market.name}
            coordinates={market.coordinates as [number, number]}
            onMouseEnter={() => setHoveredMarket(market.name)}
            onMouseLeave={() => setHoveredMarket(null)}
          >
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.05, type: 'spring' }}
              style={{ cursor: 'pointer' }}
            >
              <circle
                r={hoveredMarket === market.name ? 8 : 5}
                fill={regionColors[market.region]}
                stroke="#fff"
                strokeWidth={1.5}
                style={{ transition: 'r 0.2s ease' }}
              />
              {hoveredMarket === market.name && (
                <g>
                  <rect
                    x={-30}
                    y={-30}
                    width={60}
                    height={18}
                    rx={4}
                    fill="hsl(var(--card))"
                    stroke="hsl(var(--border))"
                  />
                  <text
                    textAnchor="middle"
                    y={-18}
                    style={{
                      fontFamily: 'system-ui',
                      fill: 'hsl(var(--foreground))',
                      fontSize: '9px',
                      fontWeight: '500',
                    }}
                  >
                    {market.name}
                  </text>
                </g>
              )}
            </motion.g>
          </Marker>
        ))}
      </ComposableMap>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3">
        {Object.entries(regionColors).map(([region, color]) => (
          <div key={region} className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs font-ui text-foreground">{region}</span>
          </div>
        ))}
      </div>

      {/* India label */}
      <div className="absolute top-4 left-4 bg-gradient-orange px-3 py-1.5 rounded-lg shadow-lg">
        <span className="text-xs font-ui font-semibold text-primary-foreground">🇮🇳 Origin: India</span>
      </div>
    </div>
  );
}

export default memo(WorldMap);
