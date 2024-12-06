import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import EventCarousel from "~/components/home/Events";
import Hero from "~/components/home/Hero";
import Leaderboard from "~/components/home/Leaderboard";
import SportsCarousel from "~/components/home/Sports";
import Footer from "~/components/layout/Footer";
import { getActivitiesByType } from "~/models";

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

export const loader = async () => {
  const events = await getActivitiesByType("event");
  const sports = await getActivitiesByType("sport");

  return Response.json({
    events: events,
    sports: sports,
  });
};

export default function Index() {
  const { events, sports } = useLoaderData<typeof loader>();

  return (
    <>
      <Hero activities={[...events, ...sports]} />
      <Leaderboard />
      <EventCarousel events={events} />
      <SportsCarousel sports={sports} />
      <Footer />
    </>
  );
}
