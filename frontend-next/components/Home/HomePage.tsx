import React from "react";
import Hero from "@/components/Home/Hero";
import HeroFeatures from "@/components/Home/HeroFeatures";
import Hero2 from "@/components/Home/Hero2";
import HeroWomenFea from "@/components/Home/HeroWomenfea";
import Hero3 from "@/components/Home/Hero3";
import HeroMenFea from "@/components/Home/HeroMenfea";
import HeroAbout from "@/components/Home/HeroAbout";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroFeatures />
      <Hero2 />
      <HeroWomenFea />
      <Hero3 />
      <HeroMenFea />
      <HeroAbout />
    </>
  );
}
