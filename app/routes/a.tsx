import { Outlet } from "@remix-run/react";
import Footer from "~/components/layout/Footer";

export default function EventsLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
