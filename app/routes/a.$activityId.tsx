import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import ActivityBanner from "~/components/activity/ActivityBanner";
import ActivityLeaderboard from "~/components/activity/ActivityLeaderboard";
import ActivityLinks from "~/components/activity/ActivityLinks";
import { getActivityById } from "~/models";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.activityId, "Missing activityId param");
  const event = await getActivityById(params.activityId);
  if (!event) {
    throw new Response("Not Found", { status: 404 });
  }
  return Response.json({ event });
};

const Event = () => {
  const { event } = useLoaderData<typeof loader>();

  return (
    <>
      <ActivityBanner activity={event} />
      <ActivityLeaderboard />
      <ActivityLinks />
    </>
  );
};

export default Event;
