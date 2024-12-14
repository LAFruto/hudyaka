import { Outlet } from "@remix-run/react";
import Footer from "~/components/layout/Footer";

const ImportLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default ImportLayout;
