import { Result } from "~/types";

export const PHT_TIMEZONE = "Asia/Manila";
export const TIMEZONE_OFFSET = 8; // for server

export const OVERALL: Result = {
  activity: "overall",
  categories: [
    {
      category: null,
      scores: [
        { team: "Masskara", image: "/teams/masskara.png", score: 370 },
        { team: "Ati Atihan", image: "/teams/ati-atihan.png", score: 170 },
        { team: "Sinulog", image: "/teams/sinulog.png", score: 140 },
        { team: "Kadayawan", image: "/teams/kadayawan.png", score: 340 },
        { team: "Pintados", image: "/teams/pintados.png", score: 50 },
        { team: "Dinagyang", image: "/teams/dinagyang.png", score: 390 },
      ],
    },
  ],
};

export const RESULTS: Result[] = [
  {
    activity: "parade-of-festivals",
    categories: [
      {
        category: "Best Float Design",
        scores: [
          { team: "Masskara", image: "/teams/masskara.png", score: 90 },
          { team: "Ati Atihan", image: "/teams/ati-atihan.png", score: 80 },
          { team: "Sinulog", image: "/teams/sinulog.png", score: 10 },
          { team: "Kadayawan", image: "/teams/kadayawan.png", score: 100 },
          { team: "pintados", image: "/teams/pintados.png", score: 10 },
          { team: "Dinagyang", image: "/teams/dinagyang.png", score: 10 },
        ],
      },
      {
        category: "Liveliest Delegation",
        scores: [
          { team: "Masskara", image: "/teams/masskara.png", score: 90 },
          { team: "Ati Atihan", image: "/teams/ati-atihan.png", score: 10 },
          { team: "Sinulog", image: "/teams/sinulog.png", score: 10 },
          { team: "Kadayawan", image: "/teams/kadayawan.png", score: 90 },
          { team: "Pintados", image: "/teams/pintados.png", score: 10 },
          { team: "Dinagyang", image: "/teams/dinagyang.png", score: 100 },
        ],
      },
      {
        category: "Dance Showdown",
        scores: [
          { team: "Masskara", image: "/teams/masskara.png", score: 90 },
          { team: "Ati Atihan", image: "/teams/ati-atihan.png", score: 10 },
          { team: "Sinulog", image: "/teams/sinulog.png", score: 10 },
          { team: "Kadayawan", image: "/teams/kadayawan.png", score: 80 },
          { team: "Pintados", image: "/teams/pintados.png", score: 10 },
          { team: "Dinagyang", image: "/teams/dinagyang.png", score: 100 },
        ],
      },
      {
        category: "Festival King",
        scores: [
          { team: "Masskara", image: "/teams/masskara.png", score: 10 },
          { team: "Ati Atihan", image: "/teams/ati-atihan.png", score: 10 },
          { team: "Sinulog", image: "/teams/sinulog.png", score: 60 },
          { team: "Kadayawan", image: "/teams/kadayawan.png", score: 60 },
          { team: "Pintados", image: "/teams/pintados.png", score: 10 },
          { team: "Dinagyang", image: "/teams/dinagyang.png", score: 70 },
        ],
      },
      {
        category: "Festival Queen",
        scores: [
          { team: "Masskara", image: "/teams/masskara.png", score: 10 },
          { team: "Ati Atihan", image: "/teams/ati-atihan.png", score: 60 },
          { team: "Sinulog", image: "/teams/sinulog.png", score: 50 },
          { team: "Kadayawan", image: "/teams/kadayawan.png", score: 10 },
          { team: "Pintados", image: "/teams/pintados.png", score: 10 },
          { team: "Dinagyang", image: "/teams/dinagyang.png", score: 70 },
        ],
      },
    ],
  },
];
