"use client";
import Link from "next/link";
import * as prismic from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

import { Bounded } from "./Bounded";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const NavItem = ({ children, mobile }) => {
  return (
    <li
      className={`${
        mobile && "my-3"
      } font-semibold tracking-tight text-slate-800 hover:text-rose-800`}
    >
      {children}
    </li>
  );
};

export const Header = ({ navigation, settings }) => {
  const [isHidden, setIsHidden] = useState(true);
  const { user, errors, isLoading } = useUser();

  return (
    !isLoading && (
      <Bounded as="header">
        <nav className="bg-white border-gray-200 mb-16 fixed w-full z-20 top-0 start-0 border-b">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={settings.data.profilePicture.url}
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                {settings.data.name[0].text}
              </span>
            </a>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-default"
              aria-expanded="false"
              onClick={() => setIsHidden(!isHidden)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className="w-full md:block md:w-auto"
              id="navbar-default"
              hidden={isHidden}
            >
              <ul
                className={`${
                  isHidden === true ? "flex flex-wrap" : "mt-4"
                } justify-center gap-10`}
              >
                <NavItem>
                  <Link href="/">
                    <PrismicText field={navigation.data.homepageLabel} />
                  </Link>
                </NavItem>
                {navigation.data?.links.map((item) => (
                  <NavItem
                    mobile={isHidden === false}
                    key={prismic.asText(item.label)}
                  >
                    <PrismicNextLink field={item.link}>
                      <PrismicText field={item.label} />
                    </PrismicNextLink>
                  </NavItem>
                ))}
                {user ? (
                  <NavItem mobile={isHidden === false} key="Logout">
                    <Link href="/api/auth/logout">Logout</Link>
                  </NavItem>
                ) : (
                  <NavItem mobile={isHidden === false} key="Logout">
                    <Link href="/api/auth/login" className="relative">
                      Members
                      <span class="absolute bottom-3 bg-red-100 text-red-800 text-[8px] font-medium px-1.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                        NEW
                      </span>
                    </Link>
                  </NavItem>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </Bounded>
    )
  );
};
