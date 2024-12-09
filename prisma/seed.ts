import { db } from "app/lib/db";

const activities = [
  {
    name: "Parade of Festivals",
    type: "event",
    image: "/activities/parade-of-festivals.png",
    banner: "/banner/parade-of-festivals.png",
    url: "/a/parade-of-festivals",
    startDate: new Date(new Date("12/9/24").setHours(8, 0, 0, 0)),
    endDate: new Date(new Date("12/9/24").setHours(11, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Laro ng Lahi",
    type: "event",
    image: "/activities/laro-ng-lahi.png",
    banner: "/banner/laro-ng-lahi.png",
    url: "/a/laro-ng-lahi",
    startDate: new Date(new Date("12/9/24").setHours(13, 0, 0, 0)),
    endDate: new Date(new Date("12/9/24").setHours(16, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Sinag",
    type: "event",
    image: "/activities/sinag.png",
    banner: "/banner/sinag.png",
    url: "/a/sinag",
    startDate: new Date(new Date("12/9/24").setHours(16, 0, 0, 0)),
    endDate: new Date(new Date("12/9/24").setHours(20, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Cosplay",
    type: "event",
    image: "/activities/cosplay.png",
    banner: "/banner/cosplay.png",
    url: "/a/cosplay",
    startDate: new Date(new Date("12/10/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/10/24").setHours(12, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Battle of the Bands",
    type: "event",
    image: "/activities/battle-of-the-bands.png",
    banner: "/banner/battle-of-the-bands.png",
    url: "/a/battle-of-the-bands",
    startDate: new Date(new Date("12/10/24").setHours(15, 0, 0, 0)),
    endDate: new Date(new Date("12/10/24").setHours(18, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Spoken Poetry",
    type: "event",
    image: "/activities/spoken-poetry.png",
    banner: "/banner/spoken-poetry.png",
    url: "/a/spoken-poetry",
    startDate: new Date(new Date("12/11/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/11/24").setHours(12, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Killer Karaoke",
    type: "event",
    image: "/activities/killer-karaoke.png",
    banner: "/banner/killer-karaoke.png",
    url: "/a/killer-karaoke",
    startDate: new Date(new Date("12/11/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/11/24").setHours(12, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Kaloka-like with Talent",
    type: "event",
    image: "/activities/kaloka-like-with-talent.png",
    banner: "/banner/kaloka-like-with-talent.png",
    url: "/a/kaloka-like-with-talent",
    startDate: new Date(new Date("12/11/24").setHours(15, 0, 0, 0)),
    endDate: new Date(new Date("12/11/24").setHours(17, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Indak Mapua",
    type: "event",
    image: "/activities/indak-mapua.png",
    banner: "/banner/indak-mapua.png",
    url: "/a/indak-mapua",
    startDate: new Date(new Date("12/11/24").setHours(17, 0, 0, 0)),
    endDate: new Date(new Date("12/11/24").setHours(19, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Folk Dance",
    type: "event",
    image: "/activities/folk-dance.png",
    banner: "/banner/folk-dance.png",
    url: "/a/folk-dance",
    startDate: new Date(new Date("12/12/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/12/24").setHours(12, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Tawag ng Tanghalan",
    type: "event",
    image: "/activities/tawag-ng-tanghalan.png",
    banner: "/banner/tawag-ng-tanghalan.png",
    url: "/a/tawag-ng-tanghalan",
    startDate: new Date(new Date("12/12/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/12/24").setHours(12, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Petsyonista",
    type: "event",
    image: "/activities/petsyonista.png",
    banner: "/banner/petsyonista.png",
    url: "/a/petsyonista",
    startDate: new Date(new Date("12/13/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/13/24").setHours(11, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  //////////////////////////////////////
  // SPORTS
  //////////////////////////////////////

  {
    name: "Table Tennis",
    type: "sport",
    image: "/activities/table-tennis.png",
    banner: "/banner/table-tennis.png",
    url: "/a/table-tennis",
    startDate: new Date(new Date("12/10/24").setHours(8, 0, 0, 0)),
    endDate: new Date(new Date("12/10/24").setHours(21, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  {
    name: "Scrabble",
    type: "sport",
    image: "/activities/scrabble.png",
    banner: "/banner/scrabble.png",
    url: "/a/scrabble",
    startDate: new Date(new Date("12/12/24").setHours(10, 0, 0, 0)),
    endDate: new Date(new Date("12/12/24").setHours(19, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  {
    name: "Badminton",
    type: "sport",
    image: "/activities/badminton.png",
    banner: "/banner/badminton.png",
    url: "/a/badminton",
    startDate: new Date(new Date("12/10/24").setHours(8, 0, 0, 0)),
    endDate: new Date(new Date("12/10/24").setHours(21, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  {
    name: "Chess",
    type: "sport",
    image: "/activities/chess.png",
    banner: "/banner/chess.png",
    url: "/a/chess",
    startDate: new Date(new Date("12/12/24").setHours(10, 0, 0, 0)),
    endDate: new Date(new Date("12/12/24").setHours(19, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  {
    name: "Mobile Legends",
    type: "sport",
    image: "/activities/mobile-legends.png",
    banner: "/banner/mobile-legends.png",
    url: "/a/mobile-legends",
    startDate: new Date(new Date("12/10/24").setHours(8, 0, 0, 0)),
    endDate: new Date(new Date("12/10/24").setHours(20, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  {
    name: "Volleyball",
    type: "sport",
    image: "/activities/volleyball.png",
    banner: "/banner/volleyball.png",
    url: "/a/volleyball",
    startDate: new Date(new Date("12/9/24").setHours(13, 0, 0, 0)),
    endDate: new Date(new Date("12/9/24").setHours(18, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  {
    name: "Basketball",
    type: "sport",
    image: "/activities/basketball.png",
    banner: "/banner/basketball.png",
    url: "/a/basketball",
    startDate: new Date(new Date("12/13/24").setHours(7, 30, 0, 0)),
    endDate: new Date(new Date("12/13/24").setHours(12, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
];

const activityTypes = [{ name: "sport" }, { name: "event" }];

const categories = [
  { name: "Festival King", event: "Parade of Festivals" },
  { name: "Festival Queen", event: "Parade of Festivals" },
  { name: "Liveliest Delegation", event: "Parade of Festivals" },
  { name: "Best Float Design", event: "Parade of Festivals" },
  { name: "Dance Showdown", event: "Parade of Festivals" },

  { name: "Solo", event: "Tawag ng Tanghalan" },
  { name: "Duet", event: "Tawag ng Tanghalan" },

  { name: "Mr Sinag", event: "Sinag" },
  { name: "Ms Sinag", event: "Sinag" },
  { name: "Photographer", event: "Sinag" },
  { name: "Make-up Artist", event: "Sinag" },
  { name: "Fashion Designer", event: "Sinag" },

  { name: "Employee Mixed Doubles", event: "Badminton" },
  { name: "College Singles Men", event: "Badminton" },
  { name: "College Singles Women", event: "Badminton" },
  { name: "College Doubles Men", event: "Badminton" },
  { name: "College Doubles Women", event: "Badminton" },

  { name: "SHS Singles Men", event: "Badminton" },
  { name: "SHS Singles Women", event: "Badminton" },
  { name: "SHS Doubles Men", event: "Badminton" },
  { name: "SHS Doubles Women", event: "Badminton" },

  { name: "JHS Singles Men", event: "Badminton" },
  { name: "JHS Singles Women", event: "Badminton" },
  { name: "JHS Doubles Men", event: "Badminton" },
  { name: "JHS Doubles Women", event: "Badminton" },

  { name: "Employee Mixed Doubles", event: "Table Tennis" },
  { name: "College Singles Men", event: "Table Tennis" },
  { name: "College Singles Women", event: "Table Tennis" },
  { name: "College Doubles Men", event: "Table Tennis" },
  { name: "College Doubles Women", event: "Table Tennis" },

  { name: "SHS Singles Men", event: "Table Tennis" },
  { name: "SHS Singles Women", event: "Table Tennis" },
  { name: "SHS Doubles Men", event: "Table Tennis" },
  { name: "SHS Doubles Women", event: "Table Tennis" },

  { name: "JHS Singles Men", event: "Table Tennis" },
  { name: "JHS Singles Women", event: "Table Tennis" },
  { name: "JHS Doubles Men", event: "Table Tennis" },
  { name: "JHS Doubles Women", event: "Table Tennis" },

  { name: "Employee Mixed", event: "Volleyball" },
  { name: "College Women", event: "Volleyball" },
  { name: "College Men", event: "Volleyball" },
  { name: "SHS Women", event: "Volleyball" },
  { name: "SHS Men", event: "Volleyball" },
  { name: "JHS Men", event: "Volleyball" },
  { name: "JHS Women", event: "Volleyball" },

  { name: "Employee", event: "Basketball" },
  { name: "College", event: "Basketball" },
  { name: "JHS", event: "Basketball" },
  { name: "SHS", event: "Basketball" },

  { name: "Employee", event: "Chess" },
  { name: "College", event: "Chess" },
  { name: "JHS", event: "Chess" },
  { name: "SHS", event: "Chess" },

  { name: "Employee", event: "Scrabble" },
  { name: "College", event: "Scrabble" },
  { name: "JHS", event: "Scrabble" },
  { name: "SHS", event: "Scrabble" },

  { name: "Employee", event: "Mobile Legends" },
  { name: "College", event: "Mobile Legends" },
  { name: "JHS", event: "Mobile Legends" },
  { name: "SHS", event: "Mobile Legends" },
];

const clusters = [
  {
    name: "CCIS",
    altName: "Kadayawan",
    num: 4,
    image: "/teams/kadayawan.png",
  },
  {
    name: "CEA",
    altName: "Dinagyang",
    num: 6,
    image: "/teams/dinagyang.png",
  },
  {
    name: "ATYCB",
    altName: "Ati Atihan",
    num: 2,
    image: "/teams/ati-atihan.png",
  },
  {
    name: "CAS",
    altName: "Sinulog",
    num: 3,
    image: "/teams/sinulog.png",
  },
  {
    name: "CHS",
    altName: "Pintados",
    num: 5,
    image: "/teams/pintados.png",
  },
  {
    name: "High School",
    altName: "Masskara",
    num: 1,
    image: "/teams/masskara.png",
  },
];

for (const activityType of activityTypes) {
  await db.activityType.upsert({
    create: {
      name: activityType.name,
    },
    update: {},
    where: {
      name: activityType.name,
    },
  });
}

const seed = async () => {
  for (const activity of activities) {
    await db.activity.upsert({
      create: {
        name: activity.name,
        altName: activity.name.toLowerCase().replace(/\s+/g, "-"),
        image: activity.image,
        banner: activity.banner,
        url: activity.url,
        isOverall: activity.isOverall,
        isScored: activity.isScored,
        startDateTime: activity.startDate,
        endDateTime: activity.endDate,
        activityType: {
          connect: {
            name: activity.type,
          },
        },
      },
      update: {},
      where: {
        name: activity.name,
        isOverall: activity.isOverall,
        isScored: activity.isScored,
        startDateTime: activity.startDate,
        endDateTime: activity.endDate,
      },
    });
  }

  for (const category of categories) {
    const id = await db.activity.findUnique({
      where: {
        name: category.event,
      },
    });

    // console.log(`${category.name} : ${id ? "found" : "not found"}`);

    await db.category.upsert({
      create: {
        name: category.name,
        activity: {
          connect: {
            name: category.event,
          },
        },
      },
      update: {},
      where: {
        name_activityId: {
          name: category.event,
          activityId: id!.id,
        },
      },
    });
  }

  for (const cluster of clusters) {
    await db.cluster.upsert({
      create: {
        name: cluster.name,
        image: cluster.image,
        altName: cluster.altName,
        num: cluster.num,
      },
      update: {},
      where: {
        name: cluster.name,
      },
    });
  }
};

await seed();
