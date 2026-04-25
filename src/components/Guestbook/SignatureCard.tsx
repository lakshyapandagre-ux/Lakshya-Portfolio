import { motion } from 'framer-motion';
import { timeAgo } from '../../utils/timeAgo';
import './GuestbookSection.css'; // or you can import from a new css file if preferred

export interface SignatureEntry {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  signature: string; // image data URL
  message?: string | null;
  created_at: number | string; // Supabase uses string, Firebase uses number usually, we'll support both
}

interface SignatureCardProps {
  entry: SignatureEntry;
  index: number;
}

export default function SignatureCard({ entry, index }: SignatureCardProps) {
  return (
    <motion.div
      className="sig-card"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.06
      }}
    >
      <div className="sig-canvas-area">
        <img 
          src={entry.signature} 
          alt={`${entry.name}'s signature`} 
          className="sig-image" 
        />
      </div>

      <div className="sig-message">
        <span className="sig-message-text">
          {entry.message ? entry.message : '// stopped by to leave a mark.'}
        </span>
      </div>

      <div className="sig-footer">
        <div className="sig-identity">
          {entry.avatar_url ? (
            <img src={entry.avatar_url} alt={entry.name} className="sig-avatar" />
          ) : (
            <div className="sig-avatar-fallback">
              {entry.name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="sig-name">{entry.name}</span>
        </div>
        <span className="sig-time">{timeAgo(entry.created_at)}</span>
      </div>
    </motion.div>
  );
}
