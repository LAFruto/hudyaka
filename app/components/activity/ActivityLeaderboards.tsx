import { Leaderboard, ScoreType } from "~/types";
import ActivityLeaderboard from "./ActivityLeaderboard";

interface ActivityLeaderboardsProps {
  leaderboards: Leaderboard;
  type?: ScoreType;
}

const ActivityLeaderboards = ({
  leaderboards,
  type = "team",
}: ActivityLeaderboardsProps) => {
  return (
    <>
      {leaderboards &&
        leaderboards.categories.map((category, index) => (
          <ActivityLeaderboard category={category} type={type} key={index} />
        ))}
    </>
  );
};

export default ActivityLeaderboards;
