import type { MetaFunction } from "@remix-run/node";
import EventCarousel from "~/components/EventCarousel";
import HeroCarousel from "~/components/home/HeroCarousel";
import Leaderboard from "~/components/home/Leaderboard";
import Footer from "~/components/layout/Footer";

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
    <div className="max-container flex flex-col overflow-hidden">
      <HeroCarousel />
      <Leaderboard />
      <EventCarousel />
      <Footer />
    </div>
  );
}
