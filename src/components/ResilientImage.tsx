import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackLabel?: string;
  fallbackIndex?: string;
  className?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackLabel = 'Bauhaus Footwear',
  fallbackIndex = '01',
  className = 'w-full h-full object-cover',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full bg-[#e8e8e8] flex flex-col items-center justify-center p-6 select-none"
      >
        <svg
          viewBox="0 0 180 110"
          className="w-36 h-24 mb-3"
          aria-hidden="true"
        >
          <rect
            x="10"
            y="68"
            width="160"
            height="26"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="4"
          />
          <rect
            x="14"
            y="26"
            width="54"
            height="42"
            fill="#ff0000"
            stroke="#000000"
            strokeWidth="4"
          />
          <polygon
            points="68,26 148,68 68,68"
            fill="#0000ff"
            stroke="#000000"
            strokeWidth="4"
          />
          <circle
            cx="42"
            cy="47"
            r="11"
            fill="#ffff00"
            stroke="#000000"
            strokeWidth="4"
          />
        </svg>
        <div className="text-xs font-extrabold tracking-tight text-black text-center">
          {fallbackIndex} · {fallbackLabel}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
