import { ActionFunctionArgs } from "@remix-run/node";
import ExcelJS from "exceljs";
import { dbk } from "kysely/db";

export async function action({ request }: ActionFunctionArgs) {
  // Params
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const activity = url.searchParams.get("activity");
  const formData = await request.formData();
  const file = formData.get("excel");
  if (!file) return "No File Sent";
  // Dont know how to do file type checking here

  // Data Mapping
  try {
    const workbook = new ExcelJS.Workbook();
    const buffer = await (file as File).arrayBuffer();
    await workbook.xlsx.load(buffer);

    const output = await test(workbook, activity, category);
    console.log(output);
    return output;
  } catch (e) {
    console.log(e);
    return "Invalid File Sent";
  }
  // process the file
}

async function test(workbook: ExcelJS.Workbook, activity: string | null, category: string | null) {
  // Var
  const sheetCount = workbook.worksheets.length;
  const headerRowNumber = 1;
  const success = "Data Has Been Uploaded Successfully";
  let outputsArr: ImportParams[][] = [];

  for (let i = 0; i < sheetCount; i++) {
    const worksheet = workbook.worksheets[i];
    const headerRow = worksheet.getRow(headerRowNumber);
    const rowCount = worksheet.rowCount;
    let teamI,
      totalI,
      scoreI,
      rankI,
      partI,
      altI,
      actI,
      catI = undefined;

    headerRow.eachCell((cell, index) => {
      switch (cell.text.toLowerCase()) {
        case "team":
          teamI = index;
          break;
        case "total":
          totalI = index;
          break;
        case "rank":
          rankI = index;
          break;
        case "score":
          scoreI = index;
          break;
        case "participant":
        case "name":
        case "owner":
          partI = index;
          break;
        case "pet":
        case "character":
        case "candidate number":
          altI = index;
          break;
        case "activity":
          actI = index;
          break;
        case "category":
          catI = index;
          break;
      }
    });

    let actId,
      catId = undefined;
    if (activity != null) {
      const q = await dbk
        .selectFrom("Activity as a")
        .where("a.name", "ilike", activity)
        .select("a.id")
        .executeTakeFirst();
      if (!q) return "Invalid Activity";
      actId = q.id;
    } else if (actI != undefined) {
      const actType = worksheet.getCell(headerRowNumber + 1, actI).type;
      const act =
        actType === ExcelJS.ValueType.String ||
        actType === ExcelJS.ValueType.RichText ||
        actType === ExcelJS.ValueType.SharedString
          ? worksheet.getCell(headerRowNumber + 1, actI).text
          : undefined;
      if (!act) return "No Activity was given";
      const q = await dbk.selectFrom("Activity as a").where("a.name", "ilike", act).select("a.id").executeTakeFirst();
      if (!q) return "Invalid Activity";
      actId = q.id;
    } else {
      return "No Activity Specified";
    }

    if (category != null) {
      const q = await dbk
        .selectFrom("Category as c")
        .where("c.name", "ilike", category)
        .select("c.id")
        .executeTakeFirst();
      if (!q) return "Invalid Category";
      catId = q.id;
    } else if (catI != undefined) {
      const catType = worksheet.getCell(headerRowNumber + 1, catI).type;
      const cat =
        catType === ExcelJS.ValueType.String ||
        catType === ExcelJS.ValueType.RichText ||
        catType === ExcelJS.ValueType.SharedString
          ? worksheet.getCell(headerRowNumber + 1, catI).text
          : undefined;
      if (cat) {
        const q = await dbk
          .selectFrom("Category as c")
          .where("c.name", "ilike", worksheet.getCell(headerRowNumber + 1, catI).text)
          .select("c.id")
          .executeTakeFirst();
        if (!q) return "Invalid Category";
        catId = q.id;
      }
    }

    let temp: any[] = [];
    let output: ImportParams[] = [];

    if (teamI != undefined && rankI != undefined) {
      for (let j = headerRowNumber + 1; j <= rowCount; j++) {
        const teamType = worksheet.getCell(j, teamI).type;
        const team =
          teamType === ExcelJS.ValueType.String ||
          teamType === ExcelJS.ValueType.RichText ||
          teamType === ExcelJS.ValueType.SharedString
            ? worksheet.getCell(j, teamI).text
            : undefined;

        // Will stop when there is no value after the current row
        if (team == undefined) break;

        const id = await dbk.selectFrom("Cluster as t").where("t.altName", "=", team).select("t.id").executeTakeFirst();
        if (!id) {
          return "Invalid Cluster Name: " + team;
        } else {
          // Add Id to temp
          temp[j - (headerRowNumber + 1)] = new Object();
          temp[j - (headerRowNumber + 1)].clusterId = id.id;
        }

        const rankType = worksheet.getCell(j, rankI).type;
        const rank =
          rankType === ExcelJS.ValueType.Formula
            ? worksheet.getCell(j, rankI).result.toString()
            : rankType === ExcelJS.ValueType.Number
            ? worksheet.getCell(j, rankI).text
            : undefined;
        if (rank == undefined) return "Invalid Rank Value: " + worksheet.getCell(j, rankI).value;
        const val = Number(rank);
        // adds rank to temp
        if (Number.isInteger(val)) temp[j - (headerRowNumber + 1)].rank = val;
        else return "Rank should be an Integer";
      }
    }

    // Maps to output
    for (let j = 0; j < temp.length; j++) {
      output[j] = {
        clusterId: temp[j].clusterId,
        rank: temp[j].rank,
        actId: actId,
        catId: catId,
      };
    }

    if (totalI != undefined) {
      for (let j = headerRowNumber + 1; j <= rowCount; j++) {
        const totalType = worksheet.getCell(j, totalI).type;
        const total =
          totalType === ExcelJS.ValueType.Formula
            ? worksheet.getCell(j, totalI).result.toString()
            : totalType === ExcelJS.ValueType.Number
            ? worksheet.getCell(j, totalI).text
            : undefined;

        // Will stop when there is no value after the current row
        if (total == undefined) break;
        const totalNum = Math.round(Number(total) * 100) / 100;
        output[j - (headerRowNumber + 1)].total = totalNum;
      }
    }

    if (scoreI != undefined) {
      for (let j = headerRowNumber + 1; j <= rowCount; j++) {
        const scoreType = worksheet.getCell(j, scoreI).type;
        const score =
          scoreType === ExcelJS.ValueType.Formula
            ? worksheet.getCell(j, scoreI).result.toString()
            : scoreType === ExcelJS.ValueType.Number
            ? worksheet.getCell(j, scoreI).text
            : undefined;

        // Will stop when there is no value after the current row
        if (score == undefined) break;
        output[j - (headerRowNumber + 1)].score = Number(score);
      }
    }

    if (partI != undefined) {
      for (let j = headerRowNumber + 1; j <= rowCount; j++) {
        const partType = worksheet.getCell(j, partI).type;
        const part =
          partType === ExcelJS.ValueType.String ||
          partType === ExcelJS.ValueType.RichText ||
          partType === ExcelJS.ValueType.SharedString
            ? worksheet.getCell(j, partI).text
            : undefined;
        if (part == undefined) break;
        output[j - (headerRowNumber + 1)].participant = part;
      }
    }

    if (altI != undefined) {
      for (let j = headerRowNumber + 1; j <= rowCount; j++) {
        const altType = worksheet.getCell(j, altI).type;
        const alt =
          altType === ExcelJS.ValueType.String ||
          altType === ExcelJS.ValueType.RichText ||
          altType === ExcelJS.ValueType.SharedString
            ? worksheet.getCell(j, altI).text
            : undefined;
        output[j - (headerRowNumber + 1)].alt = alt;
      }
    }
    outputsArr.push(output);
  }
  console.log("everything is goods", outputsArr);
  // Put to db
  for (const row of outputsArr) {
    for (const cell of row) {
      let partId,
        teamId = undefined;

      if (cell.participant != undefined) {
        const participant = await dbk
          .selectFrom("Participant as p")
          .where("p.name", "=", cell.participant)
          .$if(cell.alt != undefined, (qb) => qb.where("p.altName", "=", cell.alt!))
          .select("p.id")
          .executeTakeFirst();
        if (participant) {
          partId = participant.id;
        } else {
          const p = await dbk
            .insertInto("Participant")
            .values({
              name: cell.participant,
              altName: cell.alt,
              activityId: cell.actId,
              clusterId: cell.clusterId,
            })
            .returning("id")
            .executeTakeFirst();
          if (!p) return "Invalid Participant Details";
          partId = p.id;
        }
      }
      if (cell.team != undefined) {
        // Todo: Team entry Creation
      }
      const exist = await dbk
        .selectFrom("Tally as t")
        .where("t.clusterId", "=", cell.clusterId)
        .where("t.activityId", "=", cell.actId)
        .$if(cell.catId != undefined, (qb) => qb.where("t.categoryId", "=", cell.catId!))
        .$if(partId != undefined, (qb) => qb.where("t.participantId", "=", partId!))
        .executeTakeFirst();
      if (exist) return "Entry Already Exist!";

      await dbk
        .insertInto("Tally")
        .values({
          clusterId: cell.clusterId,
          activityId: cell.actId,
          categoryId: cell.catId,
          rank: cell.rank,
          total: cell.total,
          score: cell.score,
          teamId: teamId,
          participantId: partId,
        })
        .execute()
        .catch((error) => {
          console.log(error);
        });
    }
    await dbk.updateTable("Activity").where("id", "=", row[0].actId).set({ isScored: true }).execute();
  }

  return success;
}

export type ImportParams = {
  clusterId: number;
  actId: number;
  catId?: number;
  team?: string;
  teamNum?: number;
  participant?: string;
  alt?: string;
  total?: number;
  score?: number;
  rank: number;
};

async function importData() {}
