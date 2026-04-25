import { useState, useEffect, useCallback, useRef } from 'react';
import { collection, getDocs, orderBy, query, limit, startAfter, type QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import SignatureCard, { type SignatureEntry } from './SignatureCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './SignatureWall.css';

gsap.registerPlugin(ScrollTrigger);

interface SignatureWallProps {
  newEntry?: SignatureEntry | null;
}

const PAGE_SIZE = 12;

export default function SignatureWall({ newEntry }: SignatureWallProps) {
  const [signatures, setSignatures] = useState<SignatureEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  
  const wallHeaderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wallHeaderRef.current) return;
    
    gsap.fromTo(
      wallHeaderRef.current.children,
      { 
        y: 40, 
        opacity: 0, 
        filter: 'blur(10px)' 
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wallHeaderRef.current,
          start: 'top 82%',
          once: true,
        }
      }
    );
  }, { scope: wallHeaderRef });

  const fetchSignatures = useCallback(async (isInitial = true) => {
    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      let q;
      if (isInitial || !lastDoc) {
        q = query(
          collection(db, 'signatures'),
          orderBy('createdAt', 'desc'),
          limit(PAGE_SIZE)
        );
      } else {
        q = query(
          collection(db, 'signatures'),
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(PAGE_SIZE)
        );
      }

      const snapshot = await getDocs(q);

      const newDocs: SignatureEntry[] = snapshot.docs.map(doc => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          name: data.name ?? 'Anonymous',
          email: data.email ?? '',
          signature: data.image ?? '', // fallback if they used image
          message: data.message ?? null,
          avatar_url: data.avatar_url ?? null,
          created_at: data.createdAt ?? 0,
        };
      });

      if (isInitial) {
        setSignatures(newDocs);
      } else {
        setSignatures(prev => [...prev, ...newDocs]);
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === PAGE_SIZE);

    } catch (err) {
      console.error('Error fetching signatures:', err);
    } finally {
      if (isInitial) setLoading(false);
      else setLoadingMore(false);
    }
  }, [lastDoc]);

  useEffect(() => {
    fetchSignatures(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only fetch once on mount

  // Optimistic update
  useEffect(() => {
    if (newEntry) {
      setSignatures(prev => {
        // Prevent duplicates
        if (prev.some(s => s.id === newEntry.id)) return prev;
        return [newEntry, ...prev];
      });
    }
  }, [newEntry]);

  const SkeletonCard = () => (
    <div className="sig-skeleton">
      <div className="sig-skeleton-canvas"></div>
      <div className="sig-skeleton-footer">
        <div className="sig-skeleton-circle"></div>
        <div className="sig-skeleton-line" style={{ width: '100px' }}></div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="wall-header" ref={wallHeaderRef}>
        <p className="wall-label">GUESTBOOK · WALL OF SIGNATURES</p>
        <h2 className="wall-heading">
          People who<br />stopped by.
        </h2>
        <p className="wall-count">// {signatures.length} signatures and counting.</p>
      </div>

      <div className="sig-wall-grid">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : signatures.length === 0 ? (
          <div className="sig-empty">
            <div className="sig-empty-icon">✦</div>
            <p className="sig-empty-line1">// no signatures yet.</p>
            <p className="sig-empty-line2">be the first to leave your mark.</p>
          </div>
        ) : (
          signatures.map((sig, index) => (
            <SignatureCard key={sig.id} entry={sig} index={index} />
          ))
        )}
      </div>

      {!loading && hasMore && (
        <button
          className="load-more-btn"
          onClick={() => fetchSignatures(false)}
          disabled={loadingMore}
        >
          {loadingMore && <div className="spinner"></div>}
          {loadingMore ? 'Loading...' : 'Load more signatures'}
        </button>
      )}
    </div>
  );
}
