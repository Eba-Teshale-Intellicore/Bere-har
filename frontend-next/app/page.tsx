"use client";

import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import HomePage from "@/components/Home/HomePage";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div>
      <main>
        <HomePage />
      </main>
    </div>
  );
}
