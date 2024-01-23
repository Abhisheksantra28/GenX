"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

import Typewriter from "typewriter-effect";
import { Button } from "./ui/button";

const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold py-32 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <Typewriter
            options={{
              strings: [
                "ChatBot",
                "Code Genertion",
                "Video Genertion",
                "Music Genertion",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster
      </div>

      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="pro"
            className="md:text-lg p-4 md:p-6 font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Start generating for Free
          </Button>
        </Link>
      </div>

      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
    </div>
  );
};

export default LandingHero;
