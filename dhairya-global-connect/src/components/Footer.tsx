import { motion } from 'framer-motion';
import { Mail, Phone, ArrowUp } from 'lucide-react';
import logo from '@/assets/growora-logo.png';

const footerLinks = {
  products: [
    { label: 'Rice', href: '#products' },
    { label: 'Sugar', href: '#products' },
    { label: 'Wheat', href: '#products' },
    { label: 'Maize', href: '#products' },
    { label: 'Pulses', href: '#products' },
    { label: 'Spices', href: '#products' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Operations', href: '#operations' },
    { label: 'Global Markets', href: '#markets' },
    { label: 'Contact', href: '#contact' },
  ],
  resources: [
    { label: 'Export Documentation', href: '#' },
    { label: 'Shipping Info', href: '#' },
    { label: 'Quality Standards', href: '#' },
    { label: 'Request Quote', href: '#contact' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-full opacity-10"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, hsl(24, 100%, 50%) 100%)',
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main Footer */}
        <div className="py-16 lg:py-20 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <motion.img
              src={logo}
              alt="GROWORA - Where Global Trade Grows"
              className="h-20 w-auto object-contain"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            />
            <p className="text-primary-foreground/70 font-body max-w-sm">
              Your trusted partner for premium agricultural commodity exports from India. 
              Quality assured, globally delivered.
            </p>
            
            {/* Contact */}
            <div className="space-y-3">
              <a href="tel:+917068683737" className="flex items-center gap-3 text-primary-foreground/80 hover:text-orange transition-colors">
                <Phone className="w-4 h-4" />
                <span className="font-body text-sm">+91 7068683737 / +91 99675 14905</span>
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/80">
                <Mail className="w-4 h-4 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:info@groworaindia.com" className="font-body text-sm hover:text-orange transition-colors">info@groworaindia.com</a>
                  <a href="mailto:info@groworaindia.com" className="font-body text-sm hover:text-orange transition-colors">dhairya@groworaindia.com</a>
                  <a href="mailto:info@groworaindia.com" className="font-body text-sm hover:text-orange transition-colors">nimesh@groworaindia.com</a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-primary-foreground mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-orange font-body text-sm transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-primary-foreground mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-orange font-body text-sm transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* End main grid */}

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm font-body">
            © {new Date().getFullYear()} GROWORA. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-body transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-body transition-colors">
              Terms of Service
            </a>
          </div>
          
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-orange flex items-center justify-center hover:bg-orange-light transition-colors group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-primary-foreground group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
