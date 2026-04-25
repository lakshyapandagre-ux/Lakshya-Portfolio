import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { signInWithPopup, onAuthStateChanged, signOut, type User } from 'firebase/auth';

import { auth, googleProvider, db } from '../../lib/firebase';
import type { SignatureEntry } from './SignatureCard';
import './GuestbookSection.css';

interface GuestbookSectionProps {
  onNewSignature?: (entry: SignatureEntry) => void;
}

/* ═══════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════ */

const PenIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19 7-7 3 3-7 7-3-3z" />
    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="m2 2 7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

/* ═══════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════ */

export default function GuestbookSection({ onNewSignature }: GuestbookSectionProps) {
  /* ── State ── */
  const [user, setUser] = useState<User | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  /* ── Refs ── */
  const stateRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  /* ══════════════════════════════════════════════════
     FIREBASE AUTH
     ══════════════════════════════════════════════════ */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  /* ── GSAP transition ── */
  const animateState = useCallback(() => {
    if (!stateRef.current) return;
    gsap.fromTo(stateRef.current,
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }
    );
  }, []);

  /* ── Canvas setup ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !user || showSuccess) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.strokeStyle = '#fff'; // Drawn in white, CSS filter makes it purple later
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [user, showSuccess]);

  /* ── Canvas drawing handlers ── */
  const getCanvasPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDrawing.current = true;
    lastPos.current = getCanvasPos(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing.current || !lastPos.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const pos = getCanvasPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
    if (!hasDrawn) setHasDrawn(true);
  };

  const endDraw = () => {
    isDrawing.current = false;
    lastPos.current = null;
  };

  /* ══════════════════════════════════════════════════
     ACTIONS
     ══════════════════════════════════════════════════ */

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, googleProvider);
      setTimeout(animateState, 50);
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setHasDrawn(false);
      setMessage('');
      setTimeout(animateState, 50);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasDrawn(false);
  };

  const handleSign = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !user) return;

    try {
      setIsLoading(true);
      setErrorMsg('');
      const imageData = canvas.toDataURL('image/png');
      const trimmedMessage = message.trim();

      const newId = Date.now().toString(); // Use timestamp as a simple unique ID
      const newSig: SignatureEntry = {
        id: newId,
        name: user.displayName || 'Anonymous',
        email: user.email || '',
        avatar_url: user.photoURL || undefined,
        signature: imageData,
        message: trimmedMessage || null,
        created_at: Date.now(),
      };

      // 1. Optimistic UI update instantly!
      if (onNewSignature) {
        onNewSignature(newSig);
      }

      handleClear();
      setMessage('');
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setTimeout(animateState, 50);
      }, 3000);

      // 2. Save to Firestore in the background
      import('firebase/firestore').then(({ doc, setDoc }) => {
        setDoc(doc(db, 'signatures', newId), {
          name: newSig.name,
          email: newSig.email,
          avatar_url: newSig.avatar_url ?? null,
          image: newSig.signature,
          message: newSig.message,
          createdAt: newSig.created_at,
        }).catch(err => {
          console.error('Background save failed:', err);
        });
      });
      
    } catch (err) {
      console.error('Failed to process signature:', err);
      setErrorMsg('// something went wrong. try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Animate on mount ── */
  useEffect(() => {
    if (authReady) {
      setTimeout(animateState, 200);
    }
  }, [animateState, authReady]);

  /* ═══════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════ */

  if (!authReady) return null;

  return (
    <div className="gb-state-wrap" ref={stateRef}>

      {/* ── STATE 1: LOGGED OUT ── */}
      {!user && (
        <div className="guestbook-auth-card">
          <div className="auth-icon-wrap">
            <PenIcon />
          </div>
          <h3 className="gb-auth-title">
            Leave your <span className="gb-gradient-text">Signature</span>
          </h3>
          <p className="auth-subtext">
            Sign in to leave your mark and connect with others.
          </p>
          <button
            className="google-btn"
            onClick={handleLogin}
            disabled={isLoading}
          >
            <GoogleIcon />
            <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
          </button>
          <div className="auth-divider" />
          <p className="auth-hint">
            // sign in to leave your mark on the wall.
          </p>
        </div>
      )}

      {/* ── STATE 2: LOGGED IN (CANVAS) ── */}
      {user && !showSuccess && (
        <div className="gb-canvas-card">
          <div className="gb-canvas-area">
            <div className="gb-canvas-glow" />
            <div className="gb-canvas-wrapper">
              <canvas
                ref={canvasRef}
                className="gb-canvas"
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
              />
            </div>
            <p className="gb-canvas-hint">// draw your signature above</p>
          </div>

          <div className="gb-message-area relative w-full px-[16px] pb-[16px]">
            <textarea
              className="gb-message-input"
              rows={2}
              maxLength={80}
              placeholder="// drop a message... (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <span className={`gb-char-count ${message.length >= 60 ? 'text-[#a855f7]' : 'text-[#4a5568]'}`}>
              {message.length}/80
            </span>
          </div>

          <div className="gb-controls">
            <div className="gb-signing-as">
              Signing as <span>{user.displayName || user.email}</span>
              <button className="gb-btn-logout" onClick={handleLogout} title="Sign out">
                <LogoutIcon />
              </button>
            </div>
            <div className="gb-controls-btns flex flex-col items-end">
              <div className="flex gap-3">
                <button className="gb-btn-clear" onClick={handleClear}>
                  Clear
                </button>
                <button
                  className="gb-btn-sign"
                  onClick={handleSign}
                  disabled={!hasDrawn || isLoading}
                >
                  {isLoading ? 'Saving...' : 'Sign ✦'}
                </button>
              </div>
              {errorMsg && <div className="text-[#ef4444] font-mono text-[12px] mt-2">{errorMsg}</div>}
            </div>
          </div>
        </div>
      )}

      {/* ── STATE 3: SUCCESS ── */}
      {showSuccess && (
        <div className="gb-success-card animate-fade-in-up">
          <h3 className="gb-success-title">
            <span className="text-[#a855f7]">✦</span> signature dropped.
          </h3>
          <p className="gb-success-subtext">
            // your mark is on the wall.
          </p>
        </div>
      )}

    </div>
  );
}
