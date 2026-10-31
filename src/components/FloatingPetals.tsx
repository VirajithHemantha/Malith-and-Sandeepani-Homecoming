import React, { useMemo } from 'react';

const COLORS = ['#8b0000', '#b3121d', '#d42a35', '#141111'];
const PETAL_COUNT = 14;

// Petals fall with a GPU-only CSS transform animation, so they never trigger
// layout or repaint while the page scrolls.
export const FloatingPetals: React.FC = () => {
  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 6 + 8,
        duration: Math.random() * 10 + 16,
        delay: -Math.random() * 20,
        color: COLORS[i % COLORS.length],
        drift: Math.random() * 30 - 15,
        spin: Math.random() > 0.5 ? 540 : -540,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40 motion-reduce:hidden">
      <style>
        {`
          @keyframes petal-fall {
            0%   { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 0; }
            10%  { opacity: 0.55; }
            90%  { opacity: 0.55; }
            100% { transform: translate3d(var(--drift), 110vh, 0) rotate(var(--spin)); opacity: 0; }
          }
        `}
      </style>
      {petals.map((petal) => (
        <svg
          key={petal.id}
          width={petal.size}
          height={petal.size}
          viewBox="0 0 24 24"
          fill={petal.color}
          className="absolute top-0 will-change-transform"
          style={{
            left: `${petal.x}vw`,
            animation: `petal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
            ['--drift' as string]: `${petal.drift}vw`,
            ['--spin' as string]: `${petal.spin}deg`,
          }}
        >
          <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
        </svg>
      ))}
    </div>
  );
};
