import { dbk } from "kysely/db";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";
import { ActivityType, Result, Category } from "~/types";
import { sql } from "kysely";

// Overall only aggregates event of type "event" not "sports"
export async function getOverallLeaderboard() {
  const overall = await dbk
    .selectFrom("Cluster as c")
    .select((eb) => [
      "c.altName as team",
      "c.image",
      jsonObjectFrom(
        eb
          .selectFrom("Tally as t")
          .leftJoin("Activity as a", "a.id", "t.activityId")
          .whereRef("t.clusterId", "=", "c.id")
          .where("a.isOverall", "=", true)
          .where("a.altName", "!=", "cosplay")
          .select((eb) => [
            eb.fn.coalesce(eb.fn.sum<number>("t.score"), sql`0`).as("score"),
          ])
      ).as("general"),
      jsonObjectFrom(
        eb
          .selectFrom("Tally as ta")
          .leftJoin("Activity as ac", "ac.id", "ta.activityId")
          .whereRef("ta.clusterId", "=", "c.id")
          .where("ac.altName", "=", "cosplay")
          .select((eb) => eb.fn.max("ta.score").as("score"))
      ).as("cosplay"),
    ])
    .groupBy("c.id")
    .execute();
  const output: Result = {
    activity: "overall",
    categories: [{ category: null, scores: [] }],
  };
  for (const o of overall) {
    output.categories[0].scores.push({
      team: o.team,
      image: o.image,
      score:
        o.cosplay!.score != null
          ? o.general!.score! + o.cosplay!.score
          : o.general!.score!,
    });
    ``;
  }
  // console.dir(overall, { depth: null });
  return output as Result;
}

// TODO
export async function getLeaderboardById(activity: string) {
  const leaderboard = await dbk
    .selectFrom("Activity as a")
    .where("a.name", "ilike", activity)
    .select((eb) => [
      "a.name as activity",
      jsonArrayFrom(
        eb
          .selectFrom("Category as c")
          .whereRef("c.activityId", "=", "a.id")
          .select((eb) => [
            "c.name as category",
            jsonArrayFrom(
              eb
                .selectFrom("Tally as ta")
                .innerJoin("Cluster as cl", "cl.id", "ta.clusterId")
                .leftJoin("Participant as p", "p.id", "ta.participantId")
                .whereRef("ta.categoryId", "=", "c.id")
                .select([
                  "ta.rank as displayRank",
                  "ta.score",
                  "cl.altName as team",
                  "cl.image",
                  "p.name as participant",
                ])
                .orderBy("ta.rank asc")
            ).as("scores"),
          ])
          .orderBy("c.name asc")
      ).as("categories"),
      jsonArrayFrom(
        eb
          .selectFrom("Tally as t")
          .innerJoin("Cluster as clu", "clu.id", "t.clusterId")
          .leftJoin("Participant as pa", "pa.id", "t.participantId")
          .whereRef("t.activityId", "=", "a.id")
          .where("t.categoryId", "is", null)
          .select([
            "t.rank as displayRank",
            "t.score",
            "clu.altName as team",
            "clu.image",
            "pa.name as participant",
          ])
          .orderBy("t.rank asc")
      ).as("scores"),
    ])
    .executeTakeFirst();
  if (!leaderboard) return undefined;

  let output = undefined;
  if (leaderboard.categories.length > 0) {
    output = {
      activity: leaderboard.activity,
      categories: leaderboard.categories,
    };
  } else {
    output = {
      activity: leaderboard.activity,
      categories: [
        {
          category: null,
          scores: leaderboard.scores,
        },
      ],
    };
  }

  if (output.activity == "Sinag") {
    output = { teamResult: output, participantResult: null };
  } else if (output.categories[0].scores.length > 0) {
    if (output.categories[0].scores[0].participant != null) {
      if (output.activity == "Cosplay") {
        // aggregate score
        let aggregate: any[] = [];
        const scores = output.categories[0].scores;
        for (let i = 0; i < scores.length; i++) {
          if (aggregate.every((agg) => agg.team != scores[i].team)) {
            aggregate.push(scores[i]);
          } else if (aggregate.length == 0) {
            aggregate.push(scores[i]);
          }
        }

        output = {
          teamResult: {
            activity: output.activity,
            categories: [{ category: null, scores: aggregate }] as Category[],
          },
          participantResult: output,
        };
      } else {
        output = { teamResult: null, participantResult: output };
      }
    } else {
      output = { teamResult: output, participantResult: null };
    }
  } else {
    output = { teamResult: output, participantResult: null };
  }
  // console.dir(output, { depth: null });
  return output;
}

export async function getOverallLeaderboardBreakdown() {
  const activity = await dbk
    .selectFrom("Activity as a")
    .leftJoin("Category as c", "c.activityId", "a.id")
    .where("c.activityId", "is", null)
    .where("a.isOverall", "=", true)
    .where("a.altName", "!=", "cosplay")
    .select((eb) => [
      "a.name as activity",
      jsonArrayFrom(
        eb
          .selectFrom("Tally as t")
          .innerJoin("Cluster as cl", "cl.id", "t.clusterId")
          .whereRef("t.activityId", "=", "a.id")
          .select(["t.rank as displayRank", "t.score", "cl.altName as team"])
          .orderBy("cl.num asc")
      ).as("scores"),
    ])
    .execute();

  const category = await dbk
    .selectFrom("Category as c")
    .leftJoin("Activity as a", "a.id", "c.activityId")
    .where("a.isOverall", "=", true)
    .select((eb) => [
      "c.name as category",
      "a.name as activity",
      jsonArrayFrom(
        eb
          .selectFrom("Tally as t")
          .innerJoin("Cluster as cl", "cl.id", "t.clusterId")
          .whereRef("t.categoryId", "=", "c.id")
          .select(["t.rank as displayRank", "t.score", "cl.altName as team"])
          .orderBy("cl.num asc")
      ).as("scores"),
    ])
    .execute();

  const output = { activities: activity, categories: category };
  console.dir(output, { depth: null });
}

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getActivitiesByType(type: ActivityType) {
  // await new Promise((resolve) => setTimeout(resolve, 500)); // Temp Load Simulation
  // const activities = await fakeActivities.getAll();
  const activities = await dbk
    .selectFrom("Activity as a")
    .innerJoin("ActivityType as at", "at.id", "a.activityTypeId")
    .select([
      "a.name",
      "a.altName as id",
      "a.startDateTime as startDate",
      "a.endDateTime as endDate",
      "a.image",
      "a.banner",
      "a.url",
      "at.name as type",
      "a.isOverall",
      "a.isScored",
    ])
    .orderBy("startDate asc")
    .execute();

  const filteredActivities = activities.filter(
    (a) => (a.type as unknown as ActivityType) === type
  );
  return filteredActivities;
}

export async function getActivityById(id: string) {
  return await dbk
    .selectFrom("Activity as a")
    .innerJoin("ActivityType as at", "at.id", "a.activityTypeId")
    .where("altName", "=", id)
    .select([
      "a.name",
      "a.altName as id",
      "a.startDateTime as startDate",
      "a.endDateTime as endDate",
      "a.image",
      "a.banner",
      "a.url",
      "at.name as type",
      "a.isOverall",
      "a.isScored",
    ])
    .executeTakeFirst();
}
