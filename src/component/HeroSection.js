import React from 'react';
import heroImage from '../assets/images/presentation.png';

function HeroSection() {
  return (
    <section
      className="bg-cover bg-center h-96 flex flex-col justify-center items-center text-white animate-fade-in"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
    
    </section>
  );
}

export default HeroSection;
