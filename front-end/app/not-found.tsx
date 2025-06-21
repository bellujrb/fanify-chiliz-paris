"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 blur-xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center">
        <div className="sm:w-10/12 md:w-8/12 text-center">
          <div
            className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[220px] sm:h-[300px] md:h-[340px] bg-center bg-no-repeat bg-contain flex items-end justify-center"
            aria-hidden="true"
          >
            <h1 className="text-center text-black text-7xl sm:text-8xl md:text-9xl font-bold drop-shadow-lg pt-6 sm:pt-8">
              404
            </h1>
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">The page you are looking for was lost or is under development.</h2>
        <p className="mb-8 text-lg text-gray-600 max-w-md mx-auto">
          You can return to the homepage and continue exploring the platform.
        </p>
        <Button
          size="lg"
          onClick={() => router.push("/")}
          className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Go to Home
        </Button>
      </div>
    </section>
  );
} 