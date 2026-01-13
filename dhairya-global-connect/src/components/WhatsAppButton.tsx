import { motion } from 'framer-motion';
import whatsappLogo from '@/assets/png-clipart-whatsapp-logo-whatsapp-computer-icons-telephone-call-whatsapp-grass-internet.png';

const WHATSAPP_NUMBERS = ['+919967514905'];
const PREFILLED_MESSAGE = encodeURIComponent("Hello, I'm interested in discussing agricultural commodity imports.");

export default function WhatsAppButton() {
  const handleClick = () => {
    // Open WhatsApp with primary number
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBERS[0].replace(/[^0-9]/g, '')}?text=${PREFILLED_MESSAGE}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow group"
      aria-label="Contact us on WhatsApp"
    >
      <img src={whatsappLogo} alt="WhatsApp" className="w-8 h-8 object-contain" />

      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-3 px-3 py-2 bg-card rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
      >
        <span className="text-sm font-ui text-foreground">Chat with us</span>
        <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-card rotate-45" />
      </motion.div>
    </motion.button>
  );
}
