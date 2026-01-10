import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    product: '',
    quantity: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      // Debug: Check if env variables are loaded
      console.log('EmailJS Config:', {
        serviceId,
        templateId,
        autoReplyTemplateId,
        publicKey: publicKey ? '✓ Loaded' : '✗ Missing'
      });
      
      // Prepare email data for your inbox
      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        company: formState.company || 'Not provided',
        product: formState.product || 'Not specified',
        quantity: formState.quantity || 'Not specified',
        message: formState.message || 'No message',
        to_email: 'info@groworaindia.com',
      };
      
      // Send email to you (info@groworaindia.com)
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      // Send auto-reply thank you email to customer
      const autoReplyParams = {
        to_name: formState.name,
        to_email: formState.email,
        from_name: 'GROWORA Team',
      };
      
      await emailjs.send(
        serviceId,
        autoReplyTemplateId,
        autoReplyParams,
        publicKey
      );
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Inquiry Sent Successfully!",
        description: "We've received your inquiry and will respond within 24 hours.",
      });
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        company: '',
        product: '',
        quantity: '',
        message: '',
      });
    } catch (error) {
      console.error('Email send error:', error);
      setIsSubmitting(false);
      toast({
        title: "Error Sending Inquiry",
        description: "Please try again or contact us directly at info@groworaindia.com",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello, I'm interested in discussing agricultural commodity imports.");
    window.open(`https://wa.me/917068683737?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-muted/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-radial from-navy/5 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 rounded-full text-orange font-ui text-sm mb-4">
                <Mail className="w-4 h-4" />
                Get In Touch
              </span>

              <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4">
                Ready to <span className="text-gradient-orange">Partner</span> With Us?
              </h2>

              <p className="text-muted-foreground font-body text-lg">
                Let's discuss your requirements. Our export specialists are ready to help you source premium Indian agricultural commodities.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <motion.a
                href="tel:+917068683737"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 p-4 glass-card group hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-orange flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-muted-foreground text-sm font-ui">Call Us</div>
                  <div className="text-foreground font-medium">+91 7068683737</div>
                  <div className="text-foreground font-medium">+91 99675 14905</div>
                </div>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-4 glass-card group hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-orange flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="text-muted-foreground text-sm font-ui mb-1">Email</div>
                  <div className="flex flex-col gap-1">
                    <a href="mailto:info@groworaindia.com" className="text-foreground font-medium hover:text-orange transition-colors">info@groworaindia.com</a>
                    <a href="mailto:info@groworaindia.com" className="text-foreground font-medium hover:text-orange transition-colors">dhairya@groworaindia.com</a>
                    <a href="mailto:info@groworaindia.com" className="text-foreground font-medium hover:text-orange transition-colors">nimesh@groworaindia.com</a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 p-4 glass-card"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-navy flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-muted-foreground text-sm font-ui">Business Hours</div>
                  <div className="text-foreground font-medium">Mon-Sat: 9AM - 6PM IST</div>
                </div>
              </motion.div>
            </div>

            {/* WhatsApp CTA */}
            <motion.button
              onClick={openWhatsApp}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="w-full flex items-center justify-center gap-3 p-4 bg-[#25D366] text-white rounded-xl font-ui font-medium hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </motion.button>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8 lg:p-10 relative">
              <div className="relative z-10">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-orange flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground font-body">
                    We've received your inquiry and will respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-ui font-medium text-foreground mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-orange transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-ui font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-orange transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-ui font-medium text-foreground mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-orange transition-all"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-ui font-medium text-foreground mb-2">
                        Product Interest
                      </label>
                      <select
                        name="product"
                        value={formState.product}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-orange transition-all"
                      >
                        <option value="">Select Product</option>
                        <option value="rice">Rice</option>
                        <option value="sugar">Sugar</option>
                        <option value="wheat">Wheat</option>
                        <option value="maize">Maize</option>
                        <option value="pulses">Pulses</option>
                        <option value="spices">Spices</option>
                        <option value="multiple">Multiple Products</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-ui font-medium text-foreground mb-2">
                      Quantity (MT)
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={formState.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-orange transition-all"
                      placeholder="e.g., 100 MT"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-ui font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-orange transition-all resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                    ) : (
                      <>
                        Send Inquiry
                        <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
