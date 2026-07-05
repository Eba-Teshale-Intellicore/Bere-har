import React from "react";
import Hero from "@/components/Homepage.tsx/Hero";
import HeroFeatures from "@/components/Homepage.tsx/HeroFeatures";
import Hero2 from "@/components/Homepage.tsx/Hero2";
import HeroWomenFea from "@/components/Homepage.tsx/HeroWomenfea";
import Hero3 from "@/components/Homepage.tsx/Hero3";
import HeroMenFea from "@/components/Homepage.tsx/HeroMenfea";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroFeatures />
      <Hero2 />
      <HeroWomenFea />
      <Hero3 />
      <HeroMenFea />
    </>
  );
}
