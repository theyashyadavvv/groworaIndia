import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Users, Award, Truck, Shield, Leaf, Handshake, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Globe, value: 20, suffix: '+', label: 'Countries Served', color: 'orange' },
  { icon: Users, value: 50, suffix: '+', label: 'Global Markets', color: 'navy' },
  { icon: Award, value: 2, suffix: '+', label: 'Years Experience', color: 'orange' },
];

const features = [
  { icon: Shield, title: 'Quality First', desc: 'Stringent quality checks at every stage from procurement to delivery' },
  { icon: Leaf, title: 'Sustainable Sourcing', desc: 'Direct partnerships with farmer cooperatives across India' },
  { icon: Handshake, title: 'Trusted Partner', desc: 'Long-term relationships built on transparency and reliability' },
  { icon: TrendingUp, title: 'Competitive Pricing', desc: 'Direct sourcing ensures best value for global buyers' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Diagonal background */}
      <div
        className="absolute inset-0 bg-gradient-navy"
        style={{
          clipPath: 'polygon(0 5%, 100% 0%, 100% 95%, 0% 100%)',
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 lg:p-8 text-center group hover:shadow-card-hover transition-all duration-300"
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${stat.color === 'orange' ? 'bg-gradient-orange' : 'bg-gradient-navy'
                } group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className={`font-heading text-3xl lg:text-4xl font-bold mb-2 ${stat.color === 'orange' ? 'text-gradient-orange' : 'text-navy'
                }`}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-muted-foreground font-ui text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full text-primary-foreground font-ui text-sm">
              About GROWORA
            </span>

            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-primary-foreground leading-tight">
              Where Global{' '}
              <span className="text-gradient-orange">Trade Grows</span>
            </h2>

            <div className="space-y-4 text-primary-foreground/80 font-body text-lg leading-relaxed">
              <p>
                GROWORA is a leading Indian agricultural commodity export company, specializing in premium rice, sugar, wheat, maize, pulses, and spices. With over 2 years of experience, we have established ourselves as a trusted partner for importers, distributors, and food businesses across 20+ countries.
              </p>
              <p>
                Our mission is simple: to connect India's agricultural abundance with global demand through reliable supply chains, competitive pricing, and uncompromising quality standards.
              </p>
              <p>
                We work directly with farmer cooperatives and processing units across India's most fertile regions — from Punjab's basmati belt to Maharashtra’s sugarcane heartland and sugar mills — ensuring traceability, freshness, and fair trade practices at every step.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="font-heading text-xl font-bold text-primary-foreground mb-3">Our Philosophy</h3>
              <ul className="space-y-2 text-primary-foreground/70 font-body">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange rounded-full" />
                  Integrity in every transaction
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange rounded-full" />
                  Quality that exceeds expectations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange rounded-full" />
                  Relationships built on trust
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange rounded-full" />
                  Commitment to timely delivery
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-6 flex items-start gap-5 group hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-orange flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Why Choose Us */}
            <div className="glass-card p-6 mt-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Why Choose GROWORA?</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Direct Farm Sourcing',
                  'Competitive FOB/CIF Pricing',
                  'Flexible MOQ Options',
                  'Complete Documentation',
                  'Quality Certifications',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                    <span className="text-orange">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
