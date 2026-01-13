import { motion } from 'framer-motion';
import { Anchor, Truck, Warehouse, FileCheck, Ship, MapPin } from 'lucide-react';

const ports = [
  { name: 'JNPT (Nhava Sheva)', location: 'Maharashtra', description: 'India\'s largest container port, primary hub for West Coast exports' },
  { name: 'Mundra Port', location: 'Gujarat', description: 'Largest private port, excellent connectivity for bulk cargo' },
  { name: 'Kandla Port', location: 'Gujarat', description: 'Major port for dry bulk and agro-commodity shipments' },
  { name: 'Hazira Port', location: 'Gujarat', description: 'Strategic location with modern facilities' },
  { name: 'Kolkata/Haldia Port', location: 'West Bengal', description: 'Primary gateway for East Coast and Southeast Asian trade' },
];

const supplyChainSteps = [
  { icon: MapPin, title: 'Farm Sourcing', desc: 'Direct procurement from farmer cooperatives across India' },
  { icon: Warehouse, title: 'Processing', desc: 'State-of-the-art processing and packaging facilities' },
  { icon: FileCheck, title: 'Quality Control', desc: 'Multi-stage inspection and certification' },
  { icon: Truck, title: 'Inland Logistics', desc: 'Efficient road/rail transport to port' },
  { icon: Anchor, title: 'Port Operations', desc: 'Container stuffing and customs clearance' },
  { icon: Ship, title: 'Shipping', desc: 'Global shipping via major liner services' },
];

export default function OperationsSection() {
  return (
    <section id="operations" className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-navy/10 rounded-full text-navy font-ui text-sm mb-4"
          >
            <Anchor className="w-4 h-4" />
            Operations & Logistics
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Pan-India <span className="text-gradient-orange">Supply Chain</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg font-body"
          >
            Strategic port access and efficient logistics network ensuring timely delivery worldwide.
          </motion.p>
        </div>

        {/* Supply Chain Flow */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-xl font-bold text-foreground text-center mb-8"
          >
            Our Supply Chain
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {supplyChainSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="glass-card p-6 text-center h-full group hover:shadow-card-hover transition-all duration-300">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-orange flex items-center justify-center group-hover:scale-110 transition-transform">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-heading font-bold text-foreground text-sm mb-2">{step.title}</h4>
                  <p className="text-muted-foreground text-xs font-body">{step.desc}</p>
                </div>
                {/* Connector arrow */}
                {i < supplyChainSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-orange text-xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ports Grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-xl font-bold text-foreground text-center mb-8"
          >
            Export Ports
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ports.map((port, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 group hover:shadow-card-hover transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-navy transition-all">
                    <Anchor className="w-6 h-6 text-navy group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-1">{port.name}</h4>
                    <span className="text-orange text-sm font-ui">{port.location}</span>
                    <p className="text-muted-foreground text-sm font-body mt-2">{port.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Logistics Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-card p-8 lg:p-12"
        >
          <h3 className="font-heading text-xl font-bold text-foreground mb-6 text-center">
            Logistics Capabilities
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-heading text-3xl font-bold text-gradient-orange mb-2">20' & 40'</div>
              <div className="text-muted-foreground font-body">Container Options</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-bold text-gradient-orange mb-2">FCL & LCL</div>
              <div className="text-muted-foreground font-body">Shipment Types</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-bold text-gradient-orange mb-2">FOB & CIF</div>
              <div className="text-muted-foreground font-body">Incoterms Available</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
