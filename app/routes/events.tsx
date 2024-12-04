import { Outlet } from "@remix-run/react";
import Footer from "~/components/layout/Footer";

export function EventLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
