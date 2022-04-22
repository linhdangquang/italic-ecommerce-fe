import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <div className="bg-blacklight">
      <div className=" mx-auto w-auto">
        <div className="p-4 md:px-20 lg:px-20 lg:py-20">
          <div className="grid grid-cols-1 border-b border-grayMirage pb-[70px] md:grid-cols-3 md:gap-x-16">
            <div>
              <div>
                <p className="mb-[10px] font-medium text-blueSage">
                  Our Mission
                </p>
                <p className="mb-2 text-sm leading-5 text-white md:mb-4">
                  To source, develop, and curate the highest quality products at
                  the lowest prices.
                </p>
                <Link to="/">
                  <button type="button" className={styles.btn}>
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            <div>
              <div>
                <p className="mb-[10px] font-medium text-blueSage">
                  Request a Product
                </p>
                <p className="mb-2 text-sm leading-5 text-white md:mb-4">
                  Don't see what you're looking for? All you have to do is ask —
                  we'll do our best to track down your request.
                </p>
                <Link to="/">
                  <button type="button" className={styles.btn}>
                    Submit Request
                  </button>
                </Link>
              </div>
            </div>
            <div>
              <div>
                <p className="mb-[10px] font-medium text-blueSage">
                  Share Site Feedback
                </p>
                <p className="mb-2 text-sm leading-5 text-white md:mb-4">
                  We're always looking for ways to improve our site. We'll send
                  you credits if we implement your feedback.
                </p>
                <Link to="/">
                  <button type="button" className={styles.btn}>
                    Submit Feedback
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-[70px]  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:gap-x-24">
            <div>
              <h2 className="font-DancingScript text-3xl font-bold italic text-white">
                LINHDQ
              </h2>
              <div className="mt-8 w-auto">
                <ul className="flex flex-col gap-y-4">
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-brand-instagram"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="4" y="4" width="16" height="16" rx="4" />
                        <circle cx="12" cy="12" r="3" />
                        <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                      </svg>
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-brand-twitter"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
                      </svg>
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-brand-facebook"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                      </svg>
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-brand-youtube"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="3" y="5" width="18" height="14" rx="4" />
                        <path d="M10 9l5 3l-5 3z" />
                      </svg>
                      Youtube
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-brand-pinterest"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="8" y1="20" x2="12" y2="11" />
                        <path d="M10.7 14c.437 1.263 1.43 2 2.55 2c2.071 0 3.75 -1.554 3.75 -4a5 5 0 1 0 -9.7 1.7" />
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                      Pinterest
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <p className="mb-[42px] text-base font-bold italic text-white">
                Resources
              </p>
              <div className="mt-8 w-auto">
                <ul className="flex flex-col gap-y-4">
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Accessibility Statement
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <p className="mb-[42px] text-base font-bold italic text-white">
                Business
              </p>
              <div className="mt-8 w-auto">
                <ul className="flex flex-col gap-y-4">
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      How It works
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Sell on Linh
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Corporate Sales
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Affiliate Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <p className="mb-[42px] text-base font-bold italic text-white">
                Compare
              </p>
              <div className="mt-8 w-auto">
                <ul className="flex flex-col gap-y-4">
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      All Clad
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Le Creuset
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Everlane
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Naadam
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-1 text-sm text-white"
                      to="/"
                    >
                      Brooklinen
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <p className="font-DancingScript text-4xl font-bold text-slate-400">
              DQL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
