import React from 'react';

function SmallInfo() {
  return (
    <div className="bg-sky-100 px-20">
      <div className="mx-auto flex justify-center">
        <div className="relative flex items-start justify-center px-[25px] py-8 before:absolute before:top-1/2 before:right-0 before:h-[80px] before:w-0 before:-translate-y-1/2 before:border-r">
          <img
            src="https://italic.com/static/images/orange.png"
            alt="img"
            className="h-[50px] w-[50px]"
          />
          <div className="ml-5 flex flex-col ">
            <p className="mb-2 font-medium text-blacklight">Premium Quality</p>
            <p className="text-xs text-gray-500">
              We rigorously test every product to ensure it meets or exceeds the
              quality of leading brands. Otherwise, we won't sell it.
            </p>
          </div>
        </div>
        <div className="relative flex items-start justify-center px-[25px] py-8 before:absolute before:top-1/2 before:right-0 before:h-[80px] before:w-0 before:-translate-y-1/2 before:border-r">
          <img
            src="https://italic.com/static/images/star.png"
            alt="img"
            className="h-[50px] w-[50px]"
          />
          <div className="ml-5 flex flex-col ">
            <p className="mb-2 font-medium text-blacklight">
              Unparalleled Prices
            </p>
            <p className="text-xs text-gray-500">
              We've eliminated traditional brand and retail markups, so you pay
              50-80% less for the exact same quality.
            </p>
          </div>
        </div>
        <div className="relative flex items-start justify-center px-[25px] py-8 ">
          <img
            src="https://italic.com/static/images/oliveleaf.png"
            alt="img"
            className="h-[50px] w-[50px]"
          />
          <div className="ml-5 flex flex-col ">
            <p className="mb-2 font-medium text-blacklight">
              Straight From the Source
            </p>
            <p className="text-xs text-gray-500">
              Shopping on Italic means supporting a network of independent
              manufacturers (the same ones behind your favorite brands).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallInfo;
