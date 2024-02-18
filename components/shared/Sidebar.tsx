"use client";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>
        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 6).map((item) => {
                const isActive = item.route === pathname;
                return (
                  <li
                    key={item.route}
                    className={cn(
                      "sidebar-nav_element group cursor-pointer",
                      isActive
                        ? "bg-purple-gradient text-white "
                        : "text-gray-700"
                    )}
                  >
                    <Link className="sidebar-link" href={item.route}>
                      <Image
                        src={item.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={cn(isActive && "brightness-200")}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(6).map((item) => {
                const isActive = item.route === pathname;
                return (
                  <li
                    key={item.route}
                    className={cn(
                      "sidebar-nav_element group cursor-pointer",
                      isActive
                        ? "bg-purple-gradient text-white "
                        : "text-gray-700"
                    )}
                  >
                    <Link className="sidebar-link" href={item.route}>
                      <Image
                        src={item.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={cn(isActive && "brightness-200")}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
