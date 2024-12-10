import { Result } from "~/types";
import ParticipantLeaderboard from "./ParticipantLeaderboard";

interface ParticipantLeaderboardsProps {
  result: Result;
}

const ParticipantLeaderboards = ({ result }: ParticipantLeaderboardsProps) => {
  return (
    <>
      {result &&
        result.categories.map((category, index) => (
          <ParticipantLeaderboard category={category} key={index} />
        ))}
    </>
  );
};

export default ParticipantLeaderboards;
