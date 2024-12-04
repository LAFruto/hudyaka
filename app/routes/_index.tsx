import type { MetaFunction } from "@remix-run/node";
import EventCarousel from "~/components/EventCarousel";
import Hero from "~/components/home/Hero";
import Leaderboard from "~/components/home/Leaderboard";
import Footer from "~/components/layout/Footer";
import SportsCarousel from "~/components/SportsCarousel";
import Pattern from "~/components/ui/Pattern";

export const meta: MetaFunction = () => {
  return [
    { title: "Hudyaka - Mapúa MCM" },
    {
      name: "Mapúa MCM 9th Foundation",
      content:
        "Hudyaka Mapúa: Kasadya ug pasalamat sa Padayong Pag-uswag. December 8 - 14, 2024 at Mapúa Malayan Colleges Mindanao",
    },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col overflow-hidden">
      <Hero />
      <Leaderboard />
      <EventCarousel />
      <SportsCarousel />
      <Footer />
    </div>
  );
}
