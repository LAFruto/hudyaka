import type { CellValue } from "exceljs";
import ExcelJS from "exceljs";

import { z } from "zod";

export interface ColumnRange {
  start: number;
  end: number;
}

export interface TableConfig {
  identifierColumns: number[] | ColumnRange;
  tallyColumns: number[] | ColumnRange;
  headerRow: number;
  dataRowStart: number;
}

interface TableData {
  index: number;
  headers: string[];
  rows: Record<string, any>[];
}

interface ProcessingResult {
  sheetName: string;
  tables: TableData[];
  metadata: {
    processedAt: Date;
    tableCount: number;
  };
}

export class ExcelHelper {
  // Zod schema for a column range
  private static ColumnRangeSchema = z.object({
    start: z.number().int().positive(),
    end: z.number().int().positive(),
  });

  // Zod schema for TableConfig
  private static TableConfigSchema = z
    .object({
      identifierColumns: z.union([
        z.array(z.number().int().positive()).nonempty(),
        this.ColumnRangeSchema,
      ]),
      tallyColumns: z.union([
        z.array(z.number().int().positive()).nonempty(),
        this.ColumnRangeSchema,
      ]),
      headerRow: z.number().int().positive(),
      dataRowStart: z.number().int().positive(),
    })
    .superRefine((config, ctx) => {
      // Validate that identifier and tally columns do not overlap
      const identifierColumns = this.resolveColumnIndices(
        config.identifierColumns
      );
      const tallyColumns = this.resolveColumnIndices(config.tallyColumns);

      const overlap = identifierColumns.some((col) =>
        tallyColumns.includes(col)
      );
      if (overlap) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Identifier and tally column ranges must not overlap.",
        });
      }
    });

  // Zod schema for jsonify input validation
  private static JsonifyInputSchema = z.object({
    workbook: z.instanceof(ExcelJS.Workbook),
    configs: z.array(this.TableConfigSchema),
    sheetName: z.string().optional().default("Summary"),
    compact: z.boolean().optional().default(false),
  });

  // Resolve column indices from a range or array
  private static resolveColumnIndices(
    columns: number[] | ColumnRange
  ): number[] {
    if (Array.isArray(columns)) {
      return columns;
    }
    const { start, end } = columns;
    // if (start > end) {
    //   throw new Error("Column range start must be less than or equal to end.");
    // }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  private static getCellValue = (cellValue: CellValue): any => {
    if (cellValue && typeof cellValue === "object" && "result" in cellValue) {
      return cellValue.result;
    }
    return cellValue;
  };

  private static extractTableData = (
    worksheet: ExcelJS.Worksheet,
    config: TableConfig,
    tableIndex: number
  ): TableData => {
    // Validate config
    this.TableConfigSchema.parse(config);

    const identifierColumns = this.resolveColumnIndices(
      config.identifierColumns
    );
    const tallyColumns = this.resolveColumnIndices(config.tallyColumns);

    const identifierHeaders: string[] = [];
    const tallyHeaders: string[] = [];
    const rows: Record<string, any>[] = [];

    const headerRow = worksheet.getRow(config.headerRow);

    identifierColumns.forEach((colIndex) => {
      identifierHeaders.push(String(headerRow.getCell(colIndex).value));
    });

    tallyColumns.forEach((colIndex) => {
      tallyHeaders.push(String(headerRow.getCell(colIndex).value));
    });

    const headers = [...identifierHeaders, ...tallyHeaders];

    for (let i = config.dataRowStart; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);

      if (!row.hasValues) {
        break;
      }

      const rowData: Record<string, any> = {};

      identifierColumns.forEach((colIndex, index) => {
        const header = identifierHeaders[index];
        rowData[header] = this.getCellValue(row.getCell(colIndex).value);
      });

      tallyColumns.forEach((colIndex, index) => {
        const header = tallyHeaders[index];
        rowData[header] = this.getCellValue(row.getCell(colIndex).value);
      });

      rows.push(rowData);
    }

    return {
      index: tableIndex,
      headers,
      rows,
    };
  };

  static jsonify = async ({
    workbook,
    configs,
    sheetName,
    compact,
  }: {
    workbook: ExcelJS.Workbook;
    configs: TableConfig[];
    sheetName?: string;
    compact?: boolean;
  }): Promise<
    ProcessingResult | Record<string, any>[] | Record<string, any>[][]
  > => {
    // Validate input
    const validatedInputs = this.JsonifyInputSchema.parse({
      workbook,
      configs,
      sheetName,
      compact,
    });

    const worksheet = validatedInputs.workbook.getWorksheet(
      validatedInputs.sheetName
    );

    if (!worksheet)
      throw new Error(`Worksheet "${validatedInputs.sheetName}" not found`);

    const tables: TableData[] = [];

    validatedInputs.configs.forEach((config, index) => {
      tables.push(this.extractTableData(worksheet, config, index));
    });

    if (validatedInputs.compact) {
      if (tables.length === 1) {
        return tables[0].rows;
      }
      return tables.map((table) => table.rows);
    }

    return {
      sheetName: validatedInputs.sheetName,
      tables,
      metadata: {
        processedAt: new Date(),
        tableCount: tables.length,
      },
    };
  };
}
