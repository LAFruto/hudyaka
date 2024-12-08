import { Kysely, PostgresDialect } from "kysely";
import { DB } from "./db-schema";
import pg from "pg";

export const pool = new pg.Pool({
  connectionString: process.env.KYSELY_URL,
});

export const dbk = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: pool,
  }),
});
