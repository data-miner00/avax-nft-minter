import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import WalletManager from "./WalletManager";

function Header(): JSX.Element {
  const { t } = useTranslation();

  return (
    <header data-testid="header">
      <div className="max-w-[1400px] mx-auto md:px-8 items-center flex justify-between h-24">
        <nav className="flex items-center">
          <Link
            to="/"
            className="text-2xl text tracking-wide flex items-center"
          >
            <svg
              className="block"
              width="35"
              height="35"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_301_2)">
                <circle cx="40" cy="40" r="40" fill="#E75555" />
                <rect x="44" y="39" width="15" height="15" fill="white" />
                <rect x="26" y="21" width="15" height="15" fill="white" />
                <rect x="44" y="21" width="15" height="15" fill="white" />
                <rect
                  x="17.5"
                  y="29.5"
                  width="32"
                  height="32"
                  fill="white"
                  stroke="#E75555"
                  strokeWidth="3"
                />
              </g>
              <defs>
                <clipPath id="clip0_301_2">
                  <rect width="80" height="80" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span data-testid="header-logo" className="block ml-3 font-mono">
              Aiotter<span className="font-bold">FI</span>
            </span>
          </Link>
          <Link
            to="/minted"
            className="block ml-5 hover:bg-gray-200 dark:hover:bg-gray-700/50 px-4 py-2 rounded-lg hover:text-black dark:hover:text-white text-gray-500"
          >
            Minted
          </Link>
          <Link
            to="/about"
            className="block ml-5 hover:bg-gray-200 dark:hover:bg-gray-700/50 px-4 py-2 rounded-lg hover:text-black dark:hover:text-white text-gray-500"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center">
          <WalletManager />
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Header;
