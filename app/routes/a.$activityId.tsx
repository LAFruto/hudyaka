import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ActivityBanner from "~/components/activity/ActivityBanner";
import ActivityLeaderboard from "~/components/activity/ActivityLeaderboard";
import ActivityLinks from "~/components/activity/ActivityLinks";
import { getActivityById } from "~/models";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.activityId) {
    throw new Response("Activity ID is required", { status: 400 });
  }

  const event = await getActivityById(params.activityId);
  if (!event) {
    throw new Response("Not Found", { status: 404 });
  }
  return { event };
};

const Event = () => {
  const { event } = useLoaderData<typeof loader>();

  return (
    <>
      <ActivityBanner activity={event} />
      {event.isScored && <ActivityLeaderboard />}
      <ActivityLinks />
    </>
  );
};

export default Event;
