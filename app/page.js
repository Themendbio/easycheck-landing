'use client';

import { Nav, Hero } from '../components/hero';
import { StatsSection } from '../components/stats';
import { ProblemSection } from '../components/problem';
import { SolutionSection } from '../components/solution';
import { TechSection } from '../components/tech';
import { Footer } from '../components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <StatsSection />
      <ProblemSection />
      <SolutionSection />
      <TechSection />
      <Footer />
    </div>
  );
}
