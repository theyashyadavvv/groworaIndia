import { motion } from 'framer-motion';
import { FileText, CheckCircle, FileCheck, Shield, Leaf, ClipboardCheck, Search } from 'lucide-react';

const documents = [
  { name: 'Commercial Invoice', icon: FileText, required: true, desc: 'Complete value declaration for customs' },
  { name: 'Packing List', icon: ClipboardCheck, required: true, desc: 'Detailed cargo contents and weights' },
  { name: 'Bill of Lading', icon: FileCheck, required: true, desc: 'Shipping line document of title' },
  { name: 'Certificate of Origin', icon: Shield, required: true, desc: 'Country of origin verification' },
  { name: 'Phytosanitary Certificate', icon: Leaf, required: true, desc: 'Plant health certification' },
  { name: 'Fumigation Certificate', icon: CheckCircle, required: true, desc: 'Pest treatment verification' },
  { name: 'Inspection Certificate', icon: Search, required: false, desc: 'Third-party quality inspection (optional)' },
];

export default function DocumentationSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-navy/10 rounded-full text-navy font-ui text-sm mb-4"
          >
            <FileText className="w-4 h-4" />
            Export Documentation
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Complete <span className="text-gradient-orange">Documentation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg font-body"
          >
            We handle all export documentation requirements, ensuring smooth customs clearance at destination.
          </motion.p>
        </div>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {documents.map((doc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 group hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                  doc.required ? 'bg-gradient-orange' : 'bg-muted group-hover:bg-gradient-navy'
                }`}>
                  <doc.icon className={`w-6 h-6 ${doc.required ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-primary-foreground'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-foreground">{doc.name}</h4>
                    {doc.required ? (
                      <span className="px-2 py-0.5 bg-orange/10 text-orange text-xs font-ui rounded">Required</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-ui rounded">Optional</span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm font-body mt-1">{doc.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
