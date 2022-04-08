import React from 'react';
import { Link } from 'react-router-dom';

function HeroBanner({ data }) {
  const { title, subtitle, buttonText, buttonLink, imageUrl, imageName } = data;
  return (
    <div className="hero   bg-base-200">
      <div className="hero-content grid  w-full max-w-full grid-cols-2 bg-blacklight p-0">
        <div className="-translate-y-[50px] px-20 text-white">
          <h1 className="font-serif text-5xl ">{title}</h1>
          <p className="py-6 text-sm">{subtitle}</p>
          <Link
            to={buttonLink}
            type="button"
            className="btn min-h-6 h-[2.5rem] rounded bg-white px-6 py-1 text-[12px] text-gray-700   hover:bg-cyan-100"
          >
            {buttonText}
          </Link>
        </div>
        <img
          src={imageUrl}
          alt={imageName}
          className="object-cover md:h-[565px] md:w-[725px]"
        />
      </div>
    </div>
  );
}

export default HeroBanner;
