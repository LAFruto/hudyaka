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

    const output = await test(workbook);
    console.log(output);
    return output;
  } catch (e) {
    return "Invalid File Sent";
  }
  // process the file
}

async function test(workbook: ExcelJS.Workbook) {
  // Var
  const sheetCount = workbook.worksheets.length;
  const headerRowNumber = 1;
  let output = "Data Has Been Uploaded Successfully";

  for (let i = 0; i < sheetCount; i++) {
    const worksheet = workbook.worksheets[i];
    const headerRow = worksheet.getRow(headerRowNumber);
    const rowCount = worksheet.rowCount;
    let teamI,
      totalI,
      scoreI,
      rankI,
      partI,
      actI,
      catI = undefined;

    headerRow.eachCell((cell, index) => {
      switch (cell.value) {
        case "Team":
          teamI = index;
          break;
        case "Total":
          totalI = index;
          break;
        case "Rank":
          rankI = index;
          break;
        case "Score":
          scoreI = index;
          break;
        case "Participant":
          partI = index;
          break;
        case "Activity":
          actI = index;
          break;
        case "Category":
          catI = index;
          break;
      }
    });

    let temp: any[] = [];

    if (teamI != undefined && rankI != undefined) {
      // First: Check for each team name if they are valid
      // Second: Check if participants have their own name or not to include in the data
      // Thrid: Ensure all rank is filled up and valid
      // Lastly: Push to prod
      for (let j = headerRowNumber + 1; j < rowCount; j++) {
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
        console.log(rankType);
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

    // Todo: do a chekc for total, score, part, act, and cat
    console.log(temp);
  }

  return output;
}

export type ImportParams = {
  clusterId: number;
  teamId?: number;
  participantId?: number;
  categoryId?: number;
  total?: number;
  score?: number;
  rank: number;
};

async function importData() {}
