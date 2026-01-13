import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-rice-field.jpg';

const TradeVisual3D = lazy(() => import('@/components/TradeVisual3D'));

function VisualFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-gradient-navy opacity-50 animate-pulse" />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy-dark" />

      {/* Diagonal Orange Flare */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-20"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, hsl(24, 100%, 50%) 100%)',
          clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-light rounded-full opacity-40"
            initial={{
              x: Math.random() * 100 + '%',
              y: '100%',
            }}
            animate={{
              y: '-10%',
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen py-32">
          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange/20 backdrop-blur-sm rounded-full text-orange-light font-ui text-sm border border-orange/30"
              >
                <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
                Trusted by Partners Across 20+ Countries
              </motion.span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight">
                Where Global{' '}
                <span className="text-gradient-orange">Trade Grows</span>
              </h1>

              <p className="text-lg lg:text-xl text-primary-foreground/80 max-w-xl font-body leading-relaxed">
                GROWORA bridges India's finest agricultural commodities to global markets. Premium rice, sugar, wheat, pulses & spices — delivered with trust, transparency, and excellence.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                variant="hero" 
                size="xl" 
                className="group"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Products
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="heroOutline" 
                size="xl" 
                className="group"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Our Story
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-primary-foreground/10"
            >
              {[
                { value: '20+', label: 'Countries' },
                { value: '2+', label: 'Years Experience' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-heading text-3xl lg:text-4xl font-bold text-gradient-orange">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/60 font-ui text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D Trade Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative h-[400px] lg:h-[600px] flex items-center justify-center"
          >
            <Suspense fallback={<VisualFallback />}>
              <TradeVisual3D className="w-full h-full" />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-primary-foreground/60 text-sm font-ui">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-orange" />
        </motion.div>
      </motion.div>
    </section>
  );
}
