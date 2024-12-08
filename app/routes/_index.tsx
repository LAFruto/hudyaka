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
    { title: "Hudyaka - Mapúa MCM Foundation Week" },
    {
      name: "Mapúa MCM 9th Foundation - Website",
      content:
        "Hudyaka Mapúa: Kasadya ug pasalamat sa Padayong Pag-uswag. December 8 - 14, 2024 at Mapúa Malayan Colleges Mindanao",
    },
    {
      property: "og:title",
      content: "Hudyaka - Mapúa MCM Foundation Week",
    },
    {
      property: "og:description",
      content:
        "Hudyaka Mapúa: Kasadya ug pasalamat sa Padayong Pag-uswag. December 8 - 14, 2024 at Mapúa Malayan Colleges Mindanao",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://hudyaka-mmcm.com",
    },
    {
      property: "og:image",
      content: "/social-preview.png",
    },
    {
      property: "og:image:width",
      content: "2400",
    },
    {
      property: "og:image:height",
      content: "1260",
    },
  ];
};

export const loader = async () => {
  const events = await getActivitiesByType("event");
  const sports = await getActivitiesByType("sport");

  return {
    events: events,
    sports: sports,
  };
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
