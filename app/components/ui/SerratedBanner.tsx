import { cn } from "~/lib/util";
import { TempTeamRank } from "~/types";

interface SerratedBannerProps {
  team: TempTeamRank;
}

const SerratedBanner = ({ team }: SerratedBannerProps) => {
  return (
    <svg viewBox="2 0 112 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filterMedal)">
        <path
          d="M4 0H112V180.169L96.1506 130.432L78.3013 182L59.0962 130.432L41.6987 180.169L22.7197 130.432L6 180.169V0Z"
          fill={cn(
            team.rank == 2
              ? "#042454"
              : team.rank === 1
              ? "#FF9000"
              : team.rank === 3
              ? "#A30420"
              : ""
          )}
        />
        <path
          d="M4 0H112V180.169L96.1506 130.432L78.3013 182L59.0962 130.432L41.6987 180.169L22.7197 130.432L6 180.169V0Z"
          stroke="white"
          strokeWidth="3.5"
          strokeLinejoin="miter"
          strokeLinecap="butt"
          strokeMiterlimit="10"
          fill="none"
        />
      </g>
      <defs>
        <filter
          id="filterMedal"
          x="-2"
          y="-4"
          width="120"
          height="208"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_287_5556"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_287_5556"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SerratedBanner;
