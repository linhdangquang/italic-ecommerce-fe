import React from 'react';
import { Link } from 'react-router-dom';

function HeroBanner() {
  return (
    <div className="hero   bg-base-200">
      <div className="hero-content grid  w-full max-w-full grid-cols-2 bg-blacklight p-0">
        <div className="-translate-y-[50px] px-20 text-white">
          <h1 className="font-serif text-5xl ">Fresh Menswear</h1>
          <p className="py-6 text-sm">
            Easy-to-wear clothing for men. Our new menswear is ready to become
            your everyday uniform.
          </p>
          <Link
            to="/products"
            type="button"
            className="btn min-h-6 h-[2.5rem] rounded bg-white px-6 py-1 text-[12px] text-gray-700   hover:bg-cyan-100"
          >
            shop collection
          </Link>
        </div>
        <img
          src="https://italic.com/_next/image?url=https%3A%2F%2Fair-prod.imgix.net%2Fa6896fa0-e794-4a51-a73f-2aa04238e59a.jpg%3Fw%3D1920%26h%3D1497%26auto%3Dcompress%26ixlib%3Dreact-9.0.2&w=1200&q=80"
          alt="img"
          className="h-full object-cover"
        />
      </div>
    </div>
  );
}

export default HeroBanner;
