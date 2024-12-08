import ExcelJS from "exceljs";
import { ExcelHelper, TableConfig } from "~/models/classes/ExcelHelper";

const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile("HUDYAKA PARADE OF FESTIVAL JUDGES SCORE.xlsx");

const configs: TableConfig[] = [
  {
    headerRow: 3,
    identifierColumns: [1],
    tallyColumns: { start: 5, end: 7 },
    dataRowStart: 4,
  },
  {
    headerRow: 13,
    identifierColumns: [1],
    tallyColumns: { start: 5, end: 7 },
    dataRowStart: 14,
  },
  {
    headerRow: 23,
    identifierColumns: [1],
    tallyColumns: { start: 5, end: 7 },
    dataRowStart: 24,
  },
  {
    headerRow: 33,
    identifierColumns: [1],
    tallyColumns: { start: 5, end: 7 },
    dataRowStart: 34,
  },
];
const json = await ExcelHelper.jsonify({ workbook, configs, compact: true });

console.dir(json, { depth: 5 });

// const workbook = new ExcelJS.Workbook();
// await workbook.xlsx.readFile("DUET TAWAG NG TANGHALAN JUDGES SCORE.xlsx");

// const configs: TableConfig[] = [
//   {
//     headerRow: 2,
//     identifierColumns: [1],
//     tallyColumns: { start: 5, end: 7 },
//     dataRowStart: 3,
//   },
// ];

// const json = await ExcelHelper.jsonify({ workbook, configs });

// console.dir(json, { depth: 5 });
