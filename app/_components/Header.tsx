"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-red-900 bg-opacity-10 shadow-md backdrop-blur-lg"
          : "bg-transparent text-red-900"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/">
          <Image src="/icons/logo.png" alt="Logo" width={30} height={30} />
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center space-x-6 text-xs">
            <li>
              <Link
                href="/categories"
                className="text-white hover:text-red-600"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="text-white hover:text-red-600">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white hover:text-red-600">
                Contact
              </Link>
            </li>
            <li>
              <div className="flex items-center gap-2">
                {isSignedIn ? (
                  <UserButton fallback="/" />
                ) : (
                  <Button
                    className="button cursor-pointer"
                    onClick={() => {
                      router.push("/sign-in");
                    }}
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
