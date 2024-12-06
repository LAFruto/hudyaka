import EventsLink from "../home/EventsLink";
import SportsLink from "../home/SportsLink";

const ActivityLinks = () => {
  return (
    <div className="padding-container max-container grid grid-cols-2 h-full w-full gap-4 my-4">
      <SportsLink />
      <EventsLink />
    </div>
  );
};

export default ActivityLinks;
