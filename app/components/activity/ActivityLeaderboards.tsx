import { Result } from "~/types";
import ActivityLeaderboard from "./ActivityLeaderboard";

interface ActivityLeaderboardsProps {
  result?: Result;
}

const ActivityLeaderboards = ({ result }: ActivityLeaderboardsProps) => {
  return (
    <>
      {result &&
        result.categories.map((category, index) => (
          <ActivityLeaderboard category={category} key={index} />
        ))}
    </>
  );
};

export default ActivityLeaderboards;
