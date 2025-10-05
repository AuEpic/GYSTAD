import React, { useState, useEffect } from 'react';

const words = ['Under Development', 'Coming Soon', 'In Progress', 'Planned for Q3'];

const FlippingText: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 text-2xl font-bold text-warm-white flex items-center">
      <div className="relative">
        {words.map((word, i) => (
          <span
            key={word}
            className={`absolute transition-all duration-500 ${
              i === index
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform -translate-y-full'
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FlippingText;
