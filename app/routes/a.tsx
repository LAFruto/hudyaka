import { Outlet } from "@remix-run/react";
import Footer from "~/components/layout/Footer";

export default function EventsLayout() {
  return (
    <main>
      <Outlet />
      <Footer />
    </main>
  );
}
