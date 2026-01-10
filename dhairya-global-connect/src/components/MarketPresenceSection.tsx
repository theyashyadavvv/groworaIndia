import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';

const WorldMap = lazy(() => import('@/components/WorldMap'));

const regions = [
  {
    name: 'Africa',
    countries: ['Nigeria', 'Kenya', 'Tanzania', 'Ghana', 'South Africa', 'Ethiopia', 'Ivory Coast'],
    color: '#FF6A00',
  },
  {
    name: 'Middle East',
    countries: ['UAE', 'Saudi Arabia', 'Iraq', 'Yemen', 'Oman', 'Qatar', 'Kuwait'],
    color: '#FFB35C',
  },
  {
    name: 'Southeast Asia',
    countries: ['Malaysia', 'Indonesia', 'Philippines', 'Vietnam', 'Thailand', 'Singapore'],
    color: '#0B3A66',
  },
  {
    name: 'South Asia',
    countries: ['Bangladesh', 'Sri Lanka', 'Nepal', 'Maldives', 'Bhutan'],
    color: '#174A7A',
  },
];

function MapFallback() {
  return (
    <div className="w-full aspect-[2/1] bg-muted/30 rounded-2xl flex items-center justify-center">
      <div className="text-muted-foreground font-ui">Loading map...</div>
    </div>
  );
}

export default function MarketPresenceSection() {
  return (
    <section id="markets" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-navy/5 via-transparent to-transparent rounded-full" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 rounded-full text-orange font-ui text-sm mb-4"
          >
            <Globe className="w-4 h-4" />
            Global Presence
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Markets We <span className="text-gradient-orange">Serve</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg font-body"
          >
            From the Indian subcontinent to Africa, Middle East, and Southeast Asia — our reach is truly global.
          </motion.p>
        </div>

        {/* Interactive World Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Suspense fallback={<MapFallback />}>
            <WorldMap />
          </Suspense>
        </motion.div>

        {/* Region Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass-card p-6 group hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${region.color}20` }}
                >
                  <MapPin className="w-5 h-5" style={{ color: region.color }} />
                </div>
                <h3 className="font-heading font-bold text-foreground">{region.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {region.countries.map((country, j) => (
                  <span
                    key={j}
                    className="px-2 py-1 bg-muted rounded text-xs font-ui text-muted-foreground"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 flex-wrap justify-center">
            <div>
              <div className="font-heading text-4xl font-bold text-gradient-orange">20+</div>
              <div className="text-muted-foreground font-ui text-sm">Countries</div>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div>
              <div className="font-heading text-4xl font-bold text-gradient-orange">4</div>
              <div className="text-muted-foreground font-ui text-sm">Continents</div>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div>
              <div className="font-heading text-4xl font-bold text-gradient-orange">50+</div>
              <div className="text-muted-foreground font-ui text-sm">Global Markets</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
