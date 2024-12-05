import { Outlet } from "@remix-run/react";
import Footer from "~/components/layout/Footer";

export function EventsLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}