import React, { useMemo } from 'react';

const Celebration = () => {
  const colors = ['#f2d74e', '#95c3de', '#ff9a91', '#f2ceff', '#aeefec', '#3276ea', '#ff5132', '#65c366'];

  // Generate 50 confetti items with random properties
  const confettiItems = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + 'vw',
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: (Math.random() * 3 + 2) + 's',
      delay: (Math.random() * 5) + 's',
      opacity: Math.random(),
    }));
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(360deg); opacity: 0.7; }
          }
          .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            animation: fall linear infinite;
          }
          #congrats-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
          }
        `}
      </style>
      <div id="congrats-container">
        {confettiItems.map((item) => (
          <div
            key={item.id}
            className="confetti"
            style={{
              left: item.left,
              backgroundColor: item.color,
              animationDuration: item.duration,
              animationDelay: item.delay,
              opacity: item.opacity,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Celebration;