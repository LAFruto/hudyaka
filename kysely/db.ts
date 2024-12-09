import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "@neondatabase/serverless";
import { DB } from "./db-schema";
import pg from "pg";

export const pool = new pg.Pool({
  connectionString: process.env.KYSELY_URL,
});

export const neonPool = new Pool({
  connectionString: process.env.KYSELY_URL,
});

export const dbk =
  process.env.NODE_ENV == "production"
    ? new Kysely<DB>({
        dialect: new PostgresDialect({
          pool: neonPool,
        }),
      })
    : new Kysely<DB>({
        dialect: new PostgresDialect({
          pool: pool,
        }),
      });
