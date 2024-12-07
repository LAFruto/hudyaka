import { Link } from "@remix-run/react";
import { Image } from "../Image";

const Footer = () => {
  return (
    <section className="bg-red-700">
      <div className="max-container padding-container w-full flex gap-8 flex-col lg:flex-row items-center justify-end py-12 ">
        <Link
          to="https://api-mmcm.org"
          target="_blank"
          rel="noreferrer"
          className="h-12"
        >
          <Image
            src="/api.png"
            height={512}
            width={512}
            aria-label="API"
            className="object-contain h-full w-full"
          />
        </Link>
        <Link
          to="https://mcm.edu.ph"
          target="_blank"
          rel="noreferrer"
          className="h-12"
        >
          <Image
            src="/mapua.png"
            width={512}
            height={512}
            aria-label="MAPUA"
            className="object-contain h-full w-full"
          />
        </Link>
      </div>
    </section>
  );
};

export default Footer;
