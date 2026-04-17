

interface ProfilePhotoProps {
  src: string;
}

export default function ProfilePhoto({ src }: ProfilePhotoProps) {

  return (
    <div className="profile-photo-container">
      <div className="profile-photo-inner">
        {/* Subtle Glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.15) 0%, transparent 60%)',
          filter: 'blur(30px)',
          zIndex: 0,
        }} />
        {/* Main Photo Context */}
        <div className="pp-avatar-wrapper" style={{ zIndex: 1, position: 'relative' }}>
          <div className="pp-anim-float">
            {/* Photo NO circle clip */}
            <div className="pp-avatar-floating">
              <img 
                src={src} 
                alt="Lakshya Profile" 
                className="pp-avatar-img-transparent" 
                loading="eager" 
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
